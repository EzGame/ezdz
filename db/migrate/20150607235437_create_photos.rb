class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :url,            null: false
      t.string :caption
      t.references :exhibit,    polymorphic: true, index: true, null: true
      t.timestamps              null: false
    end
  end
end
