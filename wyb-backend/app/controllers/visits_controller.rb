class VisitsController < ApplicationController
    
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

end
