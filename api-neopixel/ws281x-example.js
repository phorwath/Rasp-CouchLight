var NUM_LEDS = 5;

// 0xGGRRBB
var colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFF00FF, 0xFFFF00]
var count = 0

const ws281x = require('rpi-ws281x-native');
ws281x.init(NUM_LEDS)

const pause = () => new Promise(res => setTimeout(res, 250));

process.on ('SIGINT',() => {
  console.log('You clicked Ctrl+C!');
  process.exit(1);
});

(async function() {

  while(true) {
    console.log('Running Code ' + count);
	var tmp = [];
	for (var i = 0; i < NUM_LEDS; i++) {
		if (i > NUM_LEDS) break;
		tmp[i] = colors[(count + i) % 5];
	}
	ws281x.render(tmp);
	count++
    await pause();
  }
})();

ws281x.setBrightness(255);



/*
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
*/