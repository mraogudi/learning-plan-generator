const ExcelJS = require('exceljs');

class ExcelGenerationService {
  async generateExcelFile(learningPlan) {
    const workbook = new ExcelJS.Workbook();
    
    // Create main overview sheet
    this.createOverviewSheet(workbook, learningPlan);
    
    // Create detailed sheets for each technology
    learningPlan.technologyPlans.forEach(techPlan => {
      this.createTechnologySheet(workbook, techPlan);
    });
    
    // Convert to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  createOverviewSheet(workbook, learningPlan) {
    const worksheet = workbook.addWorksheet('Learning Plan Overview');
    
    // Title
    worksheet.mergeCells('A1:G1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `Learning Plan: ${learningPlan.planName}`;
    titleCell.style = this.getHeaderStyle();
    
    // Plan details
    let row = 3;
    this.createDetailRow(worksheet, row++, 'Created By:', learningPlan.userName);
    this.createDetailRow(worksheet, row++, 'Created Date:', learningPlan.createdDate);
    this.createDetailRow(worksheet, row++, 'Plan ID:', learningPlan.planId);
    
    row++; // Empty row
    
    // Technologies summary header
    const headerRow = worksheet.getRow(row++);
    const headers = ['Technology', 'Proficiency', 'Experience', 'Start Date', 'End Date', 'Estimated Hours', 'Suggested Path'];
    headers.forEach((header, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = header;
      cell.style = this.getSubHeaderStyle();
    });
    
    // Technologies data
    learningPlan.technologyPlans.forEach(techPlan => {
      const dataRow = worksheet.getRow(row++);
      const data = [
        techPlan.technologyName,
        techPlan.proficiencyLevel,
        techPlan.experienceLevel,
        techPlan.startDate,
        techPlan.endDate,
        techPlan.estimatedHours,
        techPlan.suggestedPath
      ];
      
      data.forEach((value, index) => {
        const cell = dataRow.getCell(index + 1);
        cell.value = value;
        cell.style = this.getDataStyle();
      });
    });
    
    // Auto-size columns
    worksheet.columns.forEach(column => {
      column.width = 15;
    });
  }

  createTechnologySheet(workbook, techPlan) {
    const worksheet = workbook.addWorksheet(techPlan.technologyName);
    
    // Title
    worksheet.mergeCells('A1:D1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `Learning Plan: ${techPlan.technologyName}`;
    titleCell.style = this.getHeaderStyle();
    
    let row = 3;
    
    // Technology details
    this.createDetailRow(worksheet, row++, 'Proficiency Level:', techPlan.proficiencyLevel);
    this.createDetailRow(worksheet, row++, 'Experience Level:', techPlan.experienceLevel);
    this.createDetailRow(worksheet, row++, 'Start Date:', techPlan.startDate);
    this.createDetailRow(worksheet, row++, 'End Date:', techPlan.endDate);
    this.createDetailRow(worksheet, row++, 'Estimated Hours:', techPlan.estimatedHours.toString());
    this.createDetailRow(worksheet, row++, 'Suggested Path:', techPlan.suggestedPath);
    
    row++; // Empty row
    
    // Learning Modules
    const modulesHeaderCell = worksheet.getCell(`A${row++}`);
    modulesHeaderCell.value = 'Learning Modules';
    modulesHeaderCell.style = this.getSubHeaderStyle();
    
    techPlan.learningModules.forEach(module => {
      const moduleCell = worksheet.getCell(`B${row++}`);
      moduleCell.value = `• ${module}`;
      moduleCell.style = this.getDataStyle();
    });
    
    row++; // Empty row
    
    // Recommended Resources
    const resourcesHeaderCell = worksheet.getCell(`A${row++}`);
    resourcesHeaderCell.value = 'Recommended Resources';
    resourcesHeaderCell.style = this.getSubHeaderStyle();
    
    techPlan.recommendedResources.forEach(resource => {
      const resourceCell = worksheet.getCell(`B${row++}`);
      resourceCell.value = `• ${resource}`;
      resourceCell.style = this.getDataStyle();
    });
    
    row++; // Empty row
    
    // Milestones
    const milestonesHeaderCell = worksheet.getCell(`A${row++}`);
    milestonesHeaderCell.value = 'Milestones';
    milestonesHeaderCell.style = this.getSubHeaderStyle();
    
    // Milestone table headers
    const milestoneHeaderRow = worksheet.getRow(row++);
    const milestoneHeaders = ['Title', 'Description', 'Target Date', 'Estimated Hours'];
    milestoneHeaders.forEach((header, index) => {
      const cell = milestoneHeaderRow.getCell(index + 1);
      cell.value = header;
      cell.style = this.getSubHeaderStyle();
    });
    
    // Milestone data
    techPlan.milestones.forEach(milestone => {
      const milestoneRow = worksheet.getRow(row++);
      const data = [
        milestone.title,
        milestone.description,
        milestone.targetDate,
        milestone.estimatedHours
      ];
      
      data.forEach((value, index) => {
        const cell = milestoneRow.getCell(index + 1);
        cell.value = value;
        cell.style = this.getDataStyle();
      });
    });
    
    // Auto-size columns
    worksheet.columns.forEach(column => {
      column.width = 20;
    });
  }

  createDetailRow(worksheet, rowNumber, label, value) {
    const labelCell = worksheet.getCell(`A${rowNumber}`);
    labelCell.value = label;
    labelCell.style = this.getSubHeaderStyle();
    
    const valueCell = worksheet.getCell(`B${rowNumber}`);
    valueCell.value = value;
    valueCell.style = this.getDataStyle();
  }

  getHeaderStyle() {
    return {
      font: {
        bold: true,
        size: 16,
        color: { argb: 'FFFFFFFF' }
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4E79' }
      },
      alignment: {
        horizontal: 'center',
        vertical: 'middle'
      }
    };
  }

  getSubHeaderStyle() {
    return {
      font: {
        bold: true,
        size: 12
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFADD8E6' }
      },
      alignment: {
        vertical: 'middle'
      }
    };
  }

  getDataStyle() {
    return {
      font: {
        size: 11
      },
      alignment: {
        vertical: 'top',
        wrapText: true
      }
    };
  }
}

module.exports = ExcelGenerationService; 