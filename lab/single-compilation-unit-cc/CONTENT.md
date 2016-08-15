**Single Compilation Unit**, also known as **Separate Compilation**, is a technique of the programming languages C/C++ that allows to reduce the compilation time
and aims to help the compiler to perform optimization of the program, even when the compiler itself doesn't support the optimization of the entire program or precompiled
headers.



Generally, a C/C++ development environment assumes that .c/.cpp source files are preprocessed (the moment which the compiler expands the source file and includes all the
headers described in the file, in other words, creating of translation units) and translated separately by the compiler, generating object code files (.o or .obj), which
can then be linked together to create a executable library or file (.exe on **Windows**, for example).



This process leads to several passages that are being performed in header files (.h) common, and with C++, multiple template instantiations of the same template in
different translation units, thus having a replication code. The Separate Compilation technique uses preprocessor directives to "stick" different translation units at compile
time, not at link time. Thus, reducing the overall compile time, but increasing the time needed to build after making small changes in any source file included in a single
compilation unit. Therefore, the less the source files need to be modified best performance of this technique.



CS also allows an optimizer to draw inner relationships between the functions, thus allowing optimizations such as creating **inline functions** (the copy function
they are called in some other block of the program to this block where they are called). It also helps to avoid the implicit code bloat due to exceptions, side effects
and register allocation, which are generally neglected by the classical scheme of using separate modules and not always achieved by the use of precompiled headers.



Below is an example of separate compilation in C++, but in download files there's an example in C too:





1º - You must have a header file (.h) and insert in it only class and functions declarations, the scope will be defined
in its .cpp correspondent file. The directives \#ifndef \#define \#endif guarantee that if the preprocessor macro
SEPARATECOMPILATION\_H is already defined, the block inside its correspondent \#ifndef will be ignored in the rest of the code,
preventing this block to be processed more than once.




    
    
    #ifndef SEPARATECOMPILATION_H
    #define SEPARATECOMPILATION_H
    
    class fibonacci{
    	public:
    		long long int numberCalculus(int);
    		~fibonacci(){};
    };
    
    #endif
    
    





2º - In the correspondent .cpp file to the .h file the scope of the class functions is defined, in this case.


    
    
    #include "separateCompilation.h"
    
    long long int fibonacci::numberCalculus(int number){
    	long long int temporary;
    	int i;
    	if(number == 0) temporary = 0;
    	else if(number == 1 || number == 2) temporary = 1;
    	else{
    		long long int before = 1, beforeBefore = 1;
    		for(i = 2; i < number; i++){
    			temporary = beforeBefore + before;
    			beforeBefore = before;
    			before = temporary;
    		}
    	}
    	return temporary;
    }
    
    




3º - In the end, you include the header file in the file that contains the main function.


    
    
    #include <iostream>
    #include "separateCompilation.h"
    
    using namespace std;
    
    int main(){
    	int userNumber;
    	fibonacci fib;
    	long long int result;
    
    	cout << "\nEnter a number to calculate its Fibonacci number: ";
    	cin >> userNumber;
    	result = fib.numberCalculus(userNumber);
    
    	cout << "\n";
    	if(result == -1){
    		cout << "Invalid Number";
    	}
    	else if(result < -1){
    		cout << "Result overflows long long int: "
    		     << result;
    	}
    	else{
    		cout << "Result is " << result;
    	}
    	cout << "\n\n";
    
    	return 0;
    }
    
    




Now, just compile all files .cpp and run the program.  

On Linux and Mac, you can use the g++ compiler to compile all .cpp files as follows:  



![g++ on bash](http://i.imgur.com/fYmxKKK.png)



Now, the header file separateCompilation.h is compiled only once, and the function fibonacci::numberCalculus(int number) can be inlined directly in its class, despite being in another file.