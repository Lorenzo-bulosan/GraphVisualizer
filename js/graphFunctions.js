// File contain functions for obtaining data from graph 

// creates graph's adjacency list
function createAdjacencyList(){
	
	var adjacencyList = {};
	var elements = $('.element');
	var nodeID = ''

	for (var node = 0; node < elements.length; node++){
		nodeID = elements[node].id;
		listOfNeighbours = getNeighboursOfNode(nodeID);
		adjacencyList[node] = listOfNeighbours;
	}
	return adjacencyList;
}

// gets neighbours from a node and returns neighbours in a list
function getNeighboursOfNode(nodeID){

	// results list
	neighboursList = [];

	// get node position
	[row, col] = getNodePositionFromID(nodeID);

	// check all directions and add if exists
	[upperNeighbour, hasUpper] = checkNodeExist(row, col+1);
	[lowerNeighbour, hasLower] = checkNodeExist(row, col-1);
	[rightNeighbour, hasRight] = checkNodeExist(row+1, col);
	[leftNeighbour, hasLeft] = checkNodeExist(row-1, col);

	if(hasUpper){neighboursList.push(upperNeighbour);}
	if(hasLower){neighboursList.push(lowerNeighbour);}
	if(hasRight){neighboursList.push(rightNeighbour);}
	if(hasLeft){neighboursList.push(leftNeighbour);}

	return neighboursList;
}

// check if node exists, if exists return the node
function checkNodeExist(row, col){

	nodeRetrieved = $('[row|='+ row +'] [col|='+ col +']');

	if(nodeRetrieved.length == 0){
		return [null,false];
	}else{
		return [nodeRetrieved, true]
	}
}

// create Adjacency matrix 
function createAdjacencyMatrix(){

	// create empty matrix
	var numRows = $('.row').length;
	var numCol = $('[row|=0] .graphColumn').length;
	var adjacencyMatrix = createMatrix(numRows,numCol);

	// fill matrix O(nxm)
	var element;
	for(var node=0; node<adjacencyMatrix.length; node++){
		for(var neighbour=0; neighbour<adjacencyMatrix[node].length; neighbour++){

			// get element from DOM
			element = $('[row|='+ node +'] [col|='+ neighbour +']');

			// reflect walls on matrix
			if(element.hasClass(wallNodeClassName)==true){
				adjacencyMatrix[node][neighbour] = false;
			}else{
				adjacencyMatrix[node][neighbour] = true;
			}
		}
	}
	return adjacencyMatrix;
}

// creates adjacency matrix
function createAdjacencyMatrix2(){

	// init variables
	var elements = $('.element');
	var elementClasses = '';

	// create empty matrix
	var numRows = $('.row').length;
	var numCol = $('[row|=0] .graphColumn').length;
	var adjacencyMatrix = createMatrix(numRows,numCol);

	// fill matrix O(n)
	for (var node = 0; node < elements.length; node++) {

		// find out node's class
		elementClasses = elements[node].className;
		hasWallNodeClass = elementClasses.includes(wallNodeClassName);

		// get position coordinates
		[row, col] = getNodePositionFromID(elements[node].id);

		// reflect walls in matrix
		if(hasWallNodeClass==true){
			adjacencyMatrix[row][col] = false;
		}else{
			adjacencyMatrix[row][col] = true;
		}
	}
	return adjacencyMatrix;
}

// create empty matrix
function createMatrix(row, col){

	var matrix = [];

	for(var i=0; i<row; i++) {
	    matrix[i] = new Array(col);
	}	
	return matrix;
}

// gets node's position
function getNodePositionFromID(elementID){

	// init variables
	var splitID = [];
	var nodePosition = '';
	var	row = 0, col = 0;

	// gets row and column information from ID
	splitID = elementID.split('_');
	nodePosition = splitID[1];
	nodePosition = nodePosition.split('-');
	row = parseInt(nodePosition[0]);
	col = parseInt(nodePosition[1]);

	return [row, col];
}

// debugging functions
function testAlert(){alert('alert on another file');}

createAdjacencyList()