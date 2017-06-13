class RenameChannelToChatroom < ActiveRecord::Migration[5.1]
  def change
    rename_table :channels, :chatroom
    rename_table :channel_user, :chatroom_user
    remove_column :chatroom_user, :channel_id
    add_column :chatroom_user, :chatroom_id, :integer
  end
end
