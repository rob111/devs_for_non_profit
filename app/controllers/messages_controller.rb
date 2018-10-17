class MessagesController < ApplicationController
  before_action :find_conversation!

  def new
    @message = current_user.messages.build
    redirect_to chat_path(@chat) and return if @chat
  end

  def create
    # binding.pry
    @chat ||= Chat.create(author_id: current_user.id,
                                          receiver_id: @receiver.id)
    @message = current_user.messages.build(message_params)
    @message.chat_id = @chat.id
    if @message.save
      flash[:notice] = "Your message sent successfully!"
    else
      flash[:alert] = @message.errors.full_messages.join(', ')
    end
    redirect_to chat_path(@chat)
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

  def find_conversation!
    if params[:receiver_id]
      @receiver = User.find_by(id: params[:receiver_id])
      redirect_to(root_path) and return unless @receiver
      @chat = Chat.between(current_user.id, @receiver.id)[0]
    else
      @chat = Chat.find_by(id: params[:conversation_id])
      @receiver = User.find(@chat.receiver_id)
      redirect_to(root_path) and return unless @chat && @chat.participates?(current_user)
    end
  end
end
