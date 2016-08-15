K-Numbers is a applied usage of [Priority Queue][0]. Its concept is about keep the smallest (or largest depending on the rule we want) k numbers on the top at each insertion into the heap.

**Insertion**: given the set of numbers, we run the entire set and we inheap only the numbers less than (for the K-smallest) or greater than (for the K-largest) the contained ones already in the heap. Note that if the current interaction of the array is less than K, we simply add that element to the heap. The comparisons and necessary swaps are only performed when the array set is greater than K. 

Here, we use the algorithm to print our K-Numbers.

### Code snippets

Below you will see a K-Numbers heap which each element has two integers, first is the priority and the second is the value.


    
    
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
    



    
    
    /** The Smallest/largest k numbers (consider priorities) of a priority queue */
    public class KNumbers {
    
    	public static final int SMALLEST = 0, LARGEST = 1;
    	private ArrayList kList = new ArrayList();
    
    	public ArrayList get(Pair[] set, int k, int type) {
    
    		BinaryHeap binaryHeap = new BinaryHeap(type);
    
    		int i = 0;
    
    		/** Inheap the k first elements */
    		for (i = 0; i < k; i++)
    			binaryHeap.inHeap(kList, set[i]);
    
    		if (type == SMALLEST) {
    			/**
    			 * If the next heaps.element is smaller than the priority queue top,
    			 * inheap it
    			 */
    			for (i = k; i < set.length; i++) {
    				if (set[i].p < binaryHeap.top(kList).p) {
    					kList.set(0, set[i]);
    					binaryHeap.swapHeapUpDown(kList,
    							binaryHeap.top(kList));
    				}
    			}
    		} else {
    			/**
    			 * If the next heaps.element is smaller than the priority queue top,
    			 * inheap it
    			 */
    			for (i = k; i < set.length; i++) {
    				if (set[i].p > binaryHeap.top(kList).p) {
    					kList.set(0, set[i]);
    					binaryHeap.swapHeapUpDown(kList,
    							binaryHeap.top(kList));
    				}
    			}
    		}
    
    		return kList;
    	}
    
    }
    
    

Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)} and K = 3 will produce the following result:

**3 Largest**

![](http://i.imgur.com/OnZubx6.png) 

**3 Smallest**

![](http://i.imgur.com/l9Ycuo0.png) 

![](http://i.imgur.com/JH2XZEx.png) 

Below there are links to all implementations of several applications of Priority Queue concept.

* Heaps
  * Priority Queue
    * [Binary Heap][1]
    * [AVL Indexed Binary Heap][2]
  * [Min-Max Heap][3]
  * [Radix Heap][4]
* Usage
  * [Heap Sort][5]
  * [K-Numbers (Smallest/Largest k numbers of the priority queue)][6]


[0]: http://lab.leocardz.com/priority-queues/
[1]: http://lab.leocardz.com/binary-heap
[2]: http://lab.leocardz.com/avl-indexed-binary-heap
[3]: http://lab.leocardz.com/min-max-heap
[4]: http://lab.leocardz.com/radix-heap
[5]: http://lab.leocardz.com/heap-sort
[6]: http://lab.leocardz.com/k-numbers