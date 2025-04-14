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
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'owner' | 'tenant';
  status: 'active' | 'suspended';
  createdAt: string;
}

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // TODO: Implement API call to fetch users
        // Mock data for now
        const mockUsers: User[] = [
          {
            id: '1',
            email: 'john@example.com',
            name: 'John Doe',
            role: 'owner',
            status: 'active',
            createdAt: '2024-01-01T00:00:00Z',
          },
          {
            id: '2',
            email: 'jane@example.com',
            name: 'Jane Smith',
            role: 'tenant',
            status: 'active',
            createdAt: '2024-01-02T00:00:00Z',
          },
        ];
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedUser(null);
    setEditDialogOpen(false);
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    try {
      // TODO: Implement API call to toggle user status
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus as 'active' | 'suspended' } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      // TODO: Implement API call to update user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      handleEditClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      color={user.role === 'admin' ? 'error' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      color={user.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(user)}
                      title="Edit user"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      title={user.status === 'active' ? 'Suspend user' : 'Activate user'}
                    >
                      {user.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit User Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose}>
          <DialogTitle>Edit User</DialogTitle>
          <Box component="form" onSubmit={handleSaveEdit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                value={selectedUser?.name || ''}
                onChange={(e) =>
                  setSelectedUser(
                    (prev) => prev && { ...prev, name: e.target.value }
                  )
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser?.email || ''}
                onChange={(e) =>
                  setSelectedUser(
                    (prev) => prev && { ...prev, email: e.target.value }
                  )
                }
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Role"
                value={selectedUser?.role || ''}
                onChange={(e) =>
                  setSelectedUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        role: e.target.value as 'admin' | 'owner' | 'tenant',
                      }
                  )
                }
                margin="normal"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="tenant">Tenant</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ManageUsersPage; 