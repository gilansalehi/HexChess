FactoryGirl.define do
  factory :game do
    status ['seeking', 'in progress'].sample
    association :creator, factory: :user
  end
end
