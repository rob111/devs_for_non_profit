class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :full_name, :company, :email, :profile_photo
end
