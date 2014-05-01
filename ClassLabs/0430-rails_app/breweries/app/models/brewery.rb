class Brewery
  include Mongoid::Document
  field :name, type: String
  field :city, type: String
  field :state, type: String
end
