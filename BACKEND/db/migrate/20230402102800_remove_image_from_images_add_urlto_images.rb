class RemoveImageFromImagesAddUrltoImages < ActiveRecord::Migration[7.0]
  def change
    remove_column :images, :image
    add_column :images, :url, :string
  end
end
