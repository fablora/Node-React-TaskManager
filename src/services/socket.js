import io from 'socket.io-client';
const socket = io('http://localhost:5000');

userEffect(() => {
    socket.on('taskUpdated', (task) => {
        // task update
    });
}, []);