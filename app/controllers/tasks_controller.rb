class TasksController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def index
    from = params[:from] || DateTime.now.beginning_of_week
    to = params[:to] || DateTime.now.end_of_week+2.weeks
    raise if to < from
    tasks = current_user.tasks.where(:start_at => from..to)
    respond_with tasks, root: nil
  end

  def create
    start_at = DateTime.parse(params[:task][:start_at])
    priority = params[:task][:priority].to_i
    task = current_user.tasks.create!(name: params[:task][:name],
                                      priority: priority,
                                      start_at: start_at)
    respond_with task, location: nil
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes!(name: params[:task][:name],
                            done: params[:task][:done])
    head :no_content
  end

  def destroy
    task = Task.find(params[:id])
    head :ok if task.delete
  end
end
