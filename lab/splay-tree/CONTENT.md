Splay Tree is a self-adjusting binary search tree with the additional property that recently accessed elements are quick to access again, so they are splayed to the top. It performs basic operations such as insertion, search and removal in O(log n) amortised time. The elements are organised topologically to favour one access condition to the information or even to reduce the process complexity.

**Insertion** is performed like a normal binary search, then the new node is splayed to the top.

**Deletion** is also like a binary search tree with a slight difference: if the node has two children, swap its value with that of either the rightmost node of its left subtree or the leftmost node of its right subtree. Then remove that node. In this way, deletion is reduced to the problem of removing a node with 0 or 1 children. Differently of a binary search tree, in a splay tree after deletion, we splay the parent of the removed node to the top of the tree.

**Search** it is a binary search as well, but after the access, we splay the element to the top to be more fast accessible next time.

**Rotations** in Splay Tree are six:

* **_zig_** and **_zag_**: they are single right rotation and single left rotation respectively. The target element is lifted up by one level.
* **_zig-zag_** and **_zag-zig_**: double right rotation and double left rotation, like [Avl double rotations][0]. The target element is lifted up by two levels.
* **_zig-zig_** and **_zag-zag_**: they are also double rotations but instead alternating the directions of each rotations in it, the perform two rotations to right (zig-zig) and to rotations to left (zag-zag). And also the target element is lifted up by two levels

### Code snippets

