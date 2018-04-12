const express = require('express')
const app = express();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static('public'));

http.listen(3000, function() {
   console.log('listening on *:3000');
});


let clients = 0;

io.on('connection', (socket) => {
   io.sockets.send('A user connected');
   clients++;
   io.sockets.emit('client-count', clients);
   socket.on('disconnect', () => {
      clients--;
      io.sockets.emit('client-count', clients);
   });


  // setInterval(() => {
  //   socket.emit('derpy', {a:'b', c:'d'});
  // }, 1000);
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      io.sockets.send('A user disconnected');
   });
});
