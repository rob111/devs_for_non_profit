class Api::V1::CollaborationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    new_collaboration = Collaboration.new(collaboration_params)

    if new_collaboration.save
      render json: new_collaboration
    else
      render json: { errors: new_collaboration.errors }, status: 422
    end
  end

  def collaboration_params
    params.require(:collaboration).permit(:project_id, :developer_id)
  end
end
