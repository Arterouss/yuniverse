import { SkillItem, TimelineEvent } from "@/types";

export const SKILLS_DATA: SkillItem[] = [
  // Frontend (2 items)
  {
    name: "Next.js 16 & React App Router",
    level: 96,
    category: "Frontend",
    iconName: "Globe",
    highlight: "Server Actions, React Server Components & Turbopack optimization"
  },
  {
    name: "Tailwind CSS v4 & Glassmorphism",
    level: 98,
    category: "Frontend",
    iconName: "Palette",
    highlight: "Custom design tokens, 3D shadows & responsive UI/UX architecture"
  },
  // Backend (2 items)
  {
    name: "Node.js, Express & REST APIs",
    level: 92,
    category: "Backend",
    iconName: "Server",
    highlight: "High-throughput RESTful microservices & clean backend routing"
  },
  {
    name: "PHP & Laravel Framework",
    level: 82,
    category: "Backend",
    iconName: "Code2",
    highlight: "MVC architecture, Eloquent ORM, Blade templating & robust APIs"
  },
  // Database & Storage (2 items)
  {
    name: "Firebase Cloud Firestore & Storage",
    level: 96,
    category: "Database & Storage",
    iconName: "Database",
    highlight: "Real-time subscriptions, complex queries & strict security rules"
  },
  {
    name: "PostgreSQL & Supabase / SQL",
    level: 90,
    category: "Database & Storage",
    iconName: "HardDrive",
    highlight: "Relational modeling, indexing & optimized database schemas"
  },
  // DevOps & Tools (1 item)
  {
    name: "Git, GitHub & CI/CD Pipelines",
    level: 95,
    category: "DevOps & Tools",
    iconName: "GitBranch",
    highlight: "Version control, automated testing, Vercel edge deployment & code reviews"
  },
  // Web Architecture (1 item)
  {
    name: "Web Architecture & State Management",
    level: 94,
    category: "Web Architecture",
    iconName: "Layers",
    highlight: "Scalable cloud design, reactive stores (Zustand) & serverless edge compute"
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2026",
    role: "Full Stack Web Developer Intern",
    company: "Yota Adiwidya Center",
    description: "Architected and engineered an interactive E-Learning management platform utilizing the PHP Laravel Framework. Implemented clean MVC structure, Eloquent ORM relationships, Blade templating, and secure user authentication workflows for seamless digital course delivery.",
    technologies: ["PHP", "Laravel Framework", "MySQL", "MVC Architecture", "Blade Templating", "Tailwind CSS"],
    highlight: "Engineered an intuitive, high-performance E-Learning platform designed to streamline digital education and student engagement."
  },
  {
    year: "2023 — Present",
    role: "Informatics Engineering Undergraduate (S1 Teknik Informatika)",
    company: "UNIBI (Universitas Informatika dan Bisnis Indonesia)",
    description: "Pursuing a Bachelor's Degree in Informatics Engineering with deep focus on Web Development, Software Engineering, Algorithms, Database Systems, and Systems Architecture. Actively translating core computer science fundamentals into modern, real-world full-stack web applications.",
    technologies: ["Computer Science", "Algorithms", "Database Design", "Object-Oriented Programming", "Web Architecture"],
    highlight: "Building solid theoretical foundations while consistently deploying hands-on web projects and cloud integrations."
  },
  {
    year: "Coming Soon",
    role: "AI Engineer & Web Intelligence Exploration",
    company: "Self-Directed AI & Machine Learning Mastery",
    description: "Actively expanding technical horizons into AI Engineering. Learning Large Language Model (LLM) integrations, Retrieval-Augmented Generation (RAG), and smart agentic workflows to seamlessly merge Artificial Intelligence with high-performance Full Stack Web Applications.",
    technologies: ["AI Engineering", "LLM Integration", "Python", "RAG Architecture", "AI-Powered Web Apps"],
    highlight: "Preparing to build intelligent, generative AI solutions and autonomous web agents — Coming Soon."
  },
  {
    year: "Coming Soon",
    role: "Next Technical Milestone & Leadership",
    company: "Future Enterprise & Tech Innovation",
    description: "Continuously evolving across systems architecture, serverless cloud platforms, and full-stack engineering excellence. Ready to take on high-impact engineering opportunities and contribute to world-class software teams.",
    technologies: ["Cloud Systems", "Software Architecture", "Continuous Learning", "Future Innovation"],
    highlight: "Open to collaborative engineering roles, pioneering tech ventures, and innovative freelance projects."
  }
];

export const BIO_PHILOSOPHY = {
  headline: "Crafting Digital Dimensions Where Art Meets Engineering",
  bio: "Hello, I am Yuu — a passionate Senior Full Stack Web Developer dedicated to building high-velocity, visually stunning web applications that deliver exceptional user experiences. With over 4 years of deep technical immersion across modern JavaScript ecosystems, cloud architecture, and frontend systems, I transform complex requirements into fast, intuitive, and highly scalable web platforms.",
  philosophy: [
    {
      title: "Zero-Compromise Aesthetics & Performance",
      description: "A visually mesmerizing 3D interface should never sacrifice speed. Every animation, glassmorphism blur, and parallax float is meticulously engineered using GPU-accelerated transforms, Framer Motion, and GSAP to guarantee a flawless 60+ FPS and 100% Lighthouse rating."
    },
    {
      title: "Type-Safe & Scalable Architecture",
      description: "From database schemas in Cloud Firestore to server actions in Next.js 16, rigorous end-to-end type safety with TypeScript and Zod ensures rock-solid reliability, zero runtime surprises, and clean maintainability."
    },
    {
      title: "User-Centric Cosmic Experience",
      description: "Great software feels alive. By incorporating subtle micro-interactions, responsive 3D depth, and sky-blue glowing accents, every click and scroll invites the user to explore further within the digital universe."
    }
  ]
};
