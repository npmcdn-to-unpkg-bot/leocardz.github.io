Heap Sort is a comparison-based algorithm and can be considered as an improvement of Selection Sort and like that Selection, it separates the input into to a sorted and an unsorted region, and at each interaction it shrinks the unsorted region by extracting the smallest element and moving that to the sorted region. The improvement consists of the use of a heap data structure rather than a linear-time search to find the minimum. Both algorithms along with 5 others can be found [here][0].

On this post, we use Heap Sort as a application of [Priority Queues][1]. That means that we have an unsorted [Binary Heap][2] and we use the Heap Sort to make it sorted.

See its visualization: 

![](http://i.imgur.com/86FLq63.gif)

Source: Wikipedia

### Code snippets

Below you will see heap sort which each element has two integers, first is the priority and the second is the value.


    
    
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
    



    
    
    public class HeapSort {
    
    	private BinaryHeap binaryHeap = new BinaryHeap();
    	private ArrayList priorityQueue = new ArrayList();
    	private Pair[] heapified;
    
    	/**
    	 * Heap sort is simply to inheap the elements to priority queue, and outheap
    	 * elements
    	 */
    	public Pair[] sort(Pair[] set) {
    
    		heapified = new Pair[set.length];
    
    		/** Build initial heap */
    		heapify(set);
    		heapSort();
    
    		return heapified;
    	}
    
    	private void heapify(Pair[] set) {
    
    		/** Heapifying */
    		for (int i = 0; i < set.length; i++)
    			binaryHeap.inHeap(priorityQueue, set[i]);
    
    		heapified = priorityQueue.toArray(heapified);
    
    	}
    
    	/** Outheap one by one */
    	private void heapSort() {
    
    		int queueSize = priorityQueue.size();
    
    		for (int j = 0; j < queueSize; j++) {
    
    			heapified[j] = binaryHeap.top(priorityQueue);
    			binaryHeap.outHeap(priorityQueue);
    
    		}
    
    	}
    }
    
    

Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)} will produce the following result:

**Before sorting**

![](http://i.imgur.com/VZuG3uP.png) 

**After sorting**

![](http://i.imgur.com/iSnTJ2c.png) 

![](http://i.imgur.com/mHGn2YQ.png) 

Below there are links to all implementations of several applications of Priority Queue concept.

* Heaps
  * Priority Queue
    * [Binary Heap][3]
    * [AVL Indexed Binary Heap][4]
  * [Min-Max Heap][5]
  * [Radix Heap][6]
* Usage
  * [Heap Sort][7]
  * [K-Numbers (Smallest/Largest k numbers of the priority queue)][8]


[0]: http://lab.leocardz.com/7-sorting-algorithms-in-a-few-lines/
[1]: http://lab.leocardz.com/priority-queues/
[2]: http://lab.leocardz.com/binary-heap/
[3]: http://lab.leocardz.com/binary-heap
[4]: http://lab.leocardz.com/avl-indexed-binary-heap
[5]: http://lab.leocardz.com/min-max-heap
[6]: http://lab.leocardz.com/radix-heap
[7]: http://lab.leocardz.com/heap-sort
[8]: http://lab.leocardz.com/k-numbers