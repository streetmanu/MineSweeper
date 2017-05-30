app.controller('mainController', ['$scope', function($scope) {
    $scope.game = {
      height: 10,
      width: 10,
      minesNumber: 10,
      flags: 10,
      superman : false
    };

    $scope.supermanChecked = function(){
    	if($scope.game.superman === true)
    		supermanMode($scope.minefield, $scope.game.width, $scope.game.height);
    	else
    		undoSupermanMode($scope.minefield, $scope.game.width, $scope.game.height);
    }

    $scope.flagsPlusOne = function() {
        $scope.game.flags +=1;
    };
      
    $scope.flagsMinusOne = function() {
        $scope.game.flags -=1;
    };

    $scope.flagACell = function(spot){
    	if(spot.flagged){
    		$scope.flagsPlusOne();
    		spot.flagged = false;
    	}
    	else if(spot.isCovered === false)
    	{}
    	else{
    		if($scope.game.flags === 0)
    			noMoreFlags();
    		else{
	    		spot.flagged = true;
	    		$scope.flagsMinusOne();
	    	}		
    	}
    }

    $scope.uncoverCell = function(spot){
      	spot.isCovered = false;
      	if(playerLose(spot))
      		uncoverAll($scope.minefield, $scope.game.width, $scope.game.height);
      	
      	else if(playerWin($scope.minefield, $scope.game.width, $scope.game.height))
            playerWon();

        else if(isEmpty(spot))
        	discoverEmptyNeighbors(spot, $scope.minefield, $scope.game.width, $scope.game.height);

    }

    $scope.minefield = createMinefield($scope.game.width,$scope.game.height,$scope.game.minesNumber);

}]);