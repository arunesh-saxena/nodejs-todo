
// var stuff = require('./stuff');


// console.log(stuff.counter(['arunesh','saxena']));
// console.log(stuff.adder(5,6));

/* var events = require('events');

// var myEmitter = new events.EventEmitter();
// myEmitter.on('someEvent', function (msg) {
//     console.log(msg);
// })
// myEmitter.emit('someEvent', ' this event was emitter');

var util = require('util');

var Person = function (name) {
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');

var people = [james, mary];

people.forEach(function (person) {
    person.on('speak', function(msg){
        console.log(`${person.name} said: ${msg}` );
    })
})

james.emit('speak','hey i m james'); */

/* var fs = require('fs');

// var readMe = fs.readFileSync('./readMe.txt','utf8');
// fs.writeFileSync('writeMe.txt',readMe);
// fs.readFile('./readMe.txt','utf8',function(err,data){
//     console.log(data);
//     fs.writeFileSync('writeMe.txt',data);
// });

// fs.unlink('writeMe.txt');
// fs.mkdirSync('stuff');
// fs.rmdirSync('stuff');

// fs.mkdir('stuff', function () {
//     fs.readFile('./readMe.txt', function (err, data) {
//         fs.writeFile('./stuff/writeMe.txt', data)
//     })
// })

fs.unlink('./stuff/writeMe.txt',function(){
    fs.rmdir('./stuff');
}) */


// console.log(readMe);