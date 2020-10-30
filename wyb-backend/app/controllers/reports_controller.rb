class ReportsController < ApplicationController
    def create
        report = Report.create(report_params)
        flagged = report.flag_visits
        
        binding.pry

    end

    private

    def report_params
        params.require(:report).permit(:user_id, :test_date)
    end
end
