class MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    @message.user = current_user

    byebug
    if @message.save
      # do some stuff
    else
      redirect_to chatrooms_path
    end
  end

  def show
    @message = Message.find(params[:id])
    render :message
  end

  private

    def message_params
      puts params
      params.require(:message).permit(:text, :chatroom_id, :user_id)
    end
end
