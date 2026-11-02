export const seedProfile = {
  name: "Arjun Karlapati",
  initials: "AK",
  headline: "Full Stack MERN Developer",
  tagline: "Turning ideas into production-ready software",
  statusBadge: "B.Tech Computer Science and Engineering",
  email: "karlapatiarjun@gmail.com",
  phone: "+91 99896 68210",
  showPhone: true,
  location: "Hyderabad, India",
  photoUrl: "/images/arjun.jpg",
  resumeUrl: "/resume.pdf",
  aboutParagraphs: [
    "I'm a passionate Computer Science undergraduate at Anurag University, with a strong foundation in Data Structures & Algorithms, Object-Oriented Programming, and Software Development. I enjoy exploring emerging technologies and transforming real-world challenges into scalable, secure, and user-friendly applications.",
    "My expertise lies in full-stack development, where I work with the MERN stack to build end-to-end applications, from designing efficient RESTful APIs and database architectures to developing responsive and intuitive user interfaces.",
    "I've developed and deployed impactful projects, including an Alumni Networking Platform with an AI-powered Career Mentor and an Animal Rescue Coordination System. Beyond web development, I've gained hands-on experience in Artificial Intelligence and Deep Learning, working with architectures such as CNNs, LSTMs, RNNs, GRUs, Encoder-Decoder models, and GANs.",
    "With 200+ LeetCode problems solved, I continuously strengthen my algorithmic thinking and problem-solving abilities. I'm driven by curiosity, continuous learning, and a commitment to writing clean, efficient, and maintainable code."
  ],
  highlightPhrases: [
    "Data Structures & Algorithms",
    "MERN stack",
    "RESTful APIs",
    "Artificial Intelligence and Deep Learning",
    "CNNs, LSTMs, RNNs, GRUs, Encoder-Decoder models, and GANs",
    "200+ LeetCode problems",
    "clean, efficient, and maintainable code"
  ],
  education: [
    {
      institution: "Anurag University",
      degree: "B.Tech in Computer Science and Engineering",
      startYear: "2023",
      endYear: "2027",
      grade: "8.68 / 10 CGPA"
    }
  ],
  stats: [
    { label: "Projects Built", value: 5 },
    { label: "Certifications", value: 6 },
    { label: "DSA Problems Solved", value: 200 }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/arjun1228" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/arjunkarlapati1228/" }
  ],
  contactIntro: "I'm open to software engineering internships, freelance projects, and collaborations. Whether you have an opportunity in mind or just want to talk tech, my inbox is always open.",
  seo: {
    title: "Arjun Karlapati | Full Stack MERN Developer",
    description: "Portfolio of Arjun Karlapati, a Computer Science undergraduate and full-stack MERN developer building secure, scalable web applications with React, Node.js, Express and MongoDB.",
    ogImage: "/images/arjun.jpg"
  }
};

export const seedExperiences = [
  {
    role: "TechHack 4 Hackathon — Runner-Up",
    company: "ISTE",
    partner: "",
    type: "Hackathon",
    startDate: "2025",
    endDate: "2025",
    current: false,
    bullets: [
      "Collaborated in a time-boxed team sprint to design and ship the AlumniConnect Portal, dividing frontend and backend ownership across the team.",
      "Owned authentication and real-time messaging flows, conducting peer code reviews and joint debugging to deliver a stable, demo-ready product.",
      "Placed runner-up among competing teams at ISTE's TechHack 4 hackathon."
    ],
    logoUrl: "",
    order: 1
  },
  {
    role: "Visionova Hackathon — 3rd Prize",
    company: "CSI Chapter",
    partner: "",
    type: "Hackathon",
    startDate: "2025",
    endDate: "2025",
    current: false,
    bullets: [
      "Designed and built a Learning Management System with course management, assignment tracking, and role-specific dashboards for admins, teachers, and students.",
      "Integrated an embedded LLM-powered assistant to answer curriculum queries and support learning workflows.",
      "Awarded 3rd prize at the CSI Chapter Visionova Hackathon."
    ],
    logoUrl: "",
    order: 2
  },
  {
    role: "200+ LeetCode Problems Solved",
    company: "LeetCode",
    partner: "",
    type: "Achievement",
    startDate: "2024",
    endDate: "Present",
    current: true,
    bullets: [
      "Solved 200+ problems spanning arrays, strings, trees, graphs, recursion, and dynamic programming.",
      "Strengthened algorithmic thinking and complexity analysis through consistent daily practice."
    ],
    logoUrl: "",
    order: 3
  }
];

