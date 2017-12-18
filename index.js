var app = require('./app');
var io = require('./socket');

const port = {
    app: 3000,
    socket: 8000
}
//listen to port
app.listen(port.app);
console.log('Yor are listening to port ', port.app);

io.listen(port.socket);
console.log('socket listening on port ', port.socket);
