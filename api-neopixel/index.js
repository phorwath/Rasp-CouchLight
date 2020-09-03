var NUM_LEDS = 129;

// 0xGGRRBB
var colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFF00FF, 0xFFFF00]
var count = 0

const Gpio = require('onoff').Gpio;
const ws281x = require('rpi-ws281x-native');

ws281x.init(NUM_LEDS)

const btn17 = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
const btn22 = new Gpio(22, 'in', 'rising', {debounceTimeout: 10});
const btn27 = new Gpio(27, 'in', 'rising', {debounceTimeout: 10});

process.on ('SIGINT',() => {
  console.log('You clicked Ctrl+C!');
  ws281x.reset();
  btn17.unexport();
  btn22.unexport();
  btn27.unexport();

  process.exit(1);
});

function setAllColors(color) {
	var tmp = [];
	for (var i = 0; i < NUM_LEDS; i++) {
		tmp[i] = color;
	}
	ws281x.render(tmp);	
}

var state = "on";
var run = true;

btn17.watch((err, value) => {
	console.log("Button17: " + value);
	if (state == "off") {
		state = "on"
		setAllColors(0xFFFFFF);
		ws281x.setBrightness(0);
		run = false
	} else {
		state = "off"
		setAllColors(0xFFFFFF);
		ws281x.setBrightness(255);
		run = false
	}
  	if (err) {
    	throw err;
  	}
});

btn22.watch((err, value) => {
	console.log("Button22: " + value);
	run = !run;
  	if (err) {
    	throw err;
  	}
});

btn27.watch((err, value) => {
	console.log("Button27: " + value);
	run = !run;
  	if (err) {
    	throw err;
  	}
});

const pause = () => new Promise(res => setTimeout(res, 1000));

(async function() {

  while(true) {
if (run) {	
var tmp = [];
	for (var i = 0; i < NUM_LEDS; i++) {
		if (i > NUM_LEDS) break;
		tmp[i] = colors[count % 5];
	}
	ws281x.render(tmp);
	count++
}
    await pause();
  }
})();

ws281x.setBrightness(255);
setAllColors(0xFFFFFF)


