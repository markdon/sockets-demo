/* global window io document */


const app = {};
app.main = function main() {
  window.msgContainer = document.querySelector('#message-box');

  const socket = io('/rooms');
  app.socket = socket;

  socket.emit('channel', document.location.pathname.substring(7));
  function appendMsg(msg) {
    const p = document.createElement('p');
    p.innerText = msg;
    window.msgContainer.append(p);
  }

  socket.on('message', (data) => {
    console.log('message', data);
    appendMsg(typeof data === 'object' ? JSON.stringify(data) : data);
  });

  socket.on('client-count', (count) => {
    document.querySelector('#client-count').innerText = count;
  });

  appendMsg('document loaded');
};
window.onload = app.main;
