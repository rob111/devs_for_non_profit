class ProjectsController < ApplicationController
  before_action :authorize_user, except: [:index, :show]

  def index
  end

  def show
  end

  def new
    if current_user
      @client = Client.find(current_user.id)
      @project = Project.new
    end
  end

  def create
    @statuses = ['Proposed', 'Active', 'Completed', 'Canceled']
    @client = Client.find(current_user.id)
    @project = Project.create(project_params)
    @project.client = @client

    if @project.save
      flash[:notice] = "Project added successfully."
      redirect_to @client
    else
      flash.now[:alert] = @project.errors.full_messages.join(', ')
      render :new
    end
  end

  def update
  end

  private
  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You must be logged in to view that page."
      redirect_to root_path
    end
  end

  def project_params
    params.require(:project).permit(:description, :status, :deadline, :price)
  end
end
