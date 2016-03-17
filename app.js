var app = angular.module("watchApp",[]);

app.directive('stopwatch', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@'
		},
		templateUrl: 'stopwatch.html',
		controller: function () {
			var self = this;
			self.states = ['ready', 'inprogress', 'stopped'];
			self.startTime = 0;
			self.totalDuration = 0;
			self.intervalId = undefined;
			
			self.log = function (data) {
				console.log(data);
			};
			
			self.start = function () {
				self.startTime = Date.now();
				self.intervalId = window.setInterval(self.startWatch, 4);
			};
			
			self.startWatch = function () {
				self.totalDuration = Date.now() - self.startTime;
			};
			
			self.stop = function () {
				window.clearInterval(self.intervalId);
			};
		},
		bindToController: true,
		controllerAs: 'watch'
	};
});
