class Timeline < ApplicationRecord
    has_one :projects_timeline
    has_one :project, :through => :projects_timeline

    validates :name, presence: true
end
