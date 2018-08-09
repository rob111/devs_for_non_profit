class Developer < User
  has_one :developer_info
  has_many :collaborations
  has_many :projects, through: :collaborations

  def clients
    projects.map {|project| project.client }
  end
end
