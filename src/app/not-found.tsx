export default function NotFound() {
  return (
    <html lang="uz">
      <body style={{margin: 0, background: '#0d1117', color: '#c9d1d9', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{color: '#fff', fontSize: 48, margin: 0}}>404</h1>
          <p>Sahifa topilmadi.</p>
          <a href="/uz" style={{color: '#c4b5fd'}}>Bosh sahifaga qaytish</a>
        </div>
      </body>
    </html>
  );
}
