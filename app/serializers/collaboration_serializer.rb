class CollaborationSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :developer
end
