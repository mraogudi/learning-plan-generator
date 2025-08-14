# Learning Plan Generator - Combined Application

A full-stack web application that generates personalized learning plans based on user experience levels and technology preferences. This project combines a React frontend and Express.js backend into a single unified application.

## 🚀 Features

- **Personalized Learning Plans**: Generate custom learning paths based on your skill level and preferences
- **Technology Database**: Pre-configured metadata for 25+ popular technologies (React, Angular, Java, Python, etc.)
- **Smart Recommendations**: AI-driven suggestions for learning modules, resources, and timelines
- **Excel Export**: Download detailed learning plans as Excel files with multiple sheets
- **Beautiful UI**: Modern Material-UI design with responsive layout
- **Real-time Progress**: Visual progress tracking and milestone timelines

## 🏗️ Architecture

This is a **combined full-stack application** where:
- **Frontend**: React 18 with Material-UI components
- **Backend**: Express.js server with comprehensive API
- **Development**: Frontend and backend run as separate processes with proxy
- **Production**: Single Express server serves both API and React build files

```
learning-plan-generator-combined/
├── package.json              # Root package with combined scripts
├── server/                   # Express.js backend
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Main server with static file serving
│   └── src/                 # Backend source code
│       ├── controllers/     # Request handlers
│       ├── middleware/      # Express middleware
│       ├── models/          # Data models and enums
│       ├── routes/          # API route definitions
│       └── services/        # Business logic
├── client/                  # React frontend
│   ├── package.json        # Frontend dependencies with proxy
│   ├── public/             # Static assets
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API communication
│       └── utils/          # Utility functions
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI v5** - Component library and theming
- **React Router v6** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Timeline Lab** - Visual timelines

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **ExcelJS** - Excel file generation
- **Express Validator** - Input validation
- **UUID** - Unique ID generation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-plan-generator-combined
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This installs dependencies for root, client, and server.

3. **Start development servers**
   ```bash
   npm run dev
   ```
   This starts both frontend (port 3000) and backend (port 8080) concurrently.

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Alternative Setup Methods

#### Manual Installation
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install

# Return to root
cd ..
```

#### Start Services Individually
```bash
# Terminal 1 - Start backend
npm run dev:server

# Terminal 2 - Start frontend
npm run dev:client
```

## 🎯 Available Scripts

### Root Level Commands
```bash
npm run dev          # Start both frontend and backend in development
npm run start        # Build and start production server
npm run build        # Build React app for production
npm run install:all  # Install dependencies for all packages
npm test            # Run tests for both frontend and backend
```

### Development Commands
```bash
npm run dev:server   # Start Express server only (port 8080)
npm run dev:client   # Start React development server only (port 3000)
```

### Production Commands
```bash
npm run build        # Build React app
npm run start        # Start production server (serves built React + API)
```

## 🌐 API Endpoints

### Learning Plan API
- `POST /api/learning-plan/generate` - Generate a new learning plan
- `POST /api/learning-plan/export` - Export learning plan to Excel
- `GET /api/technologies` - Get list of available technologies
- `GET /api/health` - Health check endpoint

### Request/Response Examples

#### Generate Learning Plan
```bash
POST /api/learning-plan/generate
Content-Type: application/json

{
  "userName": "John Doe",
  "email": "john@example.com",
  "experienceLevel": "MID_LEVEL",
  "planName": "Full Stack Development Plan",
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

## 🚀 Deployment

### Production Build
```bash
# Build the React app
npm run build

# Start production server
npm start
```

The production server:
- Serves the React build from `/client/build`
- Handles API requests on `/api/*` routes
- Returns `index.html` for all non-API routes (SPA routing)

### Environment Variables
```bash
# Optional - defaults to 8080
PORT=8080

# Optional - defaults to production
NODE_ENV=production
```

### Deployment Options

1. **Single Server Deployment**
   - Deploy the entire project to a single server
   - Run `npm run build && npm start`
   - Access both frontend and API on the same port

2. **Docker Deployment**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run install:all
   RUN npm run build
   EXPOSE 8080
   CMD ["npm", "start"]
   ```

3. **Cloud Platforms**
   - **Heroku**: Works out of the box with `npm start`
   - **Railway**: Automatic deployment with Git integration
   - **DigitalOcean**: App Platform compatible
   - **AWS/Azure**: Deploy with container or direct Node.js support

## 🔧 Configuration

### Frontend Proxy (Development)
The client `package.json` includes:
```json
{
  "proxy": "http://localhost:8080"
}
```
This routes API calls to the backend during development.

### Backend Static File Serving (Production)
The server automatically serves React build files:
```javascript
// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all handler for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run server tests only
cd server && npm test

# Run client tests only
cd client && npm test
```

## 📝 Features Breakdown

### Frontend Features
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Form Validation**: Real-time validation with helpful error messages
- ✅ **Technology Autocomplete**: Smart suggestions with duplicate prevention
- ✅ **Dynamic Forms**: Add/remove technologies dynamically
- ✅ **Beautiful Results**: Visual timelines, progress bars, and cards
- ✅ **Excel Export**: Download plans directly from the UI

### Backend Features
- ✅ **Technology Database**: 25+ pre-configured technologies
- ✅ **Smart Algorithms**: Duration calculation based on experience/proficiency
- ✅ **Excel Generation**: Multi-sheet Excel files with formatting
- ✅ **Input Validation**: Comprehensive validation with express-validator
- ✅ **Error Handling**: Centralized error handling with detailed messages
- ✅ **Security**: Helmet, CORS, and rate limiting

### Supported Technologies
Frontend: ReactJS, Vue.js, Angular, TypeScript, Next.js, Svelte
Backend: Node.js, Express.js, Java, Spring Boot, Python, Django, Flask, .NET Core, Go, Rust
Databases: MySQL, PostgreSQL, MongoDB, Redis, Elasticsearch
Cloud/DevOps: AWS, Azure, Docker, Kubernetes, Git, Jenkins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or run into issues:
1. Check the [Issues](issues) page
2. Create a new issue with detailed information
3. Include logs, screenshots, and steps to reproduce

## 🎉 Acknowledgments

- Material-UI team for the excellent component library
- Express.js community for the robust web framework
- ExcelJS for powerful Excel generation capabilities
- All the open-source contributors who made this project possible 