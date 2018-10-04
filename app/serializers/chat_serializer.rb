class ChatSerializer < ActiveModel::Serializer
  attributes :id, :author, :receiver, :messages

  has_many :messages
end
