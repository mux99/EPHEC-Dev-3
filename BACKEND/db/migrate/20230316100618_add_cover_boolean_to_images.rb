class AddCoverBooleanToImages < ActiveRecord::Migration[7.0]
  def change
    add_column :images, :cover, :boolean, :default => false
  end
end
