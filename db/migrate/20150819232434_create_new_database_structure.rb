class CreateNewDatabaseStructure < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.column :title, :string,         null: false
      t.column :type, :integer,         null: false, default: 0
      t.column :tags, :string
      t.column :meta, :text,            limit: 4294967295
      t.timestamps                      null: false
    end
  end
end
