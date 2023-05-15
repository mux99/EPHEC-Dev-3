class Timeline < ApplicationRecord
    has_one :projects_timeline
    has_one :project, :through => :projects_timeline

    validates :name, presence: true
    validates :start, presence: true
    validates :end, presence: true
    validates :end, comparison: {greater_than_or_equal_to: :start}
    validates :start, comparison: {less_than_or_equal_to: :end}
end
