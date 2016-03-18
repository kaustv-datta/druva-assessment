self.history = [];
self.intervalId = undefined;
self.postIntervalId = undefined;
self.wstartTime = 0;
self.wtotalDuration = 0;

/**
 * msg.data = {msg: 'start/split/stop', time: 12143256}
 */

self.onmessage = function (msg) {
	
    switch (msg.data.msg) {
        case 'start':
        	self.wstartTime = msg.data.time;
        	startWatch();
            break;
        case 'split':
            break;
        case 'stop':
        	stopWatch();
            break;
        default:
            throw 'no aTopic on incoming message to ChromeWorker';
    }
    
};

function startWatch() {
	
	self.intervalId = setInterval(function () {
		self.wtotalDuration = Date.now() - self.wstartTime;
	}, 0);
	
	self.postIntervalId = setInterval(function () {
		postMessage(self.wtotalDuration);
	}, 1000);
	
}

function stopWatch() {
	
	clearInterval(self.intervalId);
	clearInterval(self.postIntervalId);
	self.close();
	
}
