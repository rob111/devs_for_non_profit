class CreateIndexChats < ActiveRecord::Migration[5.2]
  def change
    add_index :chats, [:author_id, :receiver_id], unique: true
  end
end
