class ClientInfosController < ApplicationController
  before_action :authorize_user

  def new
    @client_info = ClientInfo.new
    @client = Client.find(params[:client_id])
  end

  def create
    @client = Client.find(params[:client_id])
    @client_info = ClientInfo.new(client_info_params)
    @client_info.client = @client
    if @client_info.save
      flash[:notice] = 'Information added successfully.'
      redirect_to @client
    else
      flash.now[:alert] = @client_info.errors.full_messages.join(', ')
      render :new
    end
  end

  def edit
    # binding.pry
    @client = Client.find(params[:client_id])
    @client_info = @client.client_info
  end

  def update
    @client_info = ClientInfo.find(params[:id])
    @client = Client.find(params[:client_id])
    if @client_info.update(client_info_params)
      flash[:notice] = 'Your info updated successfully.'
      redirect_to @client
    else
      flash.now[:alert] = @client_info.errors.full_messages.join(', ')
      render :edit
    end
  end

  private
  def client_info_params
    params.require(:client_info).permit(:company_size, :description, :rep_position)
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

end
