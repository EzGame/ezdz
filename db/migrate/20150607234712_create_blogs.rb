class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.integer :type,          null: false, default: 0
      t.string :title,          null: false
      t.string :body
      t.string :tags
      t.timestamps              null: false
    end
  end
end
