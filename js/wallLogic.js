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

});