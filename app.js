const express = require('express');

const app = express();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static('public'));
app.get(/\/room\/*[a-z0-1]*/i, (req, res) => {
  console.log('matched rooms', req.path);
  res.sendFile(path.resolve('public/index.html'));
});


http.listen(80, () => {
  console.log('listening on *:80');
});

const rooms = io.of('/rooms');

rooms.on('connection', (socket) => {
  // io.sockets.send('A user connected');
  socket.on('channel', (channelName) => {
    socket.join(channelName);
    console.log('joined', channelName);
    rooms.in(channelName)
      .emit('message', `you connected to ${channelName}`);
  });
  console.log('rooms connected');
  // clients++;
  // io.sockets.emit('client-count', clients);
  // socket.on('disconnect', () => {
  //    clients--;
  //    io.sockets.emit('client-count', clients);
  // });


  // setInterval(() => {
  //   socket.emit('derpy', {a:'b', c:'d'});
  // }, 1000);
  // Whenever someone disconnects this piece of code executed
  // socket.on('disconnect', function () {
  //    io.sockets.send('A user disconnected', arguments);
  // });
});
