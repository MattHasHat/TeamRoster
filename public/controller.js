var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller Transmitting");

	var refresh = function() {
  		$http.get('/teamroster').success(function(response) {
    		console.log("Request Successful");
    		$scope.playerroster = response;
    		$scope.player = "";
  		});
	};

	refresh();

	$scope.add = function() {
  		console.log($scope.player);
  		$http.post('/teamroster', $scope.player).success(function(response) {
    		console.log(response);
    		refresh();
  		});
	};

	$scope.remove = function(id) {
		console.log(id);
  		$http.delete('/teamroster/' + id).success(function(response) {
    		refresh();
  		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/teamroster/' + id).success(function(response) {
    		$scope.player = response;
  		});
	};  

	$scope.update = function() {
		console.log($scope.player._id);
		$http.put('/teamroster/' + $scope.player._id, $scope.player).success(function(response) {
    		refresh();
  		})
	};

	$scope.deselect = function() {
		$scope.player = "";
	}
}])