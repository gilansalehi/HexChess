class AddColumnCreatorToGame < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :creator, :integer, null: false, default: 0

    add_index :games, :creator
  end
end
