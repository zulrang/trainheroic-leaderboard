(function(angular) {

    var app = angular.module('LeaderboardApp', ['ngMaterial', 'ngAnimate']);

    app.controller('leaderboardCtrl', function($scope, $http, $interval, $timeout) {
    	$scope.board = [];
    	$scope.boardData = [];
    	$scope.loading = true;
    	$scope.cursor = 90;
    	$scope.boardSize = 8;      // number of simultaneous leaders to show
    	$scope.screenDelay = 1000; // delay between screens
    	$scope.itemDelay = 150;    // delay between adding items to screen

    	// Removes all items from display
    	$scope.removeItems = function() {
    		$scope.board = [];
    		$timeout($scope.addItem, 500);
    	}

    	// Adds items to display one at a time (for animations)
    	$scope.addItem = function() {
    		// add item from total set
   			$scope.board.push($scope.boardData.results.slice($scope.cursor, $scope.cursor + 1)[0]);
    		$scope.cursor += 1;
    		// stop adding after boardSize items
    		if($scope.board.length < $scope.boardSize &&
    			$scope.cursor < $scope.boardData.results.length) {
    			// set up next item to be added
    			$timeout($scope.addItem, $scope.itemDelay);
    		} else {
    			// reset to zero if we've reached the end
	    		if($scope.cursor >= $scope.boardData.results.length) {
	    			$scope.cursor = 0;
	    		}
	    		// set up delay to clean screen and redraw
    			$timeout($scope.removeItems, $scope.screenDelay);
    		}
    	}

    	$scope.loadBoard = function() {
    		var httpRequest = $http({
    			method: 'GET',
    			url: 'https://apis.trainheroic.com/public/leaderboard/468425'
    		}).success(function (data, status) {
    			$scope.boardData = data;
    			$scope.loading = false;
    			// begin animating
    			$timeout($scope.addItem,0);
    			console.log(data);

    		});
    	}

    	$scope.loadBoard();
    });

})(angular);
