function putTheLandmines(landminesNumber, width, height, minefield){
	
	for(var i =0; i<landminesNumber ; i++)
	{
		var indexMineHeight = Math.round(Math.random() * (height-1)); // get a random number between 0 and 9
		var indexMineWidth = Math.round(Math.random() * (width-1)); 
		var spot = getSpot(minefield, indexMineWidth, indexMineHeight); // find the cell corresponding
		if(spot.content === "landMine")	// if the cell has already a landmine then doesnt place it again
			i--;
		else
			spot.content = "landMine"; // attribute the landmine to the cell
	}
}

function createMinefield(width,height,landminesNumber) {
	var minefield = {}; // create a minefield
	minefield.rows = []; 

	for(var i = 0; i < width; i++) {
	    var row = {};
	    row.spots = [];
	        
	    for(var j = 0; j < height; j++) {
	        var spot = {};
	        spot.isCovered = true;
	        spot.content = "empty";
	        spot.flagged = false;
	        row.spots.push(spot);
	    }
	        
	    minefield.rows.push(row);
	}
	putTheLandmines(landminesNumber, width, height, minefield);
	
	for (var i = 0; i < width; i++)
		for (var j = 0; j < height; j++) 
			checkTheCell(j,i,minefield,width-1,height-1);
	
	return minefield;
}

function checkTheCell(row, column, minefield, width, height){

	var spotInCheck = getSpot(minefield, row, column);
	if(spotInCheck.content === "landMine") //check if the spot has a mine in it
		return;

	else{ // if the cell has no mine in it then we need to check the neighbors

		var counter = 0;
	    if(row > 0){ // we check if the row is not the first row in the minefield 
	       
	        if(column > 0) { // we check if the column is not the first column in the minefield
	            
	            var spotAboveLeft = getSpot(minefield, row - 1, column - 1);
	            if(spotAboveLeft.content === "landMine")	// we check the spot above and to the left
	                counter++;
	        }
	        
	        var spotAbove = getSpot(minefield, row - 1, column);
	        if(spotAbove.content === "landMine") // we check the spot above
	                counter++;

	        // check column to the right if this is not the last column
	        if(column < width) {
	            
	            var spotAboveRight = getSpot(minefield, row - 1, column + 1);
	            if(spotAboveRight.content === "landMine") // we check the spot above and to the right
	                counter++;	        
	    	}
	    }
	    
	    if(column > 0) { // we check that the column is not the first column

	        var spotLeft = getSpot(minefield, row, column - 1);
	        if(spotLeft.content === "landMine") // we check the spot on the left
	                counter++;
	    }
	    	    
	    if(column < width) { // we check that the column is not the last column
	        
	        var spotRight = getSpot(minefield, row, column + 1); // we check the spot on the right
	        if(spotRight.content === "landMine") 
	                counter++;
	    }
  
	    if(row < height) { // we check if the row is not the last row
	        
	        if(column > 0) { // we check that the column is not the first column
	            
	            var spotBelowLeft = getSpot(minefield, row + 1, column - 1); // we check the spot below and on the left
	            if(spotBelowLeft.content === "landMine")
	                counter++;
	        }
	       
	        var spotBelow = getSpot(minefield, row + 1, column);
	        if(spotBelow.content === "landMine") // we check the spot below
	                counter++;
	        
	        if(column < width) { // we check that the column is not the last column
	            
	            var spotBelowRight = getSpot(minefield, row + 1, column + 1); // we check the spot below and on the right
	            if(spotBelowRight.content === "landMine") 
	                counter++;
	        }
	    }
		
		if(counter > 0)  // if there is landmine(s) around the checked cell
			spotInCheck.content = counter; //attributing the number of landmine(s) to the cell
	}
}

function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];	// return a spot
}

function playerWin(minefield, width, height){
	for (var i = 0; i < width ; i++)
		for (var j = 0; j < height ; j++)
		{
			var spotInCheck = getSpot(minefield,i,j);
			if(spotInCheck.isCovered && spotInCheck.content !== "landMine") // the cell is covered and is not a mine then the player hasn't won yet
				return false;
		}
	return true; // all the right cell are discovered
}

function playerLose(spot){
	if(spot.content === "landMine" && spot.flagged === false){	// if the player clicks on a mine then a message show
		alert("You lose!");
		return true
	}
	return false;
}

function playerWon(){
	alert("You won!"); 
}

function uncoverAll(minefield, width, height){ // uncover all the spots 
	for (var i = 0; i < width ; i++)
		for (var j = 0; j < height ; j++)
		{
			var spotToUncover = getSpot(minefield,i,j);
			spotToUncover.isCovered = false;
		}
}

