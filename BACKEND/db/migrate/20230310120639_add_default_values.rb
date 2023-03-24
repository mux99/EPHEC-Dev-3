class AddDefaultValues < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :premium, :boolean, :default => false
  end
end
