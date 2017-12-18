const io = require('socket.io')();

io.on('connection', (client) => {
  console.log('a user connected');

  client.on('subscribeToTimer', (data) => {
    console.log('client is subscribing to timer with interval ', data);
    setInterval(() => {
      client.emit('timer', `web socket : ${new Date()}`);
      client.emit('subscribeToMsg', {msg: `web socket : ${data.msg}`});
    }, 1000);
    // client.emit('subscribeToMsg', {msg: `web socket : ${data.msg}`});
  });

  client.on('disconnect', function (reason) {
    console.log('user disconnected-----------', reason);
  });
});

io.path('/myownpath');

// const port = 8000; io.listen(port);
module.exports = io;
// console.log('listening on port ', port);