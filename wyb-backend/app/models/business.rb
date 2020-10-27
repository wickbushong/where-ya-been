class Business < ApplicationRecord
    has_many :visits
    has_many :users, through: :visits

    def active_visits 
        self.visits.select do |v|
            v.time_out == nil
        end
    end
end
