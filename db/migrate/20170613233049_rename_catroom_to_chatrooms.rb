class RenameCatroomToChatrooms < ActiveRecord::Migration[5.1]
  def change
    rename_table :chatroom, :chatrooms
  end
end
