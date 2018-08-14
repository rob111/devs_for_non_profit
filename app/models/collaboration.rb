class Collaboration < ApplicationRecord
  belongs_to :project
  belongs_to :developer

  validates_uniqueness_of :developer_id, scope: :project_id
end
