const express = require('express');
const router = express.Router();
const LearningPlanController = require('../controllers/learningPlanController');
const { validateLearningPlanRequest, handleValidationErrors } = require('../middleware/validation');

// Create controller instance
const learningPlanController = new LearningPlanController();

// POST /api/learning-plan/generate
router.post('/learning-plan/generate', 
  validateLearningPlanRequest,
  handleValidationErrors,
  async (req, res, next) => {
    await learningPlanController.generateLearningPlan(req, res, next);
  }
);

// POST /api/learning-plan/export
router.post('/learning-plan/export',
  validateLearningPlanRequest,
  handleValidationErrors,
  async (req, res, next) => {
    await learningPlanController.exportLearningPlanToExcel(req, res, next);
  }
);

// GET /api/technologies
router.get('/technologies', async (req, res, next) => {
  await learningPlanController.getAvailableTechnologies(req, res, next);
});

module.exports = router; 