class ChatSerializer < ActiveModel::Serializer
  attributes :id, :author, :receiver, :messages, :current_user_id

  has_many :messages

  def current_user_id
    current_user.id
  end
end
