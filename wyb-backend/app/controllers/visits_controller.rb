class VisitsController < ApplicationController
    
    def create
        binding.pry
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
