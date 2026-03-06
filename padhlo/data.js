const skillsData = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "💻",
    themeColor: "#ff073a",
    difficulty: "Beginner Friendly",
    expertTip: "Focus on learning JavaScript deeply before jumping into frameworks like React.",
    shortDesc: "Build websites & web apps using HTML, CSS, JS, and React.",
    fullDesc:
      "Web Development is the art of building websites. It includes Frontend (what users see) and Backend (server logic).",
    careers: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Web Architect"],
    upcomingJobs: "High demand for Next.js and Performance Optimization specialists. Increase in remote work opportunities globally.",
    quizKeywords: ["design", "logic", "web"],
    animation: "spin-slow 20s linear infinite",
    roadmap: [
      {
        step: "Phase 1: The Basics",
        details:
          "Master HTML5 for structure, CSS3 for styling, and JavaScript (ES6+) for logic. These are the building blocks of the web.",
        resources: ["MDN Web Docs", "FreeCodeCamp"],
      },
      {
        step: "Phase 2: Frontend Frameworks",
        details:
          "Learn React.js (most popular) or Vue/Angular. Understand components, state management, and hooks.",
        resources: ["React Official Docs", "Net Ninja YouTube"],
      },
      {
        step: "Phase 3: Backend & Database",
        details:
          "Learn Node.js + Express for server-side logic. Learn MongoDB or SQL (PostgreSQL) for databases.",
        resources: ["Traversy Media", "The Odin Project"],
      },
    ],
    youtube: [
      { name: "Traversy Media", link: "https://youtube.com/user/TechGuyWeb/playlists" },
      {
        name: "CodeWithHarry (Hindi)",
        link: "https://youtube.com/c/CodeWithHarry/playlists",
      },
      {
        name: "Web Dev Simplified",
        link: "https://youtube.com/c/WebDevSimplified/playlists",
      },
    ],
    courses: [
      {
        name: "The Odin Project (Free)",
        link: "https://www.theodinproject.com/",
      },
      { name: "Full Stack Open (Free)", link: "https://fullstackopen.com/" },
      { name: "Udemy - Colt Steele", link: "#" },
    ],
    practice: [
      { topic: "Basic DOM Manipulation", difficulty: "Beginner" },
      { topic: "Fetch API Data", difficulty: "Intermediate" },
      { topic: "Build a To-Do App", difficulty: "Intermediate" },
    ],
    projects: ["Personal Portfolio", "Weather App (API)", "E-commerce Store"],
    sampleCode: [
      "const app = new App();",
      "app.render('v1.0.4');",
      "console.log('Online');"
    ]
  },
  {
    id: "app-development",
    title: "App Development",
    icon: "📱",
    themeColor: "#ff073a",
    difficulty: "Moderate",
    expertTip: "Mastering Dart (for Flutter) or JavaScript (for React Native) is the key to smooth app performance.",
    shortDesc:
      "Create mobile apps for Android & iOS using Flutter or React Native.",
    fullDesc:
      "Mobile App Development involves creating software for smartphones. You can choose Native (Kotlin/Swift) or Cross-Platform (Flutter/React Native).",
    careers: ["Android Developer", "iOS Developer", "Cross-Platform App Developer", "Mobile UI Engineer"],
    upcomingJobs: "Surge in Wearable device apps and Foldable phone optimizations. Growing market for IoT-integrated mobile solutions.",
    quizKeywords: ["mobile", "logic", "app"],
    animation: "float 6s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Choose a Path",
        details:
          "Decide between Native (Android/iOS) or Cross-platform (Flutter/React Native). We recommend Flutter or React Native for beginners.",
        resources: [],
      },
      {
        step: "Phase 2: Core Concepts",
        details:
          "Understand UI Components, State Management, Navigation between screens, and API integration.",
        resources: [],
      },
      {
        step: "Phase 3: Deployment",
        details:
          "Learn how to build APKs/IPAs and publish to Google Play Store and Apple App Store.",
        resources: [],
      },
    ],
    youtube: [
      {
        name: "Hitesh Choudhary (Hindi)",
        link: "https://youtube.com/c/HiteshChoudharydotcom/playlists",
      },
      { name: "The Net Ninja", link: "https://youtube.com/c/TheNetNinja/playlists" },
    ],
    courses: [
      { name: "Flutter & Dart - The Complete Guide (Udemy)", link: "#" },
      { name: "React Native - The Practical Guide", link: "#" },
    ],
    practice: [
      { topic: "Build UI Layouts", difficulty: "Beginner" },
      {
        topic: "State Management (Provider/Redux)",
        difficulty: "Intermediate",
      },
    ],
    projects: ["Note Taking App", "Chat Application", "Expense Tracker"],
    sampleCode: [
      "import 'flutter/material';",
      "void main() => runApp();",
      "const isMobile = true;"
    ]
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: "📊",
    themeColor: "#ff073a",
    difficulty: "Advanced",
    expertTip: "Don't just learn library syntax; understand the underlying statistics and math.",
    shortDesc: "Analyze data to find trends & patterns using Python & SQL.",
    fullDesc:
      "Data Science combines math, statistics, and programming to extract meaningful insights from data.",
    careers: ["Data Analyst", "Data Scientist", "Business Intelligence Developer", "Data Engineer"],
    upcomingJobs: "Heavy focus on AI Data Pipelines and Real-time analytics. Decision Science roles are becoming critical in every sector.",
    quizKeywords: ["data", "logic", "math"],
    animation: "drift 10s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Python & Math",
        details:
          "Learn Python basics. Understand Statistics (Mean, Median, Probability) and Linear Algebra.",
        resources: [],
      },
      {
        step: "Phase 2: Data Analysis Libraries",
        details:
          "Master Pandas (data manipulation), NumPy (math), and Matplotlib/Seaborn (visualization).",
        resources: [],
      },
      {
        step: "Phase 3: Machine Learning Basics",
        details:
          "Learn Scikit-Learn. Understand Linear Regression, Classification, and Clustering algorithms.",
        resources: [],
      },
    ],
    youtube: [
      { name: "Krish Naik", link: "https://youtube.com/user/krishnaik06/playlists" },
      { name: "StatQuest", link: "https://youtube.com/c/joshstarmer/playlists" },
    ],
    courses: [
      { name: "Kaggle Courses (Free)", link: "https://www.kaggle.com/learn" },
      { name: "Coursera - Andrew Ng", link: "#" },
    ],
    practice: [
      { topic: "Pandas Data Cleaning", difficulty: "Beginner" },
      { topic: "Titanic Survival Prediction", difficulty: "Intermediate" },
    ],
    projects: ["Stock Price Predictor", "Movie Recommendation System"],
    sampleCode: [
      "import pandas as pd",
      "df = pd.read_csv('data')",
      "df.predict('Success')"
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    icon: "🔒",
    themeColor: "#ff073a",
    difficulty: "Very Advanced",
    expertTip: "Networking is the backbone of security. Learn TCP/IP and OSI model like the back of your hand.",
    shortDesc: "Protect systems & networks from digital attacks.",
    fullDesc:
      "Cyber Security involves protecting computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks.",
    careers: ["Security Analyst", "Ethical Hacker", "Security Architect", "Incident Responder"],
    upcomingJobs: "Critical demand due to AI-driven cyber threats. Opportunities in Cloud Security and Zero Trust Architecture.",
    quizKeywords: ["security", "logic", "hacking"],
    animation: "neon-flicker 2s infinite",
    roadmap: [
      {
        step: "Phase 1: Networking Basics",
        details:
          "Learn how the internet works. TCP/IP, DNS, HTTP, OSI Model. This is crucial.",
        resources: ["Cisco Networking Academy", "CompTIA Network+ Fundamentals"],
      },
      {
        step: "Phase 2: Linux & Scripting",
        details:
          "Get comfortable with the Linux command line (Kali Linux). Learn basic Python/Bash scripting.",
        resources: ["The Linux Command Line (Book)", "OverTheWire (Wargames)"],
      },
      {
        step: "Phase 3: Ethical Hacking",
        details:
          "Learn about Vulnerability Assessment, Penetration Testing (Web/Network), and tools like Metasploit, Burp Suite.",
        resources: ["eJPT Certification", "TCM Security (Practical Ethical Hacking)"],
      },
    ],
    youtube: [
      { name: "NetworkChuck", link: "https://youtube.com/c/NetworkChuck/playlists" },
      { name: "David Bombal", link: "https://youtube.com/c/DavidBombal/playlists" },
    ],
    courses: [
      { name: "TryHackMe (Interactive)", link: "https://tryhackme.com/" },
      { name: "Hack The Box", link: "https://www.hackthebox.com/" },
    ],
    practice: [
      { topic: "Capture The Flag (CTF)", difficulty: "Intermediate" },
      { topic: "OWASP Top 10", difficulty: "Advanced" },
    ],
    projects: [
      "Keylogger (Educational)",
      "Network Scanner",
      "Vulnerability Scanner",
    ],
    sampleCode: [
      "nmap -sV target.ip",
      "chmod +x exploit.py",
      "sudo ./hack.sh"
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "🧠",
    themeColor: "#ff073a",
    difficulty: "Advanced",
    expertTip: "Start with Scikit-learn to understand patterns before moving to heavy Deep Learning models.",
    shortDesc: "Teach computers to learn and make decisions.",
    fullDesc:
      "Artificial Intelligence and Machine Learning enable computers to learn from data. This includes Deep Learning, NLP, and Computer Vision.",
    careers: ["ML Engineer", "AI Researcher", "NLP Scientist", "Computer Vision Engineer"],
    upcomingJobs: "Massive growth in LLM (Large Language Models) specialists and AI Safety researchers. Demand for Edge AI implementation.",
    quizKeywords: ["ai", "logic", "math", "smart"],
    animation: "pulse-brain 4s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Python & Math Core",
        details:
          "Solidify Python skills. Master Linear Algebra, Calculus, and Probability. These are the engines of AI.",
        resources: ["3Blue1Brown (Math)", "Sentdex (Python)"],
      },
      {
        step: "Phase 2: Deep Learning",
        details:
          "Dive into Neural Networks. Learn TensorFlow or PyTorch. Understand CNNs (Images) and RNNs/Transformers (Text).",
        resources: ["Fast.ai", "DeepLearning.AI"],
      },
      {
        step: "Phase 3: Deployment & MLOps",
        details:
          "Learn how to deploy models via APIs (Flask/FastAPI) and monitor them in production.",
        resources: ["MLOps.community", "Made With ML"],
      },
    ],
    youtube: [
      { name: "Sentdex", link: "https://youtube.com/user/sentdex/playlists" },
      { name: "Two Minute Papers", link: "https://youtube.com/user/keeroyz/playlists" },
    ],
    courses: [
      { name: "Fast.ai (Free)", link: "https://www.fast.ai/" },
      { name: "Andrew Ng's Deep Learning", link: "https://www.coursera.org/" },
    ],
    practice: [
      { topic: "Digit Recognition (MNIST)", difficulty: "Beginner" },
      { topic: "Build a Chatbot", difficulty: "Intermediate" },
    ],
    projects: ["Face Recognition System", "AI Text Summarizer", "Autonomous Car Sim"],
    sampleCode: [
      "model = Sequential()",
      "model.train(epochs=100)",
      "print('Brain Ready')"
    ]
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    icon: "☁️",
    themeColor: "#ff073a",
    difficulty: "Moderate",
    expertTip: "Infrastructure as Code (Terraform) is as important as the Cloud provider itself.",
    shortDesc: "Manage servers & services on AWS, Azure, or Google Cloud.",
    fullDesc:
      "Cloud Computing is key for modern apps. Stop managing physical servers and let AWS/Azure/GCP handle infrastructure.",
    careers: ["Cloud Architect", "Cloud Engineer", "Solutions Architect", "Cloud Consultant"],
    upcomingJobs: "Shift towards Multi-cloud strategies and Serverless computing. Growing need for Sustainable and Green Cloud computing.",
    quizKeywords: ["cloud", "logic", "server"],
    animation: "float-alt 8s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Cloud Basics",
        details:
          "Understand IaaS, PaaS, SaaS. Learn basic services like EC2 (Virtual Machines) and S3 (Storage).",
        resources: ["AWS Fundamentals"],
      },
      {
        step: "Phase 2: Certification & Hands-on",
        details:
          "Prepare for AWS Cloud Practitioner or Azure Fundamentals. Build real projects using cloud services.",
        resources: ["Cloud Academy", "ExamPro"],
      },
      {
        step: "Phase 3: Serverless & Containers",
        details:
          "Master Lambda (Serverless functions), Docker, and Kubernetes for scalable apps.",
        resources: ["Docker Docs", "Kubernetes.io"],
      },
    ],
    youtube: [
      { name: "Tech World with Nana", link: "https://youtube.com/c/TechWorldwithNana/playlists" },
      { name: "Stephane Maarek", link: "https://www.youtube.com/@stephanemaarek/playlists" },
    ],
    courses: [
      { name: "AWS Free Tier", link: "https://aws.amazon.com/free/" },
      { name: "A Cloud Guru", link: "https://acloudguru.com/" },
    ],
    practice: [
      { topic: "Host a Static Website on S3", difficulty: "Beginner" },
      { topic: "Deploy App with Docker", difficulty: "Intermediate" },
    ],
    projects: ["Serverless API", "Auto-scaling Web App", "Cloud File Storage"],
    sampleCode: [
      "aws s3 sync ./dist s3://",
      "kubectl apply -f pod.yml",
      "docker build -t app ."
    ]
  },
  {
    id: "devops",
    title: "DevOps",
    icon: "♾️",
    themeColor: "#ff073a",
    difficulty: "Advanced",
    expertTip: "Automate everything. If you have to do it twice, it should be a script.",
    shortDesc: "Bridge the gap between Development and Operations.",
    fullDesc:
      "DevOps focuses on automating the software delivery process. It's about culture, automation, and platform engineering.",
    careers: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Release Manager"],
    upcomingJobs: "Rapid adoption of Platform Engineering and GitOps. DevSecOps integration becomes a standard for all enterprises.",
    quizKeywords: ["devops", "logic", "automation"],
    animation: "spin-slow 15s linear infinite",
    roadmap: [
      {
        step: "Phase 1: Linux & Scripting",
        details:
          "You must love the terminal. Master Bash scripting and Linux system administration.",
        resources: ["SadServers", "Linux Journey"],
      },
      {
        step: "Phase 2: CI/CD Pipelines",
        details:
          "Learn Jenkins, GitHub Actions, or GitLab CI. Automate testing and deployment.",
        resources: ["GitHub Actions Docs", "Jenkins.io"],
      },
      {
        step: "Phase 3: Infrastructure as Code",
        details:
          "Learn Terraform or Ansible. Define your infrastructure in code files, not manual clicks.",
        resources: ["HashiCorp Learn", "Ansible Academy"],
      },
    ],
    youtube: [
      { name: "Jeff Geerling", link: "https://youtube.com/user/geerlingguy/playlists" },
      { name: "DevOps Toolkit", link: "https://youtube.com/c/DevOpsToolkit/playlists" },
    ],
    courses: [
      { name: "KodeKloud", link: "https://kodekloud.com/" },
      { name: "Udemy - DevOps Bootcamp", link: "#" },
    ],
    practice: [
      { topic: "Write a cleanup bash script", difficulty: "Beginner" },
      { topic: "Set up a Jenkins Pipeline", difficulty: "Intermediate" },
    ],
    projects: ["CI/CD for a Node App", "Terraform AWS Infra", "Monitoring Dashboard"],
    sampleCode: [
      "git push origin main",
      "status: deploying...",
      "pipeline: success ✅"
    ]
  },
  {
    id: "game-development",
    title: "Game Development",
    icon: "🎮",
    themeColor: "#ff073a",
    difficulty: "Advanced",
    expertTip: "Finish small games first. Scope creep is the biggest enemy of game devs.",
    shortDesc: "Create 2D/3D games using Unity (C#) or Unreal (C++).",
    fullDesc:
      "Game Development is where creativity meets logic. Build immersive worlds and interactive experiences.",
    careers: ["Game Programmer", "Game Designer", "Level Designer", "Technical Artist"],
    upcomingJobs: "Boom in AR/VR gaming and Metaverse experiences. Cloud-based gaming is creating new technical hurdles and careers.",
    quizKeywords: ["game", "logic", "creative"],
    animation: "float 5s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Choose Engine & Language",
        details:
          "Unity (C#) is great for beginners/indie. Unreal (C++) is for AAA graphics. Pick one.",
        resources: ["Unity Learn", "Unreal Online Learning"],
      },
      {
        step: "Phase 2: Game Mathematics & Physics",
        details:
          "Understand Vectors, Collisions, and Rigidbodies. Learn how objects interact in a virtual space.",
        resources: ["Freya Holmér (YouTube)", "Game Math Book"],
      },
      {
        step: "Phase 3: Game Design Patterns",
        details:
          "Learn Object Pooling, Singletons, and State Machines to organize complex game code.",
        resources: ["Game Programming Patterns (Nystrom)", "Unity Patterns Docs"],
      },
    ],
    youtube: [
      { name: "Brackeys (Unity)", link: "https://youtube.com/user/Brackeys/playlists" },
      { name: "GMTK (Game Design)", link: "https://youtube.com/user/McBacon1337/playlists" },
    ],
    courses: [
      { name: "Unity Learn (Free)", link: "https://learn.unity.com/" },
      { name: "Gamedev.tv", link: "https://www.gamedev.tv/" },
    ],
    practice: [
      { topic: "Pong Clone", difficulty: "Beginner" },
      { topic: "Platformer Physics", difficulty: "Intermediate" },
    ],
    projects: ["Endless Runner", "Top-down Shooter", "3D Exploration Game"],
    sampleCode: [
      "void Update() {",
      "  transform.Translate();",
      "  if (collision) die();",
      "}"
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    icon: "🔗",
    themeColor: "#ff073a",
    difficulty: "Very Advanced",
    expertTip: "Security is everything in Web3. One bug in a contract can lose millions. Audit your code.",
    shortDesc: "Build decentralized apps (dApps) using Solidity.",
    fullDesc:
      "Blockchain is the future of trustless transaction. Build Smart Contracts and decentralized applications on Ethereum/Solana.",
    careers: ["Blockchain Developer", "Smart Contract Auditor", "dApp Developer", "Web3 Architect"],
    upcomingJobs: "Integration of Blockchain in Supply Chain and Legal sectors. Growth of DeFi 2.0 and DAO governance tools.",
    quizKeywords: ["blockchain", "logic", "crypto"],
    animation: "drift 12s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Blockchain Fundamentals",
        details:
          "Understand how Blockchain works. Hashing, Mining, Consensus, and Wallets (Metamask).",
        resources: ["Blockchain Demo (Anders)", "Web3.py Docs"],
      },
      {
        step: "Phase 2: Smart Contracts",
        details:
          "Learn Solidity (for Ethereum). Write code that lives on the blockchain forever.",
        resources: ["Solidity by Example", "LearnX in Y minutes"],
      },
      {
        step: "Phase 3: Frontend Integration",
        details:
          "Use Ethers.js or Web3.js to connect your React frontend to your Smart Contracts.",
        resources: ["Nader Dabit (Web3)", "Alchemy University"],
      },
    ],
    youtube: [
      { name: "Dapp University", link: "https://youtube.com/c/DappUniversity/playlists" },
      { name: "Whiteboard Crypto", link: "https://youtube.com/c/WhiteboardCrypto/playlists" },
    ],
    courses: [
      { name: "CryptoZombies (Free)", link: "https://cryptozombies.io/" },
      { name: "Buildspace", link: "https://buildspace.so/" },
    ],
    practice: [
      { topic: "Create a Hello World Contract", difficulty: "Beginner" },
      { topic: "Mint an NFT", difficulty: "Intermediate" },
    ],
    projects: ["Decentralized Voting App", "NFT Marketplace", "Defi Staking App"],
    sampleCode: [
      "contract MyDApp {",
      "  mapping(id => user);",
      "  function mintNFT();",
      "}"
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "🎨",
    themeColor: "#ff073a",
    difficulty: "Beginner Friendly",
    expertTip: "Good design is invisible. Focus on the user's journey, not just pretty colors.",
    shortDesc: "Design beautiful and usable interfaces using Figma.",
    fullDesc:
      "UI (User Interface) is how it looks. UX (User Experience) is how it works. Master both to build products people love.",
    careers: ["UI Designer", "UX Designer", "Product Designer", "User Researcher"],
    upcomingJobs: "Focus on VUI (Voice User Interface) and Accessibility-first design. VR/AR design is an emerging niche sector.",
    quizKeywords: ["design", "creative", "ui"],
    animation: "float-alt 10s ease-in-out infinite",
    roadmap: [
      {
        step: "Phase 1: Design Principles",
        details:
          "Learn Color Theory, Typography, Spacing, and Contrast. Understand Visual Hierarchy.",
        resources: ["Canva Design School", "Laws of UX"],
      },
      {
        step: "Phase 2: Tools (Figma)",
        details:
          "Master Figma. Learn Frames, Auto-Layout, Components, and Prototyping.",
        resources: ["Figma Bootcamp", "Config by Figma"],
      },
      {
        step: "Phase 3: UX Research",
        details:
          "Learn User Personas, Wireframing, User Flows, and Usability Testing.",
        resources: ["Nielsen Norman Group", "UX Collective"],
      },
    ],
    youtube: [
      { name: "DesignCourse", link: "https://youtube.com/user/DesignCourse/playlists" },
      { name: "Flux Academy", link: "https://youtube.com/c/FluxWithRanSegall/playlists" },
    ],
    courses: [
      { name: "Google UX Design Cert", link: "https://grow.google/certificates/ux-design/" },
      { name: "Refactoring UI (Book)", link: "https://www.refactoringui.com/" },
    ],
    practice: [
      { topic: "Redesign a Popular App", difficulty: "Intermediate" },
      { topic: "Create a UI Kit", difficulty: "Advanced" },
    ],
    projects: ["E-commerce App Redesign", "Food Delivery App UI", "Personal Portfolio Design"],
    sampleCode: [
      "/* UI/UX Principles */",
      "const design = {",
      "  spacing: '8px',",
      "  primary: '#FF003C',",
      "  isUserHappy: true",
      "};",
      "design.animate();"
    ]
  },
];
