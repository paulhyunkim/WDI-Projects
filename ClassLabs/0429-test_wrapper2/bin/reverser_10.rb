#!/usr/bin/env ruby
require File.expand_path(File.join(File.dirname(__FILE__), '..', 'lib', 'reverser_10'))

if ARGV[0]
  reverser_10 = Reverser10.new
  puts rev.reverse10(ARGV[0])
else
  puts("No string given to print")
end
