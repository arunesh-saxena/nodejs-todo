var counter = function (arr) {
    return `there are ${arr.length} elements in this array`;
}

var adder = function (a, b) {
    return `the sum of the 2 number id ${a + b}`;
}

var pi = 3.142;

// module.exports.counter = counter;
// module.exports.adder = adder;
// module.exports.pi = pi;

module.exports = {
    counter: counter,
    adder: adder,
    pi: pi
}
