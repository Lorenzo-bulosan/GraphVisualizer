// File contains methods for the different path finding algorythms


// DFS algorythm
function DFS(startNode, targetNode, adjacencyMatrix){

	// helper function
	function helperDFSrecursive(node, visitedNodes){

		console.log('Inside');

		// base condition
		if(!node){return null;}

		visitedNodes[node] = true;

		for (var neighbour = 0; neighbour<adjacencyMatrix.length; neighbour++){

			if(visitedNodes[targetNode]){return true}

			if(adjacencyMatrix[node][neighbour]==true && !visitedNodes[neighbour]){
				helperDFSrecursive(neighbour,visitedNodes);
			}
		}
	}

	var visitedNodes = {};
	var adjacencyMatrix = adjacencyMatrix;

	helperDFSrecursive(startNode,visitedNodes);

	console.log(visitedNodes);

	return visitedNodes;
}


// adjacencyMatrix = createAdjacencyMatrix2();
// DFS(0,8,adjacencyMatrix);