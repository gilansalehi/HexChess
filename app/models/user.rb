class User < ApplicationRecord

  attr_reader :password

  validates :name, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :name, :session_token, uniqueness: true

  after_initialize :ensure_session_token

  has_many :messages
  has_and_belongs_to_many :chatrooms

  def self.find_by_credentials(name, password)
    user = User.find_by(name: name)
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
