const io = require('socket.io')();

io.on('connection', (client) => {
  console.log('a user connected');

  client.on('subscribeToMsg', (data) => {
    console.log('client is subscribing  ', data);
    client.emit('msgFromServer', {msg: `web socket : ${data.msg}`});
  });

  client.on('disconnect', function (reason) {
    console.log('user disconnected-----------', reason);
  });
});

// io.path('');

// const port = 8000; io.listen(port);
module.exports = io;
// console.log('listening on port ', port);