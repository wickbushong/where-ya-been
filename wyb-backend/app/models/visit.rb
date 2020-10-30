class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :business

  def overlap_visits
    flagged_in = self.time_in
    flagged_out = self.time_out
    self.business.visits.select do |v|
      check_in = v.time_in
      check_out = v.time_out
      !(check_out < flagged_in) || !(check_in > flagged_out)
    end
  end
end
