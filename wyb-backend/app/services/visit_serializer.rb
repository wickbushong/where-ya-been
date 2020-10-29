class VisitSerializer

    def initialize(visit_object)
        @visit = visit_object
    end

    def to_serialized_json
        options = {
            include: {:user => {except: [:created_at, :updated_at]}, :business => {except: [:created_at, :updated_at]}},
            only: [:id, :time_in, :time_out, :employee, :party_size, :business_id, :user_id]
        }
        @visit.to_json(options)
    end

end
