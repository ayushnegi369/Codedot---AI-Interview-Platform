// Interview Data list 
const data = [
  {
    logo: "/companies-icon/facebook.png",
    tag: "Technical",
    title: "Frontend Dev Interview",
    date: "Aug 28, 2025",
    rating: "54/100",
    description:
      "Candidate demonstrates basic React knowledge but struggles with advanced concepts. Good understanding of HTML/CSS fundamentals. Needs improvement in state management and component architecture. Shows potential with proper guidance and practice.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    ],
  },
  {
    logo: "/companies-icon/amazon.png",
    tag: "System Design",
    title: "Senior Backend Engineer",
    date: "Sep 15, 2025",
    rating: "78/100",
    description:
      "Strong technical foundation with excellent system design skills. Candidate shows deep understanding of distributed systems and scalability principles.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
    ],
  },
  {
    logo: "/companies-icon/spotify.png",
    tag: "Full Stack",
    title: "React Developer Position",
    date: "Sep 22, 2025",
    rating: "92/100",
    description:
      "Exceptional performance with excellent React knowledge and modern development practices. Strong problem-solving and communication skills demonstrated.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    ],
  },
  {
    logo: "/companies-icon/adobe.png",
    tag: "UI/UX",
    title: "Product Designer Role",
    date: "Oct 05, 2025",
    rating: "67/100",
    description:
      "Good design fundamentals with room for improvement in user research and prototyping skills. Creative thinking is evident but needs refinement.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobe/adobe-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg"
    ],
  },
  {
    logo: "/companies-icon/tiktok.png",
    tag: "Mobile",
    title: "iOS Developer Interview",
    date: "Oct 12, 2025",
    rating: "85/100",
    description:
      "Strong iOS development skills with excellent Swift knowledge. Good understanding of mobile app architecture and performance optimization.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
    ],
  },
  {
    logo: "/companies-icon/telegram.png",
    tag: "Backend",
    title: "Python Developer Role",
    date: "Oct 20, 2025",
    rating: "73/100",
    description:
      "Solid Python skills with good understanding of backend development. Needs improvement in system design and scalability concepts.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    ],
  },
  {
    logo: "/companies-icon/reddit.png",
    tag: "DevOps",
    title: "Cloud Engineer Position",
    date: "Nov 02, 2025",
    rating: "88/100",
    description:
      "Excellent cloud infrastructure knowledge with strong DevOps practices. Demonstrates good understanding of CI/CD and containerization.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
    ],
  },
  {
    logo: "/companies-icon/pinterest.png",
    tag: "Data Science",
    title: "ML Engineer Interview",
    date: "Nov 10, 2025",
    rating: "76/100",
    description:
      "Good machine learning fundamentals with practical experience. Strong in Python and ML frameworks, needs work on production deployment.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg"
    ],
  },
  {
    logo: "/companies-icon/skype.png",
    tag: "Security",
    title: "Security Engineer Role",
    date: "Nov 18, 2025",
    rating: "81/100",
    description:
      "Strong security fundamentals with good understanding of network security and penetration testing. Excellent analytical skills demonstrated.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wireshark/wireshark-original.svg"
    ],
  },
  {
    logo: "/companies-icon/yahoo.png",
    tag: "QA",
    title: "Test Automation Engineer",
    date: "Dec 01, 2025",
    rating: "69/100",
    description:
      "Good understanding of testing principles and automation frameworks. Needs improvement in test strategy and coverage optimization.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    ],
  },
  {
    logo: "/companies-icon/quora.png",
    tag: "Architecture",
    title: "Solution Architect Position",
    date: "Dec 08, 2025",
    rating: "94/100",
    description:
      "Exceptional architectural thinking with deep understanding of enterprise systems. Excellent communication and stakeholder management skills.",
    techRequired: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
    ],
  }
];

export default data;
