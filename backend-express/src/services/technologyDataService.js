const TechnologyMetadata = require('../models/TechnologyMetadata');

class TechnologyDataService {
  constructor() {
    this.technologyDatabase = this.initializeTechnologyDatabase();
  }

  getTechnologyMetadata(technologyName) {
    const key = technologyName.toLowerCase();
    return this.technologyDatabase[key] || TechnologyMetadata.createDefault(technologyName);
  }

  getAllAvailableTechnologies() {
    return Object.keys(this.technologyDatabase);
  }

  initializeTechnologyDatabase() {
    const database = {};

    // Frontend Technologies
    database['reactjs'] = new TechnologyMetadata({
      name: 'ReactJS',
      baseHours: 80,
      category: 'Frontend',
      difficulty: 'Medium',
      learningModules: [
        'JavaScript Fundamentals',
        'React Basics & JSX',
        'Components & Props',
        'State & Lifecycle',
        'Event Handling',
        'React Hooks',
        'Context API',
        'React Router',
        'State Management',
        'Testing React Apps',
        'Performance Optimization',
        'Advanced Patterns'
      ],
      resources: [
        'React Official Documentation',
        'Create React App',
        'React DevTools',
        'Redux Toolkit'
      ],
      prerequisites: ['HTML', 'CSS', 'JavaScript ES6+']
    });

    database['vue.js'] = new TechnologyMetadata({
      name: 'Vue.js',
      baseHours: 70,
      category: 'Frontend',
      difficulty: 'Medium',
      learningModules: [
        'Vue.js Fundamentals',
        'Template Syntax',
        'Data Binding',
        'Computed Properties',
        'Components',
        'Vue Router',
        'Vuex State Management',
        'Vue CLI',
        'Composition API',
        'Testing Vue Apps',
        'Performance Optimization'
      ],
      resources: [
        'Vue.js Official Guide',
        'Vue CLI',
        'Vue DevTools',
        'Nuxt.js Framework'
      ],
      prerequisites: ['HTML', 'CSS', 'JavaScript']
    });

    database['angular'] = new TechnologyMetadata({
      name: 'Angular',
      baseHours: 100,
      category: 'Frontend',
      difficulty: 'Hard',
      learningModules: [
        'TypeScript Fundamentals',
        'Angular Architecture',
        'Components & Templates',
        'Data Binding',
        'Directives',
        'Services & Dependency Injection',
        'Routing',
        'Forms & Validation',
        'HTTP Client',
        'RxJS & Observables',
        'Testing',
        'Performance & Optimization'
      ],
      resources: [
        'Angular Official Documentation',
        'Angular CLI',
        'Angular DevTools',
        'RxJS Documentation'
      ],
      prerequisites: ['HTML', 'CSS', 'JavaScript', 'TypeScript']
    });

    // Backend Technologies
    database['java'] = new TechnologyMetadata({
      name: 'Java',
      baseHours: 120,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Java Syntax & Basics',
        'Object-Oriented Programming',
        'Collections Framework',
        'Exception Handling',
        'File I/O & Streams',
        'Multithreading',
        'Generics',
        'Lambda Expressions',
        'Stream API',
        'JDBC',
        'Testing with JUnit',
        'Design Patterns'
      ],
      resources: [
        'Oracle Java Documentation',
        'Java SE Development Kit',
        'IntelliJ IDEA',
        'Eclipse IDE'
      ],
      prerequisites: ['Programming Fundamentals']
    });

