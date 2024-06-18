require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const jwtSecret = process.env.JWT_SECRET;

mongoose.connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

// Routes here
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

server.listen(5000, () => {
    console.log('Server is running on port 5000')
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = {app, io};