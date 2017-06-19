class CreateJoinTableGamesPlayers < ActiveRecord::Migration[5.1]
  create_join_table :game, :user do |t|
    t.integer :user_id
    t.integer :game_id
    t.boolean :player  # false if user is observing the game

    t.timestamps
  end
end
