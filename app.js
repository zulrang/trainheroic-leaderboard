(function(angular) {

    var app = angular.module('LeaderboardApp', ['ngMaterial', 'ngAnimate']);

    app.controller('leaderboardCtrl', function($scope, $http, $interval, $timeout) {
    	$scope.board = [];
    	$scope.boardData = {};
    	$scope.loading = true;
    	$scope.cursor = 0;
    	$scope.boardSize = 7;      // number of simultaneous leaders to show
    	$scope.screenDelay = 5000; // delay between screens
    	$scope.itemDelay = 150;    // delay between adding items to screen

    	// Removes all items from display
    	$scope.removeItems = function() {
    		$scope.board = [];
    		$timeout($scope.addItem, 500);
    	}

    	// Adds items to display one at a time (for animations)
    	$scope.addItem = function() {
    		var moreItems = false;

    		// add item from total set
   			$scope.board.push($scope.boardData.results.slice($scope.cursor, $scope.cursor + 1)[0]);
    		$scope.cursor += 1;

    		// reset to zero if we've reached the end
	    	if($scope.cursor >= $scope.boardData.results.length) {
	    		$scope.cursor = 0;
	    	} else {
		    	// stop adding after boardSize items
		    	if($scope.board.length < $scope.boardSize) {
		    		moreItems = true;
		    	}
	    	}

	    	if(moreItems) {
	    		// set up next item to be added
	    		$timeout($scope.addItem, $scope.itemDelay);
	    	} else {
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
    			$scope.boardData.totalReps = 0;
    			$scope.loading = false;
    			// calculate total reps
    			angular.forEach(data.results, function(item, index) {
    				$scope.boardData.totalReps += parseInt(item.tests[0]);
    			});
    			// begin animating
    			$timeout($scope.addItem,0);
    			console.log(data);

    		});
    	}

    	$scope.loadBoard();
    });

})(angular);
