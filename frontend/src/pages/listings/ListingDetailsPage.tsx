import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Avatar,
} from '@mui/material';
import { Grid } from '../../components/common';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PersonIcon from '@mui/icons-material/Person';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  owner: {
    id: string;
    name: string;
    profilePicture: string;
    memberSince: string;
  };
  images: string[];
  amenities: string[];
}

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // TODO: Implement API call to fetch listing details
        // Mock data for now
        const mockListing: Listing = {
          id: '1',
          title: 'Modern Apartment in Downtown',
          description: 'A beautiful and spacious apartment in the heart of the city...',
          price: 1500,
          location: '123 Main St, City, State',
          bedrooms: 2,
          bathrooms: 1,
          area: 1000,
          owner: {
            id: 'owner1',
            name: 'John Doe',
            profilePicture: 'https://source.unsplash.com/random/800x600/?profile',
            memberSince: '2020-01-01',
          },
          images: [
            'https://source.unsplash.com/random/800x600/?apartment',
            'https://source.unsplash.com/random/800x600/?kitchen',
            'https://source.unsplash.com/random/800x600/?bedroom',
          ],
          amenities: [
            'Air Conditioning',
            'Parking',
            'Laundry',
            'Dishwasher',
            'Gym',
            'Pool',
          ],
        };
        setListing(mockListing);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleRequestRental = () => {
    navigate(`/tenant/requests/create?listingId=${id}`);
  };

  if (loading || !listing) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Typography variant="h4" gutterBottom>
                  {listing.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {listing.location}
                </Typography>
              </Grid>

              <Grid xs={12}>
                <ImageList cols={3} rowHeight={200}>
                  {listing.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`${listing.title} - Image ${index + 1}`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>

              <Grid xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BedIcon sx={{ mr: 1 }} />
                  <Typography>{listing.bedrooms} Bedrooms</Typography>
                </Box>
              </Grid>

              <Grid xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BathtubIcon sx={{ mr: 1 }} />
                  <Typography>{listing.bathrooms} Bathrooms</Typography>
                </Box>
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography paragraph>
                  {listing.description}
                </Typography>
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" gutterBottom>
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {listing.amenities.map((amenity, index) => (
                    <Grid key={index} xs={6} sm={4}>
                      <Typography>{amenity}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Owner Info */}
              <Grid xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={listing.owner.profilePicture}
                    alt={listing.owner.name}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      Listed by {listing.owner.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Member since {new Date(listing.owner.memberSince).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Actions */}
              <Grid xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRequestRental}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Request to Rent'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/listings/search')}
                  >
                    Back to Search
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            {/* Additional content for the right column */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListingDetailsPage; 