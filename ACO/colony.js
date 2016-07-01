/**
 * @class Colony 
 * class for ant colony algorithm
 * @author Ophelie Guenoux
 */

var Ant = require('./ant');
var Genoma = require('../model/genoma');


var NB_TOWN = 16;
var TIMEOUT = 10;

class Colony {
	constructor(populationSize, maxIterations, graph, alpha, beta, ip, Q, evaporate) {
		this.populationSize = populationSize;
		this.maxIterations = maxIterations;
		this.graph = graph; 
		this.distances = graph.distances;
		this.longueur = graph.nb_nodes; 

		this.alpha = alpha;
		this.beta = beta;
		this.Q = Q;
		this.ip = ip;
		this.evaporate = evaporate; 

		this.population = [];
		this.pheromones = [];
		this.bestLength = null;
		this.continue = false;

		this.onNewBest = null;
	}

	setIp(ip) {
		this.ip = ip;
	}

	setOnNewBest(onNewBest) {
		this.onNewBest = onNewBest;
  	}

	setOnIteration(onIteration) {
		this.onIteration = onIteration;
  	}


  	/**
		* function initialise: initialise the colony, specially the first pheromone rate and the population of the Colony
	*/

  	initialise() {
		this.population = [];
		this.pheromones = [];
		this.bestSolution = null;
		this.continue = true;

		for(let i = 0; i < this.populationSize; i++) {
	  		this.population[i] = new Ant(this.alpha, this.beta, this.Q, graph);
		}

		for(let x = 0; x < this.longueur; x++) {
			this.pheromones[x] = [];
			for(let y = 0; y < this.longueur; y++) {
				if (x !== y) {
					this.pheromones[x][y] = this.ip;
				}else{
					this.pheromones[x][y] = 0;
				}
	  		}
		} 
	}

	/**
		* function iterate: iterate the processus. 
		* @return {Array} this.best_solution, vector with the list of the best solution for each iteration
	*/

	iterate() {
		let best_solution = this.daemonActions(); 
		let best_solution_new = null; 
		for (let i = 0; i< maxIterations; i++){
			this.sendOutAnts(); 
			this.updatePheromones; 
			best_solution_new = this.daemonActions; 
			if (best_solution_new.walkLength < best_solution.walkLength) {
				best_solution = best_solution_new;
			}
		}

		return best_solution;
	}

	sendOutAnts() {
		for(let i = 0; i < this.populationSize; i++) {
			this.population[i].moveAnt(this.distances, this.pheromones);
		}
	}

	/**
		* function evaporation: each ant in the colony go randomly through the graph. 
		* @return {Array} tab, vector with the list of town each ants crossed
	*/

	exploration(){
		let tab = [];
		for (let i = 0; i< this.populationSize-1; i++) {
			this.population[i].randomMove();
			tab[i] = this.population[i].tour;
		}
		return tab; 
	}


	/**
		* @param [vector] :  rate array. Vector given us the estimate rate for each genoma
		* @return distances, matrix with the distances between each towns.
	*/

	updateDistance(rateTab){
		for (let ant = 0; ant < this.populationSize-1; ant++){
			let position = this.population[ant].position;

			for (let k=0; k< rateTab.length -1; k++){
				for (let i=0; i< position.length -1; i++) {
					for (let j = i+1; j < position.length ; j++) {				
		    			this.distances[position[i]][position[j]] = this.distances[position[i]][position[j]] + rateTab[k];
		    		}
		    	}
		    }
		}
	}

	/**
		* function updatePheromones : change the pheromone rate regarding the number of time a Ant took the arc
		* @return pheromones, matrix with the pheromone rate for each arc.
	*/

	updatePheromones() {
		this.evaporatePheromones();
		for (let ant = 0; ant < this.populationSize-1; ant++){
			let position = this.population[ant].position;	
			for (let i=0; i< position.length -1; i++) {
				for (let j = i+1; j < position.length ; j++) {
		    		this.pheromones[position[i]][position[j]] = this.pheromones[position[i]][position[j]] + this.Q;
		    	}
		    }
		}
	}

	/**
		* function evaporatePheromones: copy the real Colony life. let evaporate the pheromones rate
	*/

	evaporatePheromones() {
		for(let x = 0; x < this.distances.length; x++) {
			for(let y = 0; y < this.distances.length ; y++) {
				if (x !== y) {
					this.pheromones[x][y] = (1 - this.evaporate) * this.pheromones[x][y];
				} 
			}
		}
	}

	daemonActions() {

		let bestSolution = this.population[0].walkLength; 
		let best_ant = this.population[0];
		for (let i=0; i < this.populationSize -1; i++){
			if (this.population[i].walkLength < bestSolution){
				bestSolution = this.population[i].walkLength; 
				best_ant = this.population[i]; 

			}
		}
		return best_ant;
	}
}

module.exports = Colony;