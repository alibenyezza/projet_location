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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'active' | 'pending' | 'inactive';
  bedrooms: number;
  bathrooms: number;
  area: number;
  createdAt: string;
  requestCount: number;
}

const MyListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

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
            status: 'active',
            bedrooms: 2,
            bathrooms: 1,
            area: 800,
            createdAt: '2024-04-14T10:00:00Z',
            requestCount: 3,
          },
          {
            id: '2',
            title: 'Cozy Studio near University',
            location: '456 College Ave',
            price: 1000,
            status: 'inactive',
            bedrooms: 1,
            bathrooms: 1,
            area: 500,
            createdAt: '2024-04-13T15:30:00Z',
            requestCount: 0,
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

  const handleCreateListing = () => {
    navigate('/owner/listings/create');
  };

  const handleEditListing = (listingId: string) => {
    navigate(`/owner/listings/${listingId}/edit`);
  };

  const handleViewListing = (listingId: string) => {
    navigate(`/listings/${listingId}`);
  };

  const handleViewRequests = (listingId: string) => {
    navigate(`/owner/listings/${listingId}/requests`);
  };

  const handleDeleteClick = (listing: Listing) => {
    setSelectedListing(listing);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedListing) {
      try {
        // TODO: Implement API call to delete listing
        // await fetch(`/api/listings/${selectedListing.id}`, { method: 'DELETE' });
        setListings(listings.filter(listing => listing.id !== selectedListing.id));
        setDeleteDialogOpen(false);
        setSelectedListing(null);
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'warning';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Listings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateListing}
          >
            Create Listing
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Requests</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell>${listing.price}/month</TableCell>
                  <TableCell>
                    {listing.bedrooms}bd {listing.bathrooms}ba {listing.area}sqft
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      color={getStatusColor(listing.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleViewRequests(listing.id)}
                      disabled={listing.requestCount === 0}
                    >
                      {listing.requestCount} Request{listing.requestCount !== 1 ? 's' : ''}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewListing(listing.id)}
                      title="View listing"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditListing(listing.id)}
                      title="Edit listing"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(listing)}
                      title="Delete listing"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {listings.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography color="text.secondary" gutterBottom>
              You haven't created any listings yet.
            </Typography>
            <Button
              variant="contained"
              onClick={handleCreateListing}
              sx={{ mt: 2 }}
            >
              Create Your First Listing
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedListing?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyListingsPage; 