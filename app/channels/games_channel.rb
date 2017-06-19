class MessagesChannel < ApplicationCable::Channel

  def subscribed
    stream_from 'games'
  end

  def unsubscribed
    # Remove seeks for games that haven't started yet
    # Forfeit any active games
  end
end
