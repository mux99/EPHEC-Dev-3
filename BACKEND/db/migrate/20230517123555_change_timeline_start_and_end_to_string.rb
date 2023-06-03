class ChangeTimelineStartAndEndToString < ActiveRecord::Migration[7.0]
  def change
    change_column :timelines, :start, :string
    change_column :timelines, :end, :string
  end
end
