class Api::V1::ClientsController < ApiController

  def show

    if current_user
      current_user_id = current_user.id
      current_username = current_user.username
    else
      current_user_id = nil
      current_username = nil
    end

    render json: {
      client: serialized_client,
      projects: serialized_projects,
      client_info: Client.find(params[:id]).client_info,
      current_user: {username: current_username, id: current_user_id}
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
