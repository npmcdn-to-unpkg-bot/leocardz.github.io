### Collision 
resolution by Open Hashing, also know as closed addressing or separate chaining. 



This approach is that each slot of the array contains a link to a linked list containing key-value pairs with the same hash. All new key-value pairs are added always to the end of the list.




The search algorithm crawls through the list to find matching key of the givem hash. Initially table slots contain nulls until the first item is added. The time for hash table operations is the time to find the slot/bucket, which is O(1), plus the time for the list operation. 




Deletion is the same idea of Search, but when it finds the key and this key has a child, the algorithm links the found key child to its parent, if it's not the first item of the list.




In a good hash table, each slot has zero or one entries, but at most three, because the optimized search can be affected with more values than that. Therefore, structures that are efficient in time and space for these cases are preferred.



### Illustration 

![](http://i.imgur.com/l6wcrOh.png) 



### Code snippets


Below you will see an open hashing with list heads. It means, that hash table entries store the elements themselves and not a pointer to it.


    
    
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
    
    




    
    
    public class OpenHashing {
    	private final static int TABLE_INITIAL_SIZE = 7;
    
    	private Node[] table;
    
    	public OpenHashing() {
    		table = new Node[TABLE_INITIAL_SIZE];
    		for (int i = 0; i < TABLE_INITIAL_SIZE; i++)
    			table[i] = null;
    	}
    
    	/** Hash function */
    	public void put(int key, int value) {
    		int level = 0;
    		int hash = (key % TABLE_INITIAL_SIZE);
    		if (table[hash] == null) {
    			table[hash] = new Node(key, value);
    			/** Inserted */
    		} else {
    			level++;
    			/** Collision */
    			Node entry = table[hash];
    			while (entry.getNext() != null) {
    				entry = entry.getNext();
    				level++;
    			}
    
    			/** Inserted */
    			entry.setNext(new Node(key, value));
    
    		}
    	}
    	
            /** Hash function inserting in the head of linked list. Thus, the insertion is always O(1) */
    	public void put(int key, int value) {
    		int level = 0;
    		int hash = (key % TABLE_INITIAL_SIZE);
    		if (table[hash] == null) {
    			table[hash] = new Node(key, value);
    			/** Inserted */
    		} else {
    			
    			/** Inserted in the head */
                            Node entry = table[hash];
    			Node head = new Node(key, value);
    			head.setNext(entry);
    			table[hash] = head;
    
    		}
    	}
    
    	/** Get item */
    	public void get(int key) {
    		int level = 0;
    
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		boolean found = false;
    
    		if (table[hash] != null) {
    
    			Node entry = table[hash];
    
    			while (entry != null) {
    
    				if (entry.getKey() == key) {
    
    					found = true;
    
    					break;
    
    				}
    
    				if (entry != null) {
    
    					entry = entry.getNext();
    
    				}
    
    				level++;
    			}
    
    			if (found) {
    
    				// Found
    
    			} else {
    
    				// Not found
    
    			}
    
    		}
    	}
    
    	/** Remove item */
    	public void remove(int key) {
    		int level = 0;
    
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		boolean found = false;
    
    		if (table[hash] != null) {
    
    			Node entry = table[hash];
    
    			Node previousNode = null;
    
    			do {
    
    				previousNode = entry;
    
    				if (entry != null && entry.getNext() != null) {
    
    					entry = entry.getNext();
    
    				}
    
    				if (entry.getKey() == key) {
    
    					found = true;
    
    					level++;
    
    					break;
    
    				}
    
    				level++;
    
    			} while (entry != null && previousNode != entry);
    
    			if (previousNode == entry) {
    
    				level = 0;
    
    				table[hash] = table[hash].getNext();
    
    				/** Removed in the head */
    
    			} else if (found) {
    
    				previousNode.setNext(entry.getNext());
    
    				/** Removed */
    
    			} else {
    
    				/** Not found */
    				
    			}
    
    		}
    	}
    
    	private int countKeys() {
    		int count = 0;
    
    		for (int i = 0; i < table.length; i++) {
    			Node current = table[i];
    			while (current != null) {
    				count++;
    				current = current.getNext();
    			}
    		}
    
    		return count;
    	}
    
    	public double loadFactor() {
    		return ((double) ((double) countKeys() / (double) table.length));
    	}
    
    }
    
    



  



Using this code with these entries { 13, 13, 24, 6, 23, 55, 42, 28, 37, 52, 68, 29, 13, 66, 31 } and the hash table size = 7 will produce the following result:





![](http://i.imgur.com/wRMyXpc.png) 



    
    
    0. 	[42]->[28]
    1. 	[29]
    2. 	[23]->[37]
    3. 	[24]->[52]->[66]->[31]
    4. 	[ ]
    5. 	[68]
    6. 	[13]->[13]->[6]->[55]->[13]
    
    




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





Secondary images http://www.algolist.net/Data\_structures/Hash\_table/Chaining  


[0]: http://lab.leocardz.com/open-hashing
[1]: http://lab.leocardz.com/open-hashing-with-avl
[2]: http://lab.leocardz.com/closed-hashing
[3]: http://lab.leocardz.com/double-hashing
[4]: http://lab.leocardz.com/rehashing
[5]: http://lab.leocardz.com/half-open-hashing