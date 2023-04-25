class CreateTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :tokens, id: :uuid do |t|
      t.string :token 
      t.uuid :user_id 

      t.integer :ttl, default: 60
    end
  end
end
