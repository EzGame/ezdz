class AddHashAndDeleteUrlToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :imgur_hash, :string, null: false
    add_column :photos, :imgur_delete, :string, null: false
  end
end
