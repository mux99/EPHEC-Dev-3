class AddJsonToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :json, :jsonb, :default => '{}'
  end
end
