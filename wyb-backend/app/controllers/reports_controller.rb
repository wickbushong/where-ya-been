class ReportsController < ApplicationController
    def create
        binding.pry
        report = Report.create(report_params)
        report.flag_visits
    end

    private

    def report_params
        params.require(:report).permit(:user_id, :test_date)
    end
end
