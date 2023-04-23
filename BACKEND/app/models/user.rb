class User < ApplicationRecord
    has_many :projectsusers
    has_many :projects, :through => :projectsusers
    has_many :tokens
    has_secure_password
end
