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

ActiveRecord::Schema[7.0].define(version: 2023_04_22_081656) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.boolean "cover", default: false
    t.string "url"
  end

  create_table "projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.json "json", default: "{}"
    t.uuid "owner"
    t.datetime "created_at", null: false
    t.boolean "visibility"
  end

  create_table "projects_timelines", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.uuid "timeline_id"
    t.index ["project_id", "timeline_id"], name: "index_projects_timelines_on_project_id_and_timeline_id", unique: true
  end

  create_table "projects_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "perms"
    t.uuid "project_id"
    t.uuid "user_id"
    t.index ["project_id", "user_id"], name: "index_projects_users_on_project_id_and_user_id", unique: true
  end

  create_table "timelines", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.json "json", default: "{}"
    t.integer "start"
    t.integer "end"
  end

  create_table "tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token"
    t.uuid "user_id"
    t.integer "ttl", default: 60
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "tag"
    t.boolean "premium", default: false
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", null: false
  end

  add_foreign_key "images", "projects"
  add_foreign_key "projects", "users", column: "owner"
  add_foreign_key "projects_timelines", "projects"
  add_foreign_key "projects_timelines", "timelines"
  add_foreign_key "projects_users", "projects"
  add_foreign_key "projects_users", "users"
end
