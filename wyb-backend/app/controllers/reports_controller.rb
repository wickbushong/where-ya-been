class ReportsController < ApplicationController
    def create
        binding.pry
        
    end

    private

    def report_params
        params.require(:report).permit(:user_id, :test_date)
    end
end
