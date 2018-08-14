class Api::V1::ClientsController < ApiController

  def show
    render json: {
      client: serialized_client,
      projects: serialized_projects,
      client_info: serialized_client_info,
      current_user: {username: current_user.username, id: current_user.id}
    }
  end

  def serialized_client_info
    ClientInfoSerializer.new(Client.find(params[:id]).client_info, each_serializer: ClientInfoSerializer)
  end

  def serialized_client
    ClientSerializer.new(Client.find(params[:id]))
  end

  def serialized_projects
    ActiveModel::Serializer::ArraySerializer.new(Client.find(params[:id]).projects, each_serializer: ProjectSerializer)
  end

end
