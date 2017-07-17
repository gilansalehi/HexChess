FactoryGirl.define do
  factory :user do
    sequence(:name, 'a') { |n| [*('a'..'z')].sample(8).join('') + n }
    password [*('a'..'z')].sample(8).join('')
  end
end
