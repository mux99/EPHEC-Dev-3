class User < ApplicationRecord
    has_many :projects_users
    has_many :projects, :through => :projects_users
    has_secure_password
end
