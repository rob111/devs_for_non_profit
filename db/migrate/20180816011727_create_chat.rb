class CreateChat < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.integer :author_id
      t.integer :receiver_id

      t.timestamps null: false
    end
  end
end
