class ProductsController < ApplicationController
  
  # Product that have saving
  def index    
    products = Product.includes(:pricings).where(pricings: { :from_city_id => params[:city] }).paginate(:page => params[:page], :per_page => 10).to_json	
    render json: products
  end
  
  # Number tot of Page
  def page_number
    page_count = Product.includes(:pricings).where(pricings: { :from_city_id => params[:city] }).count / 10
    render json: page_count 
  end

end
