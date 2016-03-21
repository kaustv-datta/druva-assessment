self.postIntervalId = undefined;
self.wStartTime = 0;
self.wTotalDuration = 0;
self.wLastSplit = 0;

/**
 * msg.data = {msg: 'start/split/stop', time: 12143256}
 */

self.onmessage = function (msg) {
	console.log('worker onmessage');
	
	var uiData = msg.data;
	console.log(uiData);
	
    switch (uiData.msg) {
    
        case 'start':
        	startWatch(uiData.time);
            break;
            
        case 'split':
        	splitTime(uiData.time);
            break;
            
        case 'stop':
        	stopWatch(uiData.time);
            break;
            
        default:
            throw 'no aTopic on incoming message to ChromeWorker';
    }
    
};

function startWatch(time) {
	
	self.wStartTime = time;
	self.wLastSplit = time;
	
	self.postIntervalId = setInterval(function () {
		self.wTotalDuration = Date.now() - self.wStartTime;
		
		postMessage({
			msg: 'update',
			time: self.wTotalDuration
		});
	}, 0);
	
}

function stopWatch(time) {
	
	postMessage({
		msg: 'end',
		time: {
			totalDuration: time - self.wStartTime,
			lapDuration: time - self.wLastSplit
		}
	});
	clearInterval(self.postIntervalId);
	self.close();
	
}

function splitTime(time) {
	
	postMessage({
		msg: 'split',
		time: {
			totalDuration: time - self.wStartTime,
			lapDuration: time - self.wLastSplit
		}
	});
	
	self.wLastSplit = time;
	
}