export const seedProjects = [
  {
    title: "AlumniConnect Portal",
    slug: "alumniconnect-portal",
    featured: true,
    badge: "TechHack 4 Runner-Up",
    category: "Full Stack",
    description: "Full-stack MERN alumni–student networking platform with dedicated Student, Alumni, and Admin roles — built for mentorship, referrals, and career opportunities.",
    highlights: [
      "Architected strict role-based access across Student, Alumni, and Admin, with JWT (HTTP-only cookies) and Google OAuth 2.0 authentication.",
      "Built real-time direct messaging with Cloudinary file/resume attachments and a community feed with likes, comments, and admin moderation.",
      "Engineered an AI Career Mentor powered by Llama 3.3 70B on Groq for resume analysis, mock interview coaching, and skill-gap roadmaps.",
      "Shipped end-to-end job listing and application workflows with resume uploads and application status tracking."
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "REST API", "Google OAuth", "Groq", "Cloudinary"],
    githubUrl: "https://github.com/arjun1228/Alumni-Interaction-Portal",
    liveUrl: "https://alumni-interaction-portal-hazel.vercel.app/",
    imageUrl: "/images/projects/alumniconnect.jpg",
    order: 1
  },
  {
    title: "Animal Rescue Network",
    slug: "animal-rescue-network",
    featured: true,
    badge: "Deployed · Civic Tech",
    category: "Full Stack",
    description: "Civic rescue coordination platform connecting citizens, field volunteers, and administrators — with crowdfunding, rescue tracking, and proof-of-completion workflows.",
    highlights: [
      "Designed the end-to-end architecture for three independent role workflows spanning citizens, volunteers, and administrators.",
      "Built a self-governing crowdfunding module where campaigns auto-seal at their target, spam donations are subtracted, and Recharts analytics track goal progress.",
      "Deployed a stateless media pipeline pushing multi-image uploads through Multer into Cloudinary, with no server-side disk dependency.",
      "Hardened every API route with JWT in HttpOnly cookies, bcrypt, schema validation, strict CORS whitelisting, and rate limiting."
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "REST API", "Cloudinary", "Recharts", "Vercel"],
    githubUrl: "https://github.com/arjun1228/Animal_Rescue_Network",
    liveUrl: "https://animal-rescue-network-tau.vercel.app/",
    imageUrl: "/images/projects/animal-rescue.jpg",
    order: 2
  },
  {
    title: "EduLearn — AI Learning Management System",
    slug: "edulearn-lms",
    featured: true,
    badge: "Visionova 3rd Prize",
    category: "AI/ML",
    description: "Multi-role learning management system for admins, teachers, and students, with an AI assistant that reads uploaded course material and answers curriculum questions.",
    highlights: [
      "Built three fully isolated role experiences with dedicated dashboards, protected routes, and component-level access control.",
      "Integrated a role-aware AI assistant that ingests PDF, Word, Excel, CSV, and PowerPoint uploads to answer queries and assist with SQL reporting.",
      "Implemented the full course lifecycle: assignment builder, AI-assisted grading with rubric feedback, and plagiarism detection."
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "REST API", "LLM", "Vercel"],
    githubUrl: "https://github.com/CognicAI/EduLearn",
    liveUrl: "",
    order: 3
  },
  {
    title: "CourseLine — Course & Skill Route Planner",
    slug: "courseline-route-planner",
    featured: true,
    badge: "MERN Group Project",
    category: "Full Stack",
    description: "Graph-backed curriculum route planner that treats courses as stations and prerequisites as lines — trace a prerequisite chain back to day one, find the shortest route between two courses, and see which skills a path unlocks.",
    highlights: [
      "Modeled courses, departments, skills, and professors as a property graph with self-referential REQUIRES and BUILDS_ON relationships.",
      "Used variable-length Cypher traversals and shortestPath() to answer multi-hop prerequisite, course-relationship, and skill-gap queries.",
      "Seeded 23 courses, 18 skills, and 8 professors across 3 departments, including cross-department prerequisite chains."
    ],
    tech: ["React", "Node.js", "Express", "CognoDB", "Neo4j", "Cypher", "Vite", "REST API"],
    githubUrl: "https://github.com/arjun1228/CourseLine",
    liveUrl: "https://course-line.vercel.app/",
    imageUrl: "/images/projects/courseline.jpg",
    order: 4
  },
  {
    title: "Orbit — Real-Time Social Media Platform",
    slug: "orbit-social-platform",
    featured: true,
    badge: "MERN Group Project",
    category: "Full Stack",
    description: "MERN social media ecosystem with live notifications, AI-assisted post enhancement, and persistent bookmarks — built collaboratively by a five-person team.",
    highlights: [
      "Delivered real-time likes, comments, and follow notifications with Socket.io, so the feed updates without a refresh.",
      "Integrated Groq (Llama 3.3) to refine the phrasing, clarity, and readability of posts before publishing.",
      "Built persistent bookmarking with Zustand persistence plus MongoDB sync, and Cloudinary-backed image uploads.",
      "Designed For You and Following feeds with deep-linkable post routes and threaded comments."
    ],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "Zustand", "Tailwind CSS", "JWT", "Cloudinary", "Groq"],
    githubUrl: "https://github.com/sunilravulapati/Orbit",
    liveUrl: "https://orbit-eosin-kappa.vercel.app/",
    imageUrl: "/images/projects/orbit.jpg",
    order: 5
  }
];

