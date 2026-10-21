/*
 * ====================================================
 *  網站內容：只需要修改這個檔案
 * ====================================================
 *
 *  PROFILE     個人資料、頂部介紹、About、聯絡方式
 *  education   學歷
 *  experience  工作經驗
 *  projects    作品（featured: true 的會放在「Main projects」大卡片）
 *
 *  小提示
 *  - 新增作品：複製 projects 裡的一個 { ... } 區塊，改成你的資料。
 *  - 封面照片：放進 images/ 資料夾，cover 填 "images/檔名.jpg"（建議 1600 x 1000）。
 *  - 不需要的欄位（例如沒有 GitHub）填 "" 留空，對應的按鈕會自動隱藏。
 *  - 連結只接受 https://、mailto: 或 tel:，其他格式會被自動隱藏（安全考量）。
 *  - 改完之後打開網站，按 F12 → Console，如果資料有問題會在那裡看到提示。
 */

const PROFILE = {
  /* ---------- 基本資料 ---------- */
  name: "Chin Zhen Ho",
  shortName: "Zhen Ho",                // About 打招呼用：「Hi, I'm Zhen Ho.」
  photo: "",                           // 個人照片，例如 "images/me.jpg"（留空就不顯示）

  /* ---------- 頂部介紹（Hero）---------- */
  availability: "Open to graduate software engineering roles",   // 綠色狀態標籤
  role: "Computer Science (Software Engineering) · Multimedia University",
  headline: "Graduate Software Engineer building practical, reliable applications.",
  intro:
    "I build full-stack web apps, from the first idea to a live website. My projects include CommentInsight, a web app that uses machine learning to analyse social media comments; EatHealthee, an AI-powered web app that estimates calories from a meal photo; and Joinlist, an event registration website that prevents overbooking.",
  heroProof: [                         // 標題下面的三個數字（保持精簡）
    { value: "3.74", label: "CGPA" },
    { value: "A", label: "Final Year Project grade" },
    { value: "3", label: "Live applications" },
  ],

  /* ---------- About ---------- */
  about:
    "I'm completing my Computer Science (Software Engineering) degree at Multimedia University, graduating in October 2026. I like building software that solves real problems and testing it properly before it goes live. For my final year project I built CommentInsight, a machine learning web app, and in my own time I built EatHealthee, an AI-powered web app, and Joinlist, an event registration website. I also completed a 3-month IT internship, where I automated IT tasks and gave daily IT support.\n\nI'm looking for a graduate software engineering job where I can work on real products and keep learning from experienced developers.",
  principles: [                        // 三張卡片，每一項都要有作品作證據
    { title: "Testing is part of the build", text: "I write automated tests alongside the code: 103 automated tests for EatHealthee, 46 unit tests for CommentInsight, and 30 backend tests for Joinlist, including seat-booking race tests, run against a real PostgreSQL database." },
    { title: "Deployed, not just developed", text: "CommentInsight, EatHealthee and Joinlist are deployed and publicly accessible. Joinlist uses continuous integration with GitHub Actions, and EatHealthee deploys continuously from GitHub." },
    { title: "Automating repetitive work", text: "During my internship, I automated routine IT tasks with Batch and VBScript, including server health checks with HTML reports, remote PC restarts and scheduled file transfers." },
  ],
  skills: [
    { label: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "HTML", "CSS"] },
    { label: "Frameworks", items: ["React", "Spring Boot", "Flask", "Tailwind CSS"] },
    { label: "Machine Learning", items: ["scikit-learn", "PyTorch", "TensorFlow / Keras"] },
    { label: "Databases", items: ["PostgreSQL", "MySQL", "IBM DB2", "Firebase", "Supabase", "SQLite"] },
    { label: "Tools", items: ["Git", "GitHub Actions", "Docker", "Cloudflare"] },
    { label: "Soft Skills", items: ["Teamwork", "Time Management", "Leadership", "Effective Communication"] },
  ],
  languages: ["English", "Bahasa Malaysia", "Mandarin", "Cantonese"],

  /* ---------- 聯絡區 ---------- */
  contactText:
    "I'm looking for a graduate software engineering job. If you're hiring or want to talk about my projects, feel free to contact me.",
  replyTime: "",                       // 例如 "I usually reply within 24 hours."（做得到才寫）
  location: "",                        // 例如 "Kuala Lumpur, Malaysia"（可留空）
  email: "zhenho2004@gmail.com",
  phone: "+60182067278",               // WhatsApp 用，國際格式、不要空格
  phoneDisplay: "+60 18-206 7278",     // 網站上顯示的樣子
  github: "https://github.com/chinzhenho",
  linkedin: "",                        // 例如 "https://www.linkedin.com/in/你的名字"
  resume: "",                          // 履歷 PDF，例如 "resume.pdf"（放在網站資料夾裡）
};

