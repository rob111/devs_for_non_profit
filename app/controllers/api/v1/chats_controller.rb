class Api::V1::ChatsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    receiver_id = params['id']
    current_chat = Chat.between(current_user.id, receiver_id)
    if current_chat.empty?
      new_chat = Chat.create(author_id: current_user.id, receiver_id: receiver_id)
    end
    @chats = Chat.participating(current_user)
    render json: @chats
  end

  def show
    index
  end

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
