class User < ApplicationRecord
    has_many :projectsusers
    has_many :projects, :through => :projectsusers
end
