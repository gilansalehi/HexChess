require 'rails_helper'

describe User do
  describe "username" do
    it "is present" do
      a = User.create({ password: 'hihihi' })
      b = build(:user)

      expect(b.valid?).to be(true)
      expect(a.valid?).to be(false)
    end

    it "is unique" do
      a = User.create({ name: 'tim', password: 'timtim' });
      b = User.create({ name: 'tim', password: 'timtim2' });

      a.save!

      expect(b.valid?).to be(false)
    end
  end

  describe "password" do
    it "is at least 6 letters long" do
      a = User.create({ name: 'sam', password: 'samsam' })
      b = User.create({ name: 'sam2', password: 'sammy' })

      expect(a.valid?).to be(true)
      expect(b.valid?).to be(false)
    end

    it "allows nil (for resetting password)" do
      a = User.create({ name: 'tommy', password: nil })

      expect(a.valid?).to be(true)
    end
  end

  describe "session_token" do
    it "is created on save or update" do
      a = User.create({ name: 'claire', password: 'claireclaire' })
      expect(a.valid?).to be(true)

      a.save!
      expect(a.session_token).not_to be(nil)
      expect(a.session_token).to be_a(String)
    end
  end
end
