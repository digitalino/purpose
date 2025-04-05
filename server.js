const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('🔌 New connection:', socket.id);

  socket.on('signal', ({ to, data }) => {
    io.to(to).emit('signal', { from: socket.id, data });
  });

  socket.on('join', () => {
    socket.broadcast.emit('new-user', socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Signaling server running on port ${process.env.PORT || 3000}`);
});
