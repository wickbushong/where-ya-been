class BusinessesController < ApplicationController
    def show
        business = Business.find_by(id: params[:id])
        render json: business, include: [:visits]
    end
end
