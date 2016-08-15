### Collision 
resolution by Closed Hashing, also know as open addressing.



**Open Hashing** can be considered a good strategy to resolve collisions, but the negative point is the need of an additional cost of memory to store the linked lists. On the other hand, **Closed Hashing** strategy allows all key-pair values to be stored in the hash table itself, then no extra cost of memory is needed. 

### Collision 

Let's consider the insertion operation. The algorithm used it's logic (in our case, **key** _modulus_ **size table**) to find a empty slot (bucket), if the slot is not empty, than the algorithm keeps on searching an empty slot using **a probe sequence** until a free bucket is found or there's no empty slot anymore. The most used probe sequences are:



* **inear probing** - distance that the algorithm uses to search a new empty slot is constant (i.e. 1, the next slot);
* **Quadratic probing** - distance is **current probe**² (i.e. 1² = 1, 2² = 4, 3² = 9...) and **current probe** lower than or equal to **table size**;
* **Double hashing** - distance is calculated using another hash function;
* **Rehashing**- distance is calculated using linear or quadratic probing. But to grant that the key-pair value will be inserted, this approach uses a threshold. When this threshold is reached, the size of hash table is increased to the closest prime number of the double of its size. And all current key-pair values are arranged in the new size of the hash table before the new one is inserted.




### Linear probing



