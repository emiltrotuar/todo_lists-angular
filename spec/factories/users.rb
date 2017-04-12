FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      Faker::Internet.email.gsub(/@/i, "_#{n}_@")
    end
    password '12345678'
    password_confirmation '12345678'

    factory :user_with_tasks do
      ignore do
        tasks_count 14
      end

      after(:create) do |user, evaluator|
        create_list(:task, evaluator.tasks_count, user: user)
      end
    end
  end
end
