class Developer < User
  has_one :developer_info
  has_many :collaborations
  has_many :projects, through: :collaborations

  devise :omniauthable, omniauth_providers: %i[github]

  def self.from_omniauth(auth)
     where(provider: auth.provider, uid: auth.uid).first_or_create do |user|

      user.email = auth.info.email
      user.provider = auth.provider
      user.uid = auth.uid
      user.full_name = auth.info.name
      user.password = Devise.friendly_token[0,20]
      user.username = auth.info.nickname
      user.avatar_url = auth.info.image

     end
   end

  def clients
    projects.map {|project| project.client }
  end

end
