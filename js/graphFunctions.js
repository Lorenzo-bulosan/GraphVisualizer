// File contain functions for obtaining data from graph 

// Creates custom class node that contains the value and it's coordinates on the frontend matrix
class Node {
	constructor(x_position, y_position, value, DOMelement){
		this.row = x_position;
		this.col = y_position;
		this.value = value;
		this.DOM = DOMelement;
	}
}

// create nodes list from DOM, and returns node
function createNodesFromDOM(){
	
	// private helper function to get node's position given an element ID to create the node object
	// after this this function won't be needed anymore as the node itself will have this data
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
	
	elements = $('.element');
	listOfNodes = [];

	for(var nodeValue=0; nodeValue<elements.length; nodeValue++){
		
		elementID = elements[nodeValue].id;
		[row, col] = getNodePositionFromID(elementID);
		
		node = new Node(row, col, nodeValue, elements[nodeValue]);
		listOfNodes.push(node);
	}
	return listOfNodes;
}

// creates graph's adjacency list
function createAdjacencyList(nodeList){

	var adjList = {};
	
	for(var node = 0; node<nodeList.length; node++){
		listOfNeighbours = getNeighboursOfNode(nodeList[node], nodeList);
		adjList[node] = listOfNeighbours;
	}
	return adjList;
}

// gets all direct neighbours of the nodes in the DOM
function getNeighboursOfNode(node, nodeList){
	// results list
	neighboursList = [];

	// get node position
	row = node.row;
	col = node.col;

	// check all directions and add if exists
	[upperNeighbour, hasUpper] = getNodeAtPosition(row, col+1, nodeList);
	[lowerNeighbour, hasLower] = getNodeAtPosition(row, col-1, nodeList);
	[rightNeighbour, hasRight] = getNodeAtPosition(row+1, col, nodeList);
	[leftNeighbour, hasLeft] = getNodeAtPosition(row-1, col, nodeList);

	if(hasUpper){neighboursList.push(upperNeighbour.value);}
	if(hasLower){neighboursList.push(lowerNeighbour.value);}
	if(hasRight){neighboursList.push(rightNeighbour.value);}
	if(hasLeft){neighboursList.push(leftNeighbour.value);}

	return neighboursList;
}

// gets node from position and returns the node and a bool flag that indicated if exist or not
function getNodeAtPosition(row, col, allNodes){

	var currentNode = null;

	for (var node = 0; node < allNodes.length; node++) {
		currentNode = allNodes[node];
		if(currentNode.row==row && currentNode.col==col){
			return [allNodes[node],true];
		}
	}
	return [null, false];
}

// removes nodes in undirected graph given its adjacency list-> Global variable, this is not pass by value b/ object
function removeNode(node, adjacencyListGlobal){

	var listLength = adjacencyListGlobal[node].length // important as we are changing the global variable

	for(var neighbour = 0; neighbour<listLength; neighbour++){ // if you put it here the foorloop will be affected as length changing dynamically

		// removes link from neighbour to this node
		indexToRemove = adjacencyListGlobal[neighbour].indexOf(node);
		adjacencyListGlobal[neighbour].splice(indexToRemove,1);

		//console.log('removing '+ node.toString() + ' from neighbour: ' + neighbour.toString());
	}
	// remove neighbours from this node in the global variable
	adjacencyListGlobal[node] = [];
}

// create empty matrix
function createMatrix(row, col){

	var matrix = [];

	for(var i=0; i<row; i++) {
	    matrix[i] = new Array(col);
	}	
	return matrix;
}

// debugging functions
function testAlert(){alert('alert on another file');}


// // create Adjacency matrix 
// function createAdjacencyMatrix(){

// 	// create empty matrix
// 	var numRows = $('.row').length;
// 	var numCol = $('[row|=0] .graphColumn').length;
// 	var adjacencyMatrix = createMatrix(numRows,numCol);

// 	// fill matrix O(nxm)
// 	var element;
// 	for(var node=0; node<adjacencyMatrix.length; node++){
// 		for(var neighbour=0; neighbour<adjacencyMatrix[node].length; neighbour++){

// 			// get element from DOM
// 			element = $('[row|='+ node +'] [col|='+ neighbour +']');

// 			// reflect walls on matrix
// 			if(element.hasClass(wallNodeClassName)==true){
// 				adjacencyMatrix[node][neighbour] = false;
// 			}else{
// 				adjacencyMatrix[node][neighbour] = true;
// 			}
// 		}
// 	}
// 	return adjacencyMatrix;
// }

// // creates adjacency matrix
// function createAdjacencyMatrix2(){

// 	// init variables
// 	var elements = $('.element');
// 	var elementClasses = '';

// 	// create empty matrix
// 	var numRows = $('.row').length;
// 	var numCol = $('[row|=0] .graphColumn').length;
// 	var adjacencyMatrix = createMatrix(numRows,numCol);

// 	// fill matrix O(n)
// 	for (var node = 0; node < elements.length; node++) {

// 		// find out node's class
// 		elementClasses = elements[node].className;
// 		hasWallNodeClass = elementClasses.includes(wallNodeClassName);

// 		// get position coordinates
// 		[row, col] = getNodePositionFromID(elements[node].id);

// 		// reflect walls in matrix
// 		if(hasWallNodeClass==true){
// 			adjacencyMatrix[row][col] = false;
// 		}else{
// 			adjacencyMatrix[row][col] = true;
// 		}
// 	}
// 	return adjacencyMatrix;
// }