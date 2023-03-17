class AddIndexesToMmTables < ActiveRecord::Migration[7.0]
  def change
    add_index 'projects-users', [:project_id, :user_id], unique: true
    add_index 'projects-timelines', [:project_id, :timeline_id], unique: true
  end
end
