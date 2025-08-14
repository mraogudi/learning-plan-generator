class TechnologyMetadata {
  constructor({
    name,
    baseHours,
    category,
    difficulty,
    learningModules = [],
    resources = [],
    prerequisites = []
  }) {
    this.name = name;
    this.baseHours = baseHours;
    this.category = category;
    this.difficulty = difficulty;
    this.learningModules = learningModules;
    this.resources = resources;
    this.prerequisites = prerequisites;
  }

  // Static method to create default metadata
  static createDefault(technologyName) {
    return new TechnologyMetadata({
      name: technologyName,
      baseHours: 60,
      category: 'General',
      difficulty: 'Medium',
      learningModules: [
        'Fundamentals',
        'Core Concepts',
        'Practical Applications',
        'Best Practices',
        'Advanced Topics'
      ],
      resources: [
        'Official Documentation',
        'Community Resources',
        'Online Tutorials'
      ],
      prerequisites: ['Basic Programming Knowledge']
    });
  }
}

module.exports = TechnologyMetadata; 