Tree is a very commonly used abstract data type (ADT) and one of the most powerful of the advanced data structures. A 
tree structure is basically with a root value (initial node) and subtrees of children, represented as a set of linked nodes.

To understand the Tree Concept, some definitions must be remembered:

Let's consider this image:

![](http://i.imgur.com/gSKCs7D.png) 

**Root** is called the node without parent, the initial node. In our example this is node "04".

**Leaf** is a node without children. In our example "01", "03" and "06".

**Internal nodes** are the nodes, which are not leaf or root. "02" and "05".

**Depth** of a node is the length of the path from the root to certain node. In our example "04" has depth zero because it's the root, "05" has depth one and "03" has depth two.

**Height** of tree is the maximum depth of all its nodes. In our example the tree height is 2\.

A Tree can be defined recursively as a collection of nodes, starting at a root node, where each node is a data structure consisting of a value, together with a list of references to descendant nodes, the "children", with the constraints that no reference is duplicated, and none points to the root. The following statements are true for trees:   

* Each node can have 0 or more direct descendants (children).
* Each node has at most one parent, except the root.
* All nodes are reachable from the root.

Below there are links to all implementations of several applications of Trees concept.

* [Avl Tree][0]
* [Leftist Tree][1]
* [Fibonacci Heap][2]
* [Splay Tree][3]


[0]: http://lab.leocardz.com/avl-tree
[1]: http://lab.leocardz.com/leftist-tree
[2]: http://lab.leocardz.com/fibonacci-heap
[3]: http://lab.leocardz.com/splay-tree