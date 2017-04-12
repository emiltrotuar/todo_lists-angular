require 'spec_helper'

=begin (description)
  create user
         tasks
    create task
      set name
          date
          priority (0..5)
  sign_in user
  test
    respond_to
      name
      date
      priority
    create
    update
    delete
    notifications
      validation
      expiration date

  clean test db
=end

describe 'load' do
  let(:user) { create(:user_with_tasks) }

  it 'loads test data to test db' do
    expect( user.class.count ).to eq 1
    expect( Task.count ).to eql 14
  end
end
