// Proficiency Level Enum
const ProficiencyLevel = {
  BEGINNER: {
    value: 'BEGINNER',
    displayName: 'Beginner'
  },
  INTERMEDIATE: {
    value: 'INTERMEDIATE',
    displayName: 'Intermediate'
  },
  ADVANCED: {
    value: 'ADVANCED',
    displayName: 'Advanced'
  }
};

// Experience Level Enum
const ExperienceLevel = {
  ENTRY_LEVEL: {
    value: 'ENTRY_LEVEL',
    displayName: '0-1 years'
  },
  MID_LEVEL: {
    value: 'MID_LEVEL',
    displayName: '1-3 years'
  },
  SENIOR_LEVEL: {
    value: 'SENIOR_LEVEL',
    displayName: '3+ years'
  }
};

// Helper functions to get display names
const getProficiencyDisplayName = (level) => {
  return ProficiencyLevel[level]?.displayName || level;
};

const getExperienceDisplayName = (level) => {
  return ExperienceLevel[level]?.displayName || level;
};

// Validation helpers
const isValidProficiencyLevel = (level) => {
  return Object.keys(ProficiencyLevel).includes(level);
};

const isValidExperienceLevel = (level) => {
  return Object.keys(ExperienceLevel).includes(level);
};

module.exports = {
  ProficiencyLevel,
  ExperienceLevel,
  getProficiencyDisplayName,
  getExperienceDisplayName,
  isValidProficiencyLevel,
  isValidExperienceLevel
}; 