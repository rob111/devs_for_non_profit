class MessagesController < ApplicationController
  before_action :find_conversation!

  def new
    redirect_to chat_path(@chat) and return if @chat
    @message = current_user.messages.build
  end

  def create
    @chat ||= Chat.create(author_id: current_user.id,
                                          receiver_id: @receiver.id)
    @message = current_user.messages.build(message_params)
    @message.chat_id = @chat.id
    @message.save!

    flash[:notice] = "Your message sent successfully!"
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
      redirect_to(root_path) and return unless @chat && @chat.participates?(current_user)
    end
  end
end
