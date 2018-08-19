class ClientsController < ApplicationController
  before_action :authorize_client, except: [:index, :show]

  def show

  end

  def edit
    if !is_given_user_logged_in?
      @client = Client.find(params[:id])
      render :edit
    else
      flash[:alert] = "You don't have access to this page."
      redirect_to root_path
    end
  end

  def update
    @client = Client.find(params[:id])
    if @client.update(client_params)
      flash[:notice] = 'User was successfully updated.'
      redirect_to @client
    else
      flash[:alert] = 'All fields must be completed'
      render :show
    end
  end

  private
  def is_given_user_logged_in?
    return params[:id] == current_user.id
  end

  def client_params
    params.require(:client).permit(:email, :username, :password, :profile_photo)
  end

  def authorize_client
    if !client_signed_in?
      flash[:notice] = "You need to sign in to access this page."
      redirect_to root_path
    end
  end
end
