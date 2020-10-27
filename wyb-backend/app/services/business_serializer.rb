class BusinessSerializer

    def initialize(business_object)
        @business = business_object
    end

    def to_serialized_json
        options = {
            include: {
                active_visits: {
                    include: [:user => {except: [:created_at, :updated_at]}],
                    only: [:id, :time_in, :time_out, :employee, :party_size]
                }
            },
            except: [:created_at, :updated_at]
        }
        @business.to_json(options)
    end

end