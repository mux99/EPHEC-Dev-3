class ChangeJsonDefaultValues < ActiveRecord::Migration[7.0]
  def change
    change_column :timelines, :json, :json, :default => "{}"
    change_column :projects, :json, :json, :default => "{}"
  end
end
