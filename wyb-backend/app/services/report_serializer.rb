class ReportSerializer

    def initialize(report_object)
        @report = report_object
    end

    def to_serialized_json
        options = {
            :include => [:users_to_notify, :flag_visits => {:include => [:overlap_visits]}],
            except: [:created_at, :updated_at]
        }
        @report.to_json(options)
    end

end