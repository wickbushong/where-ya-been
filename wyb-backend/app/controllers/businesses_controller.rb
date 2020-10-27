class BusinessesController < ApplicationController
    def show
        business = Business.find_by(id: params[:id])
        render json: BusinessSerializer.new(business).to_serialized_json
    end
end
