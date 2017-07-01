class BuildJoinTableGamesUsers < ActiveRecord::Migration[5.1]
  def change
    create_join_table :games, :users do |t|
      t.integer :user_id
      t.integer :game_id
      t.boolean :player  # false if user is observing the game

      t.timestamps
    end

    add_index :games_users, :user_id
    add_index :games_users, :game_id

    # include player so its possible go back and review the game later
    add_index :games_users, [:game_id, :user_id, :player], unique: true
  end
end
