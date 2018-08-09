class Project < ApplicationRecord
  has_many :collaborations
  has_many :developers, through: :collaborations
  belongs_to :client
end
