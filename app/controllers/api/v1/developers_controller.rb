class Api::V1::DevelopersController < ApiController

  def index
    render json: Developer.all
  end

  def show
    render json: {
      developer: serialized_developer,
      projects: serialized_projects,
      clients: Developer.find(params[:id]).clients,
      info: Developer.find(params[:id]).developer_info,
      current_user: {username: current_user.username, id: current_user.id}
    }
  end

  def serialized_developer
    DeveloperSerializer.new(Developer.find(params[:id]))
  end

  def serialized_projects
    ActiveModel::Serializer::ArraySerializer.new(Developer.find(params[:id]).projects, each_serializer: ProjectSerializer)
  end

end
