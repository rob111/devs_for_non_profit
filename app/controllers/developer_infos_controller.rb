class DeveloperInfosController < ApplicationController
  before_action :authorize_user

  def new
    @developer_info = DeveloperInfo.new
    @developer = Developer.find(params[:developer_id])
  end

  def create
    @developer = Developer.find(params[:developer_id])
    @developer_info = DeveloperInfo.new(developer_info_params)
    @developer_info.developer = @developer
    if @developer_info.save
      flash[:notice] = 'Information added successfully.'
      redirect_to @developer
    else
      flash.now[:alert] = @developer_info.errors.full_messages.join(', ')
      render :new
    end
  end

  def edit
    @developer = Developer.find(params[:developer_id])
    @developer_info = @developer.developer_info
  end

  def update
    @developer_info = DeveloperInfo.find(params[:id])
    @developer = Developer.find(params[:developer_id])
    if @developer_info.update(developer_info_params)
      flash[:notice] = 'Your info updated successfully.'
      redirect_to @developer
    else
      flash.now[:alert] = @developer_info.errors.full_messages.join(', ')
      render :edit
    end
  end

  private
  def developer_info_params
    params.require(:developer_info).permit(:years_of_experience, :preferred_technologies, :base_hourly_rate)
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

end
