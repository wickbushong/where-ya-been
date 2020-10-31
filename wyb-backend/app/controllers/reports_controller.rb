class ReportsController < ApplicationController
    def create
        report = Report.create(report_params)
        render json: ReportSerializer.new(report).to_serialized_json()

    end

    private

    def report_params
        params.require(:report).permit(:user_id, :test_date)
    end
end
