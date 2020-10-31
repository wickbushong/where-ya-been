class ReportsController < ApplicationController
    def create
        report = Report.create(report_params)
        # flagged = report.flag_visits
        # users = flagged.map do |v|
        #     v.overlap_users
        # end
        render json: ReportSerializer.new(report).to_serialized_json()

    end

    private

    def report_params
        params.require(:report).permit(:user_id, :test_date)
    end
end
