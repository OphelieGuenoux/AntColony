/**
 * @class graph 
 * class for sales man problem. 
 * @author Ophelie Guenoux
 */

class Graph {
	constructor(nodes, distances, nb_nodes) {
		this.nodes = nodes;
		this.distances = distances;
		this.nb_nodes = nb_nodes; 
	}

	getNbNodes() {
		return this.nb_nodes;
	}

	get_node(pos){
		return this.nodes[pos];
	}

	get_random_node(){
		let rnd =  Math.floor((Math.random() * this.nb_nodes) + 1); 
		return rnd-1; 
	}

	getMaxCoordinateValue() {
		return this.nodes.reduce((prev, node) => { return Math.max(...node, prev) } , 0);
	}
}

module.exports = Graph;