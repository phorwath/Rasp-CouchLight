var Gpio = require('onoff').Gpio; //require onoff to control GPIO
var pin7 = new Gpio(23, 'out'); //declare GPIO4 an output
 
setTimeout(function() {
	pin7.writeSync(1)
}, 500);

setTimeout(function() {
	pin7.writeSync(0)
}, 1000);

setTimeout(function() {
	pin7.writeSync(1)
}, 1500);

setTimeout(function() {
	pin7.writeSync(0)
}, 2000);
