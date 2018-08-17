class ChatChannel < ApplicationCable::Channel
  def subscribed
    # binding.pry
    stream_from "chat_#{params[:chat_id]}"
    # stream_from "chat_channel"
    # @chat = Chat.find_or_create_by(id: params[:chat_id])
    # @chat.author_id = current_user.id
    # @chat.receiver_id = @chat.id
    # if @chat.save
    #   flash[:notice] = "New conversation has been created."
    #   redirect_to @chat
    # else
    #   redirect_to root_path
    # end
    # binding.pry
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data

    # Currently, we dont actually use this code that much. But you would have to set up these models if you want to record the conversations in your chat.
    chat = Chat.find(id: params[:chat_id])
    puts '****************************************************'
    puts chat
    new_message = Message.create(body: data["message"], user: User.find(data["user"]["user_id"]))
    chat.messages << new_message

    # chat_key = "#{Time.now.to_datetime.strftime('%Q')}-#{current_user.id}"
    chat_key = chat.id

    # binding.pry
    chat_json = {
      "chat_key": chat_key,
      "message": new_message.body,
      "messageId": new_message.id,
      "user": data["user"]
    }

    ActionCable.server.broadcast("chat_#{params[:chat_id]}", chat_json)
  end
end
