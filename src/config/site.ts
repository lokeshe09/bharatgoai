// Verified facts only. Unknown values stay here and are omitted from public metadata.
export const placeholders = {
  legalName: '[PLACEHOLDER: registered legal name]',
  linkedin: '[PLACEHOLDER: LinkedIn profile URL]',
  founderImage: '[PLACEHOLDER: approved founder photograph URL]',
  googleVerification: '[PLACEHOLDER: Google Search Console verification code]',
  bingVerification: '[PLACEHOLDER: Bing Webmaster verification code]',
  analyticsScript: '[PLACEHOLDER: HTTPS Umami script URL]',
  analyticsWebsiteId: '[PLACEHOLDER: Umami website ID]',
  datePublished: '[PLACEHOLDER: verified original publication date for each page]',
  researchArticles: '[PLACEHOLDER: authored research write-ups, dates and matching artifacts]',
};
export const site = {
  name: 'BharatGoAI',
  origin: 'https://bharatgoai.com',
  language: 'en-IN',
  locale: 'en_IN',
  email: 'info@bharatgoai.com',
  founded: 'November 2025',
  foundingDate: '2025-11',
  contentUpdated: '2026-10-07',
  founder: { name: 'Lokesh E', jobTitle: 'Founder & AI/ML Engineer', image: placeholders.founderImage },
  address: { streetAddress: 'Malkajgiri', addressLocality: 'Hyderabad', addressRegion: 'Telangana', postalCode: '500047', addressCountry: 'IN' },
  location: 'Hyderabad, India',
  addressText: 'Malkajgiri, Hyderabad, Telangana, India — 500047',
  profiles: { huggingface: 'https://huggingface.co/lokeshe09', github: 'https://github.com/lokeshe09', linkedin: placeholders.linkedin },
  legalName: placeholders.legalName,
  description: 'BharatGoAI builds India-focused multimodal language models, with work in vision-language fine-tuning, quantization and efficient deployment.',
  focus: ['India-focused multimodal LLMs', 'Vision-language fine-tuning (LoRA, GRPO/GSPO)', 'Quantization (INT8, FP8, W4A16, NVFP4)', 'Efficient serving with vLLM'],
  knowsAbout: ['Large language models', 'Multimodal AI', 'Model quantization', 'vLLM', 'Vision-language models'],
  colors: { light: '#faf9f5', dark: '#24352c' },
  logo: '/brand/wordmark.png',
  analytics: { enabled: false, script: placeholders.analyticsScript, websiteId: placeholders.analyticsWebsiteId },
  verification: { google: placeholders.googleVerification, bing: placeholders.bingVerification },
};
export const isProvided = (value: string) => Boolean(value?.trim()) && !value.includes('[PLACEHOLDER');
export const absoluteUrl = (path: string) => new URL(path, site.origin).href;
export const profileUrls = Object.values(site.profiles).filter(isProvided);
export const indexRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const company = { name: site.name, email: site.email, address: site.addressText, founded: site.founded, huggingface: site.profiles.huggingface, github: site.profiles.github };

export type PageMeta = { title: string; description: string; heading: string; label: string; type: string; image: string; datePublished?: string; dateModified: string };
const page = (meta: Omit<PageMeta, 'dateModified'>): PageMeta => ({ ...meta, dateModified: site.contentUpdated });
export const pageMeta: Record<string, PageMeta> = {
  '/': page({ title: 'BharatGoAI — India-Focused Multimodal AI & Language Models', description: 'BharatGoAI builds India-focused multimodal language models in Hyderabad, combining vision-language fine-tuning, model quantization and efficient vLLM serving.', heading: 'Intelligence, rooted in India.', label: 'Home', type: 'WebPage', image: '/og/home.png' }),
  '/about': page({ title: 'About BharatGoAI — Lokesh E & India-Focused AI Research', description: 'Meet BharatGoAI and founder Lokesh E, Founder & AI/ML Engineer in Hyderabad, working on India-focused multimodal models, quantization and efficient serving.', heading: 'An Indian perspective. A builder’s mindset.', label: 'About us', type: 'AboutPage', image: '/og/about.png' }),
  '/products': page({ title: 'Our Work — Multimodal LLMs & AI/ML Projects | BharatGoAI', description: 'Explore BharatGoAI’s India-focused multimodal language models, vision-language fine-tuning, model quantization and efficient deployment with vLLM serving.', heading: 'From model to meaningful application.', label: 'Our work', type: 'CollectionPage', image: '/og/products.png' }),
  '/research': page({ title: 'AI Research — Multimodal Models & vLLM | BharatGoAI', description: 'Explore BharatGoAI’s research focus on vision-language adaptation, Indian-context evaluation, model quantization and efficient deployment through vLLM serving.', heading: 'Good AI starts with better questions.', label: 'Research', type: 'CollectionPage', image: '/og/research.png' }),
  '/contact': page({ title: 'Contact BharatGoAI — AI Projects & Research in India', description: 'Contact BharatGoAI in Malkajgiri, Hyderabad for multimodal AI projects, quantization and research collaboration. Email info@bharatgoai.com to discuss your work.', heading: 'Let’s build something meaningful.', label: 'Contact', type: 'ContactPage', image: '/og/contact.png' }),
  '/privacy': page({ title: 'Privacy Policy — Website & Email Enquiries | BharatGoAI', description: 'Read how the BharatGoAI website handles contact enquiries, optional analytics consent and external links, and find our email for privacy-related questions.', heading: 'Privacy, in plain language.', label: 'Privacy', type: 'WebPage', image: '/og/privacy.png' }),
  '/terms': page({ title: 'Terms of Use — Website & Project Information | BharatGoAI', description: 'Read the terms for using BharatGoAI’s website, including project information, external model links, acceptable use and how to contact us with your questions.', heading: 'A few shared ground rules.', label: 'Terms', type: 'WebPage', image: '/og/terms.png' }),
};
export const routes = Object.keys(pageMeta);
export const notFoundMeta: PageMeta = { title: 'Page not found | BharatGoAI', description: 'This page is not available. Explore BharatGoAI’s multimodal AI work, research or contact the team in Hyderabad.', heading: 'This page is off the map.', label: 'Page not found', type: 'WebPage', image: '/og/home.png', dateModified: site.contentUpdated };

