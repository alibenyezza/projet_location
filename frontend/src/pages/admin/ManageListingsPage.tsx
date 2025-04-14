import React, { useState, useEffect } from 'react';
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
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Grid } from '../../components/common';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  owner: {
    id: string;
    name: string;
  };
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

const ManageListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // TODO: Implement API call to fetch listings
        // Mock data for now
        const mockListings: Listing[] = [
          {
            id: '1',
            title: 'Modern Apartment in Downtown',
            location: '123 Main St',
            price: 1500,
            owner: {
              id: 'owner1',
              name: 'John Doe',
            },
            status: 'active',
            createdAt: '2024-01-01T00:00:00Z',
          },
          {
            id: '2',
            title: 'Cozy Studio near University',
            location: '456 College Ave',
            price: 1000,
            owner: {
              id: 'owner2',
              name: 'Jane Smith',
            },
            status: 'pending',
            createdAt: '2024-01-02T00:00:00Z',
          },
        ];
        setListings(mockListings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleViewListing = (listingId: string) => {
    navigate(`/listings/${listingId}`);
  };

  const handleReviewClick = (listing: Listing) => {
    setSelectedListing(listing);
    setReviewDialogOpen(true);
  };

  const handleReviewClose = () => {
    setSelectedListing(null);
    setReviewDialogOpen(false);
  };

  const handleStatusToggle = async (listingId: string, currentStatus: string) => {
    try {
      // TODO: Implement API call to toggle listing status
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing.id === listingId
            ? { ...listing, status: newStatus as 'active' | 'pending' | 'suspended' }
            : listing
        )
      );
    } catch (error) {
      console.error('Error toggling listing status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Listings
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell>${listing.price}/month</TableCell>
                  <TableCell>{listing.owner.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      color={getStatusColor(listing.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewListing(listing.id)}
                      title="View listing"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {listing.status === 'pending' ? (
                      <IconButton
                        size="small"
                        onClick={() => handleReviewClick(listing)}
                        title="Review listing"
                        color="primary"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => handleStatusToggle(listing.id, listing.status)}
                        title={listing.status === 'active' ? 'Suspend listing' : 'Activate listing'}
                      >
                        {listing.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onClose={handleReviewClose}>
          <DialogTitle>Review Listing</DialogTitle>
          <DialogContent>
            {selectedListing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{selectedListing.title}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  {selectedListing.location}
                </Typography>
                <Typography gutterBottom>
                  Price: ${selectedListing.price}/month
                </Typography>
                <Typography gutterBottom>
                  Owner: {selectedListing.owner.name}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Review Notes"
                  margin="normal"
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReviewClose}>Cancel</Button>
            <Button
              onClick={() => {
                if (selectedListing) {
                  handleStatusToggle(selectedListing.id, 'pending');
                }
                handleReviewClose();
              }}
              variant="contained"
              color="success"
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                if (selectedListing) {
                  handleStatusToggle(selectedListing.id, 'pending');
                }
                handleReviewClose();
              }}
              variant="contained"
              color="error"
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ManageListingsPage; 