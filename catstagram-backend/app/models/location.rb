class Location < ApplicationRecord
  belongs_to :cat
  has_many :reactions
end
