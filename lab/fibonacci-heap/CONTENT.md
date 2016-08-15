Fibonacci Heaps are collections of [Leftist Trees][0]. As those collections are part of a linked list, each element of the Fibonacci Heap has a pointer to the next element and a Leftist Tree. 

A new element is inserted into the top of the linked list at the leftist tree. If the top element's leftist tree and the next element's leftist tree have the same height, then a merge between them is performed.

They are so called Fibonacci Heaps due to their frequency of merging.

### Code snippets

Below you will see a Fibonacci Heap with Leftist Trees.


    
    
    public class LeftistTreeNode {
    
        public String value;
        public LeftistTreeNode left;
        public LeftistTreeNode right;
        public LeftistTreeNode parent;
    
        public LeftistTreeNode(String v) {
            left = right = parent = null;
            value = v;
        }
    
        public String getValue() {
            return value;
        }
    
        public void setValue(String value) {
            this.value = value;
        }
    }
    
    



    
    
    public class FibonacciHeapNode {
    
        public FibonacciHeapNode next;
        public LeftistTree tree;
    
        public FibonacciHeapNode(String value) {
            this.next = null;
            tree = new LeftistTree();
            tree.insert(value);
        }
    }
    
    



    
    
    /**
     * Rules
     * 1. npl(left) >= npl(right)
     * 2. prio(root) >= prio(root.left) >= prio(root.right)
     * Leftist tree is not a search structure, then it allows duplicate values
     */
    public class LeftistTree {
    
        public LeftistTreeNode root;
    
        /**
         * Core Functions
         */
        public void insert(String value) {
            LeftistTreeNode n = new LeftistTreeNode(value);
            insertLeftistTree(this.root, n);
        }
    
        /**
         * Insert new node
         */
        private void insertLeftistTree(LeftistTreeNode currentNode, LeftistTreeNode newNode) {
    
            if (currentNode == null) {
                this.root = newNode;
                this.root.parent = null;
            } else {
                merge(currentNode, newNode);
            }
        }
    
        /**
         * Lazy merge: joins two left trees
         */
        public void merge(LeftistTreeNode root, LeftistTreeNode newNode) {
            // Considering the tree.element with largest value on the top
    
            if (root.parent == null && root.value.compareTo(newNode.value) < 0) { // invert here to change to small priority on top
                if (newNode.right == null) {
                    newNode.right = root;
                } else {
                    merge(newNode, root);
                }
    
                root.parent = newNode;
                newNode.parent = null;
                performSwap(newNode);
                this.root = newNode;
            } else if (root.right == null) {
                root.right = newNode;
                newNode.parent = root;
                performSwap(root);
            } else if (root.right.value.compareTo(newNode.value) < 0) { // invert here to change to small priority on top
                LeftistTreeNode detached = root.right;
                root.right = newNode;
                newNode.parent = root;
                merge(newNode, detached);
                performSwap(newNode);
            } else {
                merge(root.right, newNode);
                performSwap(root.right);
            }
        }
    
        /**
         * Null Path Length: The shortest distance bettween the current node to the closest null node
         */
        public int npl(LeftistTreeNode root, int npl) {
            if (root == null)
                return -1;
    
            if (root.left != null && root.right != null) {
                int left = npl(root.left, npl);
                int right = npl(root.right, npl);
                npl = Math.min(left, right);
            }
    
            return npl + 1;
        }
    
        private void performSwap(LeftistTreeNode root) {
            if (root != null) {
                LeftistTreeNode right, left, toBeSwapped;
    
                if (root.parent != null) {
                    toBeSwapped = root.parent;
                    right = toBeSwapped.right;
                    left = toBeSwapped.left;
                } else {
                    toBeSwapped = root;
                    right = root.right;
                    left = root.left;
                }
    
                String rightValue = right == null ? "" : right.value;
                String leftValue = left == null ? "" : left.value;
    
                int rightNpl = right == null ? -1 : npl(right, -1);
                int leftNpl = left == null ? -1 : npl(left, -1);
    
                if (rightNpl > leftNpl || (rightNpl == leftNpl && leftValue.compareTo(rightValue) < 0)) { // invert here to change to small priority on top
                    swap(toBeSwapped);
                }
    
                performSwap(root.left);
                performSwap(root.right);
            }
        }
    
        private void swap(LeftistTreeNode left) {
            LeftistTreeNode swap = left.left;
            left.left = left.right;
            left.right = swap;
        }
    
        /**
         * Finds a node
         */
        public LeftistTreeNode find(String value) {
            return find(this.root, value);
        }
    
        /**
         * Finds a node
         */
        public LeftistTreeNode find(LeftistTreeNode currentNode, String value) {
    
            LeftistTreeNode result = null;
    
            if (currentNode != null) {
                if (currentNode.value.equals(value)) {
                    result = currentNode;
                } else {
                    result = find(currentNode.right, value);
    
                    if (result == null)
                        result = find(currentNode.left, value);
                }
            } else {
                result = null;
            }
    
            return result;
    
        }
    
        /**
         * Removes a node from the tree
         *
         * @hash is just to print index in table hash
         */
        public void remove() {
            removeLeftistTree(this.root);
        }
    
        /**
         * Removes the node from the top..
         */
        private void removeLeftistTree(LeftistTreeNode startingNode) {
            if (this.root != null) {
                LeftistTreeNode toBeRemoved = this.root;
                LeftistTreeNode newRoot;
                if (this.root.right == null) {
                    if (this.root.left == null) {
                        this.root = null;
                    } else {
                        this.root = this.root.left;
                        this.root.parent = null;
                    }
                    System.out.println("\nElement removed successfully.");
                } else {
                    if (toBeRemoved.left.value.compareTo(toBeRemoved.right.value) > 0) { // invert here to change to small priority on top
                        newRoot = toBeRemoved.left;
                        newRoot.parent = null;
                        merge(newRoot, toBeRemoved.right);
                        this.root = newRoot;
                    } else {
                        newRoot = toBeRemoved.right;
                        newRoot.parent = null;
                        merge(newRoot, toBeRemoved.left);
                        this.root = newRoot;
                    }
                    performSwap(this.root.right);
                    System.out.println("\nElement removed successfully.");
                }
            }
    
        }
    
        /**
         * Helper Functions
         */
    
        public LeftistTreeNode top() {
            return this.root;
        }
    
        public int height() {
            return height(this.root);
        }
    
        /**
         * Calculating the height of a node.
         */
        private int height(LeftistTreeNode currentNode) {
            if (currentNode == null) {
                return -1;
            }
            if (currentNode.left == null && currentNode.right == null) {
                return 1;
            } else if (currentNode.left == null) {
                return 1 + height(currentNode.right);
            } else if (currentNode.right == null) {
                return 1 + height(currentNode.left);
            } else {
                return 1 + maximum(height(currentNode.left), height(currentNode.right));
            }
        }
    
        /**
         * Calculating the height of a node according to the root.
         */
        public int heightRootToNode(LeftistTreeNode currentNode) {
            int height = 0;
    
            while (currentNode.parent != null) {
                height++;
                currentNode = currentNode.parent;
            }
    
            return height;
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
        private void inOrder(LeftistTreeNode node, ArrayList io) {
            if (node == null) {
                return;
            }
            inOrder(node.left, io);
            io.add(node);
            inOrder(node.right, io);
        }
    
    }
    
    
    



    
    
    public class FibonacciHeap {
    
        public FibonacciHeapNode root;
    
        /**
         * Core Functions
         */
    
        /**
         * Insert new node
         */
        public void insert(String value) {
            FibonacciHeapNode newNode = new FibonacciHeapNode(value);
            if (this.root == null) {
                this.root = newNode;
            } else {
                newNode.next = this.root;
                merge(newNode);
            }
        }
    
        public void find(String s) {
            int i = 0;
            FibonacciHeapNode root = this.root;
            LeftistTreeNode element;
            if (root != null) {
                do {
                    element = root.tree.find(s);
                    if (element != null) {
                        System.out.println("Element with value " + s + " found in node " + i);
                        break;
                    }
                    i++;
                    root = root.next;
                } while (root != null);
            }
    
        }
    
        /**
         * Removes the hight priority tree.element. It runs through the list.
         * */
        public void remove() {
            if (this.root != null) {
    
                FibonacciHeapNode beforeHighestPriority = this.root;
                FibonacciHeapNode root = this.root.next;
    
                if (root == null) {
                    this.root.tree.remove();
                } else {
                    do {
                        if (beforeHighestPriority.tree.top().value.compareTo(root.tree.top().value) < 0) {
                            beforeHighestPriority = root;
                        }
    
                        root = root.next;
                    } while (root != null);
    
                    beforeHighestPriority.tree.remove();
                    if (beforeHighestPriority.tree.top() == null) {
                        beforeHighestPriority = beforeHighestPriority.next;
                    }
                }
    
                if (this.root.tree.top() == null && this.root.next != null) {
                    this.root = this.root.next;
                }
    
                merge(this.root);
            }
        }
    
        private void merge(FibonacciHeapNode root) {
            if (root.next != null) {
    
                FibonacciHeapNode next = root.next;
                LeftistTree nextLeftistTree = next.tree;
                LeftistTree leftistTree = root.tree;
    
                if (leftistTree.height() == nextLeftistTree.height()) {
                    leftistTree.merge(leftistTree.top(), nextLeftistTree.top());
                    root.next = root.next.next;
                    this.root = root;
                    merge(root);
                } else {
                    this.root = root;
                }
            }
        }
    
    }
    
    

Using this code with these entries Element\[\] SET = {new Element("03"),
new Element("08"),
new Element("17"),
new Element("04"),
new Element("29"),
new Element("36"),
new Element("49"),
new Element("18"),
new Element("12"),
new Element("07"),
new Element("23"),
new Element("52"),
new Element("48"),
new Element("11"),
new Element("32")} will produce the following result:

![](http://i.imgur.com/3AxfY4k.png) 

Below there are links to all implementations of several applications of Trees concept.

* [Avl Tree][1]
* [Leftist Tree][2]
* [Fibonacci Heap][3]
* [Splay Tree][4]


[0]: http://lab.leocardz.com/leftist-tree/
[1]: http://lab.leocardz.com/avl-tree
[2]: http://lab.leocardz.com/leftist-tree
[3]: http://lab.leocardz.com/fibonacci-heap
[4]: http://lab.leocardz.com/splay-tree