# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_08_221208) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "client_infos", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "company_size"
    t.text "description"
    t.string "rep_position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_infos_on_client_id"
  end

  create_table "collaborations", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "developer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["developer_id"], name: "index_collaborations_on_developer_id"
    t.index ["project_id"], name: "index_collaborations_on_project_id"
  end

  create_table "developer_infos", force: :cascade do |t|
    t.bigint "developer_id", null: false
    t.string "years_of_experience", null: false
    t.string "preferred_technologies"
    t.string "base_hourly_rate", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["developer_id"], name: "index_developer_infos_on_developer_id"
  end

  create_table "projects", force: :cascade do |t|
    t.text "description", null: false
    t.string "status", default: "null"
    t.date "deadline"
    t.text "price"
    t.bigint "client_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_projects_on_client_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.string "username", null: false
    t.string "full_name", null: false
    t.string "company"
    t.boolean "isadmin", default: false
    t.string "profile_photo"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