function isEmpty(spot){
	return spot.content === "empty"; 	// if the spot is empty the function returns true
}

function discoverEmptyNeighbors(spot, minefield, width, height){
	
	for (var i = 0; i < width ; i++)
		for (var j = 0; j < height ; j++)
		{
			var isSpot = getSpot(minefield,i,j);
			if(isSpot === spot){
				uncoverEmptyNeighbors(spot, i, j, minefield, width-1, height-1); // find the (x;y) of the spot and send it to the uncovery cell function
				break;
			}	
		}
}
function uncoverEmptyNeighbors(spot, row, column, minefield, width, height){

	if (spot.content !== "empty") // if the cell is different than empty, it returns
		return;
	
	if(column> 0){
		if(row> 0){
			var spotToUncover = getSpot(minefield, row-1, column-1); // uncover the left cell above  
			spotToUncover.isCovered = false;			
		}					
			var spotToUncover = getSpot(minefield, row, column-1); // uncover the left cell
			spotToUncover.isCovered = false;
					
		if (row < width){
			var spotToUncover = getSpot(minefield, row+1, column-1); // uncover the left cell below
			spotToUncover.isCovered = false;
		}
	}
	
	if(row > 0){
		var spotToUncover = getSpot(minefield, row-1, column); // uncover the cell above
		spotToUncover.isCovered = false;	
	}
	
	if(row < width){
		var spotToUncover = getSpot(minefield, row+1, column); // uncover the cell below
		spotToUncover.isCovered = false;			
	}

	if(column < height){
		if(row > 0){
			var spotToUncover = getSpot(minefield, row-1, column+1); // uncover the right cell above
			spotToUncover.isCovered = false;			
		}
		
		var spotToUncover = getSpot(minefield, row, column+1); // uncover the right cell 
		spotToUncover.isCovered = false;

		if(row < width){
			var spotToUncover = getSpot(minefield, row+1, column+1); // uncover the right cell below
			spotToUncover.isCovered = false;			
		}
	}
	spot.content = "emptyDiscovered";

	if(column > 0){
		if(row > 0){
			var leftAboveSpot = getSpot(minefield, row-1, column-1);				
			uncoverEmptyNeighbors(leftAboveSpot, row-1, column-1, minefield, width, height); // send the left cell above
		}
		var leftSpot = getSpot(minefield,row,column-1);
		uncoverEmptyNeighbors(leftSpot, row, column-1, minefield, width, height);	// send the left cell
		if (row < width){
			var leftBelowSpot = getSpot(minefield,row+1,column-1);
			uncoverEmptyNeighbors(leftBelowSpot, row+1, column-1, minefield, width, height);	// send the left cell below
		}
	}
	if(row> 0){
		var aboveSpot = getSpot(minefield, row-1, column);
		uncoverEmptyNeighbors(aboveSpot, row-1,   column, minefield, width, height);	// send the cell above
	}
	if(row < width){
		var belowSpot = getSpot(minefield, row+1, column);
		uncoverEmptyNeighbors(belowSpot, row+1, column, minefield, width, height);	// send the cell below
	}
	if(column< height){
		if(row> 0){
			var rightAboveSpot = getSpot(minefield, row-1, column+1);
			uncoverEmptyNeighbors(rightAboveSpot, row-1, column+1, minefield, width, height);	// send the right cell above
		}
		var rightSpot = getSpot(minefield, row, column+1);
		uncoverEmptyNeighbors(rightSpot, row, column+1,   minefield, width, height);	// send the right cell 
		if(row < width){
			var rightBelowSpot = getSpot(minefield,row+1,column+1);
			uncoverEmptyNeighbors(rightBelowSpot, row+1, column+1, minefield, width, height);	// send the right cell below
		}
	}
}

function noMoreFlags(){
	alert("You do not have any more flags left"); // if there is no more flags
}

function supermanMode(minefield, width, height){ 
	for (var i = 0; i < width; i++)
		for (var j = 0; j < height; j++) {
			var spot = getSpot(minefield,i,j);
			if(spot.content === "landMine")	// if the spot is a landmine than a flag appear
				spot.flagged = true;
		}
}

function undoSupermanMode(minefield,width,height){
	for (var i = 0; i < width; i++)
		for (var j = 0; j < height; j++) {
			var spot = getSpot(minefield,i,j);
			if(spot.flagged)					// if there is a flag than it is taken off
				spot.flagged = false;
		}
}
