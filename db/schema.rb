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

ActiveRecord::Schema.define(version: 20150827203847) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "photos", force: :cascade do |t|
    t.string   "url",          null: false
    t.string   "caption"
    t.string   "exhibit_type"
    t.integer  "exhibit_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "imgur_hash",   null: false
    t.string   "imgur_delete", null: false
    t.index ["exhibit_type", "exhibit_id"], name: "index_photos_on_exhibit_type_and_exhibit_id", using: :btree
  end

  create_table "post_tags", force: :cascade do |t|
    t.integer "post_id"
    t.integer "tag_id"
    t.index ["post_id"], name: "index_post_tags_on_post_id", using: :btree
    t.index ["tag_id"], name: "index_post_tags_on_tag_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.string   "hashid",     null: false
    t.string   "title",      null: false
    t.string   "type",       null: false
    t.text     "meta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hashid"], name: "index_posts_on_hashid", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
  end

end
