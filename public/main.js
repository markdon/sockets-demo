console.log('main.js');
const socket = io();
socket.on('message', data => {
  const p = document.createElement('p');
  p.innerText = data;
  document.querySelector('#message-box').append(p);
  console.log(data);
});

socket.on('client-count', (count) =>{
  document.querySelector('#client-count').innerText = count;
});
