class Api::V1::ChatsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @chats = Chat.participating(current_user)
    render json: @chats
  end

  def show
    # it looks like I don't use this method anymore
    chat = Chat.find_by(author_id: current_user.id)
    messages = chat.messages

    render json: {
      chat: chat,
      author: rendered_json(chat),
      messages: messages
    }
  end

  #I need to create a new chat before I will
  #send a new message
  def create
    new_message = Message.new(user_id: params[:user_id], chat_id: params[:chat_id], body: params[:body])
    if new_message.save
      render json: new_message
    else
      render json: { errors: new_message.errors }, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :chat_id, :body)
  end

  def rendered_json(chat_id)
    {
      user_id: current_user.id,
      handle: current_user.username
    }
  end

end
