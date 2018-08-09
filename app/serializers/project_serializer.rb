class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :deadline, :price, :client_id
end
