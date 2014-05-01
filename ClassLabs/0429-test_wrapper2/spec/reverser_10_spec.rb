# -*- coding: utf-8 -*-
require 'spec_helper'
require 'reverser_10'

describe Reverser10 do
	before do
		@reverser_10 = Reverser10.new
	end

	it "should print a string reversed 10 times separated by new lines" do
		@reverser_10.reverse("this is an input").should == "tupni na si siht\n"*10;
	end

end
