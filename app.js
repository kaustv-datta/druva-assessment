app = angular.module('watchApp', []);

app.directive('stopwatch', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@'
		},
		templateUrl: 'stopwatch.html',
		
		link: function (scope, elem, attrs) {
			
			scope.state = 'idle';
			scope.worker = new Worker('worker.js');
			scope.totalDuration = 0;
			scope.history = [];
			
			function exportData() {
				
				var data = "text/json;charset=utf-8," + JSON.stringify(scope.history);

				var a = document.createElement('a');
				a.href = 'data:' + data;
				a.download = (scope.name || 'history') + '.json';
				a.click();
				
			}
			
			function initWorker (worker) {
				
				worker.addEventListener('message', function(e) {
					
					var workerData = e.data;
					
					switch (workerData.msg) {
					
					case 'update':
						scope.totalDuration = workerData.time;
						break;
						
					case 'split':
						scope.history.push(workerData.time);
						break;
						
					case 'end':
						scope.history.push(workerData.time);
						scope.totalDuration = workerData.time.totalDuration;
						exportData();
						break;
						
					}
					
					scope.$apply();
					
				});
				
			}
			
			scope.start = function () {
//				console.log('app start');
				
				if (scope.state === 'idle') {
					scope.worker = scope.worker || new Worker('worker.js');
					initWorker(scope.worker);
					scope.state = 'busy';
					var startTime = Date.now();
					scope.worker.postMessage({msg: 'start', time: startTime});
				}
				
			};
			
			scope.split = function () {
//				console.log('app split');
				
				if (scope.state === 'busy') {
					var currentTime = Date.now();
					scope.worker.postMessage({msg: 'split', time: currentTime});
				}
				
			};
			
			scope.reset = function () {
//				console.log('app reset');
				
				scope.state = 'idle';
				scope.history = [];
				scope.totalDuration = 0;
				
				if (scope.worker) {
					scope.worker.terminate();
					scope.worker = undefined;
				}
				
			};
			
			scope.stop = function () {
//				console.log('app stop');
				
				var currentTime = Date.now();
				scope.worker.postMessage({msg: 'stop', time: currentTime});
				scope.state = 'stop';
				
			};
		}
		
	};
});

app.filter('stopwatch', function () {
	return filterTime;
});

function filterTime(timeInMs) {
	var hours = Math.floor(timeInMs / 36e5);
	timeInMs %= 36e5;
	
	var mins = Math.floor(timeInMs / 6e4);
	timeInMs %= 6e4;
	
	var secs = Math.floor(timeInMs / 1000);
	timeInMs %= 1000;
	
	return hours + ' hr : ' + mins + ' min : ' + secs + ' sec : ' + timeInMs + ' ms';
}
