So we will start it from the simplest ones to the hardest ones.



### Bubble Sort



    
    
    private static void bubbleSort(int[] v) {
    
    		int i, j, n = v.length;
    
    		for (i = 0; i < n; i++) {
    			for (j = i + 1; j < n; j++) {
    				if (v[i] > v[j]) {
    					swap(v, i, j);
    				}
    			}
    		}
    
    	}
    
    






### Selection Sort



    
    
    private static void selectionSort(int[] v) {
    
    		int i, j, min, n = v.length;
    
    		for (i = 0; i < n; i++) {
    			min = i;
    			for (j = i + 1; j < n; j++) {
    				if (v[min] > v[j])
    					min = j;
    			}
    			swap(v, min, i);
    		}
    
    	}
    
    






### Insertion Sort



    
    
    private static void insertionSort(int[] v) {
    
    		int i, j, temp, n = v.length;
    
    		for (i = 1; i < n; i++) {
    			temp = v[i];
    			j = i - 1;
    
    			while (j >= 0 && v[j] > temp) {
    				v[j + 1] = v[j];
    				j--;
    			}
    			v[j + 1] = temp;
    		}
    
    	}
    
    






### Shell Sort



    
    
    private static void shellSort(int[] v) {
    
    		int n = v.length;
    		int range = n / 2;
    		int i, j, temp;
    		int gap;
    
    		while (range > 0) {
    			for (i = range; i < n; i++) {
    				temp = v[i];
    				j = i;
    				gap = j - range;
    
    				while (j >= range && v[gap] > temp) {
    					v[j] = v[gap];
    					j -= range;
    					gap = j - range;
    				}
    				v[j] = temp;
    			}
    			range /= 2;
    		}
    
    	}
    
    






### Heap Sort



    
    
    private static void heapify(int[] v, int pos, int n) {
    
    		int low = 2 * pos + 1;
    		int high = 2 * pos + 2;
    		int largest, temp;
    
    		if (low < n && v[low] > v[pos])
    			largest = low;
    		else
    			largest = pos;
    
    		if (high < n && v[high] > v[largest])
    			largest = high;
    
    		if (largest != pos) {
    			temp = v[largest];
    			v[largest] = v[pos];
    			v[pos] = temp;
    			heapify(v, largest, n);
    		}
    
    	}
    
    	private static void heapSort(int[] v) {
    
    		int n = v.length, i;
    		int low = n / 2 - 1, high = n - 1;
    
    		// Build initial heap
    		for (i = low; i >= 0; i--) {
    			heapify(v, i, n);
    		}
    
    		for (i = high; i > 0; i--) {
    			swap(v, 0, i);
    			heapify(v, 0, i);
    		}
    
    	}
    
    






### Quick Sort



    
    
    // Start with quickSort(v, 0, v.length - 1);
    
    	private static int i;
    	private static int j;
    
    	private static void partition(int[] v, int low, int high) {
    
    		i = low;
    		j = high;
    		int x = v[(i + j) / 2];
    
    		while (i 
    






### Merge Sort



    
    
    // Start with mergeSort(v, 0, v.length - 1);
    	private static void merge(int[] v, int low, int middle, int high) {
    
    		int[] vAux = new int[v.length];
    
    		for (int i = low; i 






### Swap Method



    
    
    private static void swap(int[] v, int i, int j) {
    
    		int temp = v[i];
    		v[i] = v[j];
    		v[j] = temp;
    
    	}