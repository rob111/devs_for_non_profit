
class DevelopersController < ApplicationController
  before_action :authorize_developer

  def show

  end

  def edit
    if !is_given_user_logged_in?
      @developer = Developer.find(params[:id])
      render :edit
    else
      flash[:alert] = "You don't have access to this page."
      redirect_to root_path
    end
  end

  def update
    @developer = Developer.find(params[:id])
    if @developer.update(developer_params)
      flash[:notice] = 'Developer was successfully updated.'
      redirect_to @developer
    else
      flash[:alert] = 'All fields must be completed'
      render :show
    end
  end

  private
  def is_given_user_logged_in?
    return params[:id] == current_user.id
  end

  def developer_params
    params.require(:developer).permit(:email, :username, :password, :profile_photo)
  end

  def authorize_developer
    if !developer_signed_in?
      flash[:notice] = "You need to sign in to access this page."
      redirect_to root_path
    end
  end

end
