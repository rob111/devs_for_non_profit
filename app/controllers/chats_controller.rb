class ChatsController < ApplicationController
  before_action :set_chat, except: [:index]
  before_action :check_participating!, except: [:index]

  def index
    @chats = Chat.participating(current_user).order('updated_at DESC')
    if current_user.type == "Client"
      @users = Developer.all
    else
      @users = Client.all
    end
  end

  def show
    @chat = Chat.find_by(id: params[:id])
    @message = Message.new
  end

  private

  def set_chat
    @chat = Chat.find_by(id: params[:id])
  end

  def check_participating!
    redirect_to root_path unless @chat && @chat.participates?(current_user)
  end

end
