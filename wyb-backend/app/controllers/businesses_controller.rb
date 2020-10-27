class BusinessesController < ApplicationController
    def show
        business = Business.find_by(id: params[:id])
        render json: business, include: [:active_visits]
    end
end
