// File contains methods for the different path finding algorythms

//DFS algorythm
function DFS(startNode, targetNode, adjacencyList){
	// helper function
	function helperDFSrecursive(startNode,adjacencyList){

		var currentNode = 0;
		var neighbour = 0;
		visitedList[startNode] = true;

		if(startNode == targetNode){
			console.log('Found -----------------------------------');
			return true;
		}
		
		for(var neighbourIdx = 0; neighbourIdx<adjacencyList[startNode].length; neighbourIdx++){
			
			neighbour = adjacencyList[startNode][neighbourIdx];
			console.log('checking neighbour='+neighbour.toString()+' from node='+startNode.toString());
			
			if(!visitedList[neighbour]){
				console.log('neighbour not visited');
				isFound = helperDFSrecursive(neighbour,adjacencyList);
				if(isFound){
					return true;
				}
			}
			console.log('neighbour already visited');
		}
	}
	console.log('DFS on starting node: ' + startNode.toString());
	console.log('Searching for node: ' + targetNode.toString());

	var visitedList = {};

	helperDFSrecursive(startNode, adjacencyList);
	console.log(visitedList);

	return visitedList;
}


// adjacencyMatrix = createAdjacencyMatrix2();
// DFS(0,8,adjacencyMatrix);