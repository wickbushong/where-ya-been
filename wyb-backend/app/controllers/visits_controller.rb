class VisitsController < ApplicationController
    
    def create
        user = User.find_or_create_by(user_params)
        business = Business.find_by(id: business_params[:id])
        visit = Visit.new(
            user: user,
            business: business,
            time_in: Time.now
        )
        if visit.save
            render json: VisitSerializer.new(visit).to_serialized_json
        end
    end
    
    def update
        visit = Visit.find_by(id: visit_params[:id])
        visit.time_out = Time.now
        if visit.save
            render json: visit.to_json()
        end
    end

    private

    def visit_params
        params.require(:visit).permit(:id, :time_out)
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :phone)
    end

    def business_params
        params.require(:business).permit(:id)
    end

end
