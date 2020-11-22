// File contain functions for obtaining data from graph 

// creates graph's adjacency list
function createAdjacencyList(){
	var adjacencyList = {};
}

// create Adjacency matrix
function createAdjacencyMatrix(){

	// init variables
	var element;

	// create empty matrix
	var numRows = $('.row').length;
	var numCol = $('[row|=0] .graphColumn').length;
	var adjacencyMatrix = createMatrix(numRows,numCol);

	// fill matrix
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

// create empty matrix
function createMatrix(row,col){
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
	row = nodePosition[0];
	col = nodePosition[1];

	return [row,col];
}

// debugging functions
function testAlert(){
	alert('alert on another file');
}

createAdjacencyList();
createAdjacencyMatrix();