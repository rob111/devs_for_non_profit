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



  # def show
  #   other_user_id = params[:id]
  #
  #   # you may need to use a `find_or_create_by` pattern that more accurately
  #   Chat.find_or_create_by(author_id: current_user.id, receiver_id: other_user_id)
  #   Chat.find_or_create_by(author_id: current_user.id, receiver_id: other_user_id)
  # end
  #
  # def new
  #   @chat = Chat.new
  # end
  #
  # def create
  #   binding.pry
  #   @chat = Chat.find(params[:id])
  #   if !@chat
  #     #current_user is author
  #     #choosed user from list is received
  #     @chat = Chat.create!(author_id: current_user.id, receiver_id: user.id)
  #     if @chat.save
  #       flash[:notice] = "New chat has been created."
  #       redirect_to @chat
  #     end
  #   else
  #     redirect_to @chat
  #   end
  # end
end
