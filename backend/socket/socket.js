module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('taskUpdated', (task) => {
            io.emit('taskUpdated', task);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};