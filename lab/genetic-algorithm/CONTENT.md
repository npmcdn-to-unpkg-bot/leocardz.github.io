A genetic algorithm (GA) is a very interesting and useful technique to find solutions for complex problems. These algorithms have that name because they are based in the behaviour of the genes, natural selection, mutation and crossover. They're commonly used to design computer algorithms to solve other optimization problems.





Genetic algorithms work by mimicking the way life finds solutions to real world problems using the process of evolution. Although genetic algorithms are capable of solving incredibly complicated problems, they are way simple to understand. 








1. 
Candidate - Set a candidate solutiona, the optimum value.


2. 
Initialization - Create an initial population with random individuals and each one with its own genetic code.


3. 
Evaluation - Each member of the population is then evaluated and we calculate a 'fitness' for that individual. The fitness is calculated by how many similarities that the current individual, in analysis, have compared to the Candidate.


4. 
Selection - For constantly improving the population's overall fitness, the best individuals must be selected for crossover and, then, create a new population closer to the Candidate.


5. 
Crossover - During crossover we create new individuals by creating crosses of our selected individuals, the parents. The combination of these parents will create an even 'fitter' offspring for the next population which inherits the best genes of both individuals.


6. 
Mutation - After the crossover, the mutation replaces some genes in the new individual. Otherwise, every combination in crossover will be the initial population, then the fitness would remain the same every evolution.


7. 
And repeat it until find the optimum solution!






### Individual


    
    
    public class Individual {
    
    	private byte[] genes = new byte[Main.defaultGeneLength];
    	private int fitness = -1;
    
    	/** Create a random individual */
    	public void generateIndividual() {
    		for (int i = 0; i < size(); i++) {
    			byte gene = (byte) Math.round(Math.random());
    			genes[i] = gene;
    		}
    	}
    
    	/** Get gene */
    	public byte getGene(int index) {
    		return genes[index];
    	}
    
    	/** Set gene */
    	public void setGene(int index, byte value) {
    		genes[index] = value;
    		fitness = 0;
    	}
    
    	/** Get the fitness number */
    	public int getFitness() {
    
    		if (this.fitness == 0)
    			setFitness(Fitness.getFitness(this));
    
    		return this.fitness;
    	}
    
    	/** Set fitness number */
    	public void setFitness(int fitness) {
    		this.fitness = fitness;
    	}
    
    	/** Number of genes */
    	public int size() {
    		return Main.defaultGeneLength;
    	}
    
    	/** Get the genes array */
    	public String getGeneticCode() {
    		String geneString = "";
    		for (int i = 0; i < size(); i++) {
    			geneString += getGene(i);
    		}
    		return geneString;
    	}
    }
    
    






### Population



    
    
    public class Population {
    
    	Individual[] individuals;
    
    	/** Create a new population */
    	public Population(int populationSize, boolean initialize) {
    
    		individuals = new Individual[populationSize];
    
    		/**
    		 * Initialize the population when it is not a population in evolving
    		 * process
    		 */
    		if (initialize) {
    
    			/** Create the individuals */
    			for (int i = 0; i < size(); i++) {
    				Individual newIndividual = new Individual();
    				newIndividual.generateIndividual();
    				welcomeIndividual(i, newIndividual);
    			}
    
    		}
    	}
    
    	/** Get individual */
    	public Individual getIndividual(int index) {
    		return individuals[index];
    	}
    
    	/** Get the fittest individual */
    	public Individual getFittest() {
    		Individual fittest = individuals[0];
    
    		/** Run along the individuals array to find the fittest one */
    		for (int i = 1; i < size(); i++) {
    			if (fittest.getFitness() 




### Fitness



    
    
    public class Fitness {
    
    	static byte[] solution = new byte[Main.defaultGeneLength];
    
    	/** Set a candidate solution as a byte array */
    	public static void setSolution(byte[] newSolution) {
    		solution = newSolution;
    	}
    
    	/**
    	 * Covert a candidate solution as a string to a candidate solution as a byte
    	 * array
    	 */
    	public static void setSolution(String newSolution) {
    
    		solution = new byte[newSolution.length()];
    
    		/**
    		 * Run along the string converting its char as a byte
    		 */
    		for (int i = 0; i < newSolution.length(); i++) {
    			String character = newSolution.substring(i, i + 1);
    			if (character.contains("0") || character.contains("1")) {
    				solution[i] = Byte.parseByte(character);
    			} else
    				solution[i] = 0;
    
    		}
    
    	}
    
    	/**
    	 * Calculate inidividuals fitness by comparing it to the candidate solution.
    	 * How many genes are equal to the candidate solution.
    	 */
    	public static int getFitness(Individual individual) {
    		int fitness = 0;
    
    		/**
    		 * Run along the individuals genes and compare them to the candidates
    		 * genes
    		 */
    		for (int i = 0; i < individual.size() && i < solution.length; i++) {
    			if (individual.getGene(i) == solution[i])
    				fitness++;
    		}
    
    		return fitness;
    	}
    }
    
    




### Algorithm



    
    
    public class Algorithm {
    
    	/** Rate for maintaining of the originality */
    	private static final double uniformRate = 0.5;
    
    	/** Rate allowed to mutate */
    	private static final double mutationRate = 0.015;
    
    	/** Tournament set size */
    	private static final int tournamentSize = 5;
    
    	/** Keep the fittest individual each evolution */
    	private static final boolean elitism = true;
    
    	/** Evolve population */
    	public static Population evolvePopulation(Population population) {
    
    		Population newPopulation = new Population(population.size(), false);
    
    		/**
    		 * If elitism is wanted, then the best individual of this population
    		 * must be keeped
    		 */
    		int elitismOffset;
    		if (elitism) {
    			newPopulation.welcomeIndividual(0, population.getFittest());
    			elitismOffset = 1;
    		} else
    			elitismOffset = 0;
    
    		/** Create a crossover in population individuals */
    		for (int i = elitismOffset; i < population.size(); i++) {
    			Individual firstIndividual = tournamentSelection(population);
    			Individual secondIndividual = tournamentSelection(population);
    
    			Individual newIndividual = crossover(firstIndividual,
    					secondIndividual);
    			newPopulation.welcomeIndividual(i, newIndividual);
    		}
    
    		/** Mutate the population */
    		for (int i = elitismOffset; i < newPopulation.size(); i++)
    			mutate(newPopulation.getIndividual(i));
    
    		return newPopulation;
    	}
    
    	/** Crossover the fittest individuals chosen from tournament selection */
    	private static Individual crossover(Individual firstIndividual,
    			Individual secondIndividual) {
    
    		Individual newIndividual = new Individual();
    
    		/** Run along the genes */
    		for (int i = 0; i < firstIndividual.size(); i++) {
    
    			/** Crossover */
    			if (Math.random() 





Considering an initial population with 50 individuals and a genetic code 011101100000, the result in my machine was:



    
    
    Candidate Solution: 011101100000
    
    **Initial Generation** 
    Generation: 1	Fittest: -1	Genetic Code: 001001000100 
    
    Generation: 2	Fittest: 9	Genetic Code: 011101001100
    Generation: 3	Fittest: 10	Genetic Code: 001111100000
    Generation: 4	Fittest: 11	Genetic Code: 011001100000
    
    **Optimum Solution**
    Generation: 5	Fittest: 12	Genetic Code: 011101100000
    
    
    





Idea derived and optimized from http://www.theprojectspot.com/tutorial-post/creating-a-genetic-algorithm-for-beginners/3