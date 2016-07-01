/**
 * Starts the process!
 */

var fs = require ('fs');
var Genoma = require('./model/genoma');
var Graph = require('./TSP/graph');
var Colony = require('./ACO/colony');
var Ant = require('./ACO/ant');
var Town = require('./ACO/town');


/**
	* function exploration: first step of the algorithm
		* first create a colony
		* each ant in the colony move randomly in the graph
		* given us a Genoma array
		* update distances between town regarding that array
		* update pheromones matrix in order to have the pheromone rate for each arc. 
*/


function exploration() {
	populationSize = 40;
	maxIterations = 20; 
	// taux de pheromones  initiale
	ip = 1;
	alpha = 1;
	beta = 5;
	Q = 500; // trail deposit coefficient
	max_iteration = 20;
	evaporate = 0.5;
	nodes = get_town('test.txt');
	distances = init_distance(nodes);
	graph = new Graph (nodes, distances, nodes.length) ;

	colony = new Colony(populationSize, maxIterations, graph, alpha, beta, ip, Q, evaporate);
	colony.initialise();
	//colony.iterate();
	let tabTour = colony.exploration();

	rate = [];
	genoma = []; 
	for(i = 0; i < tabTour.length; i++) {
		genoma[i] = new Genoma(tabTour[i]); 
		rate.push(genoma[i].obtain_engagementRate(); 
	} 

	let pos = colony.updateDistance(rate);
	let pherom = colony.updatePheromones();
	return {colony, rate};
}

/**
	* function run: colony life
	* 
	* @param {List} colony: list of ants
*/

function run(colony) {
	//colony.setOnNewBest(onNewBest);
	//colony.setOnIteration(onIteration);
	return colony.iterate(); 
}

/**
	* function init_distance: initialise the distance between towns matrix.
	* 
	* @param {array} nodes: array in the graph
	* @return {Array}{array} distances: matrix with the initial distance between every towns
*/

function init_distance(nodes){
	len_max = nodes.length; 
	distance = []; 
	for(x = 0; x < len_max; x++) {
		distance[x] = [];
		for(y = 0; y < len_max; y++) {
			if (x==y) {
				distance[x][y] = 0;
			}else{
			distance[x][y] = 1;
			}
		}
	}
	return distance;
}

/**
	* function get town : return towns regarding a file
	* 
	* @param {file}  fileName: file where all the town are registered
	* @return {Array} towns : array which every town
*/
function get_town(fileName) {
	var data = fs.readFileSync(fileName, 'utf8')//, function(err, data) {
		var towns = JSON.parse(data);
		return towns.town; 
}


console.log('exploration test');
c1 = exploration();

console.log('***************************** run the Ant Algorithm *****************************'); 
best_solution = run(c1);
console.log('------------------------- best Solution (best Ant) ------------------------------');
console.log(best_solution);
console.log('------------------------- best position (list of number of town) ----------------');
console.log(best_solution.position);
console.log('------------------------- best tour (liste of town)------------------------------');
console.log(best_solution.tour);
console.log('------------------------- best walk length --------------------------------------');
console.log(best_solution.walkLength);

/**************************************************************************************************************************/

/**
    * test plot 2D
*/

function test_plot2D(solution) {

    var x = [];

    for (var i = 0; i < solution.length; i ++) {
        x[i] = i;
    }
    var data = [
        {
            x: x,
            y: solution.R,
            type: 'scatter'
        }
    ];

    var graphOptions = {filename: "ACO", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
    });
}

let Z = []; 
for (let i = 0; i< sol.sol.length; i++){
	Z.push(sol.sol[i].); 
}

test_plot2D(sol.sol); 
