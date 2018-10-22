class MessageSerializer < ActiveModel::Serializer
  attributes :user_id, :chat_id, :body, :created_at
end
