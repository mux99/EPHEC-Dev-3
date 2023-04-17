class ChangeProjectsTimelinesToProjectsTimelines < ActiveRecord::Migration[7.0]
  def change
    rename_table "projects-timelines".to_sym, :projects_timelines
    rename_table "projects-users".to_sym, :projects_users
  end
end
