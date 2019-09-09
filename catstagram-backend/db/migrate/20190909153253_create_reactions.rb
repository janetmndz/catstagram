class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.belongs_to :cat, foreign_key: true
      t.belongs_to :location, foreign_key: true
      t.string :emoji

      t.timestamps
    end
  end
end
