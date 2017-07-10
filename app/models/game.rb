class Game < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :creator, class_name: 'User'
  # has_and_belongs_to_many :players, class_name: :users
  # has_and_belongs_to_many :observers, class_name: :users

  validates :creator_id, presence: true

  def challenger
    User.find_by_id(p2_id)
  end

  def players
    users.where(['player = true'])
  end

  def observers
    users.where(['player = false'])
  end

  def creator=(user)
    # Raise "You cannot change that" if self.creator
    super unless self.creator
  end

  def p1_id=(user_id)
    # can't change id of user once game has begun
    super unless self.p1_id
  end

  def p2_id=(user_id)
    # can't change id of user once game has begun
    super unless self.p2_id
  end

  def winner=(user)
    super unless self.winner
  end

  def status=(string)
    super unless self.status == "finished"
  end

end
