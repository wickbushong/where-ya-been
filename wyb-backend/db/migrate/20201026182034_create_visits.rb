class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.datetime :timeIn
      t.datetime :timeOut
      t.boolean :flagged
      t.boolean :employee
      t.integer :partySize
      t.references :user, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: true

      t.timestamps
    end
  end
end