![](http://i.imgur.com/G7qdr8G.png) 


### Removal operation




There are several nuances, when removing a key from hash table with open addressing. Consider following situation:
  



![](http://i.imgur.com/ukGdktj.png) 




Let's analyse. "Andrew Wilson" key has the same calculus of "Jack Williams" key, then the next slot the algorithm searched was the next one, but "Sandra Miller" key occupied that slot by calculus, then the algorithm searched the next slot, and finally it was empty and "Jack Williams" key was rearranged over there.
If algorithm simply frees "Sandra Miller" slot, the structure of the table will get broken because the algorithm won't succeed trying to find "Andrew Wilson" key, since it uses the **probe sequence**. The slot contains different key and linear probing algorithm will try to find "Andrew Wilson" in the next slot, but it is empty, the reference was loss as you can see:


![](http://i.imgur.com/oJkOnRM.png) 



The solution is as following. Instead of just erasing the key, the algorithm writes a special key-pair (-1, -1) value to the slot to flag that slot as DELETED. Now lookup algorithm will work properly. Insertion algorithm should reuse deleted slots, when possible:


![](http://i.imgur.com/mbkNMA4.png) 



This algorithm resolves the problem, but with time hash table will become clogged with "DELETED" entries, which badly affects performance. If hash table should allow items removal, then Open Hashing is more preferable way to resolve collisions.



### Complexity analysis


We call Load Factor the number that represents the complexity of a hash table. We can measure that simply as follows: **number of entries / table size**. If load factor exceeds 0.7 threshold, table's speed drastically degrades.


### Code snippets


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
    
    
    




    
    
    
    public class ClosedHashingLinear {
    
    	private final static int TABLE_INITIAL_SIZE = 8;
    
    	private Node[] table;
    
    	public ClosedHashingLinear() {
    		table = new Node[TABLE_INITIAL_SIZE];
    		for (int i = 0; i < TABLE_INITIAL_SIZE; i++)
    			table[i] = null;
    	}
    
    	/** Hash function */
    	public void put(int key, int value) {
    
    		/** Jump the array slots */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		if (table[hash] == null) {
    			table[hash] = new Node(key, value);
    			/** Inserted */
    		} else {
    			/** Collision */
    			Node entry = table[hash];
    
    			while (entry != null && runner < TABLE_INITIAL_SIZE) {
    
    				runner++;
    				hash = ((key + runner) % TABLE_INITIAL_SIZE);
    				entry = table[hash];
    
    			}
    
    			if (runner == TABLE_INITIAL_SIZE) {
    				/** Not inserted */
    			} else {
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
    
    		while (table[hash] != null && runner < TABLE_INITIAL_SIZE) {
    
    			if (table[hash].getKey() == key) {
    				break;
    			}
    
    			runner++;
    
    			hash = ((key + runner) % TABLE_INITIAL_SIZE);
    
    		}
    
    		if (runner >= TABLE_INITIAL_SIZE) {
    			/** Not found */
    		} else {
    			/** Found */
    		}
    	}
    
    	/** Remove item */
    	public void remove(int key) {
    
    		/** Run along the array */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		while (table[hash] != null && runner < TABLE_INITIAL_SIZE) {
    
    			if (table[hash].getKey() == key) {
    				break;
    			}
    
    			runner++;
    
    			hash = ((key + runner) % TABLE_INITIAL_SIZE);
    
    		}
    
    		if (runner >= TABLE_INITIAL_SIZE) {
    			/** Not found */
    		} else {
    			table[hash] = DeletedNode.getUniqueDeletedNode();
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
    
    







Code below implements quadratic probing. And also this implementation is protected against entering infinite loop.




    
    
    public class ClosedHashingQuadratic {
    
    	private final static int TABLE_INITIAL_SIZE = 7;
    
    	private Node[] table;
    
    	public ClosedHashingQuadratic() {
    		table = new Node[TABLE_INITIAL_SIZE];
    		for (int i = 0; i < TABLE_INITIAL_SIZE; i++)
    			table[i] = null;
    	}
    
    	/** Hash function */
    	public void put(int key, int value) {
    
    		/** Jump the array slots */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    		if (table[hash] == null) {
    			table[hash] = new Node(key, value);
    			/** Inserted */
    		} else {
    			/** Collision */
    			Node entry = table[hash];
    
    			/**
    			 * Quadratic probing only grants an element insertion while runner
    			 * is under the half of the table size.
    			 */
    			int edge = (int) Math.ceil((double) TABLE_INITIAL_SIZE / 2);
    
    			while (entry != null && runner < edge) {
    
    				runner++;
    				hash = ((key + runner * runner) % TABLE_INITIAL_SIZE);
    				entry = table[hash];
    
    			}
    
    			if (runner == edge) {
    				/** Not inserted */
    			} else {
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
    		int edge = (int) Math.ceil((double) TABLE_INITIAL_SIZE / 2);
    
    		while (table[hash] == null && runner < edge) {
    
    			if (table[hash].getKey() == key) {
    				break;
    			}
    
    			runner++;
    			hash = ((key + runner * runner) % TABLE_INITIAL_SIZE);
    		}
    
    		if (runner >= edge) {
    			/** Not found */
    		} else {
    			/** Found */
    		}
    	}
    
    	/** Remove item */
    	public void remove(int key) {
    
    		/** Run along the array */
    		int runner = 0;
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    		int edge = (int) Math.ceil((double) TABLE_INITIAL_SIZE / 2);
    
    		while (table[hash] == null && runner < edge) {
    
    			if (table[hash].getKey() == key) {
    				break;
    			}
    
    			runner++;
    			hash = ((key + runner * runner) % TABLE_INITIAL_SIZE);
    		}
    
    		if (runner >= edge) {
    			/** Not found */
    		} else {
    			table[hash] = DeletedNode.getUniqueDeletedNode();
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
    
    







Using this code with these entries { 13, 13, 24, 6, 23, 55, 42, 28, 37, 52, 68, 29, 13, 66, 31 } and the hash table size = 18 will produce the following result:





![](http://i.imgur.com/dcf5XLh.png) 


### Linear


    
    
    0. 	  [31]
    1. 	  [55]
    2. 	  [37]
    3. 	  [ ]
    4. 	  [ ]
    5. 	  [23]
    6. 	  [24]
    7. 	  [6]
    8. 	  [42]
    9. 	  [ ]
    10. 	[28]
    11. 	[29]
    12. 	[66]
    13. 	[13]
    14. 	[13]
    15. 	[68]
    16. 	[52]
    17. 	[13]
    
    





### Quadratic




![](http://i.imgur.com/tWq4GJL.png) 



    
    
    0. 	  [ ]
    1. 	  [55]
    2. 	  [37]
    3. 	  [66]
    4. 	  [31]
    5. 	  [23]
    6. 	  [24]
    7. 	  [6]
    8. 	  [ ]
    9. 	  [ ]
    10. 	[42]
    11. 	[28]
    12. 	[29]
    13. 	[13]
    14. 	[13]
    15. 	[68]
    16. 	[52]
    17. 	[13]
    
    




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






Secondary images http://www.algolist.net/Data\_structures/Hash\_table/Open\_addressing  


[0]: http://lab.leocardz.com/open-hashing
[1]: http://lab.leocardz.com/open-hashing-with-avl
[2]: http://lab.leocardz.com/closed-hashing
[3]: http://lab.leocardz.com/double-hashing
[4]: http://lab.leocardz.com/rehashing
[5]: http://lab.leocardz.com/half-open-hashing