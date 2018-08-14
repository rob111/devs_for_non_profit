class Api::V1::ProjectsController < ApplicationController
  def show
    render json: {
      project: serialized_project,
      developers: serialized_developers,
      current_user: {username: current_user.username, id: current_user.id}
    }
  end

private
  def project_params
    params.require(:project, :developers).permit()
  end

  def serialized_developers
    ActiveModel::Serializer::ArraySerializer.new(Project.find(params[:id]).developers, each_serializer: DeveloperSerializer)
  end

  def serialized_project
    ProjectSerializer.new(Project.find(params[:id]))
  end
end
