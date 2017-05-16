
var app = angular.module('myApp', []);

app.controller('AppCtrl', function($scope, $http){
	var refresh = function() {
		$http.get('/organization').success(function(response){
			$scope.organization = response;
				$scope.contact= "";
		});
	}

	refresh();

	$scope.addContact = function(){
		$http.post('/organization', $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.remove = function(id){
		$http.delete('/organization/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/organization/' + id).success(function(response){
			$scope.contact = response;
		});
	}

	$scope.update = function(id){
		$http.put('/organization/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contact = "";
	}
});
