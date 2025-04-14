import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';

interface RentalRequest {
  id: string;
  listing: {
    id: string;
    title: string;
    address: string;
    ownerId: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  moveInDate: string;
  duration: number;
  createdAt: string;
}

const MyRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRequests = async () => {
      try {
        // Mock data for now
        const mockRequests: RentalRequest[] = [
          {
            id: '1',
            listing: {
              id: '1',
              title: 'Modern Apartment in Downtown',
              address: '123 Main St, City, State',
              ownerId: 'owner1',
            },
            status: 'pending',
            moveInDate: '2024-04-01',
            duration: 12,
            createdAt: '2024-02-15',
          },
          // Add more mock requests as needed
        ];
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleViewListing = (listingId: string) => {
    navigate(`/listings/${listingId}`);
  };

  const handleMessageOwner = (ownerId: string) => {
    navigate(`/messages/${ownerId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              My Rental Requests
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/listings')}
            >
              Browse Listings
            </Button>
          </Box>
        </Grid>

        {requests.length === 0 ? (
          <Grid xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                You haven't made any rental requests yet.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/listings')}
                sx={{ mt: 2 }}
              >
                Browse Listings
              </Button>
            </Paper>
          </Grid>
        ) : (
          <Grid xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Move-in Date</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Typography variant="subtitle1">{request.listing.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {request.listing.address}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          color={getStatusColor(request.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(request.moveInDate).toLocaleDateString()}</TableCell>
                      <TableCell>{request.duration} months</TableCell>
                      <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewListing(request.listing.id)}
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleMessageOwner(request.listing.ownerId)}
                          size="small"
                        >
                          <MessageIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MyRequestsPage; 