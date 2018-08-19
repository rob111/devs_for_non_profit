class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true
  validates :full_name, presence: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :messages, dependent: :destroy
  has_many :authored_conversations, class_name: 'Chat', foreign_key: 'author_id'
  has_many :received_conversations, class_name: 'Chat', foreign_key: 'received_id'

end
