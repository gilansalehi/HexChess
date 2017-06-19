class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :p1_id
      t.integer :p2_id
      t.text    :position
      t.string  :status
      t.string  :winner

      t.timestamps
    end

    add_index :games, :p1_id
    add_index :games, :p2_id
  end
end
