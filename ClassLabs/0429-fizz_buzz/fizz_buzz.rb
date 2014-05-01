class FizzBuzz

	# converts range 1-10 to an array
	# runs method fizz_or_buzz in a number
	def calculate
		(1..100).to_a.map do |number|
			fizz_or_buzz(number)
		end
	end
	
	# prints to console	
	def print 
		puts calculate
	end

	private 

	# for right now, just gives us num back
	# eventually, will give us fizzbuzz sequence according to rules
	def fizz_or_buzz(num)
		if num % 15 == 0
			'fizzbuzz'
		elsif num % 3 == 0
			'fizz'
		elsif num % 5 == 0
			'buzz'
		else
			num
		end
		
	end
end

FizzBuzz.new.print