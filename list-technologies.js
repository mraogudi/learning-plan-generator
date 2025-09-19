const TechnologyDataService = require('./backend-express/src/services/technologyDataService');

const techService = new TechnologyDataService();
const technologies = techService.getAllAvailableTechnologies();

console.log('🚀 Available Technologies in Learning Plan Generator');
console.log('='.repeat(60));
console.log(`Total Technologies: ${technologies.length}\n`);

// Group technologies by category
const categorizedTechs = {};
technologies.forEach(tech => {
  const metadata = techService.getTechnologyMetadata(tech);
  if (!categorizedTechs[metadata.category]) {
    categorizedTechs[metadata.category] = [];
  }
  categorizedTechs[metadata.category].push({
    name: metadata.name,
    difficulty: metadata.difficulty,
    baseHours: metadata.baseHours
  });
});

// Display by category
Object.keys(categorizedTechs).sort().forEach(category => {
  console.log(`📂 ${category.toUpperCase()}`);
  console.log('-'.repeat(30));
  
  categorizedTechs[category]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(tech => {
      const difficultyIcon = {
        'Easy': '🟢',
        'Medium': '🟡', 
        'Hard': '🔴'
      }[tech.difficulty] || '⚪';
      
      console.log(`  ${difficultyIcon} ${tech.name.padEnd(25)} (${tech.baseHours}h, ${tech.difficulty})`);
    });
  
  console.log(); // Empty line between categories
});

console.log('Legend:');
console.log('🟢 Easy    🟡 Medium    🔴 Hard');
console.log('\nNote: Hours shown are base learning hours, adjusted based on proficiency, experience, and rating.'); 