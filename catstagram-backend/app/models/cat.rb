class Cat < ApplicationRecord
    has_many :locations
    has_many :reactions
    has_many :reaction_locations, through: :reactions, :source => :locations 
end
