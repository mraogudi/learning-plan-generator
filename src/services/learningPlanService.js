const { v4: uuidv4 } = require('uuid');
const TechnologyDataService = require('./technologyDataService');
const { getProficiencyDisplayName, getExperienceDisplayName } = require('../models/enums');

class LearningPlanService {
  constructor() {
    this.technologyDataService = new TechnologyDataService();
  }

  generateLearningPlan(request) {
    const planId = uuidv4();
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const technologyPlans = request.technologies.map(tech => 
      this.generateTechnologyPlan(tech, request.experienceLevel, currentDate)
    );

    return {
      planId,
      planName: request.planName || 'My Learning Plan',
      userName: request.userName,
      createdDate: currentDate,
      technologyPlans
    };
  }

  generateTechnologyPlan(input, globalExperienceLevel, startDate) {
    // Get technology metadata
    const metadata = this.technologyDataService.getTechnologyMetadata(input.technologyName);
    
    // Calculate duration based on proficiency, experience, and rating
    const estimatedHours = this.calculateEstimatedHours(input, globalExperienceLevel, metadata);
    const endDate = this.calculateEndDate(startDate, estimatedHours);
    
    // Generate learning modules and resources
    const learningModules = this.generateLearningModules(input, metadata);
    const resources = this.generateRecommendedResources(input, metadata);
    const milestones = this.generateMilestones(input, startDate, endDate, learningModules);

    return {
      technologyName: input.technologyName,
      proficiencyLevel: getProficiencyDisplayName(input.proficiencyLevel),
      experienceLevel: getExperienceDisplayName(globalExperienceLevel),
      suggestedPath: this.generateSuggestedPath(input, metadata),
      startDate,
      endDate,
      estimatedHours,
      learningModules,
      recommendedResources: resources,
      milestones
    };
  }

  calculateEstimatedHours(input, globalExperienceLevel, metadata) {
    const baseHours = metadata.baseHours;
    const proficiencyMultiplier = this.getProficiencyMultiplier(input.proficiencyLevel);
    const experienceMultiplier = this.getExperienceMultiplier(globalExperienceLevel);
    const ratingMultiplier = this.getRatingMultiplier(input.rating);
    
    return Math.round(baseHours * proficiencyMultiplier * experienceMultiplier * ratingMultiplier);
  }

  getProficiencyMultiplier(level) {
    switch (level) {
      case 'BEGINNER': return 1.0;
      case 'INTERMEDIATE': return 0.7;
      case 'ADVANCED': return 0.4;
      default: return 1.0;
    }
  }

  getExperienceMultiplier(level) {
    switch (level) {
      case 'ENTRY_LEVEL': return 1.2;
      case 'MID_LEVEL': return 1.0;
      case 'SENIOR_LEVEL': return 0.8;
      default: return 1.0;
    }
  }

  getRatingMultiplier(rating) {
    // Lower rating means more time needed (rating 1 = more time, rating 10 = less time)
    const normalizedRating = Math.max(1, Math.min(10, rating)); // Ensure rating is between 1-10
    return 1.5 - (normalizedRating * 0.05); // Range from 1.45 (rating 1) to 1.0 (rating 10)
  }

  calculateEndDate(startDate, estimatedHours) {
    // Assuming 10 hours of study per week
    const weeksNeeded = Math.max(1, Math.ceil(estimatedHours / 10));
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (weeksNeeded * 7));
    return end.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  generateLearningModules(input, metadata) {
    const allModules = [...metadata.learningModules];
    
    // Filter modules based on proficiency level
    switch (input.proficiencyLevel) {
      case 'BEGINNER':
        return allModules;
      case 'INTERMEDIATE':
        return allModules.slice(2); // Skip basics
      case 'ADVANCED':
        return allModules.slice(4); // Skip basics and intermediate
      default:
        return allModules;
    }
  }

  generateRecommendedResources(input, metadata) {
    const resources = [...metadata.resources];
    
    // Add level-specific resources
    switch (input.proficiencyLevel) {
      case 'BEGINNER':
        resources.push(
          'Official Documentation',
          'Beginner Tutorial Series',
          'Interactive Coding Exercises'
        );
        break;
      case 'INTERMEDIATE':
        resources.push(
          'Best Practices Guide',
          'Real-world Projects',
          'Community Forums'
        );
        break;
      case 'ADVANCED':
        resources.push(
          'Advanced Patterns',
          'Performance Optimization',
          'Open Source Contributions'
        );
        break;
    }
    
    return resources;
  }

  generateMilestones(input, startDate, endDate, modules) {
    const milestones = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.ceil(totalDays / 7);
    const moduleInterval = Math.max(1, Math.floor(totalWeeks / modules.length));

    modules.forEach((module, index) => {
      const milestoneDate = new Date(start);
      milestoneDate.setDate(start.getDate() + ((index + 1) * moduleInterval * 7));
      
      milestones.push({
        title: `Complete ${module}`,
        description: `Master the concepts and complete practical exercises for ${module}`,
        targetDate: milestoneDate.toISOString().split('T')[0],
        estimatedHours: 10 + (index * 5) // Progressive complexity
      });
    });

    return milestones;
  }

  generateSuggestedPath(input, metadata) {
    switch (input.proficiencyLevel) {
      case 'BEGINNER':
        return 'Foundation → Basics → Practice → Projects → Assessment';
      case 'INTERMEDIATE':
        return 'Review → Advanced Concepts → Real Projects → Best Practices';
      case 'ADVANCED':
        return 'Deep Dive → Optimization → Architecture → Leadership';
      default:
        return 'Foundation → Practice → Mastery';
    }
  }
}

module.exports = LearningPlanService; 