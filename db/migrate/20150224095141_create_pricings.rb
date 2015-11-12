class CreatePricings < ActiveRecord::Migration
  def change
    create_table :pricings do |t|
      t.references :from_city, index: true
      t.references :to_city, index: true
      t.references :product, index: true
      t.decimal :saving_in_from_currency

      t.timestamps
    end
  end
end
