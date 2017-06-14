class ChatroomsController < ApplicationController
  def show
    @chatroom = Chatroom.find_by(id: params[:slug])
    @message = Message.new
  end

  def index
    @chatrooms = Chatroom.all
  end

  def new
    @chatroom = Chatroom.new(name: "New Chat")
    @message = Message.new

    if @chatroom.save
      render :show
    else
      render :index
    end
  end

  def create
    @chatroom = Chatroom.create({ name: params[:name]})
    @message = Message.new

    if @chatroom.save
      render :show
    else
      render :index
    end
  end

  private

  def permitted_params
    params.require(:chatroom).permite(:name, :id)
  end


end
