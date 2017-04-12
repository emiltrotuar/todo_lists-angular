require 'spec_helper'

describe CalendarController do

  let(:user) { create(:user_with_tasks) }

  before(:each) do
    sign_in user
  end

  describe 'CRUD' do
    it 'index' do
      time = DateTime.now
      get :index, start_period: time, end_period: time + 2.weeks
      expect( response ).to eq Task.all.to_json
    end

    it 'creates calendar task' do
      post :create, name: 'name', start_at: DateTime.now
      user.tasks.create(name: 'buy milk', start_at: params[:start_at])
    end

    it 'updates calendar task' do
      post :update, name: 'new_name', start_at: DateTime.now+2.days
    end

    it 'deletes calendar task' do
      task = user.tasks.create!(name: 'task')
      expect{
        delete :destroy, id: task
      }.to change(Task,:count).by(-1)
    end
  end
end
