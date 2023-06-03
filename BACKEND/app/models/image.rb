class Image < ApplicationRecord
    belongs_to :project

    # validates :url, presence: true
    # validates :project_id, presence: true
end
