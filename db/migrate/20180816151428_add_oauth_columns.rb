class AddOauthColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar_url, :string
    add_column :users, :uid, :string
    add_column :users, :provider, :string
    add_column :users, :oauth_token, :string 
  end
end
