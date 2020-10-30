class Report < ApplicationRecord
    belongs_to :user

    def flag_visits
        self.user.visits.select do |v|
            # all visits within 14 days of self.test_date
        end
    end
end
