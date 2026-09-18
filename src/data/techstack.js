const TECH_STACK = {
  languages: [
    { icon: "html.svg", label: "HTML" },
    { icon: "css.svg", label: "CSS" },
    { icon: "javascript.svg", label: "JavaScript" },
    { icon: "typescript.svg", label: "TypeScript" },
    { icon: "php.svg", label: "PHP 8.x" },
    { icon: "sass.svg", label: "SASS" },
    { icon: "java.svg", label: "Java" },
    { icon: "python.svg", label: "Python" },
  ],

  frontend: [
    { icon: "react.svg", label: "React" },
    { icon: "next.svg", label: "Next.js" },
    { icon: "vue.svg", label: "Vue" },
    { icon: "laravel.svg", label: "Blade" },
    { icon: "tailwind.svg", label: "Tailwind" },
    { icon: "bootstrap.svg", label: "Bootstrap" },
  ],

  mobile: [
    { icon: "react.svg", label: "React Native" },
    { icon: null, label: "Jetpack Compose", fallback: "android" },
    { icon: null, label: "Android Studio", fallback: "smartphone" },
    { icon: null, label: "Arduino Uno", fallback: "memory" },
  ],

  backend: {
    logic: [
      { icon: "laravel.svg", label: "Laravel" },
      { icon: "node.svg", label: "Node.js" },
      { icon: "express.svg", label: "Express" },
    ],
    persistence: [
      { icon: "postgresql.svg", label: "PostgreSQL" },
      { icon: "mysql.svg", label: "MySQL" },
      { icon: "mongodb.svg", label: "MongoDB" },
      { icon: "firebase.svg", label: "Firebase" },
    ],
  },

  cloud: [
    { icon: "vercel.svg", label: "Vercel" },
    { icon: "aws.svg", label: "AWS" },
    { icon: "azure.svg", label: "Azure" },
    { icon: null, label: "Hostinger", fallback: "dns" },
    { icon: null, label: "Salesforce", fallback: "cloud" },
  ],

  workflow: [
    { icon: "git.svg", label: "Git" },
    { icon: "github.svg", label: "GitHub" },
    { icon: "postman.svg", label: "Postman" },
    { icon: "jira.svg", label: "Jira" },
    { icon: "figma.svg", label: "Figma" },
    { icon: null, label: "VS Code", fallback: "code" },
    { icon: null, label: "Kiro", fallback: "assistant_navigation" },
  ],

  methodologies: [
    "REST APIs",
    "MVC Pattern",
    "OAuth / JWT",
    "CI/CD Pipelines",
    "Agile Method",
    "Waterfall",
  ],
};

export default TECH_STACK;
