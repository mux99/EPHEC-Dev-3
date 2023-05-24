class Project < ApplicationRecord
    has_one :user, foreign_key: 'owner'
    has_many :images
    has_many :projects_timelines 
    has_many :timelines, :through => :projects_timelines
    has_many :projects_users 
    has_many :users, :through => :projects_users

    validates :name, presence: true
    validates :owner, presence: true
end
