# == Schema Information
#
# Table name: pricings
#
#  id                      :integer          not null, primary key
#  from_city_id            :integer
#  to_city_id              :integer
#  product_id              :integer
#  saving_in_from_currency :decimal(, )
#  created_at              :datetime
#  updated_at              :datetime
#

class Pricing < ActiveRecord::Base
  belongs_to :from_city, :class_name => 'City'
  belongs_to :to_city, :class_name => 'City'
  belongs_to :product
  
  # SCOPE
  #######
  # Get pricings with max saving and grouping them by (product_id, city_id)
  scope :by_product_city, lambda { |city_id, product_ids| where(:from_city_id => city_id, :product_id => product_ids).group([:product_id, :to_city_id]).maximum(:saving_in_from_currency) }

end
