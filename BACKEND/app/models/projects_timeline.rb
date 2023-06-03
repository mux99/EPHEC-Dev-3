class ProjectsTimeline < ApplicationRecord
    belongs_to :project 
    belongs_to :timeline

    validates :timeline_id, presence: true
    validates :project_id, presence: true
end
