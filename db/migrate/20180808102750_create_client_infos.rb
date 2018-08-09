class CreateClientInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :client_infos do |t|
      t.belongs_to :client, null: false
      t.string :company_size
      t.text :description
      t.string :rep_position, null: false
      t.timestamps null: false
    end
  end
end
 
