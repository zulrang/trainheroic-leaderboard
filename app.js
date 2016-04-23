(function(angular) {

    var app = angular.module('LeaderboardApp', ['ngMaterial', 'ngAnimate']);

    app.controller('leaderboardCtrl', function($scope, $http, $interval, $timeout) {
    	$scope.board = [];
    	$scope.boardData = [];
    	$scope.loading = true;
    	$scope.cursor = 0;

    	$scope.removeItems = function() {
    		$scope.board = [];
    		$timeout($scope.addItem, 500);
    	}

    	$scope.addItem = function() {
    		$scope.board.push($scope.boardData.results.slice($scope.cursor, $scope.cursor + 1)[0]);
    		$scope.cursor += 1;
    		if($scope.board.length < 5) {
    			$timeout($scope.addItem, 100);
    		} else {
	    		if($scope.cursor > $scope.boardData.results.length) {
	    			$scope.cursor = 0;
	    		}
    			$timeout($scope.removeItems, 4000);
    		}
    	}

    	$scope.loadBoard = function() {
    		var httpRequest = $http({
    			method: 'GET',
    			url: 'https://apis.trainheroic.com/public/leaderboard/468425'
    		}).success(function (data, status) {
    			$scope.boardData = data;
    			$scope.loading = false;
    			$timeout($scope.addItem,0);
    			console.log(data);

    		});
    	}

    	$scope.loadBoard();
    });

})(angular);
