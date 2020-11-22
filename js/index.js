// Main js file for index.html

function main(){
	popsAlert();
}

// sets graph element to specific class
$('.element').click(function(){

	// read button selected


	// change style
	$(this).hide();

	// add class
});

// sets button to active and removes the active states from others
$('.btnGraph').click(function setActive(){
	$('.btnGraph').removeClass('active');
	$(this).addClass('active');
});

// debugger functions
function popsAlert(){
	alert('works')
}