import { PinData, PinType } from './types';

// Images from picsum - using specific IDs for consistent aesthetic
const getRandomImage = (id: number, width: number, height: number) => `https://picsum.photos/id/${id}/${width}/${height}`;

export const RESUME_DATA = `
Name: Rapeti Sharmila
Role: Electronics & Communication Engineer | Hybrid SDE & AI/ML Enthusiast
Email: sharmilarapeti1451@gmail.com
Links: github.com/sharmila1320, linkedin.com/in/sharmilarapeti
Education: 
- B.Tech in Electronics and Communication Engineering at National Institute of Technology, Silchar (2022-2026), CGPA: 7.39.
- HSC at Sasi Educational Institutions (94.3%).
- SSC at Vivekananda High School (100%).
Experience:
- Summer Research Intern at SN BOSE - NIT Silchar (May 2025 - July 2025): Designed MARLINet, a hybrid CNN-GNN model for underwater image enhancement. Improved PSNR to 16.91 dB.
- English Literature Head (Illuminits / NITS).
- Social Media Manager (AAVEG / NITS).
Projects:
- CampusGPT: Full-stack AI campus assistant using React, TS, Node.js, OpenAI API. Handles queries and unifies campus info.
- QuickCV: MERN Stack Resume Builder with LinkedIn import and PDF export.
- Spam Mail Detection: ML email classification system with 99.6% accuracy using Naive Bayes, SVM.
Skills:
- Languages: C++, Python, JavaScript, SQL.
- Web: React.js, Next.js, Node.js, Express.js, Tailwind, HTML/CSS.
- AI/ML: CNNs, RNNs, Transformers, TensorFlow, Keras, Scikit-Learn, OpenCV, NLP.
- Databases: MongoDB, MySQL, PostgreSQL.
- Tools: Git/GitHub, Linux, Docker, Postman.
Achievements:
- Active Open-source contributor at GSSoC'25.
- Solved 500+ coding problems (LeetCode, GFG, Codeforces).
- Hackathons: Flipkart Grid, Walmart Sparkathon, Adobe India, CodeHer.
`;

