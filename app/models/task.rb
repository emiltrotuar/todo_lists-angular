class Task
  include Mongoid::Document

  field :name,     type: String
  field :details,  type: String, default: ''
  field :priority, type: Integer
  field :done,     type: Boolean, default: false
  field :start_at, type: DateTime
  field :created_at, type: DateTime, default: ->{ DateTime.now }

  validates :name, presence: true
  validates :start_at, presence: true
  validates_numericality_of :priority, less_than: 3

  belongs_to :user
end
