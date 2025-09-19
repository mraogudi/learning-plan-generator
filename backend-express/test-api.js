const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';

// Test data
const testLearningPlanRequest = {
  userName: 'John Doe',
  email: 'john@example.com',
  experienceLevel: 'MID_LEVEL',
  planName: 'Full-Stack Development Plan',
  technologies: [
    {
      technologyName: 'ReactJS',
      proficiencyLevel: 'INTERMEDIATE',
      rating: 7
    },
    {
      technologyName: 'Node.js',
      proficiencyLevel: 'BEGINNER',
      rating: 4
    }
  ]
};

async function testAPI() {
  try {
    console.log('🚀 Testing Learning Plan Generator Express API');
    console.log('='.repeat(50));

    // Test 1: Health check
    console.log('\n1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.message);

    // Test 2: Get available technologies
    console.log('\n2. Testing get available technologies...');
    const techResponse = await axios.get(`${BASE_URL}/technologies`);
    console.log('✅ Available technologies:', techResponse.data.length, 'technologies found');
    console.log('   Sample technologies:', techResponse.data.slice(0, 5));

    // Test 3: Generate learning plan
    console.log('\n3. Testing learning plan generation...');
    const planResponse = await axios.post(`${BASE_URL}/learning-plan/generate`, testLearningPlanRequest);
    console.log('✅ Learning plan generated successfully');
    console.log('   Plan ID:', planResponse.data.planId);
    console.log('   Plan Name:', planResponse.data.planName);
    console.log('   Technologies:', planResponse.data.technologyPlans.length);
    
    // Display technology details
    planResponse.data.technologyPlans.forEach((tech, index) => {
      console.log(`   ${index + 1}. ${tech.technologyName}:`);
      console.log(`      - Proficiency: ${tech.proficiencyLevel}`);
      console.log(`      - Duration: ${tech.estimatedHours} hours`);
      console.log(`      - Modules: ${tech.learningModules.length} modules`);
    });

    // Test 4: Export to Excel (check response headers only)
    console.log('\n4. Testing Excel export...');
    const excelResponse = await axios.post(`${BASE_URL}/learning-plan/export`, testLearningPlanRequest, {
      responseType: 'arraybuffer'
    });
    console.log('✅ Excel export successful');
    console.log('   Content-Type:', excelResponse.headers['content-type']);
    console.log('   Content-Length:', excelResponse.headers['content-length'], 'bytes');
    console.log('   Content-Disposition:', excelResponse.headers['content-disposition']);

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('\n❌ API test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running on port 8080?');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Test validation errors
async function testValidation() {
  try {
    console.log('\n🔍 Testing validation errors...');
    
    const invalidRequest = {
      userName: '', // Invalid: empty
      email: 'invalid-email', // Invalid: not an email
      experienceLevel: 'INVALID_LEVEL', // Invalid: not in enum
      technologies: [] // Invalid: empty array
    };

    await axios.post(`${BASE_URL}/learning-plan/generate`, invalidRequest);
    console.log('❌ Validation test failed - should have thrown an error');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Validation working correctly');
      console.log('   Error details:', error.response.data.details?.length || 0, 'validation errors');
    } else {
      console.log('❌ Unexpected error during validation test:', error.message);
    }
  }
}

// Run tests
async function runAllTests() {
  await testAPI();
  await testValidation();
}

if (require.main === module) {
  runAllTests();
}

module.exports = { testAPI, testValidation }; 