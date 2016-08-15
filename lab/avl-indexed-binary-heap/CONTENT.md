This approach is about **Upgrade and Downgrade** functions. In a normal Binary Heap, Upgrade and Downgrade are O(n) and it's expensive for us, so to improve that we use an AVL Tree to map the items and their positions on the Binary Tree. Thus, we can perform those functions in O(log n). Consider that there are no repeated indexes.

### Code snippets

Below you will see a avl-indexed binary tree which each element has two integers, first is the priority and the second is the value.


    
    
    public class Pair {
    
    	/** priority */
    	public int p;
    
    	/** value */
    	public int v;
    
    	public Pair(int priority, int value) {
    		this.p = priority;
    		this.v = value;
    	}
    
    	@Override
    	public String toString() {
    		return "[p=" + p + ",v=" + v + "]";
    	}
    
    }
    
    



    
    
    public class TreeNode {
    	public int value;
    	public TreeNode left;
    	public TreeNode right;
    	public TreeNode parent;
    	public int key;
    	public int balance;
    
    	public TreeNode(int k, int v) {
    		left = right = parent = null;
    		balance = 0;
    		key = k;
    		value = v;
    	}
    
    	public TreeNode getLeft() {
    		return left;
    	}
    
    	public void setLeft(TreeNode left) {
    		this.left = left;
    	}
    
    	public TreeNode getRight() {
    		return right;
    	}
    
    	public void setRight(TreeNode right) {
    		this.right = right;
    	}
    
    	public TreeNode getParent() {
    		return parent;
    	}
    
    	public void setParent(TreeNode parent) {
    		this.parent = parent;
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
    
    	public void setKey(int key) {
    		this.key = key;
    	}
    
    	public int getBalance() {
    		return balance;
    	}
    
    	public void setBalance(int balance) {
    		this.balance = balance;
    	}
    }
    
    
    



    
    
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
    				System.out.println("\nKey " + newNode.key + " already exists. Ignoring...");
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
    	 * balancing the heaps.tree until the root is reached.
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
    	 * Removes a node from the heaps.tree
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
    				System.out.println("\nKey " + searchingKey + " with Value " + startingNode.value
    						+ " removed successfully in position " + hash + " at heaps.tree height " + currentSearchHeight + ".");
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
    	 * Returns the successor of a given node in the heaps.tree (search recursively).
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
    			while (successorNode != null && predecessorNode == successorNode.left) {
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
    			return 1 + maximum(height(currentNode.left), height(currentNode.right));
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
    
    		System.out.println("Left: " + l + " Key: " + node.key + " Right: " + r + " Parent: " + p + " Balance: " + node.balance);
    
    		if (node.left != null) {
    			getAll(node.left);
    		}
    		if (node.right != null) {
    			getAll(node.right);
    		}
    	}
    
    	private void setBalance(TreeNode currentNode) {
    		currentNode.balance = height(currentNode.right) - height(currentNode.left);
    	}
    
    	public TreeNode top() {
    		return this.root;
    	}
    
    	public TreeNode left() {
    		return this.root.left;
    	}
    
    	public TreeNode right() {
    		return this.root.right;
    	}
    
    	/**
    	 * Calculates the Inorder traversal of this heaps.tree.
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
    
    



    
    
    public class BinaryHeapAvlIndexed {
    
    	private AvlTree avlTree;
    
    	/** For priorization with high priority on top */
    	public static final int HIGH = 0;
    	/** For priorization with low priority on top */
    	public static final int LOW = 1;
    	private int priorityType;
    
    	public BinaryHeapAvlIndexed() {
    		priorityType = HIGH;
    		avlTree = new AvlTree();
    	}
    
    	public BinaryHeapAvlIndexed(int type) {
    		priorityType = type;
    		avlTree = new AvlTree();
    	}
    
    	/** Inheap heaps.element x into priority queue */
    	public void inHeap(ArrayList priorityQueue, Pair x) {
    
    		/** Add the pair x into priority queue */
    		priorityQueue.add(x);
    
    		/** Check priority organization and reorganize if necessary */
    		swapHeapDownUp(priorityQueue, x);
    	}
    
    	/** Outheap heaps.element in the top of priority queue */
    	public void outHeap(ArrayList priorityQueue) {
    
    		Pair bottom = bottom(priorityQueue);
    
    		/**
    		 * Remove the heaps.element in the top and insert the heaps.element in the bottom
    		 * into the top
    		 */
    		priorityQueue.set(0, bottom);
    		priorityQueue.remove(priorityQueue.size() - 1);
    
    		if (priorityQueue.size() > 0) {
    			/** Reorganize the priorities over the top */
    			Pair x = priorityQueue.get(0);
    			swapHeapUpDown(priorityQueue, x);
    		}
    	}
    
    	/** Reorganize the queue priority of heaps.element x, from up down */
    	public void swapHeapUpDown(ArrayList priorityQueue, Pair x) {
    		swapHeapDownUp(priorityQueue, x, 0);
    	}
    
    	public void swapHeapUpDown(ArrayList priorityQueue, Pair x, int position) {
    
    		int currentPosition = position;
    		int currentLeftPositon = 2 * currentPosition + 1;
    		int currentRightPositon = 2 * currentPosition + 2;
    
    		/**
    		 * Compare priority heaps.element to its parents priority and swap if
    		 * necessary if xParentPosition = 0, it has reached the root.
    		 */
    
    		while (currentPosition < priorityQueue.size() && priorityQueue.size() > 1) {
    
    			if (priorityType == HIGH) {
    				// High priorization
    
    				if (currentLeftPositon < priorityQueue.size()
    						&& priorityQueue.get(currentPosition).p < priorityQueue.get(currentLeftPositon).p
    						&& (currentRightPositon >= priorityQueue.size() || (currentRightPositon < priorityQueue.size() && priorityQueue
    								.get(currentLeftPositon).p >= priorityQueue.get(currentRightPositon).p))) {
    
    					swap(priorityQueue, currentPosition + 1, currentLeftPositon + 1);
    
    					currentPosition = currentLeftPositon;
    
    				} else if (currentRightPositon < priorityQueue.size()
    						&& (priorityQueue.get(currentPosition).p < priorityQueue.get(currentRightPositon).p)) {
    
    					swap(priorityQueue, currentPosition + 1, currentRightPositon + 1);
    
    					currentPosition = currentRightPositon;
    				} else {
    					break;
    				}
    			} else {
    				// Low priorization
    
    				if (currentLeftPositon < priorityQueue.size()
    						&& priorityQueue.get(currentPosition).p > priorityQueue.get(currentLeftPositon).p
    						&& (currentRightPositon >= priorityQueue.size() || (currentRightPositon < priorityQueue.size() && priorityQueue
    								.get(currentLeftPositon).p 
    

Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)} will produce the following result:

![](http://i.imgur.com/qDU0djp.png) 

![](http://i.imgur.com/YYHpfEI.png) 

**/\*\* Upgrade over the Pair(2, 3) \*/  
binaryHeapAvlIndexed.upgrade(priorityQueue, 50, new Pair(2, 3));**

**/\*\* Downgrade over the Pair(52, 3) \*/  
binaryHeapAvlIndexed.dowgrade(priorityQueue, 37, new Pair(52, 3));**

![](http://i.imgur.com/PapIdC3.png) 

![](http://i.imgur.com/CgxEQqS.png) 

Below there are links to all implementations of several applications of Priority Queue concept.

* Heaps
  * Priority Queue
    * [Binary Heap][0]
    * [AVL Indexed Binary Heap][1]
  * [Min-Max Heap][2]
  * [Radix Heap][3]
* Usage
  * [Heap Sort][4]
  * [K-Numbers (Smallest/Largest k numbers of the priority queue)][5]


[0]: http://lab.leocardz.com/binary-heap
[1]: http://lab.leocardz.com/avl-indexed-binary-heap
[2]: http://lab.leocardz.com/min-max-heap
[3]: http://lab.leocardz.com/radix-heap
[4]: http://lab.leocardz.com/heap-sort
[5]: http://lab.leocardz.com/k-numbers