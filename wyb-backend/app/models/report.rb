class Report < ApplicationRecord
    belongs_to :user

    def flag_visits
        test_date = self.test_date.to_date
        to_flag = self.user.visits.select do |v|
            visit_date = v.time_in.to_date
            (visit_date - test_date) <= 14 || (test_date - visit_date) <= 14
        end
        to_flag.each do |v|
            v.flagged = true
            v.save
        end
        return to_flag
    end

    def users_to_notify
        flagged = self.flag_visits
        flagged.map do |v|
            v.overlap_users
        end.flatten.uniq
    end

end
