class Api::V1::ProjectsController < ApplicationController
  def show
    render json: {
      project: project,
      developers: serialized_developers
    }
  end

  def serialized_developers
    ActiveModel::Serializer::ArraySerializer.new(Project.find(params[:id]), each_serializer: ProjectSerializer)
  end
end
