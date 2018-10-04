class MessageSerializer < ActiveModel::Serializer
  attributes :user_id, :chat_id, :body
end
