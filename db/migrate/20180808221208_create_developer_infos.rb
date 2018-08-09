class CreateDeveloperInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :developer_infos do |t|
      t.belongs_to :developer, null: false
      t.string :years_of_experience, null: false
      t.string :preferred_technologies
      t.string :base_hourly_rate, null: false
      t.timestamps null: false
    end
  end
end
