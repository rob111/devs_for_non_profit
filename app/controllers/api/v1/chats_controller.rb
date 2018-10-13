class Api::V1::ChatsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @chats = Chat.participating(current_user)
    render json: @chats
  end

  def show
    chat = Chat.find_by(author_id: current_user.id)
    messages = chat.messages

    render json: {
      chat: chat,
      author: rendered_json(chat),
      messages: messages
    }
  end

  def rendered_json(chat_id)
    {
      user_id: current_user.id,
      handle: current_user.username
    }
  end

end
