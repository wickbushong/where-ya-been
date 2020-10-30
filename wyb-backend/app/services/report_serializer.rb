class ReportSerializer

    def initialize(report_object)
        @report = report_object
    end

    def to_serialized_json
        options = {
            include: {
                user: {
                    include: [:flagged_visits => {include:[:overlap_visits], except: [:created_at, :updated_at]}]
                }
            },
            except: [:created_at, :updated_at]
        }
        @report.to_json(options)
    end

end