require 'rails_helper'
require 'factory_girl'

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

    it "recognizes the password" do
      a = User.create({ name: 'aladdin', password: 'open_sesame' })

      a.save
      # password is an attr reader while the model is stored in memory, but not saved to db
      expect(a.password).to eq('open_sesame')
      expect(User.first.password).to be(nil)
      expect(a.is_password?('open_sesame')).to be(true)
      expect(a.is_password?('password')).to be(false)
    end
  end

  describe "session_token" do
    let(:claire) { build(:user) }
    let(:ariel) { build(:user) }

    it "is created on save or update" do
      expect(claire.valid?).to be(true)

      claire.save!
      expect(claire.session_token).not_to be(nil)
      expect(claire.session_token).to be_a(String)
    end

    it "is unique" do
      expect(ariel.session_token).not_to be(nil)

      claire.session_token = 'copy'
      ariel.session_token = 'copy'

      claire.save
      expect { ariel.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "resets to a new value" do
      x = ariel.session_token
      ariel.reset_session_token!

      expect(ariel.session_token).not_to eq(x)
    end
  end

  describe "self#find_by_credentials" do
    it "returns early if there is no user by that name" do
      expect(User.find_by_credentials('nemo', nil)).to eq(nil)
    end

    it "checks password if user exists" do
      b = User.create!({ name: 'batman', password: 'marthalol' })

      expect(
        User.find_by_credentials('batman', 'marthalol')
      ).not_to eq(nil)

      expect(
        User.find_by_credentials('batman', 'gotham')
      ).to eq(nil)
    end
  end
end
