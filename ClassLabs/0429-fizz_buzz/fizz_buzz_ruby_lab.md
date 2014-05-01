#FizzBuzz (RSpec for Ruby)

####[Go here first if you're totally lost!](https://github.com/ga-students/WDI_LA_5-6/blob/master/04-week/fizz_buzz/README.md)

##Your Task


Test (and write code that passes) the following:

*stuff we did in class*

- That the FizzBuzz class exists
- That there's a method called *calculate*
- That the output of running *calculate* on a FizzBuzz is an array

- That the first entry in that array is 1
- That the third entry in that array is 'fizz'


*on your own, you testing ninjas!*

- That the fifth entry in that array is 'buzz'
- That the 99th entry in that array is 'fizz' *(hint: you might have to widen the range)*
- That the 15th entry in that array is 'fizzbuzz'


####We'll post the solution code this afternoon! We want to see your demos first :)

--------------

###The FizzBuzz Problem

FizzBuzz is a classic computer science problem based on a children's game. It works like this:

- Every number divisible by 3 is replaced with the word "fizz"

	1
	
	2
	
	fizz **<---- 3**
	
	4
	
	5
	
	fizz **<---- 6**
	
	7
	
	8
	
	fizz **<---- 9** 
	
	10
	 
	etc.
	
	
- Every number divisible by 5 is replaced with the word "buzz"

	1
	
	2
	
	fizz **<---- 3**
	
	4
	
	buzz **<---- 5**
	
	fizz **<---- 6**
	
	7
	
	8
	
	fizz **<---- 9** 
	
	buzz **<---- 10** 
	 
	etc.
	
	
- Every number divisible by both 3 and 5 is…"fizzbuzz"!
	So, for the range 10 - 18:

	buzz **<---- 10**
	
	11
	
	fizz **<---- 12**
	
	13
	
	14
	
	fizzbuzz **<---- 15**
	
	16
	
	17
	
	fizz **<---- 18**
	
	
