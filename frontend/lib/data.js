export const profile = {
  name: "Debashis Paul",
  role: "Full-Stack & AI Developer",
  location: "Halisahar, West Bengal",
  summary:
    "Final-year B.Tech IT student (CGPA 7.97) with strong CS fundamentals, a filed patent and a Springer-published paper. I build full-stack apps and ML systems, and I enjoy debugging APIs, databases and deployments down to the root cause, then documenting the fix clearly.",
  links: {
    email: "debashispaul908@gmail.com",
    github: "https://github.com/debashis1312",
    linkedin: "https://www.linkedin.com/in/debashis-paul-990201257/",
  },
  skills: {
    Languages: ["Python", "JavaScript (ES6+)", "C++", "C", "HTML", "CSS"],
    Frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "FastAPI"],
    "Web & Troubleshooting": ["REST APIs", "HTTP/HTTPS", "DNS", "API Debugging", "Root-Cause Analysis"],
    "Databases & Cloud": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ChromaDB", "AWS", "Docker"],
    "AI / ML": ["LLM Integration (Llama 3, Groq)", "OpenCV", "LangChain", "XGBoost", "Git"],
  },
  experience: [
    {
      title: "Software Development Engineer Intern",
      org: "Blue Stock Fintech",
      when: "Jun 2025 – Jul 2025",
      stack: "Django · React.js · Node.js · Redis · REST APIs · Agile",
      points: [
        "Built a full-stack crypto stock tracker with real-time market data from third-party REST APIs; fixed integration failures and sped up responses with Redis caching.",
        "Documented root causes, fixes and reusable backend modules; worked in Agile sprints and code reviews with senior engineers.",
      ],
    },
  ],
  projects: [
    {
      name: "ThirdEye",
      tag: "AI Driver Drowsiness Detection",
      badge: "Springer SSWC 2025 · Patent Filed",
      stack: "Python · OpenCV · Eye Aspect Ratio",
      text: "Real-time drowsiness detection using EAR analysis, hardened against edge-case failures across lighting conditions.",
      links: [
        ["Paper", "https://link.springer.com/chapter/10.1007/978-3-032-21164-4_48"],
        ["Patent", "https://drive.google.com/file/d/1oXraNi-w2PArkUchc0bSaNoadwIuoj3e/view?usp=sharing"],
        ["GitHub", "https://github.com/debashis1312/Thirdeye_new"],
      ],
    },
    {
      name: "Vakil.ai",
      tag: "AI Legal Document Analysis",
      badge: "Final Year Project",
      stack: "Next.js 15 · FastAPI · LangChain · Llama 3 (Groq) · ChromaDB · PostgreSQL",
      text: "Privacy-first ephemeral RAG pipeline with ChromaDB; led the Next.js frontend and the LLM ingestion pipeline.",
      links: [["GitHub", "https://github.com/debashis1312"]],
    },
    {
      name: "WildGuard AI",
      tag: "Wildlife Conservation Intelligence",
      badge: "Personal Project",
      stack: "Python · Streamlit · XGBoost · Scikit-learn · MongoDB · Groq",
      text: "Classifies species extinction risk, forecasts populations and maps poaching hotspots with a PyDeck geospatial radar.",
      links: [
        ["Live Demo", "https://wildguard-ai-fhmsq2cu5hxwffuz8unmuy.streamlit.app/"],
        ["GitHub", "https://github.com/AC-GIT-REP/wildware-ai"],
      ],
    },
  ],
  achievements: [
    "Patent filed: ThirdEye — AI-Based Road Safety System",
    "Co-authored Springer paper “ThirdEye” (SSWC 2025)",
    "“MelanoCalib” (Swin Transformer skin disorder classification) submitted to IEEE CIACON 2026",
    "Winner, FOSET Tech Competition 2024 — led a 5-member team",
    "2nd Runner-Up, JIStech Fest 2023",
  ],
  education: "B.Tech Information Technology · JIS College of Engineering, Kalyani · 2022 – 2026",
};
