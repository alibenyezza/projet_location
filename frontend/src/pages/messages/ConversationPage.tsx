import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import { Grid } from '../../components/common';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  senderName: string;
}

const ConversationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // TODO: Implement API call to fetch messages
        // Mock data for now
        const mockMessages = [
          {
            id: '1',
            senderId: 'user1',
            content: 'Hi, I am interested in your property.',
            timestamp: '2024-04-14T10:00:00Z',
            senderName: 'John Doe',
          },
          {
            id: '2',
            senderId: 'user2',
            content: 'Great! When would you like to schedule a viewing?',
            timestamp: '2024-04-14T10:05:00Z',
            senderName: 'Jane Smith',
          },
        ];
        setMessages(mockMessages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // TODO: Implement API call to send message
      const mockMessage = {
        id: Date.now().toString(),
        senderId: 'user1',
        content: newMessage,
        timestamp: new Date().toISOString(),
        senderName: 'John Doe',
      };
      setMessages((prev) => [...prev, mockMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom>
          Conversation
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {/* Messages Container */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          <Grid container spacing={3}>
            {messages.map((message) => (
              <Grid xs={12} key={message.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Avatar>{message.senderName[0]}</Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography variant="subtitle2">
                        {message.senderName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1,
                        bgcolor: 'grey.100',
                        maxWidth: '80%',
                      }}
                    >
                      <Typography>{message.content}</Typography>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Message Input */}
        <Box component="form" onSubmit={handleSendMessage}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <TextField
                fullWidth
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid xs="auto">
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={!newMessage.trim()}
                sx={{ height: '100%' }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConversationPage; 