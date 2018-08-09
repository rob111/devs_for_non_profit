class CreateCollaborations < ActiveRecord::Migration[5.2]
  def change
    create_table :collaborations do |t|
      t.belongs_to :project, null: false
      t.belongs_to :developer, null: false
      t.timestamps null: false
    end
  end
end
