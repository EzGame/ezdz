class ChangeTagsToManyToManyRelationship < ActiveRecord::Migration
  def change
    remove_column :posts, :tags

    create_table :tags do |t|
      t.string :name, null: false
    end

    create_table :post_tags do |t|
      t.belongs_to :post, index: true
      t.belongs_to :tag, index: true
    end
  end
end
