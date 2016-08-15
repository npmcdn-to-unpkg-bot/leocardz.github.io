A binary heap is a complete binary tree which follows the heap ordering property, that is all nodes are either **_greater than or equal to_** or **_less than or equal to_** each of its children, according to a comparison rule defined. By design, there are two approaches of ordering that can be applied:
  

* min-heap: each element's priority **≥** its parent's priority. The minimum priority stands on the top.
* max-heap: each element's priority **≤** its parent's priority. The maximum priority stands on the top.

Here, we consider the highest element on the top.

**Insertion** is performed the last level and the last position of the heap. After that, the new element is compared to its parent and if there is inconsistency with their order, a rearrangement is made by changing positions of the child and the parent by using the method **_swapHeapDownUp_**. This task is done until it hits the root.

**Deletion** is always performed at the top of the heap. The root element is popped out. The vacant root is taken by the element with the last element of the last level. Then, the new top element is compared with its two children and, if necessary, the replacement is performed changing the root with one of its children with the method we particularly called **_swapHeapUpDown_** and the last step is performed again. 

**Upgrade and Downgrade:** those functions increase or decrease the priority inside the elements, reorganizing the heap if necessary.

### Code snippets

Below you will see a binary tree which each element has two integers, first is the priority and the second is the value.


    
    
    public class Pair {
    
    	/** priority */
    	public int p;
    
    	/** index */
    	public int i;
    
    	public Pair(int priority, int index) {
    		this.p = priority;
    		this.i = index;
    	}
    
    	@Override
    	public String toString() {
    		return "[p=" + p + ",i=" + i + "]";
    	}
    
    }
    
    



    
    
    /** Binary Heap */
    /** Bigger priority is on the top as default */
    public class BinaryHeap {
    
    	/** For priorization with high priority on top */
    	public static final int HIGH = 0;
    	/** For priorization with low priority on top */
    	public static final int LOW = 1;
    	private int priorityType;
    
    	public BinaryHeap() {
    		priorityType = HIGH;
    	}
    
    	public BinaryHeap(int type) {
    		priorityType = type;
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
    
    		int currentPosition = 0;
    		int currentLeftPositon = 2 * currentPosition + 1;
    		int currentRightPositon = 2 * currentPosition + 2;
    
    		/**
    		 * Compare priority heaps.element to its parents priority and swap if
    		 * necessary if xParentPosition = 0, it has reached the root.
    		 */
    
    		while (currentPosition < priorityQueue.size()
    				&& priorityQueue.size() > 1) {
    
    			if (priorityType == HIGH) {
    				// High priorization
    
    				if (currentLeftPositon < priorityQueue.size()
    						&& priorityQueue.get(currentPosition).p < priorityQueue
    								.get(currentLeftPositon).p
    						&& (currentRightPositon >= priorityQueue.size() || (currentRightPositon < priorityQueue
    								.size() && priorityQueue
    								.get(currentLeftPositon).p >= priorityQueue
    								.get(currentRightPositon).p))) {
    
    					swap(priorityQueue, currentPosition + 1,
    							currentLeftPositon + 1);
    
    					currentPosition = currentLeftPositon;
    
    				} else if (currentRightPositon < priorityQueue.size()
    						&& (priorityQueue.get(currentPosition).p < priorityQueue
    								.get(currentRightPositon).p)) {
    
    					swap(priorityQueue, currentPosition + 1,
    							currentRightPositon + 1);
    
    					currentPosition = currentRightPositon;
    				} else {
    					break;
    				}
    			} else {
    				// Low priorization
    
    				if (currentLeftPositon < priorityQueue.size()
    						&& priorityQueue.get(currentPosition).p > priorityQueue
    								.get(currentLeftPositon).p
    						&& (currentRightPositon >= priorityQueue.size() || (currentRightPositon < priorityQueue
    								.size() && priorityQueue
    								.get(currentLeftPositon).p 
    


Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)} will produce the following result:




![](http://i.imgur.com/SzHUuUx.png) 

![](http://i.imgur.com/sUTDeeM.png) 

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