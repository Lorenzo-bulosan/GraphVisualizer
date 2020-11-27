// File contains functions that contains the wall logic

$( document ).ready(function() {

// Global variables
var wallNodeClassName = 'wallNode';
var startNodeClassName = 'startNode';
var targetNodeClassName = 'targetNode';
var adjacencyListGlobal = {};

// creates nodes and adjacency list
// allNodesGlobal = createNodesFromDOM();
// adjacencyListGlobal = createAdjacencyList(allNodesGlobal);

// Debugging---------------------------
$('#btnDebug').click(function(){

	allNodesGlobal = createNodesFromDOM();
	adjacencyListGlobal = createAdjacencyList(allNodesGlobal);
	console.log(adjacencyListGlobal);

	// get start and target node
	[startNode, targetNode, startTargetNodeExist] = getStartAndTargetNode(allNodesGlobal);

	// make sure there exist a start and target node
	if(startTargetNodeExist == true){
		//test search
		path = DFS(startNode, targetNode, adjacencyListGlobal);

		// draw path
		drawPath(path,allNodesGlobal);
	}else{
		console.log('Please select a start and target node');
	}
});

// sets graph element to specific class
$('.element').click(function(){

	var activeButton = $('.btnGraph.active');
	var valueOfActiveButton = activeButton.val();

	// read button selected and change properties
	if(activeButton.length==0){
		alert('No node style selected!');
	}else{
		drawWallElements($(this),valueOfActiveButton);
	}
});

// sets button to active and removes the active states from others
$('.btnGraph').click(function setActive(){

	$('.btnGraph').removeClass('active');
	$(this).addClass('active');

});

// draws wall elements and when clicked 
function drawWallElements(element, valueOfActiveButton){

	// handle only wallNodes
	if(valueOfActiveButton==wallNodeClassName){

		// skip target and start node
		if(element.hasClass(startNodeClassName) || element.hasClass(targetNodeClassName)){
			alert('Cannot make this cell a wall node');
			return;
		}

		// toggle between adding and removing wall
		if(element.hasClass(valueOfActiveButton)){
			element.removeClass(valueOfActiveButton);
		}else{
			element.addClass(valueOfActiveButton);
		}
		return;
	}
	// handle only startNode
	if(valueOfActiveButton==startNodeClassName){

		// skip walls and start node
		if(element.hasClass(wallNodeClassName) || element.hasClass(targetNodeClassName)){
			alert('Cannot make this cell a start node');
			return;
		}

		// check if any other element has starting node and remove
		if($('.element').hasClass(valueOfActiveButton)){
			$('.element').removeClass(valueOfActiveButton);
		}
		element.addClass(valueOfActiveButton);
		return;
	}
	// handle only startNode
	if(valueOfActiveButton==targetNodeClassName){

		// skip walls and target node
		if(element.hasClass(wallNodeClassName) || element.hasClass(startNodeClassName)){
			alert('Cannot make this cell a target node');
			return;
		}

		// check if any other element has starting node and remove
		if($('.element').hasClass(valueOfActiveButton)){
			$('.element').removeClass(valueOfActiveButton);
		}
		element.addClass(valueOfActiveButton);
		return;
	}
}

// draw path from a given list of nodes
function drawPath(pathObject, allNodes){

	console.log('drawing path');
	var path = Object.getOwnPropertyNames(pathObject);
	var currentNode = 0;

	for(var node = 0; node<path.length; node++){
		
		currentNode = path[node];
		nodeClasses = allNodes[currentNode].DOM.classList;
		// add path class to element but skip target and start nodes
		if(nodeClasses.contains(startNodeClassName) || nodeClasses.contains(targetNodeClassName)){
			console.log('');
		}else{
			nodeClasses.add('path');
		}
	}
}

// get start Node and target node
function getStartAndTargetNode(allNodes){

	// check that exist
	var startNodeElement = $('.element.startNode'); 
	var targetNodeElement = $('.element.targetNode');
	if(startNodeElement.length==0 || targetNodeElement.length==0){ return [null, null, false];}

	// get elements with start and target classes
	var startNodeID = startNodeElement[0].id; 
	var targetNodeID = targetNodeElement[0].id;

	// get the coordinates information from the ID
	[startNodeRow, startNodeCol] = getNodePositionFromID(startNodeID);
	[targetNodeRow, targetNodeCol] = getNodePositionFromID(targetNodeID);

	// get the node at those coordinates 
	[startNode, ignore]= getNodeAtPosition(startNodeRow, startNodeCol, allNodes);
	[targetNode, ignore] = getNodeAtPosition(targetNodeRow, targetNodeCol, allNodes);

	return [startNode.value, targetNode.value, true];
}

}); // end of document ready