// File contains functions that contains the wall logic

$( document ).ready(function() {

// Global variables
var wallNodeClassName = 'wallNode';
var startNodeClassName = 'startNode';
var targetNodeClassName = 'targetNode';
var pathNodeClassName = 'pathNode';
var DfsClassName = 'DFS';
var DijkstraClassName = 'Dijkstra';
var adjacencyListGlobal = {};

// creates nodes and adjacency list
// allNodesGlobal = createNodesFromDOM();
// adjacencyListGlobal = createAdjacencyList(allNodesGlobal);

// When refreshed do the following
$('#ModalTutorial').modal('show');
$('.btnGroup2').hide();

// Path Finding---------------------------
$('#btnStartPathFinding').click(function(){

	// get start and target node
	var allNodesGlobal = createNodesFromDOM();
	var algorithmType = $('.algorithm.active').attr('value');
	[startNode, targetNode, startTargetNodeExist] = getStartAndTargetNode(allNodesGlobal);
	
	// make sure there exist a start and target node and algorithm is selected
	if(startTargetNodeExist == true && algorithmType!=null){	

		// make the adjacency list
		adjacencyListGlobal = createAdjacencyList(allNodesGlobal);
		console.log(adjacencyListGlobal);

		// use selected algorithm to search
		[path, pathFound] = useSelectedAlgorithm(startNode, targetNode, adjacencyListGlobal);

		// draw path
		if(pathFound == true){
			drawPath(path,allNodesGlobal);
		}else {
			alert('Path not found');
		}

		// hide buttons
		$('.btnGroup1').hide();
		$('.btnGroup2').show();
		
	}else{
		alert('Please select a start/target node or select an algorithm');
	}
});

// reset button
$('#btnClearAll').click(function(){

	// clear all classes
	$('.element').removeClass(wallNodeClassName);
	$('.element').removeClass(startNodeClassName);
	$('.element').removeClass(targetNodeClassName);
	$('.element').removeClass(pathNodeClassName);

	// show buttons again
	$('.btnGroup1').show();
	$('.btnGroup2').hide();
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

// sets button to active and removes the active states from others
$('.algorithm').click(function setActive(){

	$('.algorithm').removeClass('active');
	$(this).addClass('active');

});

// use algorithm depending on active selected
function useSelectedAlgorithm(startNode, targetNode, adjacencyListGlobal){

	var algorithmType = $('.algorithm.active').attr('value');

	// make sure something is selected
	if(algorithmType==null){return [null, false];}

	if(algorithmType==DfsClassName){
		return DFS(startNode, targetNode, adjacencyListGlobal);

	}else if(algorithmType==DijkstraClassName){
		alert('Not implemented yet, using DFS on the meantime');
		return DFS(startNode, targetNode, adjacencyListGlobal);
	}
}

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
	var start = 1;

	// Draw path with delay
	drawPathWithDelay(path, allNodes, start, path.length, 150); //1,2,3,4..12 will be alerted with 2 sec delay

	// Draw path no delay -------------------------
	// var currentNode = 0;
	// for(var node = 0; node<path.length; node++){
		
	// 	currentNode = path[node];
	// 	nodeClasses = allNodes[currentNode].DOM.classList;

	// 	// add path class to element but skip target and start nodes
	// 	if(!nodeClasses.contains(startNodeClassName) && !nodeClasses.contains(targetNodeClassName)){
	// 		nodeClasses.add(pathNodeClassName);
	// 	}
	// }
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


// TEST -------------------------------------
function drawPathWithDelay(pathList, allNodes, current, length, milliseconds){

	insideDelay = setTimeout(function(){

		currentNode = pathList[current];
		console.log(currentNode);
		nodeClasses = allNodes[currentNode].DOM.classList;

		// add path class to element but skip target and start nodes
		if(!nodeClasses.contains(startNodeClassName) && !nodeClasses.contains(targetNodeClassName)){
			nodeClasses.add('pathNode');
		}

		// base condition
		if(current==length){
		  clearTimeout(insideDelay);
		  return;
		}

		drawPathWithDelay(pathList, allNodes, current+1, length, milliseconds);

	}, milliseconds);
}
