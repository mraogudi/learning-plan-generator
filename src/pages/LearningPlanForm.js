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

  const getUsedTechnologies = () => {
    return watchedTechnologies
      .map(tech => tech.technologyName)
      .filter(name => name && name.trim() !== '');
  };

  const getAvailableTechnologiesForField = (currentIndex) => {
    const usedTechnologies = getUsedTechnologies();
    const currentTech = watchedTechnologies[currentIndex]?.technologyName;
    
    return availableTechnologies.filter(tech => 
      !usedTechnologies.includes(tech) || tech === currentTech
    );
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Assignment color="primary" />
          Create Learning Plan
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Generate a personalized learning plan based on your experience level and technology preferences.
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Information Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Person color="primary" />
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Your Name"
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="experienceLevel"
                control={control}
                rules={{ required: 'Experience level is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.experienceLevel}>
                    <InputLabel>Overall Experience Level</InputLabel>
                    <Select {...field} label="Overall Experience Level">
                      {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.experienceLevel && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {errors.experienceLevel.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="planName"
                control={control}
                rules={{ required: 'Plan name is required', minLength: { value: 3, message: 'Plan name must be at least 3 characters' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Learning Plan Name"
                    error={!!errors.planName}
                    helperText={errors.planName?.message}
                    variant="outlined"
                    placeholder="e.g., Full Stack Development Plan"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Technologies Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assignment color="primary" />
              Technologies ({fields.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addTechnology}
              size="large"
            >
              Add Technology
            </Button>
          </Box>

          {fields.map((field, index) => (
            <Box key={field.id} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Technology #{index + 1}
                </Typography>
                {fields.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeTechnology(index)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={`technologies.${index}.technologyName`}
                    control={control}
                    rules={{ required: 'Technology name is required' }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={getAvailableTechnologiesForField(index)}
                        freeSolo
                        onChange={(_, value) => field.onChange(value || '')}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Technology Name"
                            error={!!errors.technologies?.[index]?.technologyName}
                            helperText={errors.technologies?.[index]?.technologyName?.message}
                            variant="outlined"
                            placeholder="e.g., ReactJS, Python, MySQL"
                          />
                        )}
                      />
                    )}
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
                        <Select {...field} label="Proficiency Level">
                          {PROFICIENCY_LEVELS.map((level) => (
                            <MenuItem key={level.value} value={level.value}>
                              {level.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.technologies?.[index]?.proficiencyLevel && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.technologies[index].proficiencyLevel.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name={`technologies.${index}.rating`}
                    control={control}
                    rules={{ required: 'Self-rating is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.technologies?.[index]?.rating}>
                        <InputLabel>Self Rating (1-10)</InputLabel>
                        <Select {...field} label="Self Rating (1-10)">
                          {RATING_LEVELS.map((rating) => (
                            <MenuItem key={rating.value} value={rating.value}>
                              {rating.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.technologies?.[index]?.rating && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.technologies[index].rating.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              {index < fields.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
            disabled={loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? 'Generating...' : 'Generate Plan'}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileDownload />}
            onClick={handleSubmit(handleExportToExcel)}
            disabled={loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? 'Exporting...' : 'Export to Excel'}
          </Button>
        </Box>
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
    </Box>
  );
};

export default LearningPlanForm; 