import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Box,
    TextField,
    Typography,
    Paper,
    List,
    ListItem,
    ThemeProvider,
    createTheme,
    CircularProgress,
    Avatar,
    IconButton,
    Tooltip
} from '@mui/material';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = message;
        setMessage('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: userMessage
            });

            setChatHistory(prev => [...prev, { role: 'ai', content: response.data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, there was an error processing your request.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 4
            }}>
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'white'
                    }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            align="center"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                mb: 3
                            }}
                        >
                            Chat AI Interface
                        </Typography>

                        <Paper
                            elevation={2}
                            sx={{
                                p: 2,
                                mb: 2,
                                height: '60vh',
                                overflow: 'auto',
                                bgcolor: '#f8f9fa',
                                borderRadius: 2
                            }}
                        >
                            <List>
                                {chatHistory.map((chat, index) => (
                                    <ListItem
                                        key={index}
                                        alignItems="flex-start"
                                        sx={{
                                            mb: 1,
                                            flexDirection: chat.role === 'user' ? 'row-reverse' : 'row'
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: chat.role === 'user' ? 'primary.main' : 'secondary.main',
                                                mr: chat.role === 'user' ? 0 : 1,
                                                ml: chat.role === 'user' ? 1 : 0
                                            }}
                                        >
                                            {chat.role === 'user' ? 'U' : 'AI'}
                                        </Avatar>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                p: 2,
                                                maxWidth: '70%',
                                                bgcolor: chat.role === 'user' ? 'primary.light' : 'grey.100',
                                                color: chat.role === 'user' ? 'white' : 'text.primary',
                                                borderRadius: 2
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {chat.content}
                                            </Typography>
                                        </Paper>
                                    </ListItem>
                                ))}
                                {isLoading && (
                                    <ListItem alignItems="flex-start">
                                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>
                                            AI
                                        </Avatar>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                p: 2,
                                                maxWidth: '70%',
                                                bgcolor: 'grey.100',
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <CircularProgress size={20} sx={{ mr: 1 }} />
                                            <Typography variant="body1">
                                                Thinking...
                                            </Typography>
                                        </Paper>
                                    </ListItem>
                                )}
                                <div ref={messagesEndRef} />
                            </List>
                        </Paper>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center'
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />
                            <Tooltip title="Send message">
                                <IconButton
                                    type="submit"
                                    color="primary"
                                    disabled={isLoading || !message.trim()}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '&:disabled': {
                                            bgcolor: 'grey.300',
                                        }
                                    }}
                                >
                                    S
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