export const flagship = {
  title: 'India-focused multimodal LLM',
  status: 'In development',
  description: 'Our core focus is building a multimodal (vision + language) LLM adapted for Indian-context use: handwritten and printed document understanding, Indian-language text, and practical deployment on accessible hardware. We build on open foundation models (Gemma-4 and Qwen3 MoE families) and focus on fine-tuning, reinforcement-learning-based adaptation, quantization and serving.',
  areas: [
    'Vision-language fine-tuning (LoRA, GRPO/GSPO-based training)',
    'Indian-context data and evaluation',
    'Efficient quantization for low-cost deployment',
    'Production serving with vLLM',
  ],
};
export const projects = [
  { id: 'handwritten-exam-ocr', title: 'Handwritten exam OCR', status: 'Research', color: 'warm', schemaType: 'CreativeWork', description: 'Vision-language model fine-tuned with GRPO on Gemma-4 to extract structured fields (roll number, page number, question number, content) from handwritten exam sheets.', href: 'https://huggingface.co/datasets/lokeshe09/LaTeX_OCRR' },
  { id: 'quantization', title: 'Qwen3.6-35B-A3B INT8', status: 'Released', color: 'sage', schemaType: 'SoftwareApplication', description: 'INT8-quantized Mixture-of-Experts model prepared for efficient vLLM serving.', href: 'https://huggingface.co/lokeshe09/Qwen3.6-35B-A3B-INT8' },
  { id: 'gemma-4-quantization', title: 'Gemma-4 quantization suite', status: 'Released', color: 'lavender', schemaType: 'CreativeWork', description: 'FP8, W4A16 and NVFP4 quantized variants of Gemma-4 MoE models using llmcompressor.', href: site.profiles.huggingface },
  { id: 'applied-ai', title: 'Efficient serving with vLLM', status: 'Ongoing', color: 'sage', schemaType: 'CreativeWork', description: 'Deployment recipes for quantized models on A100 and L40S GPUs, including cross-GPU accuracy comparison.' },
];
export const faqs = [
  { question: 'Who is BharatGoAI?', answer: 'BharatGoAI is an India-focused AI company founded in November 2025 in Hyderabad by Lokesh E, Founder & AI/ML Engineer.' },
  { question: 'What does BharatGoAI build?', answer: 'We build and adapt multimodal language models for Indian-context use, including vision-language fine-tuning, model quantization and efficient serving with vLLM.' },
  { question: 'What stage is the work at?', answer: 'Our India-focused multimodal LLM is in development. Handwritten exam OCR is research, the listed Qwen and Gemma quantization projects are released, and vLLM serving work is ongoing. See individual project pages for details.' },
  { question: 'How can I collaborate with BharatGoAI?', answer: 'Email info@bharatgoai.com to discuss a research question or AI/ML project. You can explore Lokesh E’s models and datasets on Hugging Face and code on GitHub.' },
  { question: 'Where is BharatGoAI based?', answer: 'BharatGoAI is based in Malkajgiri, Hyderabad, Telangana, India, postal code 500047.' },
];
// No invented research publications. Add reviewed content and verified dates together.
export type ResearchArticle = { slug: string; headline: string; summary: string; body: string[]; datePublished: string; dateModified: string; artifact: string };
export const researchArticles: ResearchArticle[] = [];
