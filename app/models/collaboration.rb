class Collaboration < ApplicationRecord
  belongs_to :project
  belongs_to :developer
end
