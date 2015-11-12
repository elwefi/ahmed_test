class PricingsController < ApplicationController
  
  # Get all pricings of (from_city and products in this page)
  def index
  	pricings = Pricing.by_product_city(params[:city], params[:product_ids].split(',')).to_json
    render json: pricings
  end

end
