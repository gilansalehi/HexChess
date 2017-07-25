class Game < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :creator, class_name: 'User'
  # has_and_belongs_to_many :players, class_name: :users
  # has_and_belongs_to_many :observers, class_name: :users

  validates :creator_id, presence: true
  validate :updateable

  def challenger
    User.find_by_id(p2_id)
  end

  def challenger=(user)
    self.p2_id = user.id
  end

  def creator=(user)
    # Raise "You cannot change that" if self.creator
    # self.creator_id = user.id
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
    raise ArgumentError if self.status == 'abandoned'
    super unless self.status == 'finished'
  end

  def data
    return {
      id:         self.id,
      creator:    self.creator.try(:name),
      challenger: self.challenger.try(:name),
      status:     self.status,
      winner:     self.winner,
      position:   self.position,
      created_at: self.created_at,
      p1_id:      self.p1_id,
      p2_id:      self.p2_id
    }
  end

  def updateable
    status != 'abandoned' && status != 'finished'
  end
end
