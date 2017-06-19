class AddIndexToGamesUsers < ActiveRecord::Migration[5.1]
  def change
    add_index :game_user, :user_id
    add_index :game_user, :game_id

    # include player so its possible go back and review the game later
    add_index :game_user, [:game_id, :user_id, :player], unique: true
  end
end
