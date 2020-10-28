class BusinessesController < ApplicationController
    def show
        business = Business.find_by(id: params[:id])
        render json: BusinessSerializer.new(business).to_serialized_json
    end

    def index
        businesses = Business.all
        render json: businesses, only: [:name, :id, :location]
    end
end
