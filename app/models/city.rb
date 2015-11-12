# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class City < ActiveRecord::Base
  #SCOPE
  ######
  scope :wihout_from_city, lambda { |city_id| where.not(:id => city_id)}
end