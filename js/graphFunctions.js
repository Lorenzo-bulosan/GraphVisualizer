// File contain functions for obtaining data from graph 

// Creates custom class node that contains the value and it's coordinates on the frontend matrix
class Node {
	constructor(x_position, y_position, value, DOMelement){
		this.x = x_position;
		this.y = y_position;
		this.value = value;
		this.DOM = DOMelement;
	}
}

// create nodes from DOM 
function createNodesFromDOM(){
	
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

	var adjacencyList = {};
	
	for(var node = 0; node<nodeList.length; node++){
		listOfNeighbours = getNeighboursOfNode(nodeList[node], nodeList);
		adjacencyList[node] = listOfNeighbours;
	}
	return adjacencyList;
}

function getNeighboursOfNode(node, nodeList){
	// results list
	neighboursList = [];

	// get node position
	row = node.x;
	col = node.y;

	// check all directions and add if exists
	[upperNeighbour, hasUpper] = getNodeAtPosition(row, col+1, nodeList);
	[lowerNeighbour, hasLower] = getNodeAtPosition(row, col-1, nodeList);
	[rightNeighbour, hasRight] = getNodeAtPosition(row+1, col, nodeList);
	[leftNeighbour, hasLeft] = getNodeAtPosition(row-1, col, nodeList);

	if(hasUpper){neighboursList.push(upperNeighbour);}
	if(hasLower){neighboursList.push(lowerNeighbour);}
	if(hasRight){neighboursList.push(rightNeighbour);}
	if(hasLeft){neighboursList.push(leftNeighbour);}

	return neighboursList;
}

// gets node from position
function getNodeAtPosition(x, y, nodeList){

	var currentNode = null;

	for (var node = 0; node < nodeList.length; node++) {
		
		currentNode = nodeList[node];
		if(currentNode.x==x && currentNode.y==y){
			return [nodeList[node],true];
		}
	}
	return [null, false];
}

// gets neighbours from a node and returns neighbours in a list
// function getNeighboursOfNode(node){

// 	// results list
// 	neighboursList = [];

// 	// get node position
// 	row = node.x;
// 	col = node.y;

// 	// check all directions and add if exists
// 	[upperNeighbour, hasUpper] = checkNodeExistAtPosition(row, col+1);
// 	[lowerNeighbour, hasLower] = checkNodeExistAtPosition(row, col-1);
// 	[rightNeighbour, hasRight] = checkNodeExistAtPosition(row+1, col);
// 	[leftNeighbour, hasLeft] = checkNodeExistAtPosition(row-1, col);

// 	if(hasUpper){neighboursList.push(upperNeighbour);}
// 	if(hasLower){neighboursList.push(lowerNeighbour);}
// 	if(hasRight){neighboursList.push(rightNeighbour);}
// 	if(hasLeft){neighboursList.push(leftNeighbour);}

// 	return neighboursList;
// }

// // check if node exists, if exists return the node
// function checkNodeExistAtPosition(row, col){

// 	nodeRetrieved = $('[row|='+ row +'] [col|='+ col +']');

// 	if(nodeRetrieved.length == 0){
// 		return [null,false];
// 	}else{
// 		return [nodeRetrieved, true]
// 	}
// }

// removes nodes in undirected graph given its adjacency list
function removeNode(node, adjacencyList){

	for(var neighbour = 0; neighbour<adjacencyList[node].length; neighbour++){

		indexToRemove = adjacencyList[neighbour].indexOf(node);
		adjacencyList[neighbour].splice(indexToRemove,1);
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

