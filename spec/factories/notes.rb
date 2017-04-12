FactoryGirl.define do
  factory :note do
    content { Faker::Lorem.word }
    user
  end
end
