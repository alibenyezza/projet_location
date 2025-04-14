import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchListingsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', { searchQuery, location });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <Box flex={1}>
            <TextField
              fullWidth
              label="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box flex={1}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box width={{ xs: '100%', md: '200px' }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Box>

      <Stack spacing={3}>
        {/* Placeholder for search results */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Results
            </Typography>
            <Typography color="text.secondary">
              No listings found. Try adjusting your search criteria.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default SearchListingsPage; 