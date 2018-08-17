# class Api::V1::UsersController < ApplicationController
#   protect_from_forgery unless: -> { request.format.json? }
#
#
#   def index
#     binding.pry
#     chat = Chat.find_by(author_id: current_user.id, receiver_id: params[:receiver_id])
#
#     render json: rendered_json(chat.id)
#   end
#
#   def rendered_json(chat_id)
#     {
#       user_id: current_user.id,
#       handle: current_user.handle,
#       icon_num: current_user.icon_num,
#       chat_id: chat_id
#     }
#   end
# end
