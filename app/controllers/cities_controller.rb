class CitiesController < ApplicationController
  
  # All cities
  def index
  	cities = City.all.to_json
  	render json: cities
  end

end
