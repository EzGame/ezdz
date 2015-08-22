class CreateNewDatabaseStructure < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.column :hashid, :string,        null: false, unique: true
      t.column :title, :string,         null: false
      t.column :type, :string,          null: false
      t.column :tags, :string
      t.column :meta, :text,            limit: 4294967295
      t.timestamps                      null: false
    end

    add_index :posts, :hashid
  end
end
