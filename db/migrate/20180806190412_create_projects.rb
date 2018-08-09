class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.text :description, null: false
      t.string :status, default: :null
      t.date :deadline
      t.text :price
      t.belongs_to :client, null: false
      t.timestamps null: false
    end
  end
end
