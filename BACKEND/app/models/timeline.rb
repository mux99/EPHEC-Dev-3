class Timeline < ApplicationRecord
    has_one :projectstimeline 
    has_one :project, :through => :projectstimelines
end
