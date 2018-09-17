class Api::V1::DevelopersController < ApiController

  def index
    render json: Developer.all
  end

  def show
    if current_user
      current_user_id = current_user.id
      current_username = current_user.username
    else
      current_user_id = nil
      current_username = nil
    end
    render json: {
      developer: serialized_developer,
      projects: serialized_projects,
      clients: Developer.find(params[:id]).clients,
      info: Developer.find(params[:id]).developer_info,
      current_user: {username: current_username, id: current_user_id}
    }
  end

  def serialized_developer
    DeveloperSerializer.new(Developer.find(params[:id]))
  end

  def serialized_projects
    ActiveModel::Serializer::ArraySerializer.new(Developer.find(params[:id]).projects, each_serializer: ProjectSerializer)
  end

end
