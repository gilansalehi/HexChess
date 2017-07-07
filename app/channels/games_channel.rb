class GamesChannel < ApplicationCable::Channel

  def subscribed
    stream_from 'games'
  end

  # def unsubscribed
  #   # Remove seeks for games that haven't started yet
  #   # Forfeit any active games
  # end

  def speak(data)
    @game = Game.find_by(params[:id])
    @game.update(game_params)
  end

  private

  def game_params
    params.require(:game).permit(
      :position,
      :status,
      :winner,
      :p1_id,
      :p2_id,
    )
  end
end
