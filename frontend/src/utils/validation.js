export const validateTechnologyForm = (technologies) => {
  const errors = [];

  if (!technologies || technologies.length === 0) {
    errors.push('At least one technology must be added');
    return errors;
  }

  technologies.forEach((tech, index) => {
    if (!tech.technologyName || tech.technologyName.trim() === '') {
      errors.push(`Technology #${index + 1}: Technology name is required`);
    }

    if (!tech.proficiencyLevel) {
      errors.push(`Technology #${index + 1}: Proficiency level is required`);
    }

    if (!tech.experienceLevel) {
      errors.push(`Technology #${index + 1}: Experience level is required`);
    }

    // Check for duplicate technologies
    const duplicates = technologies.filter(
      (t, i) => i !== index && t.technologyName.toLowerCase() === tech.technologyName.toLowerCase()
    );
    if (duplicates.length > 0) {
      errors.push(`Technology #${index + 1}: Duplicate technology "${tech.technologyName}"`);
    }
  });

  return errors;
};

export const validateUserInfo = (userName, planName) => {
  const errors = [];

  if (userName && userName.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (planName && planName.length < 3) {
    errors.push('Plan name must be at least 3 characters long');
  }

  return errors;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
};

export const isValidTechnologyName = (name) => {
  if (!name || typeof name !== 'string') return false;
  
  const sanitized = sanitizeInput(name);
  return sanitized.length >= 2 && sanitized.length <= 50;
}; 