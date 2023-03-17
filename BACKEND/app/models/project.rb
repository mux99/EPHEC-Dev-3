class Project < ApplicationRecord
    has_one :user, foreign_key: 'owner'
    has_many :images
    has_many :projectstimelines 
    has_many :timelines, :through => :projectstimelines
    has_many :projectsusers 
    has_many :users, :through => :projectsusers
end
