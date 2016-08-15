Like a binary heap, Mix-max heap is a complete binary tree; that is, all levels of the tree, except possibly the last one (deepest) are fully filled, and, if the last level of the tree is not complete, the nodes of that level are filled from left to right. Unlike a binary heap, the nodes do not follow min-heap or max-heap, but a double-ended approach. The elements at and even level in the tree is less than all of its children, and the elements at an odd level is greater than all of its children.

Min-max heaps has the properties of O(log n) insertion and deletion, can be built in time O(n), just like binary heaps. They are often represented implicitly in an array.

### Code snippets

Below you will see a min max heap which each element has two integers, first is the priority and the second is the value.


    
    
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
    
    



    
    
    public class MinMaxHeap {
    
    	/** Inheap heaps.element x into priority queue */
    	public void inHeap(ArrayList priorityQueue, Pair x) {
    
    		/** Add the pair x into priority queue */
    		priorityQueue.add(x);
    
    		/** Check priority organization and reorganize if necessary */
    		swapHeapDownUp(priorityQueue, x);
    	}
    
    	/**
    	 * Outheap the highest heaps.element with the minimum priority of priority queue,
    	 * then put its grandchild with the largest priority in its place and the
    	 * bottom in the grandchilds place
    	 */
    	public void outHeapMin(ArrayList priorityQueue) {
    
    		if (size(priorityQueue) > 3) {
    			int childIndex = 3;
    
    			Pair bottom = bottom(priorityQueue);
    			Pair grandChild2 = null;
    			Pair grandChild3 = null;
    			Pair grandChild4 = null;
    
    			if (size(priorityQueue) > 4) {
    				grandChild2 = priorityQueue.get(4);
    				if (grandChild2.p < priorityQueue.get(childIndex).p)
    					childIndex = 4;
    			}
    			if (size(priorityQueue) > 5) {
    				grandChild3 = priorityQueue.get(5);
    				if (grandChild3.p < priorityQueue.get(childIndex).p)
    					childIndex = 5;
    			}
    			if (size(priorityQueue) > 6) {
    				grandChild4 = priorityQueue.get(6);
    				if (grandChild4.p < priorityQueue.get(childIndex).p)
    					childIndex = 6;
    			}
    
    			priorityQueue.set(0, priorityQueue.get(childIndex));
    			priorityQueue.set(childIndex, bottom);
    			priorityQueue.remove(priorityQueue.size() - 1);
    
    			findChildren(priorityQueue, childIndex, false);
    
    		}
    
    	}
    
    	/** Outheap the highest heaps.element with the maximum priority of priority queue */
    	public void outHeapMax(ArrayList priorityQueue) {
    
    		if (size(priorityQueue) > 7) {
    
    			int maxIndex1 = 1;
    			int maxIndex2 = 2;
    			int changeIndex = maxIndex1;
    
    			Pair max1 = priorityQueue.get(maxIndex1);
    			Pair max2 = priorityQueue.get(maxIndex2);
    
    			int childIndex = 7;
    			int childIndexOffset = childIndex;
    
    			if (max1.p > max2.p) {
    				childIndex = (2 * maxIndex1 + 1) + (2 * maxIndex1 + 1) + 1;
    			} else {
    				childIndex = (2 * maxIndex2 + 1) + (2 * maxIndex2 + 1) + 1;
    				changeIndex = maxIndex2;
    			}
    
    			Pair bottom = bottom(priorityQueue);
    			Pair grandChild2 = null;
    			Pair grandChild3 = null;
    			Pair grandChild4 = null;
    
    			if (size(priorityQueue) > childIndexOffset + 1) {
    				grandChild2 = priorityQueue.get(childIndexOffset + 1);
    				if (grandChild2.p > priorityQueue.get(childIndex).p)
    					childIndex = childIndexOffset + 1;
    			}
    			if (size(priorityQueue) > childIndexOffset + 2) {
    				grandChild3 = priorityQueue.get(childIndexOffset + 2);
    				if (grandChild3.p > priorityQueue.get(childIndex).p)
    					childIndex = childIndexOffset + 2;
    			}
    			if (size(priorityQueue) > childIndexOffset + 3) {
    				grandChild4 = priorityQueue.get(childIndexOffset + 3);
    				if (grandChild4.p > priorityQueue.get(childIndex).p)
    					childIndex = childIndexOffset + 3;
    			}
    
    			priorityQueue.set(changeIndex, priorityQueue.get(childIndex));
    			priorityQueue.set(childIndex, bottom);
    			priorityQueue.remove(priorityQueue.size() - 1);
    
    			findChildren(priorityQueue, childIndex, true);
    		}
    
    	}
    
    	/** Reorganize the queue priority of heaps.element x, from down up */
    	public void swapHeapDownUp(ArrayList priorityQueue, Pair x) {
    		swapHeapDownUp(priorityQueue, x, priorityQueue.size());
    	}
    
    	public void swapHeapDownUp(ArrayList priorityQueue, Pair x,
    			int position) {
    
    		int xPosition = position;
    		int xParentPosition = xPosition / 2;
    
    		int level = levels(xPosition);
    
    		/**
    		 * Compare priority heaps.element to its parents priority and swap if
    		 * necessary if xParentPosition = 0, it reached the root
    		 * 
    		 * Even levels keep the min priorities
    		 * 
    		 * Odd levels keep the max priorities
    		 */
    		while (xParentPosition != 0) {
    
    			int xGrandParentPosition = xParentPosition / 2;
    
    			if (level % 2 == 0) {
    
    				if (xGrandParentPosition > 0
    						&& priorityQueue.get(xPosition - 1).p < priorityQueue
    								.get(xGrandParentPosition - 1).p) {
    					swap(priorityQueue, xPosition, xGrandParentPosition);
    				} else if (priorityQueue.get(xPosition - 1).p > priorityQueue
    						.get(xParentPosition - 1).p) {
    					swap(priorityQueue, xPosition, xParentPosition);
    				}
    
    			} else {
    
    				if (xGrandParentPosition > 0
    						&& priorityQueue.get(xPosition - 1).p > priorityQueue
    								.get(xGrandParentPosition - 1).p) {
    					swap(priorityQueue, xPosition, xGrandParentPosition);
    				} else if (priorityQueue.get(xPosition - 1).p < priorityQueue
    						.get(xParentPosition - 1).p) {
    					swap(priorityQueue, xPosition, xParentPosition);
    				}
    
    			}
    
    			xPosition = xParentPosition;
    			xParentPosition = xParentPosition / 2;
    			level = levels(xPosition);
    
    		}
    
    	}
    
    	/**
    	 * Increase in delta the priority of heaps.element x. Px = Px + delta. Update the
    	 * priority queue.
    	 */
    	public void upgrade(ArrayList priorityQueue, int delta, Pair x) {
    
    		int i = 0;
    
    		/** Search the heaps.element to change its priority */
    		for (i = 0; i < priorityQueue.size(); i++) {
    
    			/** Found the heaps.element, its priority will be changed */
    			if (priorityQueue.get(i).p == x.p && priorityQueue.get(i).v == x.v) {
    				priorityQueue.get(i).p = priorityQueue.get(i).p + delta;
    
    				x = priorityQueue.get(i);
    
    				break;
    			}
    
    		}
    
    		/** Then, reorganize the priority queue over x */
    		findChildren(priorityQueue, i / 2, true);
    
    	}
    
    	/**
    	 * Decrease in delta the priority of heaps.element x. Px = Px - delta. Update the
    	 * priority queue.
    	 */
    	public void dowgrade(ArrayList priorityQueue, int delta, Pair x) {
    
    		int i = 0;
    
    		/** Search the heaps.element to change its priority */
    		for (i = 0; i < priorityQueue.size(); i++) {
    
    			/** Found the heaps.element, its priority will be changed */
    			if (priorityQueue.get(i).p == x.p && priorityQueue.get(i).v == x.v) {
    				priorityQueue.get(i).p = priorityQueue.get(i).p - delta;
    
    				x = priorityQueue.get(i);
    
    				break;
    			}
    
    		}
    
    		/** Then, reorganize the priority queue over the top */
    		findChildren(priorityQueue, i / 2, true);
    
    	}
    
    	/**
    	 * Return the highest heaps.element with the minimum priority of priority queue
    	 */
    	public Pair topMin(ArrayList priorityQueue) {
    		return priorityQueue.get(0);
    	}
    
    	/**
    	 * Return the highest heaps.element with the maximum priority of priority queue
    	 */
    	public Pair topMax(ArrayList priorityQueue) {
    		Pair x = priorityQueue.get(0);
    		Pair left = x;
    		Pair right = x;
    
    		if (priorityQueue.size() > 1)
    			left = priorityQueue.get(1);
    		if (priorityQueue.size() > 2)
    			right = priorityQueue.get(2);
    
    		return (left.p > right.p ? left : right);
    	}
    
    	/**
    	 * Return the number of levels of priority queue
    	 */
    	public int levels(int position) {
    		return (int) (Math.log(position) / Math.log(2));
    	}
    
    	/**
    	 * Return the number of elements of priority queue
    	 */
    	public int size(ArrayList priorityQueue) {
    		return priorityQueue.size();
    	}
    
    	/**
    	 * Return the heaps.element in the bottom
    	 */
    	public Pair bottom(ArrayList priorityQueue) {
    		return priorityQueue.get(priorityQueue.size() - 1);
    	}
    
    	/** Reorganize children of an heaps.element */
    	private void findChildren(ArrayList priorityQueue,
    			int elementPosition, boolean greaterThan) {
    		int childIndex = elementPosition;
    
    		int childLeftIndex = 2 * childIndex + 1;
    		int childRightIndex = 2 * childIndex + 2;
    		Pair grandChildLeft = null;
    		Pair grandChildRight = null;
    
    		if (childLeftIndex < priorityQueue.size())
    			grandChildLeft = priorityQueue.get(childLeftIndex);
    		if (childRightIndex < priorityQueue.size())
    			grandChildRight = priorityQueue.get(childRightIndex);
    
    		if (greaterThan) {
    			if (grandChildLeft != null) {
    				if (grandChildRight != null
    						&& grandChildRight.p > grandChildLeft.p)
    					swapHeapDownUp(priorityQueue, grandChildRight,
    							childRightIndex);
    				else
    					swapHeapDownUp(priorityQueue, grandChildLeft,
    							childLeftIndex);
    			}
    		} else {
    			if (grandChildLeft != null) {
    				if (grandChildRight != null
    						&& grandChildRight.p < grandChildLeft.p)
    					swapHeapDownUp(priorityQueue, grandChildRight,
    							childRightIndex);
    				else
    					swapHeapDownUp(priorityQueue, grandChildLeft,
    							childLeftIndex);
    			}
    		}
    	}
    
    	/** Simple swap */
    	private void swap(ArrayList priorityQueue, int xPosition,
    			int xParentPosition) {
    		Pair temp = priorityQueue.get(xPosition - 1);
    		priorityQueue
    				.set(xPosition - 1, priorityQueue.get(xParentPosition - 1));
    		priorityQueue.set(xParentPosition - 1, temp);
    	}
    }
    
    

Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)} will produce the following result:

![](http://i.imgur.com/C5G0HZj.png) 

![](http://i.imgur.com/eDe58r6.png) 

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