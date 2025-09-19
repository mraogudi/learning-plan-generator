# Learning Plan Generator - Express.js Backend

A Node.js/Express.js backend for generating personalized learning plans based on user's technology preferences, experience levels, and proficiency ratings.

## Features

- **Learning Plan Generation**: Creates customized learning plans based on user input
- **Excel Export**: Generates detailed Excel reports with learning modules, resources, and milestones
- **Technology Database**: Pre-configured metadata for popular technologies (React, Angular, Vue, Java, Node.js, etc.)
- **Rating System**: Incorporates user self-ratings (1-10) to adjust learning duration
- **Validation**: Comprehensive input validation using express-validator
- **Error Handling**: Centralized error handling with detailed error messages
- **Security**: Helmet for security headers, CORS configuration, and rate limiting

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Excel Generation**: ExcelJS
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Utilities**: UUID for unique IDs, compression for response optimization

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Learning Plan Operations
- `POST /api/learning-plan/generate` - Generate a learning plan
- `POST /api/learning-plan/export` - Export learning plan to Excel

### Technology Information
- `GET /api/technologies` - Get list of available technologies

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Start production server**:
   ```bash
   npm start
   ```

## Request Format

### Generate Learning Plan
```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "experienceLevel": "MID_LEVEL",
  "planName": "Full-Stack Development Plan",
  "technologies": [
    {
      "technologyName": "ReactJS",
      "proficiencyLevel": "INTERMEDIATE",
      "rating": 7
    },
    {
      "technologyName": "Node.js",
      "proficiencyLevel": "BEGINNER",
      "rating": 4
    }
  ]
}
```

### Response Format
```json
{
  "planId": "uuid-v4-string",
  "planName": "Full-Stack Development Plan",
  "userName": "John Doe",
  "createdDate": "2024-01-15",
  "technologyPlans": [
    {
      "technologyName": "ReactJS",
      "proficiencyLevel": "Intermediate",
      "experienceLevel": "1-3 years",
      "suggestedPath": "Review → Advanced Concepts → Real Projects → Best Practices",
      "startDate": "2024-01-15",
      "endDate": "2024-03-15",
      "estimatedHours": 80,
      "learningModules": [...],
      "recommendedResources": [...],
      "milestones": [...]
    }
  ]
}
```

## Validation Rules

- **userName**: Required, 2-100 characters
- **email**: Required, valid email format
- **experienceLevel**: Required, one of: ENTRY_LEVEL, MID_LEVEL, SENIOR_LEVEL
- **planName**: Required, 2-200 characters
- **technologies**: Array with at least 1 technology
- **technologyName**: Required, 1-100 characters
- **proficiencyLevel**: Required, one of: BEGINNER, INTERMEDIATE, ADVANCED
- **rating**: Required, integer between 1-10

## Environment Variables

- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment (development/production)

## Error Handling

The API returns structured error responses:

```json
{
  "error": "Validation Error",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Scope**: All /api/ endpoints

## CORS Configuration

- **Allowed Origins**: http://localhost:3000, http://127.0.0.1:3000
- **Credentials**: Enabled

## Project Structure

```
backend-express/
├── src/
│   ├── controllers/
│   │   └── learningPlanController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── enums.js
│   │   └── TechnologyMetadata.js
│   ├── routes/
│   │   └── learningPlanRoutes.js
│   └── services/
│       ├── excelGenerationService.js
│       ├── learningPlanService.js
│       └── technologyDataService.js
├── package.json
├── server.js
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test
```

## Conversion from Spring Boot

This Express.js backend is a complete conversion from the original Spring Boot application, featuring:

- **Controller Layer**: Spring `@RestController` → Express routes with middleware
- **Service Layer**: Spring `@Service` → JavaScript classes
- **Validation**: Jakarta Bean Validation → express-validator
- **Excel Generation**: Apache POI → ExcelJS
- **Error Handling**: Spring exception handlers → Express error middleware
- **Dependency Injection**: Spring DI → Constructor injection in JavaScript

All functionality remains identical while leveraging Node.js/Express.js ecosystem. 