const { body, validationResult } = require('express-validator');

// Validation rules for learning plan request
const validateLearningPlanRequest = [
  body('userName')
    .notEmpty()
    .withMessage('User name is required')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('User name must be between 2 and 100 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('experienceLevel')
    .notEmpty()
    .withMessage('Experience level is required')
    .isIn(['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL'])
    .withMessage('Invalid experience level'),

  body('planName')
    .notEmpty()
    .withMessage('Plan name is required')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Plan name must be between 2 and 200 characters'),

  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be provided'),

  body('technologies.*.technologyName')
    .notEmpty()
    .withMessage('Technology name is required')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Technology name must be between 1 and 100 characters'),

  body('technologies.*.proficiencyLevel')
    .notEmpty()
    .withMessage('Proficiency level is required')
    .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
    .withMessage('Invalid proficiency level'),

  body('technologies.*.rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 10 })
    .withMessage('Rating must be between 1 and 10')
];

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationError = new Error('Validation failed');
    validationError.name = 'ValidationError';
    validationError.details = errors.array();
    validationError.statusCode = 400;
    return next(validationError);
  }
  
  next();
};

module.exports = {
  validateLearningPlanRequest,
  handleValidationErrors
}; 