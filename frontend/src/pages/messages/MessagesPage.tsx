import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
  };
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // TODO: Implement API call to fetch conversations
        // const response = await fetch('/api/conversations');
        // const data = await response.json();
        // setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (id: string) => {
    navigate(`/messages/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Messages
      </Typography>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {conversations.map((conversation, index) => (
          <React.Fragment key={conversation.id}>
            <ListItem
              alignItems="flex-start"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={conversation.participant.name}
                  src={conversation.participant.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={conversation.participant.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block' }}
                    >
                      {conversation.lastMessage.content}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {new Date(conversation.lastMessage.timestamp).toLocaleString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < conversations.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default MessagesPage; 