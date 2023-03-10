class ChangedPasswordHandling < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.remove :salt
      t.rename :hash, :password_digest
    end
  end
end
