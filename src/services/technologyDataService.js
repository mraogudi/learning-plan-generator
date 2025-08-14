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

    database['express.js'] = new TechnologyMetadata({
      name: 'Express.js',
      baseHours: 60,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Express.js Fundamentals',
        'Routing & Middleware',
        'Request & Response Objects',
        'Template Engines',
        'Error Handling',
        'Authentication & Sessions',
        'Database Integration',
        'RESTful API Design',
        'Security Best Practices',
        'Testing Express Apps',
        'Performance Optimization',
        'Deployment'
      ],
      resources: [
        'Express.js Official Documentation',
        'Express.js Guide',
        'Middleware Examples',
        'Express Generator'
      ],
      prerequisites: ['Node.js', 'JavaScript', 'HTTP Basics']
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

    // Additional commonly used technologies
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

    database['flask'] = new TechnologyMetadata({
      name: 'Flask',
      baseHours: 60,
      category: 'Backend',
      difficulty: 'Medium',
      learningModules: [
        'Flask Fundamentals',
        'Routing & Views',
        'Templates with Jinja2',
        'Forms & Validation',
        'Database Integration',
        'User Authentication',
        'Blueprints',
        'REST API Development',
        'Testing',
        'Deployment'
      ],
      resources: [
        'Flask Documentation',
        'Flask Tutorial',
        'Flask-SQLAlchemy',
        'Flask-Login'
      ],
      prerequisites: ['Python', 'Web Development Basics']
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

    database['azure'] = new TechnologyMetadata({
      name: 'Microsoft Azure',
      baseHours: 100,
      category: 'Cloud',
      difficulty: 'Hard',
      learningModules: [
        'Azure Fundamentals',
        'Virtual Machines & Compute',
        'Storage Solutions',
        'Azure SQL Database',
        'App Services',
        'Azure Functions',
        'Virtual Networks',
        'Identity & Access Management',
        'Monitoring & Logging',
        'Cost Management'
      ],
      resources: [
        'Azure Documentation',
        'Azure Portal',
        'Azure CLI',
        'Azure Learning Paths'
      ],
      prerequisites: ['Cloud Computing Basics', 'Networking']
    });

    database['git'] = new TechnologyMetadata({
      name: 'Git',
      baseHours: 30,
      category: 'DevOps',
      difficulty: 'Easy',
      learningModules: [
        'Version Control Basics',
        'Git Fundamentals',
        'Branching & Merging',
        'Remote Repositories',
        'Collaboration Workflows',
        'Conflict Resolution',
        'Git Hooks',
        'Advanced Git Commands',
        'Best Practices',
        'GitHub/GitLab Integration'
      ],
      resources: [
        'Git Documentation',
        'Pro Git Book',
        'GitHub Guides',
        'Git Cheat Sheet'
      ],
      prerequisites: ['Command Line Basics']
    });

    database['jenkins'] = new TechnologyMetadata({
      name: 'Jenkins',
      baseHours: 55,
      category: 'DevOps',
      difficulty: 'Medium',
      learningModules: [
        'CI/CD Fundamentals',
        'Jenkins Installation & Setup',
        'Creating Build Jobs',
        'Pipeline as Code',
        'Plugin Management',
        'Integration with SCM',
        'Automated Testing',
        'Deployment Pipelines',
        'Monitoring & Notifications',
        'Security & Best Practices'
      ],
      resources: [
        'Jenkins Documentation',
        'Jenkins Handbook',
        'Jenkins Plugins',
        'Pipeline Examples'
      ],
      prerequisites: ['Git', 'Build Tools', 'Command Line']
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

    return database;
  }
}

module.exports = TechnologyDataService; 