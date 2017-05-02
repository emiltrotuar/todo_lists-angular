# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.find_or_create_by!(email: 'user@mail.com') do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end


time = DateTime.now

14.times do |n|
  t = user.tasks.build
  t.name = "task_#{n}"
  t.start_at = time
  t.priority = 1
  t.save
  time += 1.day
end