export const PORTFOLIO_PINS: PinData[] = [
  {
    id: 'resume-1',
    type: PinType.RESUME,
    title: 'My Resume',
    description: 'View and download my professional resume including full education, experience, and skills details.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Document like image
    tags: ['PDF', 'Curriculum Vitae', 'Hire Me'],
    color: 'bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-black',
    size: 'medium'
  },
  {
    id: '1',
    type: PinType.PROJECT,
    title: 'CampusGPT',
    description: 'Full-stack AI campus webapp with domain-based login and community-driven query resolution.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Campus/Tech
    tags: ['React', 'TypeScript', 'OpenAI', 'Node.js'],
    color: 'bg-cute-blue dark:bg-gradient-to-br dark:from-blue-900 dark:to-indigo-950',
    size: 'large',
    githubUrl: 'https://github.com/sharmila1320/campusgpt',
    liveUrl: 'https://campusgpt.demo.com',
  },
  {
    id: '2',
    type: PinType.EXPERIENCE,
    title: 'Research Intern @ NIT Silchar',
    description: 'Developed a novel deep-learning architecture combining CNNs and GNNs for underwater image enhancement. Achieved high PSNR/SSIM improvements on UIEB and EUVP datasets by modeling both local textures and global structural relationships. Implemented using PyTorch and PyTorch Geometric with optimized graph construction and perceptual loss functions.. Achieved 16.91 dB PSNR.',
    tags: ['Deep Learning', 'Research', 'Computer Vision', 'PyTorch', 'GNN', 'CNN', 'Image Processing', 'Python'],
    color: 'bg-stone-800 text-white dark:bg-black dark:border dark:border-slate-800',
    size: 'large'
  },
  {
    id: '3',
    type: PinType.PROJECT,
    title: 'QuickCV Builder',
    description: 'MERN Stack Resume Builder with LinkedIn import, customizable templates, and one-click PDF export.',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Writing/Notes
    tags: ['MERN Stack', 'MongoDB', 'React'],
    color: 'bg-cute-pink dark:bg-gradient-to-br dark:from-pink-900 dark:to-fuchsia-950',
    size: 'medium',
    githubUrl: 'https://github.com/sharmila1320/quickcv',
    demoUrl: 'https://youtube.com/watch?v=demo',
  },
  {
    id: '4',
    type: PinType.ACHIEVEMENT,
    title: 'Competitive Programming',
    description: 'Solved 500+ coding problems across LeetCode, GFG, and Codeforces. Active GSSoC\'25 Contributor.',
    tags: ['DSA', 'LeetCode', 'Open Source'],
    color: 'bg-cute-yellow dark:bg-gradient-to-br dark:from-yellow-900 dark:to-amber-950',
    size: 'small'
  },
  {
    id: '5',
    type: PinType.PROJECT,
    title: 'Spam Mail Detection',
    description: 'Intelligent email-classification system using Naive Bayes, SVM, and Decision Trees. 99.6% Accuracy.',
    tags: ['Machine Learning', 'NLP', 'Scikit-learn'],
    color: 'bg-cute-purple dark:bg-gradient-to-br dark:from-purple-900 dark:to-violet-950',
    size: 'medium',
    githubUrl: 'https://github.com/sharmila1320/Spam-mail-detection'
  },
  {
    id: '6',
    type: PinType.SKILL,
    title: 'Tech Stack',
    description: 'Proficient in C++, Python, JavaScript, React, Next.js, and Deep Learning frameworks like TensorFlow & Keras.',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Code
    tags: ['Full Stack', 'AI/ML', 'Tools', 'DL Frameworks'],
    color: 'bg-cute-mint dark:bg-gradient-to-br dark:from-teal-900 dark:to-emerald-950',
    size: 'large'
  },
  {
    id: '7',
    type: PinType.EXPERIENCE,
    title: 'Leadership Roles',
    description: 'English Literature Head at Illuminits (NITS) & Social Media Manager at AAVEG.',
    tags: ['Leadership', 'Communication', 'Management'],
    color: 'bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-gray-900',
    size: 'small'
  },
  {
    id: '8',
    type: PinType.ACHIEVEMENT,
    title: 'Hackathons',
    description: 'Participated in Tek-Qubit : qualified phase 2, Flipkart Grid, Walmart Sparkathon, Adobe India, and CodeHer.',
    tags: ['Innovation', 'Teamwork', 'Hackathon', 'Problem Solving'],
    color: 'bg-orange-50 dark:bg-gradient-to-br dark:from-orange-900 dark:to-red-950',
    size: 'small'
  },
  {
    id: '9',
    type: PinType.PROJECT,
    title: 'LeetCode Profile',
    description: 'My competitive programming profile on LeetCode with solved problems and coding challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Coding/Algorithm
    tags: ['LeetCode', 'DSA', 'Competitive Programming'],
    color: 'bg-yellow-50 dark:bg-gradient-to-br dark:from-yellow-900 dark:to-orange-950',
    size: 'small',
    liveUrl: 'https://leetcode.com/u/SharkOuttie/'
  },
  {
    id: '10',
    type: PinType.PROJECT,
    title: 'CodeForces Profile',
    description: 'My competitive programming profile on CodeForces showcasing algorithmic skills and contest participation.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Competition/Sports
    tags: ['CodeForces', 'DSA', 'Competitive Programming'],
    color: 'bg-red-50 dark:bg-gradient-to-br dark:from-red-900 dark:to-pink-950',
    size: 'small',
    liveUrl: 'https://codeforces.com/profile/SharkOuttie13'
  },
  {
    id: '11',
    type: PinType.ACHIEVEMENT,
    title: 'Contact Details',
    description: 'Get in touch with me directly. | Mobile: +91 8341251461 | Email: sharmilarapeti1451@gmail.com',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Phone/Contact
    tags: ['Contact', 'Phone', 'Email'],
    color: 'bg-green-50 dark:bg-gradient-to-br dark:from-green-900 dark:to-teal-950',
    size: 'small'
  },
  {
    id: '12',
    type: PinType.PROJECT,
    title: 'Contact Me',
    description: 'Send me a message directly through this form. I\'ll get back to you as soon as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Message/Chat
    tags: ['Contact', 'Form', 'Email'],
    color: 'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900 dark:to-cyan-950',
    size: 'medium'
  }
];