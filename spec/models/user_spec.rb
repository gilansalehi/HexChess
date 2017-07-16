require 'rspec'
require 'rails_helper'

describe User do
  describe "usernames" do
    it "is unique" do
      a = User.create({ name: 'tim', password: 'timtim' });
      b = User.create({ name: 'tim', password: 'timtim2' });

      a.save!

      expect(b.save!).to throw_error
    end
  end
end
