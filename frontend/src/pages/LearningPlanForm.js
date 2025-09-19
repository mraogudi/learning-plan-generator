import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Autocomplete,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add,
  Delete,
  Send,
  FileDownload,
  Person,
  Assignment,
} from '@mui/icons-material';
import { learningPlanAPI } from '../services/api';

const PROFICIENCY_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

const EXPERIENCE_LEVELS = [
  { value: 'ENTRY_LEVEL', label: '0-1 years' },
  { value: 'MID_LEVEL', label: '1-3 years' },
  { value: 'SENIOR_LEVEL', label: '3+ years' },
];

const RATING_LEVELS = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const COMMON_TECHNOLOGIES = [
  'ReactJS', 'Vue.js', 'Angular', 'Java', 'Spring Boot', 'Node.js',
  'MySQL', 'MongoDB', 'Python', 'Django', 'Flask', 'TypeScript',
  'JavaScript', 'HTML', 'CSS', 'Docker', 'Kubernetes', 'AWS',
  'Azure', 'Git', 'Jenkins', 'Redis', 'PostgreSQL', 'Express.js'
];

const LearningPlanForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableTechnologies, setAvailableTechnologies] = useState([]);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      experienceLevel: '',
      planName: '',
      technologies: [
        {
          technologyName: '',
          proficiencyLevel: '',
          rating: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'technologies',
  });

  const watchedTechnologies = watch('technologies');

  useEffect(() => {
    fetchAvailableTechnologies();
  }, []);

  const fetchAvailableTechnologies = async () => {
    try {
      const technologies = await learningPlanAPI.getAvailableTechnologies();
      setAvailableTechnologies([...new Set([...technologies, ...COMMON_TECHNOLOGIES])]);
    } catch (err) {
      setAvailableTechnologies(COMMON_TECHNOLOGIES);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await learningPlanAPI.generateLearningPlan(data);
      setSuccess('Learning plan generated successfully!');
      
      // Store in sessionStorage for results page
      sessionStorage.setItem('learningPlan', JSON.stringify({ ...response, formData: data }));
      
      // Navigate to results after short delay
      setTimeout(() => {
        navigate('/results');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = async (data) => {
    setLoading(true);
    setError('');

    try {
      await learningPlanAPI.exportLearningPlan(data);
      setSuccess('Excel file downloaded successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    append({
      technologyName: '',
      proficiencyLevel: '',
      rating: '',
    });
  };

  const removeTechnology = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center" color="primary">
          Create Your Learning Plan
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Enter your technologies, proficiency levels, and experience to generate a personalized learning plan
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* User Information */}
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Personal Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Your Name"
                placeholder="Enter your name"
                {...control.register('userName', {
                  required: 'Name is required',
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                {...control.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Controller
                name="experienceLevel"
                control={control}
                rules={{ required: 'Experience level is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.experienceLevel}>
                    <InputLabel>Overall Experience Level</InputLabel>
                    <Select
                      {...field}
                      label="Overall Experience Level"
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Plan Name"
                placeholder="e.g., Full-Stack Development Plan"
                {...control.register('planName', {
                  required: 'Plan name is required',
                })}
                error={!!errors.planName}
                helperText={errors.planName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment color="primary" />
                Technologies & Skills
              </Typography>
            </Grid>

            {/* Technologies */}
            {fields.map((field, index) => (
              <Grid item xs={12} key={field.id}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    border: '2px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      Technology #{index + 1}
                    </Typography>
                    {fields.length > 1 && (
                      <IconButton 
                        onClick={() => removeTechnology(index)}
                        color="error"
                        sx={{ '&:hover': { backgroundColor: 'error.light' } }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        freeSolo
                        options={availableTechnologies}
                        value={watchedTechnologies[index]?.technologyName || ''}
                        onChange={(event, newValue) => {
                          setValue(`technologies.${index}.technologyName`, newValue || '');
                        }}
                        onInputChange={(event, newInputValue) => {
                          setValue(`technologies.${index}.technologyName`, newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Technology Name"
                            placeholder="Select or type technology"
                            error={!!errors.technologies?.[index]?.technologyName}
                            helperText={errors.technologies?.[index]?.technologyName?.message}
                            {...control.register(`technologies.${index}.technologyName`, {
                              required: 'Technology name is required',
                            })}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Controller
                        name={`technologies.${index}.proficiencyLevel`}
                        control={control}
                        rules={{ required: 'Proficiency level is required' }}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.technologies?.[index]?.proficiencyLevel}>
                            <InputLabel>Proficiency Level</InputLabel>
                            <Select
                              {...field}
                              label="Proficiency Level"
                            >
                              {PROFICIENCY_LEVELS.map((level) => (
                                <MenuItem key={level.value} value={level.value}>
                                  {level.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Controller
                        name={`technologies.${index}.rating`}
                        control={control}
                        rules={{ required: 'Rating is required' }}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.technologies?.[index]?.rating}>
                            <InputLabel>Rating (1-10)</InputLabel>
                            <Select
                              {...field}
                              label="Rating (1-10)"
                            >
                              {RATING_LEVELS.map((level) => (
                                <MenuItem key={level.value} value={level.value}>
                                  {level.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

            {/* Add Technology Button */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addTechnology}
                fullWidth
                sx={{ 
                  py: 2,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  '&:hover': {
                    borderStyle: 'dashed',
                    borderWidth: 2,
                  }
                }}
              >
                Add Another Technology
              </Button>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Generating...' : 'Generate Learning Plan'}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileDownload />}
                  disabled={loading}
                  onClick={handleSubmit((data) => handleExportToExcel(data))}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Exporting...' : 'Export to Excel'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

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
      </Paper>
    </Box>
  );
};

export default LearningPlanForm; 