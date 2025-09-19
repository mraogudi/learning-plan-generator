import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  ArrowBack,
  FileDownload,
  Assignment,
  Schedule,
  CheckCircle,
  ExpandMore,
  School,
  TrendingUp,
  AccessTime,
  BookmarkBorder,
  Star,
  CalendarToday,
} from '@mui/icons-material';
import { learningPlanAPI } from '../services/api';

const LearningPlanResults = () => {
  const navigate = useNavigate();
  const [learningPlan, setLearningPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Get learning plan from sessionStorage
    const storedPlan = sessionStorage.getItem('learningPlan');
    if (storedPlan) {
      setLearningPlan(JSON.parse(storedPlan));
    }
  }, []);

  const handleExportToExcel = async () => {
    if (!learningPlan?.formData) return;

    setLoading(true);
    setError('');

    try {
      await learningPlanAPI.exportLearningPlan(learningPlan.formData);
      setSuccess('Excel file downloaded successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  const getDifficultyColor = (proficiency) => {
    switch (proficiency) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  if (!learningPlan) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          No learning plan found. Please create a plan first.
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Create Learning Plan
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
        <Box sx={{ color: 'white' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            {learningPlan.planName}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
            Created for {learningPlan.userName} on {formatDate(learningPlan.createdDate)}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Plan ID: {learningPlan.planId}
          </Typography>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Create New Plan
        </Button>
        <Button
          variant="contained"
          startIcon={<FileDownload />}
          onClick={handleExportToExcel}
          disabled={loading}
        >
          Download Excel
        </Button>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {learningPlan.technologyPlans.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Technologies
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              {learningPlan.technologyPlans.reduce((sum, tech) => sum + tech.estimatedHours, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Hours
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h4" color="warning.main" gutterBottom>
              {Math.max(...learningPlan.technologyPlans.map(tech => 
                Math.ceil((new Date(tech.endDate) - new Date(tech.startDate)) / (7 * 24 * 60 * 60 * 1000))
              ))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weeks Duration
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h4" color="info.main" gutterBottom>
              {learningPlan.technologyPlans.reduce((sum, tech) => sum + tech.milestones.length, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Milestones
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Technology Plans */}
      <Typography variant="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Assignment color="primary" />
        Learning Plan Details
      </Typography>

      {learningPlan.technologyPlans.map((tech, index) => (
        <Card key={index} sx={{ mb: 3, overflow: 'hidden' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Technology Header */}
            <Box sx={{ 
              p: 3, 
              background: `linear-gradient(135deg, ${getDifficultyColor(tech.proficiencyLevel) === 'success' ? '#4caf50' : getDifficultyColor(tech.proficiencyLevel) === 'warning' ? '#ff9800' : '#f44336'} 0%, ${getDifficultyColor(tech.proficiencyLevel) === 'success' ? '#66bb6a' : getDifficultyColor(tech.proficiencyLevel) === 'warning' ? '#ffb74d' : '#ef5350'} 100%)`,
              color: 'white' 
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h3">
                  {tech.technologyName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={tech.proficiencyLevel} 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                  <Chip 
                    label={tech.experienceLevel} 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday fontSize="small" />
                    <Typography variant="body2">
                      {formatDate(tech.startDate)} - {formatDate(tech.endDate)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      {tech.estimatedHours} hours
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2">
                      {tech.suggestedPath}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Progress</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress(tech.startDate, tech.endDate)}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Learning Modules */}
                <Grid item xs={12} md={6}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School color="primary" />
                        Learning Modules ({tech.learningModules.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {tech.learningModules.map((module, moduleIndex) => (
                          <ListItem key={moduleIndex}>
                            <ListItemIcon>
                              <BookmarkBorder color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={module} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Resources */}
                <Grid item xs={12} md={6}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star color="primary" />
                        Resources ({tech.recommendedResources.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {tech.recommendedResources.map((resource, resourceIndex) => (
                          <ListItem key={resourceIndex}>
                            <ListItemIcon>
                              <Star color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={resource} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Milestones Timeline */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Schedule color="primary" />
                        Milestones Timeline ({tech.milestones.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Timeline>
                        {tech.milestones.map((milestone, milestoneIndex) => (
                          <TimelineItem key={milestoneIndex}>
                            <TimelineSeparator>
                              <TimelineDot color="primary">
                                <CheckCircle fontSize="small" />
                              </TimelineDot>
                              {milestoneIndex < tech.milestones.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper elevation={2} sx={{ p: 2, ml: 1 }}>
                                <Typography variant="h6" color="primary">
                                  {milestone.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Target: {formatDate(milestone.targetDate)} • {milestone.estimatedHours} hours
                                </Typography>
                                <Typography variant="body1">
                                  {milestone.description}
                                </Typography>
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Status Messages */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default LearningPlanResults; 