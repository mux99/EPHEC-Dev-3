class AddVisibilityToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :visibility, :boolean
  end
end
