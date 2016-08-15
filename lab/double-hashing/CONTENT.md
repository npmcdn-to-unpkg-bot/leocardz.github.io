### Collision 
resolution by Double Hashing.


This strategy uses a second hash function to find a new empty slot in hash table.

Like linear probing, it uses one hash value as an initial point and then repeatedly steps forward an interval until an empty slot is reached, or the entire table has been searched; but this interval is decided using a second, independent hash function (that's why its name is double hashing). 



Nevertheless, depending on the two hash functions that you create, the hash table cannot be completely mapped. And still If **load factor** exceeds 0.7 threshold, the hash table speed drastically degrades.




The implementation below works as follows: The algorithm tries to insert the key into the hash table using its full size as parameter. If the key cannot be inserted, the analysis of the hash table size is changed to the prime number less than its size, and so on... Example: 17, 13, 11, 7, 5, 3, 2\. In this case, 2 is the stop criteria for the tries.



### 
Code snippets


Code below implements linear probing. Current implementation is protected against entering infinite loop.


    
    
    public class Node {
    	private int key;
    	private int value;
    	private Node next;
    
    	public Node(int key, int value) {
    		this.key = key;
    		this.value = value;
    		this.next = null;
    	}
    
    	public int getValue() {
    		return value;
    	}
    
    	public void setValue(int value) {
    		this.value = value;
    	}
    
    	public int getKey() {
    		return key;
    	}
    
    	public Node getNext() {
    		return next;
    	}
    
    	public void setNext(Node next) {
    		this.next = next;
    	}
    }
    
    
    




    
    
    public class PrimeNumbers {
    
    	public static int findClosestPrimeNumber(int number) {
    		int previous = 0;
    		int next = 0;
    
    		for (int i = 0; i < 10; i++) {
    			previous = i;
    			next = i + 1;
    
    			if (PRIME_NUMBERS[0] == number)
    				break;
    
    			if (PRIME_NUMBERS[previous] == number)
    				previous--;
    
    			if (PRIME_NUMBERS[next] == number)
    				next++;
    
    			if (PRIME_NUMBERS[previous] < number
    					&& PRIME_NUMBERS[next] > number) {
    				int rangeDown = Math.abs(PRIME_NUMBERS[previous] - number);
    				int rangeUp = Math.abs(PRIME_NUMBERS[next] - number);
    				if (rangeDown < rangeUp)
    					return PRIME_NUMBERS[previous];
    				else
    					return PRIME_NUMBERS[next];
    			}
    
    		}
    
    		return number * 2 + 1;
    	}
    
    	public static int findPreviousPrimeNumber(int number) {
    		int previous = 0;
    		int next = 0;
    
    		for (int i = 0; i < 10; i++) {
    			previous = i;
    			next = i + 1;
    
    			if (PRIME_NUMBERS[0] == number)
    				break;
    
    			if (PRIME_NUMBERS[previous] == number)
    				previous--;
    
    			if (PRIME_NUMBERS[next] == number)
    				next++;
    
    			if (next != PRIME_NUMBERS.length - 1) {
    				if (PRIME_NUMBERS[previous] < number
    						&& PRIME_NUMBERS[next] > number) {
    					return PRIME_NUMBERS[previous];
    				}
    			} else
    				break;
    
    		}
    
    		return number;
    	}
    
    	/** Some prime numbers */
    	private static final int[] PRIME_NUMBERS = { 2, 3, 5, 7, 11, 13, 17, 19,
    			23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    			101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163,
    			167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
    			239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311,
    			313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389,
    			397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
    			467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563,
    			569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641,
    			643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727,
    			733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821,
    			823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907,
    			911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
    			1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063,
    			1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
    			1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229,
    			1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301,
    			1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409,
    			1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481,
    			1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553,
    			1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619,
    			1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709,
    			1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789,
    			1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879,
    			1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987,
    			1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063,
    			2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137,
    			2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239,
    			2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311,
    			2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389,
    			2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473,
    			2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591,
    			2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677,
    			2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731,
    			2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819,
    			2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909,
    			2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011,
    			3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109,
    			3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209 };
    }
    
    
    




    
    
    public class ClosedHashingDouble {
    
    	private final static int TABLE_INITIAL_SIZE = 17;
    
    	private Node[] table;
    
    	public ClosedHashingDouble() {
    		table = new Node[TABLE_INITIAL_SIZE];
    		for (int i = 0; i < TABLE_INITIAL_SIZE; i++)
    			table[i] = null;
    	}
    
    	private int firstFunction(int key, int currentAnalysisTableSize) {
    		int hash = 0;
    		hash = key % currentAnalysisTableSize;
    		return hash;
    	}
    
    	private int secondFunction(int times) {
    		int currentAnalysisTableSize = TABLE_INITIAL_SIZE;
    		currentAnalysisTableSize = getPrimeNumberLessThan(
    				currentAnalysisTableSize, times);
    		return currentAnalysisTableSize;
    	}
    
    	/**
    	 * Return the first prime smaller than the current analysis size of the
    	 * table, not the table full size
    	 */
    	private int getPrimeNumberLessThan(int currentAnalysisTableSize, int times) {
    
    		for (int i = 0; i < times; i++) {
    
    			currentAnalysisTableSize = PrimeNumbers
    					.findPreviousPrimeNumber(currentAnalysisTableSize);
    		}
    
    		return currentAnalysisTableSize;
    	}
    
    	/** Hash function */
    	public void put(int key, int value) {
    
    		/** Max number to try to insert */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    		if (table[hash] == null) {
    			table[hash] = new Node(key, value);
    			/** Inserted */
    		} else {
    			/** Collision */
    			Node entry = table[hash];
    
    			int secondValue = TABLE_INITIAL_SIZE;
    
    			while (entry != null && entry.getKey() != key
    					&& runner < TABLE_INITIAL_SIZE) {
    
    				runner++;
    				secondValue = secondFunction(runner);
    				hash = firstFunction(key, secondValue);
    				entry = table[hash];
    
    				/** 2 = smaller prime number = stop criteria */
    				if (secondValue == 2) {
    					break;
    				}
    
    			}
    
    			/**
    			 * This first 'if' is to avoid the override of the key value that
    			 * already is in hash table
    			 */
    			if (entry != null && entry.getKey() == key) {
    				/** Not inserted */
    			} else if (runner == TABLE_INITIAL_SIZE
    					|| (entry != null && entry.getKey() != key && secondValue == 2)){
    				/** Not inserted */
    			}
    			else {
    				/** Inserted */
    				table[hash] = new Node(key, value);
    			}
    		}
    	}
    
    	/** Get item */
    	public void get(int key) {
    
    		/** Run along the array */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		int secondValue = TABLE_INITIAL_SIZE;
    
    		while (table[hash] == null
    				|| (table[hash] != null && (table[hash].getKey() != key))
    				&& runner < TABLE_INITIAL_SIZE) {
    			runner++;
    			secondValue = secondFunction(runner);
    			hash = firstFunction(key, secondValue);
    
    			/** 2 = smaller prime number = stop criteria */
    			if (secondValue == 2) {
    				break;
    			}
    		}
    
    		if (runner >= TABLE_INITIAL_SIZE
    				|| (table[hash] != null && table[hash].getKey() != key && secondValue == 2)){
    			/** Not found */
    		}
    		else {
    			/** Found */
    		}
    	}
    
    	/** Remove item */
    	public void remove(int key) {
    
    		/** Run along the array */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    		int secondValue = TABLE_INITIAL_SIZE;
    
    		while (table[hash] == null
    				|| (table[hash] != null && (table[hash].getKey() != key))
    				&& runner < TABLE_INITIAL_SIZE) {
    			runner++;
    			secondValue = secondFunction(runner);
    			hash = firstFunction(key, secondValue);
    
    			/** 2 = smaller prime number = stop criteria */
    			if (secondValue == 2) {
    				break;
    			}
    		}
    
    		if (runner >= TABLE_INITIAL_SIZE
    				|| (table[hash] != null && table[hash].getKey() != key && secondValue == 2)){
    			/** Not found */
    		}
    		else {
    			table[hash] = null;
    			/** Removed */
    		}
    	}
    
    	private int countKeys() {
    		int count = 0;
    
    		for (int i = 0; i < table.length; i++) {
    			if (table[i] != null && !table[i].equals(DeletedNode.getUniqueDeletedNode())) {
    				count++;
    			}
    		}
    
    		return count;
    	}
    
    	public double loadFactor() {
    		return ((double) ((double) countKeys() / (double) table.length));
    	}
    
    }
    
    
    
    






Using this code with these entries { 13, 13, 24, 6, 23, 55, 42, 28, 37, 52, 68, 29, 13, 66, 31 } and the hash table size = 17 will produce the following result:





![](http://i.imgur.com/l8xPsOU.png) 



    
    
    0. 	  [68]
    1. 	  [52]
    2. 	  [ ]
    3. 	  [37]
    4. 	  [55]
    5. 	  [ ]
    6. 	  [6]
    7. 	  [24]
    8. 	  [42]
    9. 	  [ ]
    10. 	[23]
    11. 	[28]
    12. 	[29]
    13. 	[13]
    14. 	[31]
    15. 	[66]
    16. 	[ ]
    
    


Below there are links to all implementations of hashing algorithms.




* [Open Hashing][0]
* [Open Hashing with Avl][1]
* [Closed Hashing][2]

  * Linear probing
  * Quadratic probing
  * [Double hashing][3]
  * [Rehashing][4]

    * Linear probing
    * Quadratic probing



* [Half Open Hashing][5]





Main image: http://www.algolist.net/Data\_structures/Hash\_table/Chaining   


[0]: http://lab.leocardz.com/open-hashing
[1]: http://lab.leocardz.com/open-hashing-with-avl
[2]: http://lab.leocardz.com/closed-hashing
[3]: http://lab.leocardz.com/double-hashing
[4]: http://lab.leocardz.com/rehashing
[5]: http://lab.leocardz.com/half-open-hashing