import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Grid } from '../../components/common';

interface RequestFormData {
  moveInDate: string;
  duration: string;
  message: string;
  occupants: string;
  employmentStatus: string;
  income: string;
}

const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { listingId } = useParams<{ listingId: string }>();
  const [formData, setFormData] = useState<RequestFormData>({
    moveInDate: '',
    duration: '',
    message: '',
    occupants: '',
    employmentStatus: '',
    income: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to create request
      console.log('Creating request:', { listingId, ...formData });
      navigate('/tenant/requests');
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Submit Rental Request
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Move-in Date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="duration-label">Lease Duration</InputLabel>
                <Select
                  labelId="duration-label"
                  name="duration"
                  value={formData.duration}
                  label="Lease Duration"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="6">6 months</MenuItem>
                  <MenuItem value="12">12 months</MenuItem>
                  <MenuItem value="24">24 months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Message to Landlord"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Introduce yourself and explain why you would be a great tenant..."
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Number of Occupants"
                name="occupants"
                value={formData.occupants}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel id="employment-label">Employment Status</InputLabel>
                <Select
                  labelId="employment-label"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  label="Employment Status"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="self-employed">Self-employed</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="retired">Retired</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Monthly Income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <span>$</span>,
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/tenant/requests')}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Submit Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateRequestPage; 