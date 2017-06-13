class CreateChannelUserJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :channel, :user do |t|
      t.integer :user_id
      t.integer :channel_id
    end
  end
end
