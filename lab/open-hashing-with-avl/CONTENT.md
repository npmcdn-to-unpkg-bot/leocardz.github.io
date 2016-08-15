### Approach 



This approach is similar to **Open Hashing**, but instead using a linked list to handle collision, it uses an **AVL tree** on each slot to decrease the vertical deep of the hash.


### Code snippets



Below you will see an open hashing with avl tree.




    
    
    
    public class AvlTree {
    
    	protected TreeNode root;
    	public int currentSearchHeight = -1;
    
    	/** Core Functions */
    	public void insert(int key, int value) {
    		TreeNode n = new TreeNode(key, value);
    		insertAvl(this.root, n);
    	}
    
    	/** Insert new node */
    	private void insertAvl(TreeNode currentNode, TreeNode newNode) {
    
    		if (currentNode == null) {
    			this.root = newNode;
    		} else {
    
    			if (newNode.key < currentNode.key) {
    				if (currentNode.left == null) {
    					currentNode.left = newNode;
    					newNode.parent = currentNode;
    
    					recursiveBalance(currentNode);
    				} else {
    					insertAvl(currentNode.left, newNode);
    				}
    
    			} else if (newNode.key > currentNode.key) {
    				if (currentNode.right == null) {
    					currentNode.right = newNode;
    					newNode.parent = currentNode;
    
    					recursiveBalance(currentNode);
    				} else {
    					insertAvl(currentNode.right, newNode);
    				}
    			} else {
    				System.out.println("\nKey " + newNode.key
    						+ " already exists. Ignoring...");
    			}
    		}
    	}
    
    	/** Finds a node */
    	public TreeNode find(int key) {
    		currentSearchHeight = -1;
    		return find(this.root, key);
    	}
    
    	/** Finds a node */
    	public TreeNode find(TreeNode currentNode, int key) {
    		currentSearchHeight++;
    
    		if (key == currentNode.key)
    			return currentNode;
    		else if (currentNode.left != null || currentNode.right != null) {
    			if (currentNode.left != null) {
    				if (key == currentNode.key)
    					return currentNode;
    				else if (key < currentNode.key)
    					return find(currentNode.left, key);
    				else if (currentNode.right != null)
    					return find(currentNode.right, key);
    				else
    					return null;
    			}
    			if (currentNode.right != null) {
    				if (key == currentNode.key)
    					return currentNode;
    				else if (key > currentNode.key)
    					return find(currentNode.right, key);
    				else if (currentNode.left != null)
    					return find(currentNode.left, key);
    				else
    					return null;
    			}
    			return null;
    		} else {
    			return null;
    		}
    	}
    
    	/**
    	 * Check the balance for each node recursively and call required methods for
    	 * balancing the tree until the root is reached.
    	 */
    	protected void recursiveBalance(TreeNode currentNode) {
    
    		setBalance(currentNode);
    		int balance = currentNode.balance;
    
    		if (balance == -2) {
    			if (height(currentNode.left.left) >= height(currentNode.left.right)) {
    				currentNode = rotateRight(currentNode);
    			} else {
    				currentNode = doubleRotateLeftRight(currentNode);
    			}
    		} else if (balance == 2) {
    			if (height(currentNode.right.right) >= height(currentNode.right.left)) {
    				currentNode = rotateLeft(currentNode);
    			} else {
    				currentNode = doubleRotateRightLeft(currentNode);
    			}
    		}
    
    		if (currentNode.parent != null) {
    			recursiveBalance(currentNode.parent);
    		} else {
    			this.root = currentNode;
    		}
    	}
    
    	/**
    	 * Removes a node from the tree
    	 * 
    	 * @hash is just to print index in table hash
    	 */
    	public void remove(int k, int hash) {
    		currentSearchHeight = -1;
    		removeAvl(this.root, k, hash);
    	}
    
    	/**
    	 * Finds a node and calls a method to remove the node..
    	 */
    	private void removeAvl(TreeNode startingNode, int searchingKey, int hash) {
    		currentSearchHeight++;
    		if (startingNode == null) {
    			System.out.println("\nKey " + searchingKey + " not found.");
    			return;
    		} else {
    			if (startingNode.key > searchingKey) {
    				removeAvl(startingNode.left, searchingKey, hash);
    			} else if (startingNode.key < searchingKey) {
    				removeAvl(startingNode.right, searchingKey, hash);
    			} else if (startingNode.key == searchingKey) {
    				removeFoundNode(startingNode);
    				System.out.println("\nKey " + searchingKey + " with Value "
    						+ startingNode.value
    						+ " removed successfully in position " + hash
    						+ " at tree height " + currentSearchHeight + ".");
    			}
    		}
    	}
    
    	/**
    	 * Removes a node from a Avl-Tree, while balancing will be done if
    	 * necessary.
    	 */
    	private void removeFoundNode(TreeNode removingNode) {
    		TreeNode parentNode;
    
    		if (removingNode.left == null || removingNode.right == null) {
    			parentNode = removingNode;
    		} else {
    			parentNode = successor(removingNode);
    			removingNode.key = parentNode.key;
    		}
    
    		TreeNode childNode;
    		if (parentNode.left != null) {
    			childNode = parentNode.left;
    		} else {
    			childNode = parentNode.right;
    		}
    
    		if (childNode != null) {
    			childNode.parent = parentNode.parent;
    		}
    
    		if (parentNode.parent == null) {
    			this.root = childNode;
    		} else {
    			if (parentNode == parentNode.parent.left) {
    				parentNode.parent.left = childNode;
    			} else {
    				parentNode.parent.right = childNode;
    			}
    			recursiveBalance(parentNode.parent);
    		}
    		parentNode = null;
    	}
    
    	/**
    	 * Left rotation using the given node.
    	 */
    	private TreeNode rotateLeft(TreeNode rotatingNode) {
    
    		TreeNode rotatedTreeRootNode = rotatingNode.right;
    		rotatedTreeRootNode.parent = rotatingNode.parent;
    
    		rotatingNode.right = rotatedTreeRootNode.left;
    
    		if (rotatingNode.right != null) {
    			rotatingNode.right.parent = rotatingNode;
    		}
    
    		rotatedTreeRootNode.left = rotatingNode;
    		rotatingNode.parent = rotatedTreeRootNode;
    
    		if (rotatedTreeRootNode.parent != null) {
    			if (rotatedTreeRootNode.parent.right == rotatingNode) {
    				rotatedTreeRootNode.parent.right = rotatedTreeRootNode;
    			} else if (rotatedTreeRootNode.parent.left == rotatingNode) {
    				rotatedTreeRootNode.parent.left = rotatedTreeRootNode;
    			}
    		}
    
    		setBalance(rotatingNode);
    		setBalance(rotatedTreeRootNode);
    
    		return rotatedTreeRootNode;
    	}
    
    	/**
    	 * Right rotation using the given node.
    	 */
    	private TreeNode rotateRight(TreeNode rotatingNode) {
    
    		TreeNode rotatedTreeRootNode = rotatingNode.left;
    		rotatedTreeRootNode.parent = rotatingNode.parent;
    
    		rotatingNode.left = rotatedTreeRootNode.right;
    
    		if (rotatingNode.left != null) {
    			rotatingNode.left.parent = rotatingNode;
    		}
    
    		rotatedTreeRootNode.right = rotatingNode;
    		rotatingNode.parent = rotatedTreeRootNode;
    
    		if (rotatedTreeRootNode.parent != null) {
    			if (rotatedTreeRootNode.parent.right == rotatingNode) {
    				rotatedTreeRootNode.parent.right = rotatedTreeRootNode;
    			} else if (rotatedTreeRootNode.parent.left == rotatingNode) {
    				rotatedTreeRootNode.parent.left = rotatedTreeRootNode;
    			}
    		}
    
    		setBalance(rotatingNode);
    		setBalance(rotatedTreeRootNode);
    
    		return rotatedTreeRootNode;
    	}
    
    	/**
    	 * Double rotation Left Right using the given node
    	 */
    	private TreeNode doubleRotateLeftRight(TreeNode rotatingNode) {
    		rotatingNode.left = rotateLeft(rotatingNode.left);
    		return rotateRight(rotatingNode);
    	}
    
    	/**
    	 * Double rotation Right Left using the given node
    	 */
    	private TreeNode doubleRotateRightLeft(TreeNode rotatingNode) {
    		rotatingNode.right = rotateRight(rotatingNode.right);
    		return rotateLeft(rotatingNode);
    	}
    
    	/** Helper Functions */
    
    	/**
    	 * Returns the successor of a given node in the tree (search recursively).
    	 */
    	private TreeNode successor(TreeNode predecessorNode) {
    		TreeNode successorNode = null;
    
    		if (predecessorNode.left != null) {
    			successorNode = predecessorNode.left;
    			while (successorNode.right != null) {
    				successorNode = successorNode.right;
    			}
    		} else {
    			successorNode = predecessorNode.parent;
    			while (successorNode != null
    					&& predecessorNode == successorNode.left) {
    				predecessorNode = successorNode;
    				successorNode = predecessorNode.parent;
    			}
    		}
    
    		return successorNode;
    	}
    
    	public int height() {
    		return height(this.root);
    	}
    
    	/**
    	 * Calculating the height of a node.
    	 */
    	private int height(TreeNode currentNode) {
    		if (currentNode == null) {
    			return -1;
    		}
    		if (currentNode.left == null && currentNode.right == null) {
    			return 0;
    		} else if (currentNode.left == null) {
    			return 1 + height(currentNode.right);
    		} else if (currentNode.right == null) {
    			return 1 + height(currentNode.left);
    		} else {
    			return 1 + maximum(height(currentNode.left),
    					height(currentNode.right));
    		}
    	}
    
    	/**
    	 * Return the maximum of two integers.
    	 */
    	private int maximum(int a, int b) {
    		if (a >= b) {
    			return a;
    		} else {
    			return b;
    		}
    	}
    
    	/**
    	 * All information about a node.
    	 */
    	private void getAll(TreeNode node) {
    		int l = 0;
    		int r = 0;
    		int p = 0;
    		if (node.left != null) {
    			l = node.left.key;
    		}
    		if (node.right != null) {
    			r = node.right.key;
    		}
    		if (node.parent != null) {
    			p = node.parent.key;
    		}
    
    		System.out.println("Left: " + l + " Key: " + node.key + " Right: " + r
    				+ " Parent: " + p + " Balance: " + node.balance);
    
    		if (node.left != null) {
    			getAll(node.left);
    		}
    		if (node.right != null) {
    			getAll(node.right);
    		}
    	}
    
    	private void setBalance(TreeNode currentNode) {
    		currentNode.balance = height(currentNode.right)
    				- height(currentNode.left);
    	}
    
    	/**
    	 * Calculates the Inorder traversal of this tree.
    	 */
    	public ArrayList inOrder() {
    		ArrayList ret = new ArrayList();
    		inOrder(root, ret);
    		return ret;
    	}
    
    	/**
    	 * Function to calculate in order recursively.
    	 */
    	private void inOrder(TreeNode node, ArrayList io) {
    		if (node == null) {
    			return;
    		}
    		inOrder(node.left, io);
    		io.add(node);
    		inOrder(node.right, io);
    	}
    
    
    }
    
    
    





    
    
    public class AvlNode {
    	private int key;
    	private int value;
    	private AvlTree avlTree;
    
    	public AvlNode(int key, int value) {
    		this.avlTree = new AvlTree();
    		this.avlTree.insert(key, value);
    		this.key = key;
    		this.value = value;
    	}
    
    	public int getKey() {
    		return key;
    	}
    
    	public void setKey(int key) {
    		this.key = key;
    	}
    
    	public int getValue() {
    		return value;
    	}
    
    	public void setValue(int value) {
    		this.value = value;
    	}
    
    	public AvlTree getAvlTree() {
    		return avlTree;
    	}
    
    	public void setAvlTree(AvlTree avlTree) {
    		this.avlTree = avlTree;
    	}
    
    }
    
    
    





    
    
    public class OpenAvlHashing {
    	private final static int TABLE_INITIAL_SIZE = 7;
    
    	private AvlNode[] table;
    
    	public OpenAvlHashing() {
    		table = new AvlNode[TABLE_INITIAL_SIZE];
    		for (int i = 0; i < TABLE_INITIAL_SIZE; i++)
    			table[i] = null;
    	}
    
    	/** Hash function */
    	public void put(int key, int value) {
    
    		int hash = (key % TABLE_INITIAL_SIZE);
    		if (table[hash] == null) {
    			table[hash] = new AvlNode(key, value);
    			/** Inserted */
    		} else {
    			/** Collision */
    			AvlNode entry = table[hash];
    			entry.getAvlTree().insert(key, value);
    		}
    	}
    
    	/** Get item */
    	public void get(int key) {
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		if (table[hash] != null) {
    			AvlNode entry = table[hash];
    
    			TreeNode find = entry.getAvlTree().find(key);
    
    			if (find != null) {
    				/** Found */
    			} else {
    				/** Not found */
    			}
    		} else {
    			/** Not found */
    		}
    	}
    
    	/** Remove item */
    	public void remove(int key) {
    		System.out.print("\nAttempt to remove Key " + key + ".");
    		int hash = (key % TABLE_INITIAL_SIZE);
    
    		if (table[hash] != null) {
    			AvlNode entry = table[hash];
    			entry.getAvlTree().remove(key, hash);
    			/** Removed */
    		} else {
    			/** Not found */
    		}
    	}
    
    	/**
    	 * The Hash Table Load Factor in Half Open Hashing is the max height among
    	 * the trees of hash table nodes
    	 */
    	public int loadFactor() {
    
    		int maxHeight = 0;
    
    		for (int i = 0; i < table.length; i++) {
    
    			int height = 0;
    
    			if (table[i] != null) {
    
    				height = table[i].getAvlTree().height() + 1;
    
    			}
    
    			if (height > maxHeight) {
    
    				maxHeight = height;
    
    			}
    
    		}
    
    		return maxHeight;
    	}
    
    	/**
    	 * The Hash Table Balancing Factor in Half Open Hashing is the sum of the
    	 * heights of the trees of hash table nodes divided by number of the size
    	 * times max height(load factor). (h1+h2+...+hn)/(TABLE_INITIAL_SIZE * H)
    	 */
    	public double balancingFactor() {
    		double maxHeight = 0;
    		double heightsSum = 0;
    
    		for (int i = 0; i < table.length; i++) {
    			double height = 0;
    
    			if (table[i] != null)
    				height = table[i].getAvlTree().height() + 1;
    
    			heightsSum += height;
    
    			if (height > maxHeight)
    				maxHeight = height;
    		}
    
    		return (heightsSum / ((double) TABLE_INITIAL_SIZE * maxHeight));
    	}
    
    }
    
    
    





Using this code with these entries { 13, 13, 24, 6, 23, 55, 42, 28, 37, 52, 68, 29, 13, 66, 31 } and the hash table size = 7 will produce the following result:






![](http://i.imgur.com/lWC5s4A.png) 




    
    
    Position 0. 
      42   
     /   
    28   
            
    Position 1. 
    29 
        
    Position 2. 
     23   
       \ 
       37 
            
    Position 3. 
       52       
        / \   
       /   \  
     24   66   
       \     
       31     
                    
    Position 4. 
    [ ]
    
    Position 5. 
    68 
        
    Position 6. 
     13   
     / \ 
    6  55 
    
    




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





[0]: http://lab.leocardz.com/open-hashing
[1]: http://lab.leocardz.com/open-hashing-with-avl
[2]: http://lab.leocardz.com/closed-hashing
[3]: http://lab.leocardz.com/double-hashing
[4]: http://lab.leocardz.com/rehashing
[5]: http://lab.leocardz.com/half-open-hashing