// Main js file for index.html

// Global variables
var wallNodeClassName = 'wallNode';
var startNodeClassName = 'startNode';
var targetNodeClassName = 'targetNode';

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
function drawWallElements(element,valueOfActiveButton){

	// handle only wallNodes
	if(valueOfActiveButton==wallNodeClassName){

		// toggle between adding and removing wall
		if(element.hasClass(valueOfActiveButton)){
			element.removeClass(valueOfActiveButton);
		}else{
			element.addClass(valueOfActiveButton);
		}
	}
	// handle only startNode
	if(valueOfActiveButton==startNodeClassName){

		// check if any other element has starting node and remove
		if($('.element').hasClass(valueOfActiveButton)){
			$('.element').removeClass(valueOfActiveButton);
		}
		element.addClass(valueOfActiveButton);
	}
	// handle only startNode
	if(valueOfActiveButton==targetNodeClassName){

		// check if any other element has starting node and remove
		if($('.element').hasClass(valueOfActiveButton)){
			$('.element').removeClass(valueOfActiveButton);
		}
		element.addClass(valueOfActiveButton);
	}
}
