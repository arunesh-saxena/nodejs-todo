const socket = require('socket.io');
const io = socket();
let clientIds = [];
io.on('connection', (client) => {
  console.log('a user connected');
  clientIds.push(client.id);
  client.on('subscribeToMsg', (data) => {
    console.log('client is subscribing  ', data,client.id);

    /* send only to just connected clinet */
    // client.emit('msgFromServer', {msg: `web socket : ${data.msg}`});
    
    /* send to all connected client */
    io.sockets.emit('msgFromServer', {msg: `web socket : ${data.msg}`});

    /* send to specific client */
    // client.to(clientIds[0]).emit('msgFromServer', {msg: `web socket : ${data.msg}`});

    /* send to all connected client excepted send */
    // client.broadcast.emit('msgFromServer', {msg: `web socket : ${data.msg}`});
  });

  client.on('disconnect', function (reason) {
    console.log('user disconnected-----------', reason);
  });
});

// io.path('');

// const port = 8000; io.listen(port);
module.exports = io;
// console.log('listening on port ', port);