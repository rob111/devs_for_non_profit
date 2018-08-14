class Api::V1::ProjectsController < ApiController
  # before_action :authorize_user, except: [:index]

  def index
    render json: Project.all, each_serializer: ProjectSerializer

  end

  def show
    if current_user
      render json: {
        project: serialized_project,
        developers: serialized_developers,
        client: serialized_client,
        current_user: {username: current_user.username, id: current_user.id}
      }
    else
      flash[:alert] = "You need to sign in"
      redirect_to root_path
    end
  end

  def edit

  end

  def update
    edited_project = Project.find(params[:id])
    if edited_project.update(project_params)
      render json: edited_project
    else
      render json: {errors: edited_project.errors}
    end
  end

private

  def authorize_user
    if !client_signed_in? || developer_signed_in?
      flash[:notice] = "You need to sign in to access this page."
      redirect_to root_path
    end
  end


  def project_params
    params.require(:project).permit(:description, :status, :deadline, :price, :client_id)
  end

  def serialized_client
    project = Project.find(params[:id])
    ClientSerializer.new(Client.find(project.client_id), each_serializer: ClientSerializer)
  end

  def serialized_developers
    ActiveModel::Serializer::ArraySerializer.new(Project.find(params[:id]).developers, each_serializer: DeveloperSerializer)
  end

  def serialized_project
    ProjectSerializer.new(Project.find(params[:id]))
  end

end
