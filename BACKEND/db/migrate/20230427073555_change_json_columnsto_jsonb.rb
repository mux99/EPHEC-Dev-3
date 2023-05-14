class ChangeJsonColumnstoJsonb < ActiveRecord::Migration[7.0]
  def up
    change_column :timelines, :json, :jsonb
    change_column :projects, :json, :jsonb
  end

  def down 
    change_column :timelines, :json, :jsonb
    change_column :projects, :json, :jsonb
  end
end
