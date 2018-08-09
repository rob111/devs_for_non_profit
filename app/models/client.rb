class Client < User

  has_one :client_info
  has_many :collaborations
  has_many :developers, through: :collaborations
  has_many :projects
  has_many :collaborations, through: :projects
end