const education = [
  {
    school: "Multimedia University",
    degree: "Bachelor of Computer Science (Honours) (Software Engineering)",
    period: "2023 – 2026",
    detail: "CGPA 3.74 / 4.0 · Expected graduation October 2026",
    // 相關科目和成績（顯示在學歷下面）
    coursework: [
      { name: "Object-Oriented Analysis & Design", grade: "A+" },
      { name: "OOP & Data Structures", grade: "A" },
      { name: "Database Fundamentals", grade: "A" },
      { name: "Operating Systems", grade: "A" },
      { name: "Machine Learning", grade: "A" },
      { name: "Software Verification & Validation", grade: "A-" },
      { name: "Software Reliability & QA", grade: "A-" },
    ],
  },
  {
    school: "Multimedia University",
    degree: "Foundation in IT",
    period: "2022 – 2023",
    detail: "CGPA 3.39 / 4.0",
  },
];

const experience = [
  {
    role: "IT Intern",
    company: "Versa Manufacturing Sdn Bhd (Flexi Versa Group)",
    period: "Jul 2025 – Oct 2025",
    tech: ["Batch", "VBScript", "Google Apps Script", "HTML", "CSS", "JavaScript", "GLPI"],
    points: [
      "Developed a phishing simulation website to test employees' cybersecurity awareness.",
      "Automated IT tasks with Batch and VBScript, including server ping checks with HTML reports, remote PC restarts by IP address, and scheduled file transfers.",
      "Built a QR code employee information system using Google Sheets and Apps Script.",
      "Created an IT asset inventory from scratch for access points, CCTV and DVR units, identifying faulty devices.",
      "Set up and tested the GLPI ticketing system.",
      "Provided daily IT support: server, antivirus, network and backup checks, laptop setup (domain join, VPN, MFA), hardware repair, network cabling and Epicor troubleshooting.",
    ],
  },
  {
    role: "Part-time Data Centre Technician",
    company: "",
    period: "Oct 2026",
    points: [
      "Installed server equipment at a data centre.",
      "Connected network cabling between servers.",
    ],
  },
];

