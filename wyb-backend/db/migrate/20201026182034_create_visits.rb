class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.references :user, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: true
      t.datetime :time_in
      t.datetime :time_out
      t.boolean :flagged, default: false
      t.boolean :employee, default: false
      t.integer :party_size
      

      t.timestamps
    end
  end
end
