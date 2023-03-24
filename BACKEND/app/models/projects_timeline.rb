class ProjectsTimeline < ApplicationRecord
    belongs_to :project 
    belongs_to :timeline
end
