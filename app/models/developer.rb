class Developer < User
  has_one :developer_info
  has_many :collaborations
  has_many :projects, through: :collaborations


  #omniauth
  devise :omniauthable, omniauth_providers: %i[github]

  def clients
    projects.map {|project| project.client }
  end

  #omniauth
  def self.from_omniauth(auth)
   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|

    user.email = auth.info.email
    user.password = Devise.friendly_token[0,20]
    user.username = auth.info.name   # assuming the user model has a name
    user.avatar_url = auth.info.image # assuming the user model has an image
    # If you are using confirmable and the provider(s) you use validate emails,
    # uncomment the line below to skip the confirmation emails.
    # user.skip_confirmation!


     end
   end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
  
end