    database['spring boot'] = new TechnologyMetadata({
      name: 'Spring Boot',
      baseHours: 90,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Spring Framework Basics',
        'Dependency Injection',
        'Spring Boot Fundamentals',
        'RESTful Web Services',
        'Spring Data JPA',
        'Security with Spring Security',
        'Testing Spring Applications',
        'Microservices Architecture',
        'Actuator & Monitoring',
        'Deployment Strategies'
      ],
      resources: [
        'Spring Boot Documentation',
        'Spring Initializr',
        'Spring Boot DevTools',
        'Spring Security Reference'
      ],
      prerequisites: ['Java', 'Web Development Basics']
    });

    database['node.js'] = new TechnologyMetadata({
      name: 'Node.js',
      baseHours: 75,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Node.js Fundamentals',
        'NPM & Package Management',
        'Asynchronous Programming',
        'Express.js Framework',
        'RESTful APIs',
        'Database Integration',
        'Authentication & Authorization',
        'Error Handling',
        'Testing Node.js Apps',
        'Performance Optimization',
        'Deployment'
      ],
      resources: [
        'Node.js Official Documentation',
        'NPM Registry',
        'Express.js Guide',
        'MongoDB Documentation'
      ],
      prerequisites: ['JavaScript', 'Web Development Basics']
    });

    // More Frontend Technologies
    database['svelte'] = new TechnologyMetadata({
      name: 'Svelte',
      baseHours: 60,
      category: 'Frontend',
      difficulty: 'Medium',
      learningModules: [
        'Svelte Fundamentals',
        'Component Basics',
        'Reactivity',
        'Stores & State Management',
        'Lifecycle Methods',
        'Animations & Transitions',
        'SvelteKit Framework',
        'Routing',
        'Server-Side Rendering',
        'Testing Svelte Apps'
      ],
      resources: [
        'Svelte Official Tutorial',
        'SvelteKit Documentation',
        'Svelte REPL',
        'Svelte Society'
      ],
      prerequisites: ['HTML', 'CSS', 'JavaScript']
    });

    database['typescript'] = new TechnologyMetadata({
      name: 'TypeScript',
      baseHours: 45,
      category: 'Frontend',
      difficulty: 'Medium',
      learningModules: [
        'TypeScript Basics',
        'Type Annotations',
        'Interfaces & Types',
        'Generics',
        'Classes & Inheritance',
        'Modules & Namespaces',
        'Advanced Types',
        'Decorators',
        'Configuration',
        'Integration with React/Vue'
      ],
      resources: [
        'TypeScript Handbook',
        'TypeScript Playground',
        'Definitely Typed',
        'TypeScript ESLint'
      ],
      prerequisites: ['JavaScript ES6+']
    });

    database['nextjs'] = new TechnologyMetadata({
      name: 'Next.js',
      baseHours: 70,
      category: 'Frontend',
      difficulty: 'Medium',
      learningModules: [
        'Next.js Fundamentals',
        'Pages & Routing',
        'API Routes',
        'Server-Side Rendering',
        'Static Site Generation',
        'Image Optimization',
        'Performance',
        'Deployment',
        'Authentication',
        'Database Integration'
      ],
      resources: [
        'Next.js Documentation',
        'Vercel Platform',
        'Next.js Examples',
        'Next.js Blog'
      ],
      prerequisites: ['React', 'JavaScript', 'Node.js']
    });

    // Backend Technologies (Additional)
    database['python'] = new TechnologyMetadata({
      name: 'Python',
      baseHours: 100,
      category: 'Backend',
      difficulty: 'Easy',
      learningModules: [
        'Python Syntax & Basics',
        'Data Types & Structures',
        'Functions & Modules',
        'Object-Oriented Programming',
        'File Handling',
        'Exception Handling',
        'Libraries & Packages',
        'Virtual Environments',
        'Testing with pytest',
        'Web Development Basics'
      ],
      resources: [
        'Python Official Documentation',
        'Python.org Tutorial',
        'PyPI Package Index',
        'Real Python'
      ],
      prerequisites: ['Programming Fundamentals']
    });

    database['django'] = new TechnologyMetadata({
      name: 'Django',
      baseHours: 85,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Django Fundamentals',
        'Models & ORM',
        'Views & Templates',
        'URL Routing',
        'Forms & Validation',
        'Admin Interface',
        'Authentication & Authorization',
        'REST Framework',
        'Testing',
        'Deployment'
      ],
      resources: [
        'Django Documentation',
        'Django REST Framework',
        'Django Girls Tutorial',
        'Django Packages'
      ],
      prerequisites: ['Python', 'Web Development Basics']
    });

    database['fastapi'] = new TechnologyMetadata({
      name: 'FastAPI',
      baseHours: 70,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'FastAPI Basics',
        'Path Operations',
        'Request Body & Validation',
        'Query Parameters',
        'Dependencies',
        'Security & Authentication',
        'Database Integration',
        'Background Tasks',
        'Testing',
        'Deployment'
      ],
      resources: [
        'FastAPI Documentation',
        'FastAPI Tutorial',
        'Pydantic Documentation',
        'Starlette Framework'
      ],
      prerequisites: ['Python', 'Basic API Knowledge']
    });

    database['go'] = new TechnologyMetadata({
      name: 'Go (Golang)',
      baseHours: 80,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Go Fundamentals',
        'Variables & Types',
        'Functions & Methods',
        'Structs & Interfaces',
        'Concurrency (Goroutines)',
        'Channels',
        'Package Management',
        'Web Development with Gin/Echo',
        'Testing',
        'Deployment'
      ],
      resources: [
        'Go Official Documentation',
        'Go Tour',
        'Go by Example',
        'Effective Go'
      ],
      prerequisites: ['Programming Fundamentals']
    });

    database['rust'] = new TechnologyMetadata({
      name: 'Rust',
      baseHours: 120,
      category: 'Backend',
      difficulty: 'Hard',
      learningModules: [
        'Rust Basics',
        'Ownership & Borrowing',
        'Memory Safety',
        'Structs & Enums',
        'Pattern Matching',
        'Error Handling',
        'Concurrency',
        'Web Development (Actix/Warp)',
        'Testing',
        'Performance'
      ],
      resources: [
        'The Rust Book',
        'Rust by Example',
        'Rustlings',
        'Crates.io'
      ],
      prerequisites: ['Systems Programming Knowledge']
    });

    database['dotnet'] = new TechnologyMetadata({
      name: '.NET Core',
      baseHours: 95,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'C# Fundamentals',
        '.NET Core Basics',
        'ASP.NET Core',
        'Entity Framework Core',
        'Dependency Injection',
        'Middleware',
        'API Development',
        'Authentication & Authorization',
        'Testing',
        'Deployment'
      ],
      resources: [
        'Microsoft .NET Documentation',
        'ASP.NET Core Tutorial',
        'Entity Framework Core',
        'NuGet Package Manager'
      ],
      prerequisites: ['C# Programming', 'OOP Concepts']
    });

    // Database Technologies
    database['mysql'] = new TechnologyMetadata({
      name: 'MySQL',
      baseHours: 60,
      category: 'Database',
      difficulty: 'Medium',
      learningModules: [
        'SQL Fundamentals',
        'Database Design',
        'CRUD Operations',
        'Joins & Relationships',
        'Indexing',
        'Stored Procedures',
        'Triggers',
        'Performance Optimization',
        'Backup & Recovery',
        'Replication'
      ],
      resources: [
        'MySQL Official Documentation',
        'MySQL Workbench',
        'phpMyAdmin',
        'SQL Tutorial Resources'
      ],
      prerequisites: ['Database Concepts']
    });

    database['postgresql'] = new TechnologyMetadata({
      name: 'PostgreSQL',
      baseHours: 65,
      category: 'Database',
      difficulty: 'Medium',
      learningModules: [
        'PostgreSQL Fundamentals',
        'Advanced SQL',
        'JSON & JSONB',
        'Full-Text Search',
        'Indexing Strategies',
        'Views & Materialized Views',
        'Stored Procedures & Functions',
        'Performance Tuning',
        'Replication',
        'Extensions'
      ],
      resources: [
        'PostgreSQL Documentation',
        'pgAdmin',
        'PostGIS for GIS',
        'PostgreSQL Tutorial'
      ],
      prerequisites: ['SQL Basics', 'Database Design']
    });

    database['mongodb'] = new TechnologyMetadata({
      name: 'MongoDB',
      baseHours: 50,
      category: 'Database',
      difficulty: 'Medium',
      learningModules: [
        'NoSQL Concepts',
        'MongoDB Basics',
        'CRUD Operations',
        'Aggregation Framework',
        'Indexing',
        'Schema Design',
        'Replication',
        'Sharding',
        'Performance Tuning',
        'MongoDB Atlas'
      ],
      resources: [
        'MongoDB Documentation',
        'MongoDB Compass',
        'MongoDB Atlas',
        'Mongoose ODM'
      ],
      prerequisites: ['Database Concepts', 'JSON']
    });

    database['redis'] = new TechnologyMetadata({
      name: 'Redis',
      baseHours: 40,
      category: 'Database',
      difficulty: 'Easy',
      learningModules: [
        'Redis Fundamentals',
        'Data Types',
        'Caching Strategies',
        'Pub/Sub Messaging',
        'Persistence',
        'Clustering',
        'Security',
        'Performance Monitoring',
        'Redis Modules',
        'Integration Patterns'
      ],
      resources: [
        'Redis Documentation',
        'Redis University',
        'Redis CLI',
        'Redis Desktop Manager'
      ],
      prerequisites: ['Basic Database Knowledge']
    });

    database['elasticsearch'] = new TechnologyMetadata({
      name: 'Elasticsearch',
      baseHours: 75,
      category: 'Database',
      difficulty: 'Hard',
      learningModules: [
        'Elasticsearch Basics',
        'Index Management',
        'Search Queries',
        'Aggregations',
        'Mapping & Analysis',
        'Cluster Management',
        'Performance Tuning',
        'Security',
        'Monitoring',
        'ELK Stack Integration'
      ],
      resources: [
        'Elastic Documentation',
        'Elasticsearch Guide',
        'Kibana',
        'Elastic Community'
      ],
      prerequisites: ['JSON', 'Search Concepts']
    });

    // Cloud & DevOps Technologies
    database['aws'] = new TechnologyMetadata({
      name: 'Amazon Web Services (AWS)',
      baseHours: 100,
      category: 'Cloud',
      difficulty: 'Hard',
      learningModules: [
        'AWS Fundamentals',
        'EC2 & Compute Services',
        'S3 & Storage',
        'RDS & Databases',
        'Lambda & Serverless',
        'VPC & Networking',
        'IAM & Security',
        'CloudFormation',
        'Monitoring & Logging',
        'Cost Optimization'
      ],
      resources: [
        'AWS Documentation',
        'AWS Training',
        'AWS CLI',
        'AWS Console'
      ],
      prerequisites: ['Cloud Computing Basics', 'Networking']
    });

    database['docker'] = new TechnologyMetadata({
      name: 'Docker',
      baseHours: 50,
      category: 'DevOps',
      difficulty: 'Medium',
      learningModules: [
        'Container Fundamentals',
        'Docker Architecture',
        'Images & Containers',
        'Dockerfile',
        'Docker Compose',
        'Networking',
        'Volumes & Storage',
        'Multi-stage Builds',
        'Security Best Practices',
        'Production Deployment'
      ],
      resources: [
        'Docker Documentation',
        'Docker Hub',
        'Docker Desktop',
        'Play with Docker'
      ],
      prerequisites: ['Linux Basics', 'Command Line']
    });

    database['kubernetes'] = new TechnologyMetadata({
      name: 'Kubernetes',
      baseHours: 90,
      category: 'DevOps',
      difficulty: 'Hard',
      learningModules: [
        'Kubernetes Architecture',
        'Pods & Deployments',
        'Services & Networking',
        'ConfigMaps & Secrets',
        'Persistent Volumes',
        'Ingress Controllers',
        'Helm Package Manager',
        'Monitoring & Logging',
        'Security',
        'Troubleshooting'
      ],
      resources: [
        'Kubernetes Documentation',
        'kubectl CLI',
        'Minikube',
        'Kubernetes Academy'
      ],
      prerequisites: ['Docker', 'Container Concepts', 'Networking']
    });

    // Mobile Development
    database['react-native'] = new TechnologyMetadata({
      name: 'React Native',
      baseHours: 85,
      category: 'Mobile',
      difficulty: 'Medium',
      learningModules: [
        'React Native Fundamentals',
        'Components & Navigation',
        'State Management',
        'Native Modules',
        'Platform APIs',
        'Performance Optimization',
        'Testing',
        'Deployment',
        'Push Notifications',
        'App Store Publishing'
      ],
      resources: [
        'React Native Documentation',
        'Expo Platform',
        'React Native CLI',
        'React Native Community'
      ],
      prerequisites: ['React', 'JavaScript', 'Mobile Development Basics']
    });

    database['flutter'] = new TechnologyMetadata({
      name: 'Flutter',
      baseHours: 90,
      category: 'Mobile',
      difficulty: 'Medium',
      learningModules: [
        'Dart Programming',
        'Flutter Fundamentals',
        'Widgets & Layouts',
        'State Management',
        'Navigation & Routing',
        'Animations',
        'Platform Integration',
        'Testing',
        'Performance',
        'Deployment'
      ],
      resources: [
        'Flutter Documentation',
        'Dart Language Tour',
        'Flutter DevTools',
        'Pub.dev Packages'
      ],
      prerequisites: ['Programming Fundamentals', 'Mobile Development Concepts']
    });

    // Data Science & AI/ML
    database['tensorflow'] = new TechnologyMetadata({
      name: 'TensorFlow',
      baseHours: 110,
      category: 'AI/ML',
      difficulty: 'Hard',
      learningModules: [
        'Machine Learning Basics',
        'TensorFlow Fundamentals',
        'Neural Networks',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'Model Training & Evaluation',
        'TensorFlow Serving',
        'TensorFlow Lite',
        'Production Deployment'
      ],
      resources: [
        'TensorFlow Documentation',
        'TensorFlow Tutorials',
        'Keras API',
        'TensorFlow Hub'
      ],
      prerequisites: ['Python', 'Mathematics', 'Statistics']
    });

    database['pytorch'] = new TechnologyMetadata({
      name: 'PyTorch',
      baseHours: 105,
      category: 'AI/ML',
      difficulty: 'Hard',
      learningModules: [
        'PyTorch Fundamentals',
        'Tensors & Autograd',
        'Neural Networks',
        'Computer Vision (torchvision)',
        'Natural Language Processing',
        'Model Training',
        'Transfer Learning',
        'Deployment',
        'Optimization',
        'Research & Experimentation'
      ],
      resources: [
        'PyTorch Documentation',
        'PyTorch Tutorials',
        'Papers with Code',
        'PyTorch Hub'
      ],
      prerequisites: ['Python', 'NumPy', 'Machine Learning Basics']
    });

    // Testing & Quality Assurance
    database['selenium'] = new TechnologyMetadata({
      name: 'Selenium',
      baseHours: 60,
      category: 'Testing',
      difficulty: 'Medium',
      learningModules: [
        'Test Automation Basics',
        'Selenium WebDriver',
        'Locating Elements',
        'Test Framework Integration',
        'Page Object Model',
        'Data-Driven Testing',
        'Cross-Browser Testing',
        'Parallel Execution',
        'Reporting',
        'CI/CD Integration'
      ],
      resources: [
        'Selenium Documentation',
        'Selenium Grid',
        'TestNG/JUnit',
        'Selenium IDE'
      ],
      prerequisites: ['Programming (Java/Python)', 'Web Technologies']
    });

    database['cypress'] = new TechnologyMetadata({
      name: 'Cypress',
      baseHours: 45,
      category: 'Testing',
      difficulty: 'Easy',
      learningModules: [
        'Cypress Fundamentals',
        'Writing Tests',
        'Assertions & Commands',
        'Fixtures & Mock Data',
        'Custom Commands',
        'Visual Testing',
        'API Testing',
        'CI/CD Integration',
        'Debugging',
        'Best Practices'
      ],
      resources: [
        'Cypress Documentation',
        'Cypress Dashboard',
        'Cypress Examples',
        'Cypress Community'
      ],
      prerequisites: ['JavaScript', 'Web Development']
    });

    return database;
  }
}

module.exports = TechnologyDataService; 