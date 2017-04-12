class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :done, :user, :start_at

  def id
    object.id.to_s
  end

  def user
    object.user_id.to_s
  end

  def start_at
    object.start_at.to_s
  end
end
