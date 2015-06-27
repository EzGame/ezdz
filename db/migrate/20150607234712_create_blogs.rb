class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title,          null: false
      t.text :body,             limit: 4294967295
      t.string :tags
      t.timestamps              null: false
    end
  end
end
