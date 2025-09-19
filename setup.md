# Learning Plan Generator - Setup Guide

## Prerequisites

- **Node.js 16** or higher
- **npm** or **yarn**
- **Git**

## Quick Setup

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd learning-plan-generator

# Or download and extract the project files
```

### 2. Backend Setup (Express.js)

```bash
# Navigate to backend directory
cd backend-express

# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Or run in production mode
npm start
```

The backend will start on `http://localhost:8080`

#### Backend API Endpoints:
- `GET /api/health` - Health check
- `GET /api/technologies` - Get available technologies
- `POST /api/learning-plan/generate` - Generate learning plan
- `POST /api/learning-plan/export` - Export to Excel

### 3. Frontend Setup (React)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## Detailed Setup Instructions

### Backend Configuration

The backend uses in-memory data storage by default. Configuration can be modified in:
`backend-express/server.js`

#### Key Configuration Options:
- **Server Port**: `PORT=8080` (environment variable)
- **Database**: In-memory technology database (no setup required)
- **CORS**: Configured for `localhost:3000`
- **Security**: Helmet security headers and rate limiting enabled

### Frontend Configuration

The frontend is configured to proxy API requests to the backend automatically.

#### Key Files:
- `package.json` - Dependencies and scripts
- `src/services/api.js` - API configuration
- `src/App.js` - Main application component

### Environment Variables (Optional)

Create `.env` files for custom configuration:

#### Backend (.env in backend-express/)
```
PORT=8080
NODE_ENV=development
```

#### Frontend (.env in frontend/)
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Testing the Application

### 1. Verify Backend is Running
```bash
curl http://localhost:8080/api/health
# Should return: "Learning Plan Generator API is running!"
```

### 2. Test Frontend
- Open browser to `http://localhost:3000`
- Fill out the form with sample data
- Generate a learning plan
- Export to Excel

### Sample Test Data:
- **Name**: John Doe
- **Email**: john@example.com
- **Experience Level**: Mid-Level (1-3 years)
- **Plan Name**: Full-Stack Development Plan
- **Technology 1**: ReactJS, Intermediate, Rating: 7
- **Technology 2**: Node.js, Beginner, Rating: 4

## Troubleshooting

### Common Issues:

#### Port Already in Use
- **Backend (8080)**: Change port in `application.properties`
- **Frontend (3000)**: React will automatically suggest an alternative port

#### CORS Errors
- Ensure backend CORS configuration includes frontend URL
- Check `backend-express/server.js` CORS settings

#### Node.js Issues
- Ensure Node.js 16+ is installed: `node -version`
- Try: `npm install` to reinstall dependencies

#### npm Issues
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`

#### Excel Download Not Working
- Check browser download settings
- Ensure popup blocker is disabled
- Verify backend logs for errors

### Performance Tips

- **Backend**: Use production mode: `NODE_ENV=production npm start`
- **Frontend**: Use production build for better performance: `npm run build`

### Development Mode vs Production

#### Development (Current Setup):
- Hot reload for frontend changes
- Detailed error messages
- Debug logging enabled
- Nodemon for auto-restart on backend changes

#### Production Setup:
- Build frontend: `npm run build`
- Set environment: `NODE_ENV=production`
- Start backend: `npm start` (in backend-express/)

## Project Structure

```
learning-plan-generator/
├── backend-express/         # Express.js application
│   ├── src/                # JavaScript source code
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── middleware/     # Validation & error handling
│   │   └── routes/         # API routes
│   ├── server.js           # Main server file
│   └── package.json        # npm dependencies
├── frontend/               # React application
│   ├── src/                # React source code
│   ├── public/             # Static files
│   └── package.json        # npm dependencies
├── MIGRATION_GUIDE.md      # Spring Boot to Express migration guide
├── README.md              # Project documentation
└── setup.md              # This setup guide
```

## Next Steps

1. **Customize Technologies**: Add more technologies in `backend-express/src/services/technologyDataService.js`
2. **Enhance UI**: Modify components in `frontend/src/components/`
3. **Add Features**: Extend the learning plan algorithm
4. **Add Database**: Integrate with MongoDB or PostgreSQL
5. **Deploy**: Use Docker, AWS, Heroku, or other cloud platforms

## Support

For issues or questions:
1. Check the console logs (browser and terminal)
2. Verify all prerequisites are installed
3. Ensure both backend and frontend are running
4. Check firewall/antivirus settings if connection issues persist 