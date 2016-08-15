An AVL tree is balanced binary search tree. Its name contains the letters of its inventors, Adelson-Velskii and Landis, it was the first dynamically balanced tree to be proposed. The AVL trees may not be perfectly balanced, but pairs of sub-trees differ in height by at most 1, keeping an O (log N) search time. Addition and deletion operations also take O (log N) time.

The following propositions define an AVL Tree:

* The subtrees of every node differ in height by at most one.
* Every subtree is an AVL tree.

**Search**: Searching for a specific element in an AVL Tree can be done the same way as that of a normal unbalanced Binary Search Tree, that is: 
The searching starts by examining the root node. If the tree is null, the key we are searching for does not exist in the tree. Otherwise, if the key equals that of the root, the search is successful and we return the node. If the key is less than that of the root, we search the left subtree. Similarly, if the key is greater than that of the root, we search the right subtree. This process is repeated until the key is found or the remaining subtree is null. If the searched key is not found before a null subtree is reached, then the item must not be present in the tree. It can be a recursive or an iterative process.

**Insertion** process is like the search; if the key is not equal to that of the root, we search the left or right subtrees as before. Eventually, we will reach an external node and add the new key-value pair as its right or left child, depending on the node's key. In other words, we examine the root and recursively insert the new node to the left subtree if its key is less than that of the root, or the right subtree if its key is greater than or equal to the root. After inserting a node, it is necessary to check each of the node's ancestors for consistency with the rules of Avl. And it is measured by the Balance Factor. The balance factor is calculated as follows: balanceFactor = height (left subtree) - height (right subtree). As the tree is balanced at every insertion (if necessary), the height of an AVL subtree cannot increase by more than one, so the temporary balance factor of a node will be in the range from âˆ'2 to +2\. f the balance factor becomes less than âˆ'1 or greater than +1, the subtree rooted at this node is unbalanced, and rotations are necessary to make the tree balanced again.

**Rotations** are operations that change the structure without interfering with the order of the elements. A tree rotation moves one node up in the tree and one node down. It is used to change the shape of the tree. The AVL Tree has 4 types of rotations:

* **Right rotation**: consists in rearranging clockwisely the positions of two nodes.
* **Left rotation**: consists in rearranging anticlockwisely the positions of two nodes.
* **Right-Left rotation (AKA Double Right)**: consists in rearranging clockwisely (first rotation) and anticlockwisely (second rotation) the positions of three nodes. 
* **Left-Right rotation (AKA Double Left)**: consists in rearranging anticlockwisely (first rotation) and clockwisely (second rotation) the positions of three nodes.

Sometimes a single rotation is not sufficient to balance an unbalanced tree, that's why the double rotations are needed. The first and second rotations are not performed on the same node.

![](http://i.imgur.com/ai929HR.gif)

Source: Wikipedia

**Deletion**: Like Insertion, the Deletion is similar to the Search. For deleted leaf nodes, clearly the heights of the children of the node do not change. Also, the heights of the children of a deleted node with one child do not change either. Hence, if a deletion causes a violation of the AVL Tree height property, this will occur on some node on the path from the parent of the deleted node to the root node. To restructure the tree after a deletion we will call the restructure method on the parent of the deleted node. 

### Code snippets

Below you will see a AVL Tree.


    
    
    public class TreeNode {
        public String value;
        public TreeNode left;
        public TreeNode right;
        public TreeNode parent;
        public int balance;
    
        public TreeNode(String v) {
            left = right = parent = null;
            balance = 0;
            value = v;
        }
    }
    
    



    
    
    public class AvlTree {
    
        protected TreeNode root;
        public int currentSearchHeight = -1;
    
        /**
         * Core Functions
         */
    
        /**
         * Insert new node
         */
        public void insert(String value) {
            TreeNode n = new TreeNode(value);
            insertAvl(this.root, n);
        }
    
        private void insertAvl(TreeNode currentNode, TreeNode newNode) {
            if (currentNode == null) {
                this.root = newNode;
            } else {
    
                if (newNode.value.compareTo(currentNode.value) < 0) {
                    if (currentNode.left == null) {
                        currentNode.left = newNode;
                        newNode.parent = currentNode;
    
                        recursiveBalance(currentNode);
                    } else {
                        insertAvl(currentNode.left, newNode);
                    }
    
                } else if (newNode.value.compareTo(currentNode.value) > 0) {
                    if (currentNode.right == null) {
                        currentNode.right = newNode;
                        newNode.parent = currentNode;
    
                        recursiveBalance(currentNode);
                    } else {
                        insertAvl(currentNode.right, newNode);
                    }
                } else {
                    System.out.println("\nValue " + newNode.value + " already exists. Ignoring...");
                }
            }
        }
    
        /**
         * Finds a node
         */
        public TreeNode find(String key) {
            currentSearchHeight = -1;
            return find(this.root, key);
        }
    
        /**
         * Finds a node
         */
        public TreeNode find(TreeNode currentNode, String value) {
            currentSearchHeight++;
    
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
         */
        public void remove(String k) {
            currentSearchHeight = -1;
            removeAvl(this.root, k);
        }
    
        /**
         * Finds a node and calls a method to remove the node..
         */
        private void removeAvl(TreeNode startingNode, String searchingKey) {
            currentSearchHeight++;
            if (startingNode == null) {
                System.out.println("\nKey " + searchingKey + " not found.");
            } else {
                if (startingNode.value.compareTo(searchingKey) > 0) {
                    removeAvl(startingNode.left, searchingKey);
                } else if (startingNode.value.compareTo(searchingKey) < 0) {
                    removeAvl(startingNode.right, searchingKey);
                } else if (startingNode.value.equals(searchingKey)) {
                    removeFoundNode(startingNode);
                    System.out.println("\nValue " + searchingKey + " removed successfully at tree height " + currentSearchHeight + ".");
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
                removingNode.value = parentNode.value;
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
            String l = "0";
            String r = "0";
            String p = "0";
            if (node.left != null) {
                l = node.left.value;
            }
            if (node.right != null) {
                r = node.right.value;
            }
            if (node.parent != null) {
                p = node.parent.value;
            }
    
            System.out.println("Left: " + l + " Value: " + node.value + " Right: " + r + " Parent: " + p + " Balance: " + node.balance);
    
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

![](http://i.imgur.com/wS0bxMf.png) 

Below there are links to all implementations of several applications of Trees concept.

* [Avl Tree][0]
* [Leftist Tree][1]
* [Fibonacci Heap][2]
* [Splay Tree][3]


[0]: http://lab.leocardz.com/avl-tree
[1]: http://lab.leocardz.com/leftist-tree
[2]: http://lab.leocardz.com/fibonacci-heap
[3]: http://lab.leocardz.com/splay-tree