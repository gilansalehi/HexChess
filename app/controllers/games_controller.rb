class GamesController < ApplicationController

  def new
    @game = Game.new(game_params)
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      render :show
    else
      flash.now[:errors] = @game.errors.full_messages
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def update
    @game = Game.find(params[:id])

    if @game.update(game_params)
      render :show
    else
      flash :errors
    end
  end

  def index
    @games = Game.all #.where({ status: 'seeking' })
    render :index
  end

  private

  def game_params
    params.require(:game).permit(
      :position,
      :status,
      :winner,
      :p1_id,
      :p2_id,
      :creator_id,
    )
  end


end
