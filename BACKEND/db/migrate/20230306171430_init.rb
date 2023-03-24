class Init < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto'

    create_table :users, id: :uuid do |t|
      t.string :name
      t.integer :tag
      t.boolean :premium
      t.string :hash 
      t.integer :salt
      t.string :email

      t.datetime :created_at, null: false
    end
    
    create_table :projects, id: :uuid do |t|
      t.string :name
      t.text :description
      t.json :json
      t.string :picture 
      t.uuid :owner

      t.datetime :created_at, null: false
    end
    add_foreign_key :projects, :users, column: :owner
    
    create_table :timelines, id: :uuid do |t|
      t.string :name
      t.text :description 
      t.json :json 
      t.integer :start 
      t.integer :end

      t.datetime :created_at, null: false
    end
    
    create_table 'projects-users'.to_sym, id: :uuid do |t|
      t.string :perms 
      t.uuid :project_id
      t.uuid :user_id
    end
    add_foreign_key 'projects-users', :projects
    add_foreign_key 'projects-users', :users 

    create_table 'projects-timelines'.to_sym, id: :uuid do |t|
      t.uuid :project_id
      t.uuid :timeline_id
    end
    add_foreign_key 'projects-timelines', :projects
    add_foreign_key 'projects-timelines', :timelines
    
    create_table :images, id: :uuid do |t|
      t.uuid :project_id
      t.binary :image

      t.datetime :created_at, null: false
    end
    add_foreign_key :images, :projects
  end
end
