Radix Heap is the process to organize a PQ reducing its medium complexity of
heap operation at the maximum. In this case, the PQ is divided in ranked
pieces.

**Insertion** and **Deletion** are made according to the ranks, from the smallest to
the largest or vice versa while the priority is being treated. To create the ranks, first the largest priority must be know and the ranks
can be as follows:

\[2^1\]\[2^2\]\[2^3\]\[...\]\[2^k\]

K is the power when 2^k is the first number greater than the largest priority. Then priorities lower than or equals 2^1 will be allocated in the first
priority queue. Priorities greater than 2^1 and lower than 2^2 will be allocated in the second
priority queue. And so on...

### Code snippets

Below you will see a radix heap which each element has two integers, first is the priority and the second is the value.


    
    
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
    
    



    
    
    public class RadixHeap {
    
    	private ArrayList[] radixSet;
    
    	private final int[] POWERS_OF_TWO = { 2, 4, 8, 16, 32, 64, 128, 256, 512,
    			1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144,
    			524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432,
    			67108864, 134217728, 268435456, 536870912, 1073741824 };
    
    	public void organize(Pair[] set) {
    		BinaryHeap binaryHeap = new BinaryHeap(BinaryHeap.LOW);
    
    		int largestPriority = getLargestPriority(set);
    		int kPower = getKPower(largestPriority);
    
    		/** Initiate the radixSet */
    		radixSet = new ArrayList[kPower];
    		for (int i = 0; i < radixSet.length; i++)
    			radixSet[i] = new ArrayList();
    
    		/** Distribute elements to the correct priority queue */
    		for (int i = 0; i < set.length; i++) {
    			int k = getKPower(set[i].p);
    			binaryHeap.inHeap(radixSet[k - 1], set[i]);
    		}
    
    	}
    
    	public ArrayList[] getRadixSet() {
    		return radixSet;
    	}
    
    	/** Calculate the k power */
    	private int getKPower(int priority) {
    		int k = 0;
    
    		if (priority 
    

Using this code with these entries Pair\[\] SET = {new Pair(2, 3), new Pair(21, 4), new Pair(3, 9), new Pair(16, 16), new Pair(4, 4), new Pair(9, 2), new Pair(21, 7), new Pair(31, 9), new Pair(3, 3)}:

![](http://i.imgur.com/1QjfCJO.png) 

![](http://i.imgur.com/DD3UFB4.png) 

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