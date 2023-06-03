class User < ApplicationRecord
    has_many :projectsusers
    has_many :projects, :through => :projectsusers
    has_many :tokens
    has_secure_password

    #validates :name, presence: true
    #validates :tag, presence: true
    #validates :email, presence: true
    #validates :password, presence: true
    #validates :tag, format: {with: /[0-9]{4}/, message: 'must be a 4 numbers string'}
end