const projects = [
  {
    title: "CommentInsight",
    featured: true,
    metrics: [
      { value: "95.16%", label: "SVM test accuracy" },
      { value: "98K", label: "Tweets trained on" },
      { value: "4.4–4.6", label: "Usability score / 5" },
    ],
    badge: "Final Year Project · Grade A",
    year: "2026",
    category: "Machine Learning",
    description: "A web app that reads social media comments and uses machine learning to tell if each one is positive, neutral or negative.",
    highlights: [
      "Trained on about 98,000 tweets and reached 95.16% accuracy with SVM",
      "Compares 3 models, shows extra VADER and TextBlob scores, saves results and exports to CSV",
      "Tested with 46 unit tests, 12 acceptance tests and 8 real users (rated 4.38–4.63 out of 5)",
    ],
    tags: ["Python", "Flask", "scikit-learn", "Firebase", "HTML", "CSS", "JavaScript"],
    cover: "images/commentinsight.png",
    link: "https://commentinsight.web.app",
    code: "",
  },
  {
    title: "EatHealthee",
    badge: "Personal project",
    featured: true,
    metrics: [
      { value: "103", label: "Automated tests" },
      { value: "2", label: "Languages (EN / 中文)" },
      { value: "Backup", label: "AI models when one is busy" },
    ],
    year: "2026",
    category: "Full-Stack Web",
    description: "Take a photo of your meal and the app uses AI to estimate the calories. It also knows local Malaysian and Singaporean food.",
    highlights: [
      "Sets a daily calorie target for each user and adjusts it based on what they eat and their weight",
      "Backend on Cloudflare Workers keeps API keys hidden and switches to another AI model when one is busy",
      "Login and cloud sync with Supabase, works offline, and each user can only see their own data",
    ],
    tags: ["React", "TypeScript", "Cloudflare Workers", "Supabase", "Gemini"],
    cover: "images/eathealthee.png",
    link: "https://app.eathealthee.workers.dev",
    code: "https://github.com/chinzhenho/fittrack",
  },
  {
    title: "Joinlist",
    badge: "Personal project",
    featured: true,
    metrics: [
      { value: "0", label: "Overbookings when 1,000 test users tried to book 50 seats" },
      { value: "6,322", label: "Load-test requests, 0 errors" },
      { value: "30", label: "Backend tests, incl. seat-booking race tests, run on GitHub Actions" },
    ],
    year: "2026",
    category: "Full-Stack Web",
    description: "An event registration website with a seat limit. When an event is full, people join a waitlist and get a seat automatically if someone cancels.",
    highlights: [
      "No overbooking, even when 1,000 test users tried to book 50 seats at the same time",
      "Waitlist moves up automatically, QR code check-in at the door, and pages update live",
      "Secure login (JWT), limits on repeated requests, and tests run automatically on GitHub Actions",
    ],
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "React", "TypeScript"],
    cover: "images/joinlist.png",
    link: "https://joinlist.pages.dev",
    code: "https://github.com/chinzhenho/joinlist",
  },
  {
    title: "Flower Image Classification",
    year: "2025",
    category: "Machine Learning",
    description: "Image classification of 102 flower species on the Oxford 102 Flower Dataset (8,189 images).",
    highlights: [
      "Compared Logistic Regression, ANN and CNN with hyperparameter tuning",
      "Custom PyTorch CNN with augmentation, dropout, L2, LR scheduling and early stopping",
      "77.0% validation accuracy, vs 25.7% (LogReg) and 18.9% (ANN)",
    ],
    tags: ["Python", "PyTorch", "TensorFlow / Keras", "scikit-learn"],
    cover: "images/flower.png",
    link: "",
    code: "https://github.com/chinzhenho/ML-COMPLETE",
  },
  {
    title: "Personal Budget Tracker",
    year: "",
    category: "Full-Stack Web",
    description: "Web platform for tracking income and expenses, setting budgets and viewing financial reports.",
    highlights: [
      "Income / expense management, budget setting and bar chart reports",
      "Separate logins for users, admins and financial advisors with email authentication",
      "Real-time data storage with Firebase",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Firebase"],
    cover: "images/budget.jpg",
    link: "",
    code: "https://github.com/chinzhenho/Personal-Budget-Tracker-Website",
  },
  {
    title: "Course Registration App",
    year: "",
    category: "Desktop App",
    description: "Course registration app with separate admin and student portals.",
    highlights: [
      "Students enrol in courses and view their timetables, with class clash detection",
      "Passwords encrypted with bcrypt",
      "Admin panel to add, update and delete student and course records",
    ],
    tags: ["Python", "Tkinter", "SQLite", "bcrypt"],
    cover: "images/course.jpg",
    link: "",
    code: "https://github.com/chinzhenho/Mini-IT-Project-Course-Registration-App",
  },
  {
    title: "CPU Scheduling Simulator",
    year: "",
    category: "Desktop App",
    description: "Simulator for Round Robin, SRT, SJN and Non-Preemptive Priority scheduling algorithms.",
    highlights: [
      "Java Swing GUI for entering process details and choosing an algorithm",
      "Calculates turnaround and waiting time and draws Gantt charts",
    ],
    tags: ["Java", "Java Swing"],
    cover: "images/cpu.jpg",
    link: "",
    code: "https://github.com/chinzhenho/operating-system-CPU-Scheduling-Simulator",
  },
  {
    title: "Kwazam Chess",
    year: "",
    category: "Desktop App",
    description: "Chess-style board game with unique pieces (Ram, Biz, Tor, Xor, Sau) and custom movement rules.",
    highlights: [
      "Turn handling, move validation and win conditions",
      "Save / load game progress and adjustable board size",
    ],
    tags: ["Java", "Java Swing"],
    cover: "images/chess.jpg",
    link: "",
    code: "https://github.com/chinzhenho/Kwazam-Chess---Java-GUI-Board-Game",
  },
  {
    title: "Car Wash Queue Simulator",
    year: "2025",
    category: "Simulation",
    description: "Queue simulation of a car wash with three wash bays, built for a Computational Methods assignment.",
    highlights: [
      "Random arrivals, service types and service times, using built-in rand or a custom Linear Congruential Generator",
      "Simulates each car through three wash bays and reports waiting time, time in system and bay utilisation",
    ],
    tags: ["FreeMat", "MATLAB"],
    cover: "images/carwash.jpg",
    link: "",
    code: "https://github.com/chinzhenho/computational-method-Car-Wash-Queue-Simulator-System",
  },
  {
    title: "Robot War Simulator",
    year: "2024",
    category: "Simulation",
    description: "C++ robot battle simulator that loads a battlefield configuration and places robots on a text-based map. Built in a team of three.",
    highlights: [
      "Parses grid size, steps and robot types / positions from a configuration file",
      "Object-oriented Robot class with a console battlefield display",
      "Built in a team of three",
    ],
    tags: ["C++", "OOP"],
    cover: "images/robotwar.jpg",
    link: "",
    code: "https://github.com/Ericteoh0045/OOPDS",
  },
];
