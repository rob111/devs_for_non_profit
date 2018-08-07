class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :type, :string
    add_column :users, :username, :string, null: false
    add_column :users, :full_name, :string, null: false
    add_column :users, :company, :string
    add_column :users, :isadmin, :boolean, default: false
  end
end
