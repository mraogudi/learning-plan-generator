const LearningPlanService = require('../services/learningPlanService');
const ExcelGenerationService = require('../services/excelGenerationService');
const TechnologyDataService = require('../services/technologyDataService');

class LearningPlanController {
  constructor() {
    this.learningPlanService = new LearningPlanService();
    this.excelGenerationService = new ExcelGenerationService();
    this.technologyDataService = new TechnologyDataService();
  }

  async generateLearningPlan(req, res, next) {
    try {
      console.log('Generating learning plan for:', req.body.userName);
      const response = this.learningPlanService.generateLearningPlan(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error generating learning plan:', error);
      next(error);
    }
  }

  async exportLearningPlanToExcel(req, res, next) {
    try {
      console.log('Exporting learning plan to Excel for:', req.body.userName);
      
      // Generate the learning plan
      const learningPlan = this.learningPlanService.generateLearningPlan(req.body);
      
      // Generate Excel file
      const excelBuffer = await this.excelGenerationService.generateExcelFile(learningPlan);
      
      // Generate filename
      const filename = this.generateFileName(learningPlan.planName) + '.xlsx';
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', excelBuffer.length);
      
      // Send the file
      res.send(excelBuffer);
    } catch (error) {
      console.error('Error exporting learning plan to Excel:', error);
      next(error);
    }
  }

  async getAvailableTechnologies(req, res, next) {
    try {
      console.log('Fetching available technologies');
      const technologies = this.technologyDataService.getAllAvailableTechnologies();
      res.status(200).json(technologies);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      next(error);
    }
  }

  generateFileName(planName) {
    return planName ? 
      planName.replace(/[^a-zA-Z0-9\-_]/g, '_') : 
      'learning_plan';
  }
}

module.exports = LearningPlanController; 