Below you will see a Splay Tree.


    
    
    public class SplayTreeNode {
    
        public String value;
        public SplayTreeNode left;
        public SplayTreeNode right;
        public SplayTreeNode parent;
    
        public SplayTreeNode(SplayTreeNode splayTreeNode) {
            if (splayTreeNode != null) {
                this.value = splayTreeNode.value;
                this.left = splayTreeNode.left;
                this.right = splayTreeNode.right;
                this.parent = splayTreeNode.parent;
            }
        }
    
        public boolean isNull() {
            return (this.value == null && this.left == null && this.right == null && this.parent == null);
        }
    
        public SplayTreeNode(String v) {
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
    
    



    
    
    public class SplayTree {
    
        public SplayTreeNode root;
    
        /**
         * Core Functions
         */
        public void insert(String value) {
            SplayTreeNode n = new SplayTreeNode(value);
            insertSplayTree(this.root, n);
        }
    
        /**
         * Insert new node
         */
        private void insertSplayTree(SplayTreeNode currentNode, SplayTreeNode newNode) {
            if (currentNode == null) {
                this.root = newNode;
            } else {
    
                if (newNode.value.compareTo(currentNode.value) < 0) {
                    if (currentNode.left == null) {
                        currentNode.left = newNode;
                        newNode.parent = currentNode;
                    } else {
                        insertSplayTree(currentNode.left, newNode);
                    }
    
                } else if (newNode.value.compareTo(currentNode.value) > 0) {
                    if (currentNode.right == null) {
                        currentNode.right = newNode;
                        newNode.parent = currentNode;
                    } else {
                        insertSplayTree(currentNode.right, newNode);
                    }
                } else {
                    System.out.println("\nValue " + newNode.value + " already exists. Ignoring...");
                }
            }
        }
    
        /**
         * Finds a node
         */
        public SplayTreeNode find(String value) {
            SplayTreeNode result = find(this.root, value);
    
            if (result != null) {
                while (result.parent != null) {
                    if (result.parent.parent == null) { // single rotations
                        if (result.parent.left != null && result.parent.left.equals(result)) { // zig rotation
                            result = zig(result);
                        } else if (result.parent.right != null && result.parent.right.equals(result)) { // zag rotation
                            result = zag(result);
                        }
                    } else { // double rotations
                        if (result.parent.parent.left != null && result.parent.parent.left.left != null && result.parent.parent.left.left.equals(result)) { // zig-zig rotation
                            result = zigZig(result);
                        } else if (result.parent.parent.left != null && result.parent.parent.left.right != null && result.parent.parent.left.right.equals(result)) { // zag-zig rotation
                            result = zagZig(result);
                        } else if (result.parent.parent.right != null && result.parent.parent.right.left != null && result.parent.parent.right.left.equals(result)) { // zig-zag rotation
                            result = zigZag(result);
                        } else if (result.parent.parent.right != null && result.parent.parent.right.right != null && result.parent.parent.right.right.equals(result)) { // zag-zag rotation
                            result = zagZag(result);
                        }
                    }
                }
            }
    
            if (result != null) {
                this.root = result;
            }
    
            return result;
        }
    
        /**
         * Finds a node
         */
        public SplayTreeNode find(SplayTreeNode currentNode, String value) {
    
            if (value.equals(currentNode.value))
                return currentNode;
            else if (currentNode.left != null || currentNode.right != null) {
                if (currentNode.left != null) {
                    if (value.equals(currentNode.value))
                        return currentNode;
                    else if (value.compareTo(currentNode.value) < 0)
                        return find(currentNode.left, value);
                    else if (currentNode.right != null)
                        return find(currentNode.right, value);
                    else
                        return null;
                }
                if (value.equals(currentNode.value))
                    return currentNode;
                else if (value.compareTo(currentNode.value) > 0)
                    return find(currentNode.right, value);
                else if (currentNode.left != null)
                    return find(currentNode.left, value);
                else
                    return null;
            } else {
                return null;
            }
    
        }
    
        /**
         * Rotation left to right
         */
        private SplayTreeNode zig(SplayTreeNode node) {
            SplayTreeNode k1 = new SplayTreeNode(node);
            SplayTreeNode a = new SplayTreeNode(node.left);
            SplayTreeNode b = new SplayTreeNode(node.right);
            if (a.isNull())
                a.parent = k1;
            if (b.isNull())
                b.parent = k1;
    
            SplayTreeNode k2 = new SplayTreeNode(node.parent);
            SplayTreeNode k2Parent = k2.parent;
            SplayTreeNode c = new SplayTreeNode(node.parent.right);
            if (c.isNull())
                c.parent = k2;
    
            k2.left = b;
    
            k1.right = k2;
    
            b.parent = k2;
            k2.parent = k1;
    
            node = k1;
            node.parent = k2Parent;
    
            if (node.parent != null) {
                node.parent.left = node;
            }
    
            return node;
        }
    
        /**
         * Rotation right to left
         */
        private SplayTreeNode zag(SplayTreeNode node) {
            SplayTreeNode k1 = new SplayTreeNode(node.parent);
            SplayTreeNode k1Parent = k1.parent;
            SplayTreeNode a = new SplayTreeNode(node.parent.left);
            if (a.isNull())
                a.parent = k1;
    
            SplayTreeNode k2 = new SplayTreeNode(node);
            SplayTreeNode b = new SplayTreeNode(node.left);
            SplayTreeNode c = new SplayTreeNode(node.right);
            if (b.isNull())
                b.parent = k2;
            if (c.isNull())
                c.parent = k2;
    
            k1.right = b;
    
            k2.left = k1;
    
            b.parent = k1;
            k1.parent = k2;
    
            node = k2;
            node.parent = k1Parent;
    
            if (node.parent != null) {
                node.parent.right = node;
            }
    
            return node;
        }
    
        /**
         * Double rotation left to right
         */
        private SplayTreeNode zigZag(SplayTreeNode node) {
            return null;
        }
    
        /**
         * Double rotation right to left
         */
        private SplayTreeNode zagZig(SplayTreeNode node) {
            return null;
        }
    
        /**
         * Double rotation left to left
         */
        private SplayTreeNode zigZig(SplayTreeNode node) {
            return null;
        }
    
        /**
         * Double rotation right to right
         */
        private SplayTreeNode zagZag(SplayTreeNode node) {
            SplayTreeNode k1 = new SplayTreeNode(node.parent.parent);
            SplayTreeNode k1Parent = k1.parent;
            SplayTreeNode a = new SplayTreeNode(node.parent.parent.left);
            if (a.isNull())
                a.parent = k1;
    
            SplayTreeNode k2 = new SplayTreeNode(node.parent);
            SplayTreeNode b = new SplayTreeNode(node.parent.left);
            if (b.isNull())
                b.parent = k2;
    
            SplayTreeNode k3 = new SplayTreeNode(node);
            SplayTreeNode c = new SplayTreeNode(node.left);
            SplayTreeNode d = new SplayTreeNode(node.right);
            if (c.isNull())
                c.parent = k3;
            if (d.isNull())
                d.parent = k3;
    
            k1.left = a;
            k1.right = b;
    
            k2.left = k1;
            k2.right = c;
    
            k3.left = k2;
            k3.right = d;
    
            k3.parent = k1Parent;
            k1.parent = k2;
            k2.parent = k3;
            b.parent = k1;
            c.parent = k2;
    
            node = k3;
    
            if (node.parent != null) {
                node.parent.right = node;
            }
    
            return node;
        }
    
        /**
         * Removes a node from the tree
         *
         * @hash is just to print index in table hash
         */
        public void remove() {
            removeSplayTree(this.root);
        }
    
        /**
         * Removes the node from the top..
         */
        private void removeSplayTree(SplayTreeNode startingNode) {
        }
    
        /**
         * Helper Functions
         */
    
        public SplayTreeNode top() {
            return this.root;
        }
    
        public int height() {
            return height(this.root);
        }
    
        /**
         * Calculating the height of a node.
         */
        private int height(SplayTreeNode currentNode) {
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
        private void inOrder(SplayTreeNode node, ArrayList io) {
            if (node == null) {
                return;
            }
            inOrder(node.left, io);
            io.add(node);
            inOrder(node.right, io);
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

![](http://i.imgur.com/DG5lZ6O.png) 

**After searching 17**

![](http://i.imgur.com/Y0319VT.png) 

**After searching 52**

![](http://i.imgur.com/pG2oM3J.png) 

Below there are links to all implementations of several applications of Trees concept.

* [Avl Tree][1]
* [Leftist Tree][2]
* [Fibonacci Heap][3]
* [Splay Tree][4]


[0]: lab.leocardz.com/avl-tree/
[1]: http://lab.leocardz.com/avl-tree
[2]: http://lab.leocardz.com/leftist-tree
[3]: http://lab.leocardz.com/fibonacci-heap
[4]: http://lab.leocardz.com/splay-tree