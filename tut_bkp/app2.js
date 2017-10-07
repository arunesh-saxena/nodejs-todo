var http = require('http');
var fs = require('fs');

/* var server = http.createServer(function (req, res) {
    console.log('request was made '+ req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hey arunesh');
});

server.listen(3000, '127.0.0.1');
console.log('listen port 3000') */


// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

/* myReadStream.on('data', function (chunk) {
    console.log('new chunk received');
    myWriteStream.write(chunk);
}) */

/* var server = http.createServer(function (req, res) {
    console.log('request was made '+ req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
    myReadStream.pipe(res);

}); */
/* html page */
/* var server = http.createServer(function (req, res) {
    console.log('request was made '+ req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);

}); */
/* json request */
/* var server = http.createServer(function (req, res) {
    console.log('request was made ' + req.url);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var myObj = {
        name: 'Arunesh Saxena',
        city: 'sitapur'
    }
    res.end(JSON.stringify(myObj));

}); */
/* routing */
var server = http.createServer(function (req, res) {
    console.log('request was made ' + req.url);
    if (req.url === "/home" || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/api') {
        var myObj = {
            name: 'Arunesh Saxena',
            homeTown: 'sitapur'
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(myObj));
    } else {
       
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(`${__dirname}/404.html`).pipe(res);
    }


});
server.listen(3000, '127.0.0.1');
console.log('listen port 3000');

