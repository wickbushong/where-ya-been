class CreateBusinesses < ActiveRecord::Migration[6.0]
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :phone
      t.string :email
      t.string :location

      t.timestamps
    end
  end
end
