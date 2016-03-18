var app = angular.module("watchApp",[]);

/*app.directive('stopwatch', function () {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'stopwatch.html',
//		bindToController: true,
		controllerAs: 'watch',
		controller: function () {
			var self = this;
			self.worker = new Worker('worker.js');
			
			self.worker.addEventListener('message', function(e) {
				self.totalDuration = e.data;
				console.log(self.totalDuration);
			});
			
			self.log = function (data) {
				console.log(data);
			};
			
			self.start = function () {
				console.log('start');
				self.worker.postMessage({msg: 'start', time: Date.now()});
			};
			
			self.stop = function () {
				console.log('stop');
				self.worker.postMessage({msg: 'stop', time: Date.now()});
			};
		}
	};
});*/

app.directive('stopwatch', function () {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'stopwatch.html',
		link: function (scope, elem, attrs) {
			scope.worker = new Worker('worker.js');
			scope.totalDuration = 0;
			
			scope.worker.addEventListener('message', function(e) {
				scope.totalDuration = e.data;
				console.log(scope.totalDuration);
			});
			
			scope.start = function () {
				scope.worker.postMessage({msg: 'start', time: Date.now()});
			};
			
			scope.stop = function () {
				scope.worker.postMessage({msg: 'stop', time: Date.now()});
			};
		}
	};
});
