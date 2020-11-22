// Main js file for index.html

function main(){
	popsAlert();
}

// sets graph element to specific class
$('.element').click(function(){

	var activeButton = $('.btnGraph.active');
	var valueOfActiveButton = activeButton.val();

	// read button selected and change properties
	if(activeButton.length==0){
		alert('No node style selected!');
	}else{

		resetStartStopNode();
		$(this).addClass(valueOfActiveButton);

	}
});

// sets button to active and removes the active states from others
$('.btnGraph').click(function setActive(){
	$('.btnGraph').removeClass('active');
	$(this).addClass('active');
});

// checks that there's a single starting/target node
function resetStartStopNode(){

	var startNodes = $('.element.startNode');
	var targetNodes = $('.element.targetNode');

	console.log([startNodes.length,targetNodes.length])

	if(startNodes.length == 1){$('.element').removeClass('startNode');}
	if(targetNodes.length == 1){$('.element').removeClass('targetNode');}

}

// debugger functions
function popsAlert(){
	alert('works')
}