class ClientInfoSerializer < ActiveModel::Serializer
  attributes :id, :client_id, :company_size, :description, :rep_position
end