export const seedSkills = [
  {
    category: "Languages",
    order: 1,
    items: [
      { name: "Python", iconKey: "SiPython" },
      { name: "Java", iconKey: "SiOpenjdk" },
      { name: "JavaScript", iconKey: "SiJavascript" },
      { name: "C", iconKey: "SiC" }
    ]
  },
  {
    category: "Frontend",
    order: 2,
    items: [
      { name: "React.js", iconKey: "SiReact" },
      { name: "HTML", iconKey: "SiHtml5" },
      { name: "CSS", iconKey: "SiCss3" },
      { name: "Tailwind CSS", iconKey: "SiTailwindcss" },
      { name: "Responsive Web Pages", iconKey: "TbDeviceMobile" }
    ]
  },
  {
    category: "Backend & Databases",
    order: 3,
    items: [
      { name: "Node.js", iconKey: "SiNodedotjs" },
      { name: "Express.js", iconKey: "SiExpress" },
      { name: "MongoDB", iconKey: "SiMongodb" },
      { name: "MySQL", iconKey: "SiMysql" },
      { name: "REST APIs", iconKey: "TbApi" },
      { name: "JWT Auth", iconKey: "SiJsonwebtokens" }
    ]
  },
  {
    category: "Tools & Concepts",
    order: 4,
    items: [
      { name: "GitHub", iconKey: "SiGithub" },
      { name: "Postman", iconKey: "SiPostman" },
      { name: "VS Code", iconKey: "FiCode" },
      { name: "Vercel", iconKey: "SiVercel" },
      { name: "Render", iconKey: "SiRender" },
      { name: "Cloudinary", iconKey: "SiCloudinary" }
    ]
  },
  {
    category: "Core CS",
    order: 5,
    items: [
      { name: "Data Structures and Algorithms", iconKey: "TbBinaryTree" },
      { name: "Object Oriented Programming", iconKey: "TbCode" },
      { name: "Authentication", iconKey: "SiJsonwebtokens" },
      { name: "Convolutional Neural Networks (CNN)", iconKey: "TbBrain" },
      { name: "Long Short Term Memory (LSTM)", iconKey: "TbBrain" },
      { name: "Generative Adversarial Network (GAN)", iconKey: "TbBrain" },
      { name: "Operating Systems", iconKey: "TbCpu" }
    ]
  }
];

export const seedCertifications = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (2026)",
    type: "certification",
    credentialUrl: "https://aws.amazon.com/training/",
    order: 1
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic (2026)",
    type: "certification",
    credentialUrl: "https://www.anthropic.com/learn",
    order: 2
  },
  {
    title: "Introduction to Database Systems",
    issuer: "NPTEL · IIT Madras (2025)",
    type: "certification",
    credentialUrl: "https://nptel.ac.in/",
    order: 3
  },
  {
    title: "JavaScript Essentials",
    issuer: "Cisco Networking Academy (2025)",
    type: "certification",
    credentialUrl: "https://www.netacad.com/",
    order: 4
  },
  {
    title: "Oracle AI Foundations Associate",
    issuer: "Oracle (2025)",
    type: "certification",
    credentialUrl: "https://education.oracle.com/",
    order: 5
  },
  {
    title: "Learn AI and GenAI Basics",
    issuer: "Microsoft (2025)",
    type: "certification",
    credentialUrl: "https://learn.microsoft.com/training/",
    order: 6
  }
];
