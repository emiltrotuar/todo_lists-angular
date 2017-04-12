FactoryGirl.define do
  factory :task do
    name { Faker::Lorem.word }
    sequence(:start_at) { |n| DateTime.now+n.days }
    priority 1
    user
  end
end
