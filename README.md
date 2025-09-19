# Learning Plan Generator

A sophisticated web application that generates personalized learning plans for multiple technologies based on user proficiency and experience levels.

## 🚀 Features

- **Multi-Technology Input**: Add multiple technologies with individual proficiency levels and ratings (1-10)
- **Experience-Based Planning**: Customized plans based on professional experience
- **Rating System**: Self-assessment ratings that influence learning duration
- **Intelligent Scheduling**: Auto-generated learning timelines with realistic dates
- **Excel Export**: Professional learning plans exported as Excel files
- **Modern UI**: Responsive React frontend with intuitive form handling
- **Robust Backend**: Express.js REST API with advanced processing logic

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI with hooks and functional components
- **Material-UI** - Professional component library
- **Axios** - HTTP client for API communication
- **React Hook Form** - Advanced form handling and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - REST API framework
- **ExcelJS** - Excel file generation
- **express-validator** - Input validation
- **Helmet & CORS** - Security and cross-origin support

## 📁 Project Structure

```
learning-plan-generator/
├── backend-express/         # Express.js application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models and enums
│   │   ├── middleware/      # Validation and error handling
│   │   └── routes/          # API routes
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── MIGRATION_GUIDE.md      # Spring Boot to Express migration guide
└── README.md
```

## 🏃‍♂️ Quick Start

### Backend Setup
```bash
cd backend-express
npm install
npm run dev     # Development server with auto-reload
# or
npm start       # Production server
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 API Endpoints

- `POST /api/learning-plan/generate` - Generate learning plan
- `GET /api/technologies` - Get available technologies
- `POST /api/learning-plan/export` - Export plan to Excel

## 🎯 Learning Plan Algorithm

The application uses an intelligent algorithm that considers:
- Technology complexity and learning curve
- User's current proficiency level (Beginner/Intermediate/Advanced)
- Professional experience level (Entry/Mid/Senior)
- Self-assessment rating (1-10 scale)
- Recommended learning progression
- Time allocation based on difficulty and personal rating

## 🔧 Configuration

- Backend runs on port 8080
- Frontend runs on port 3000
- CORS configured for local development 