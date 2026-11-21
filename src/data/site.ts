export const links = {
  telegram: 'https://t.me/ssamariddinovv',
  telegramHandle: '@ssamariddinovv',
  github: 'https://github.com/Sarvar5202',
  githubHandle: 'Sarvar5202',
  linkedin: 'https://www.linkedin.com/in/sarvarbek-samariddinov/',
  linkedinHandle: 'sarvarbek-samariddinov',
  phone: 'tel:+998884647999',
  phoneLabel: '+998 88 464 79 99',
  mapOpen: 'https://yandex.com/maps/?ll=69.2401,41.2995&z=12',
  mapEmbed: 'https://yandex.com/map-widget/v1/?ll=69.2401%2C41.2995&z=12',
  projectGithub: 'https://github.com/Sarvar5202/exam7',
  projectDemo: 'https://crm-exam-lemon.vercel.app/login',
} as const;

export const stats = [
  {value: 25, key: 'completedProjects'},
  {value: 18, key: 'technologies'},
  {value: 3, key: 'yearsExperience'},
  {value: 15, key: 'happyClients'},
] as const;

export const frontendSkills = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit',
  'Zustand', 'React Query', 'Three.js', 'GSAP', 'Framer Motion', 'Responsive UI', 'SEO', 'Performance',
];

export const fullStackSkills = [
  'Node.js', 'Express.js', 'REST API', 'PostgreSQL', 'Supabase', 'Firebase', 'Git', 'GitHub',
];

export const aiSkills = [
  {name: 'ChatGPT (OpenAI)', desc: 'GPT-4o, O1, Advanced Canvas'},
  {name: 'Claude (Anthropic)', desc: 'Claude 3.5 Sonnet, Artifacts'},
  {name: 'Google Gemini', desc: 'Gemini 1.5 Pro, 2M Context'},
  {name: 'xAI Grok', desc: 'Grok 2, Realtime Search'},
  {name: 'Cursor AI & Copilot', desc: 'AI Codebase Indexing'},
  {name: 'v0 & Lovable', desc: 'Generative UI Engineering'},
  {name: 'DeepSeek AI', desc: 'DeepSeek-V3 & R1 Logic'},
  {name: 'Prompt Engineering', desc: 'System Prompts, Few-Shot, CoT'},
  {name: 'LangChain & Agents', desc: 'Agentic Tooling & Chains'},
  {name: 'RAG & Vector Search', desc: 'Pinecone, Chroma, Embeddings'},
  {name: 'Midjourney & Flux', desc: 'AI Graphics & Mockups'},
  {name: 'Function Calling', desc: 'API Tools & Structured JSON'},
];

export const jobs = [
  {id: 'job1', type: 'fullTime', tags: ['Next.js', 'TypeScript', 'Three.js', 'GSAP']},
  {id: 'job2', type: 'contract', tags: ['React', 'Redux Toolkit', 'REST API', 'Tailwind CSS']},
  {id: 'job3', type: 'freelance', tags: ['Node.js', 'Supabase', 'PostgreSQL', 'Firebase']},
] as const;

export const projectTags = ['React', 'JavaScript', 'Tailwind CSS', 'REST API'];
