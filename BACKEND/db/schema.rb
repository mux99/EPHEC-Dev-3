# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_06_171430) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.binary "image"
    t.datetime "created_at", null: false
  end

  create_table "projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.json "json"
    t.string "picture"
    t.uuid "owner"
    t.datetime "created_at", null: false
  end

  create_table "projects-timelines", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.uuid "timeline_id"
  end

  create_table "projects-users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "perms"
    t.uuid "project_id"
    t.uuid "user_id"
  end

  create_table "timelines", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.json "json"
    t.integer "start"
    t.integer "end"
    t.datetime "created_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.integer "tag"
    t.boolean "premium"
    t.string "hash"
    t.integer "salt"
    t.string "email"
    t.datetime "created_at", null: false
  end

  add_foreign_key "images", "projects"
  add_foreign_key "projects", "users", column: "owner"
  add_foreign_key "projects-timelines", "projects"
  add_foreign_key "projects-timelines", "timelines"
  add_foreign_key "projects-users", "projects"
  add_foreign_key "projects-users", "users"
end
