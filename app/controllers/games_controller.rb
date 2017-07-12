class GamesController < ApplicationController
  include Constant

  def new
    @game = Game.new(game_params)
  end

  def create
    @game = Game.new(game_params)
    set_default_position

    if @game.save
      ActionCable.server.broadcast 'games',
        type: 'GAME_CREATED',
        payload: @game.data

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
    @games = Game.where({ status: ["seeking", "in progress"] }).where("updated_at >= ?", 1.hour.ago)
    render :index
  end

  def destroy
    # user is attempting to cancel a seek they've posted.
    @game = Game.find(params[:id])

    if @game.update({ status: 'abandoned' })
      ActionCable.server.broadcast 'games',
        type: 'CANCEL_SEEK_SUCCESS',
        payload: @game.data

      render :show
    else
      flash :errors
    end
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

  def set_default_position
    case @game.position
    when 'DEFAULT_POSITION'
      @game.position = ({
          currentPlayer: 'P1',
          actions: 1,
          pieces: default_position
        }).to_json
    end
  end
end
