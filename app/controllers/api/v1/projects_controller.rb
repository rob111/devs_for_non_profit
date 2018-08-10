class Api::V1::ProjectsController < ApplicationController
  def show
    render json: {
      project: serialized_project,
      developers: serialized_developers
    }
  end

  def serialized_developers
    ActiveModel::Serializer::ArraySerializer.new(Project.find(params[:id]).developers, each_serializer: DeveloperSerializer)
  end

  def serialized_project
    ProjectSerializer.new(Project.find(params[:id]))
  end
end
