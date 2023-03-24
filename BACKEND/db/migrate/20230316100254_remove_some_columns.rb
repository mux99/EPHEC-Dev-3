class RemoveSomeColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :images, :created_at 
    remove_column :timelines, :created_at
    remove_column :projects, :picture
  end
end
