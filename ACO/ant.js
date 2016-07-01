/**
 * @class Ant 
 * class for ant colony algorithm
 * @author Ophelie Guenoux
 */

class Ant {
	/**
		* construct a ant
		* 
		* @param {Number} alpha  : trail preference (sentier)
		* @param {Number} beta : grredy preference (gourmandise)
		* @param {Number} Q : new trail deposit coefficient
	*/
	constructor(alpha, beta, Q, graph) {
		this.alpha = alpha;
		this.beta = beta;
		this.Q = Q || 1;
		this.graph = graph;

		this.position = []; //current index

 // list of towns
		this.current_Node = this.get_first_Node();
		this.walkLength = null; // rate ?
	}

	get_first_Node(){
		let rnd = graph.get_random_node(); 
		let first_town = graph.nodes[rnd];
		this.tour = [first_town];
		this.position.push(rnd); 
		return first_town; 
	}
	/**
		* visit a town
		* @param {int} town
	*/
	visitTown(town){
		this.tour.push(town);
		this.current_Node = town;
	}

	/**
		* allow us to know is a town has already been visited
		* @param {int} i : the town 
	*/
	isVisited(i) {
		return this.position.indexOf(i) !== -1;
	}

	clearTour(){
		this.tour = []; 
	}

	clearPosition(){
		this.position = []; 
	}
	/**
		* Construct a solution to the problem
		* @param  {Array} distances
		* @param  {Array} pheromones
	*/
	moveAnt(distances, pheromones) {
		this.clearTour(); 
		this.clearPosition(); 
		this.get_first_Node();

		this.walkLength = null;
		let nb = null; 
		for(let i = 1; i < distances.length; i++) {
			nb = this.chooseNext(distances, pheromones);
			this.position.push(nb);
			this.tour.push(this.graph.get_node(nb));

		}
		this.walkLength = this.calculateWalkLength(distances);
	}

	/**
		* move the ant randomly
	*/

    randomMove() {
    	let nbNodes = this.graph.getNbNodes(); 
        for (let i = 0; i < nbNodes-1; i++) {
   			this.visitTown(this.selectNextTown());
        }
    }
    /**
		* Select the next town to be visit. Random also
		* @param  {Array <int>} node : the current node
	*/

    selectNextTown() {
    	let rnd = this.graph.get_random_node(); 
    	while (this.isVisited(rnd)== true) {
			rnd = this.graph.get_random_node(); 
    	}

    	this.current_Node = this.graph.nodes[rnd]; 
    	this.position.push(rnd);
    	return this.current_Node;
    }

    /**
		* Select the next town to be visit. Clever way
		* @param  {Array} distances : between each town
		* @param  {Array} pheromones : rate of pheromones leave by the ant
		* @return {Array <int>} new node : the next position (node) for the Ant
	*/
	chooseNext(distances, pheromones) {
		let sumall = 0;
		let unvisited = [];
		
		for(let i = 0; i < distances.length; i++) {
			if (this.position.indexOf(i) === -1) {
				unvisited.push(i);
			}
		}

		for(let i = 0; i < pheromones.length; i++) {
			if (i !== this.position[this.position[this.position.length-1]] && unvisited.indexOf(i) !== -1) {
				sumall += Math.pow(pheromones[this.position[this.position.length-1]][i], this.alpha) * Math.pow((1/distances[this.position[this.position.length-1]][i]), this.beta);
			}
		}
	
		let probs = [];
		let summul = 0;
		for(let i = 0; i < distances[this.position[this.position.length-1]].length; i++) {
			if (i !== this.position[this.position.length-1] && unvisited.indexOf(i) !== -1) {
				let mul = Math.pow(pheromones[this.position[this.position.length-1]][i], this.alpha) * Math.pow((1/distances[this.position[this.position.length-1]][i]), this.beta);
				probs.push(mul/sumall);
				summul += mul;
			}
		}

		let max_prob = probs[0];
		for (let i =0; i< probs.length; i++) {
			if (probs[i] > max_prob)
				max_prob = probs[i]; 
		}
		
		for (let j =0; j < probs.length; j++){
			if (probs[j] === max_prob){
				return unvisited[j];
			}
		}
	}

	calculateWalkLength(distances) {
		let len = 0;
		/*for(let i = 1; i < this.position.length; i++) {
			len += distances[i-1][i];
		}*/
		for (let i=0; i< this.position.length -1; i++) {
			for (let j = i+1; j < this.position.length ; j++) {
		    	len += distances[this.position[i]][this.position[j]];
		    }
		}
		return len;
	}
}

module.exports = Ant;