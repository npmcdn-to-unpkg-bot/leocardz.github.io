### Hash Table


Hash table (also hash map) is a data structure used to implement an associative array, a structure that can map keys to values. Implementally talking, hash table is an array-based data structure, which uses a hash function to compute an index into an array of buckets or slots, from which the correct value can be found. It's designed to keep insertion, deletion search with O(1) complexity.

### Hash Function



Hash Function is the main feature of hash table design. It should assign each possible key to a unique slot. Although this ideal situation is rarely achievable in practice. Additionally, to offset this rarity different keys that are assigned by the hash function to the same bucket, called hash collisions, will occur and must be accommodated in some way. But if the hash function cause too many collisions, the hash table overall performance will be badly affected.



### Hash Table and Load Factor




The load factor of a hash table is the ratio between the number of stored items and the array size. With its different implementations, hash table can whether be of a constant size or being dynamically resized, when load factor exceeds some threshold.


### Collisions 



What happens, if hash function returns the same hash value for different keys? It yields an effect, called collision. Collisions are practically unavoidable. Due to collisions, keys are also stored in the table, so one can distinguish between key-value pairs having the same hash. There are various ways of collision resolution. Basically, there are three different strategies with several branches:


### Open Hashing (also Closed addressing or Separate Chaining): 

Each slot of the hash table contains a link to another data structure (i.e. linked list or AVL tree), which stores key-value pairs with the same hash. When collision occures, this data structure is searched for key-value pair, which matches the key.  


### Closed Hashing (also Open addressing): 

Each slot actually contains a key-value pair. When collision occurs, open addressing algorithm calculates another location (i.e. next one) with a linear or quadratic probing to locate a free slot. Another approach in Closed Hashing, called Rehashing that can be with linear or quadratic probing, is about resizing the hash table if some threshold is exceeded.


### Half Open Hashing (Mix of Open Hashing with AVL and Rehashing). 


Below there are links to all implementations of hashing algorithms.




* [Open Hashing][0]
* [Open Hashing with Avl][1]
* [Closed Hashing][2]

  * Linear probing
  * Quadratic probing
  * [Double hashing][3]
  * [Rehashing][4]

    * Linear probing
    * Quadratic probing



* [Half Open Hashing][5]




[0]: http://lab.leocardz.com/open-hashing
[1]: http://lab.leocardz.com/open-hashing-with-avl
[2]: http://lab.leocardz.com/closed-hashing
[3]: http://lab.leocardz.com/double-hashing
[4]: http://lab.leocardz.com/rehashing
[5]: http://lab.leocardz.com/half-open-hashing