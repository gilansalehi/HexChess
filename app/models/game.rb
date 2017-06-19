class Game < ApplicationRecord
  has_and_belongs_to_many :users
  # has_and_belongs_to_many :players, class_name: :users
  # has_and_belongs_to_many :observers, class_name: :users

  def players
    users.where(['player = true'])
  end

  def observers
    users.where(['player = false'])
  end
end
