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
			
			self.log = function (data) {
				console.log(data);
			};
		},
		bindToController: true,
		controllerAs: 'watch'
	};
});
