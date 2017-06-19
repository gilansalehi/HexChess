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

ActiveRecord::Schema.define(version: 20170619203403) do

  create_table "chatroom_user", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "chatroom_id"
    t.index ["user_id"], name: "index_chatroom_user_on_user_id"
  end

  create_table "chatrooms", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_user", id: false, force: :cascade do |t|
    t.integer "game_id"
    t.integer "user_id"
    t.boolean "player"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id", "user_id", "player"], name: "index_game_user_on_game_id_and_user_id_and_player", unique: true
    t.index ["game_id"], name: "index_game_user_on_game_id"
    t.index ["user_id"], name: "index_game_user_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "p1_id"
    t.integer "p2_id"
    t.text "position"
    t.string "status"
    t.string "winner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["p1_id"], name: "index_games_on_p1_id"
    t.index ["p2_id"], name: "index_games_on_p2_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "text", null: false
    t.integer "user_id", null: false
    t.integer "chatroom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
