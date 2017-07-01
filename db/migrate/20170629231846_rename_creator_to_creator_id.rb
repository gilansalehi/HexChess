class RenameCreatorToCreatorId < ActiveRecord::Migration[5.1]
  def change
    rename_column :games, :creator, :creator_id
  end
end
