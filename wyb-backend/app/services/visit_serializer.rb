class VisitSerializer

    def initialize(visit_object)
        @visit = visit_object
    end

    def to_serialized_json
        options = {
            include: [:user => {except: [:created_at, :updated_at]}],
            except: [:created_at, :updated_at]
        }
        @visit.to_json(options)
    end

end