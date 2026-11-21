import {NextResponse} from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LIMITS = {name: 100, email: 200, subject: 200, message: 3000};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Oddiy spam himoyasi: bitta IP dan 1 daqiqada 5 tadan ortiq xabar yo'q.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Body = Partial<Record<'name' | 'email' | 'subject' | 'message' | 'website' | 'locale', unknown>>;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ok: false, error: 'invalid_json'}, {status: 400});
  }

  // Honeypot: odam bu maydonni ko'rmaydi, bot to'ldiradi.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ok: true});
  }

  const get = (k: keyof typeof LIMITS) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
  const name = get('name');
  const email = get('email');
  const subject = get('subject');
  const message = get('message');

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ok: false, error: 'required'}, {status: 400});
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ok: false, error: 'email'}, {status: 400});
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ok: false, error: 'too_long'}, {status: 400});
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'local';
  if (rateLimited(ip)) {
    return NextResponse.json({ok: false, error: 'rate_limited'}, {status: 429});
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[contact] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi (.env.local / Vercel env).');
    return NextResponse.json({ok: false, error: 'not_configured'}, {status: 500});
  }

  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 5) : '-';
  const text =
    `📬 <b>Yangi xabar (Portfolio)</b>\n\n` +
    `👤 <b>Ism:</b> ${esc(name)}\n` +
    `📧 <b>Email:</b> ${esc(email)}\n` +
    `📌 <b>Mavzu:</b> ${esc(subject)}\n` +
    `💬 <b>Xabar:</b>\n${esc(message)}\n\n` +
    `🌐 <i>Til: ${esc(locale)}</i>`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true}),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    const data = (await res.json().catch(() => null)) as {ok?: boolean; description?: string} | null;
    if (!res.ok || !data?.ok) {
      console.error('[contact] Telegram xatosi:', res.status, data?.description);
      return NextResponse.json({ok: false, error: 'telegram'}, {status: 502});
    }
    return NextResponse.json({ok: true});
  } catch (err) {
    console.error('[contact] Telegram bilan ulanishda xato:', err);
    return NextResponse.json({ok: false, error: 'network'}, {status: 502});
  }
}

export function GET() {
  return NextResponse.json({ok: false, error: 'method_not_allowed'}, {status: 405, headers: {Allow: 'POST'}});
}
