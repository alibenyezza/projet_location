import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { Grid } from '../../components/common';
import StatsBarChart from '../../components/charts/StatsBarChart';

interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  totalRequests: number;
  activeListings: number;
  pendingRequests: number;
  monthlyStats: {
    month: string;
    newUsers: number;
    newListings: number;
    newRequests: number;
  }[];
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalListings: 0,
    totalRequests: 0,
    activeListings: 0,
    pendingRequests: 0,
    monthlyStats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Implement API call to fetch dashboard statistics
        // Mock data for testing
        const mockData: DashboardStats = {
          totalUsers: 1250,
          totalListings: 345,
          totalRequests: 432,
          activeListings: 205,
          pendingRequests: 87,
          monthlyStats: [
            { month: 'Jan', newUsers: 65, newListings: 35, newRequests: 42 },
            { month: 'Feb', newUsers: 59, newListings: 40, newRequests: 48 },
            { month: 'Mar', newUsers: 80, newListings: 45, newRequests: 52 },
            { month: 'Apr', newUsers: 81, newListings: 39, newRequests: 45 },
            { month: 'May', newUsers: 56, newListings: 28, newRequests: 38 },
            { month: 'Jun', newUsers: 55, newListings: 27, newRequests: 36 },
          ],
        };
        setStats(mockData);
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Listings
            </Typography>
            <Typography variant="h4">{stats.totalListings}</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Requests
            </Typography>
            <Typography variant="h4">{stats.totalRequests}</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Active Listings
            </Typography>
            <Typography variant="h4">{stats.activeListings}</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Pending Requests
            </Typography>
            <Typography variant="h4">{stats.pendingRequests}</Typography>
          </Paper>
        </Grid>

        {/* Monthly Statistics Chart */}
        <Grid xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Statistics
            </Typography>
            <Box sx={{ height: 400 }}>
              <StatsBarChart data={stats.monthlyStats} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage; 