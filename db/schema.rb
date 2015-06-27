# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150608025427) do

  create_table "albums", force: :cascade do |t|
    t.string   "title",      limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "blogs", force: :cascade do |t|
    t.string   "title",      limit: 255,        null: false
    t.text     "body",       limit: 4294967295
    t.string   "tags",       limit: 255
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "photos", force: :cascade do |t|
    t.string   "url",          limit: 255, null: false
    t.string   "caption",      limit: 255
    t.integer  "exhibit_id",   limit: 4
    t.string   "exhibit_type", limit: 255
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "photos", ["exhibit_type", "exhibit_id"], name: "index_photos_on_exhibit_type_and_exhibit_id", using: :btree

end
