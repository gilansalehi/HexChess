class AddIndicesToChannelUserJoinTable < ActiveRecord::Migration[5.1]
  def change
    add_index :channel_user, :user_id
    add_index :channel_user, :channel_id
  end
end
