/**
 * @class Genoma
 * class for determine the rate by asking the database, and the population for the Ad unit
 * @author Ophelie Guenoux
 */

class Genoma {
	constructor(array_town) {
		this.array = array_town; 
		this.rate = this.obtain_engagementRate(); 
	}

	/**
		* get_id : return the id of the genoma array. List of bits
		* @return town_bit, a proper genoma as an array bit
	*/

	get_id(){
		return this.translateTown2Bit(this.array) 
	}

	/**
		* @param [array_town] :  array of town given by the ACO algorithm
		* @return town_bit, a proper genoma as an array bit
	*/
	translateTown2Bit(array_town){
		return array_town.join("");
	}


	/**
		* this fonction will ask the data base and give us the engagement rate for this genoma
		* at the moment it give just a random rate between 0 and 1
	*/
	obtain_engagementRate(){
		return (Math.floor((Math.random() * 100) + 1))/100 -0.01; 
	}

	
}

module.exports = Genoma;