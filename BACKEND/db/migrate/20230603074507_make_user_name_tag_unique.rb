class MakeUserNameTagUnique < ActiveRecord::Migration[7.0]
  def change
    add_index :users, [:name, :tag], unique: true
  end
end
