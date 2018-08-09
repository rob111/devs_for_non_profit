class DeveloperInfoSerializer < ActiveModel::Serializer
  attributes :id, :developer_id, :years_of_experience, :preferred_technologies, :base_hourly_rate
end
