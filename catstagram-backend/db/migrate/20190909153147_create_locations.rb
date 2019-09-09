class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :description
      t.string :picture
      t.belongs_to :cat, foreign_key: true

      t.timestamps
    end
  end
end
