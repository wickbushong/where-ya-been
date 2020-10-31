class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :business

  def overlap_visits
    flagged_in = self.time_in
    flagged_out = self.time_out || Time.now
    self.business.visits.select do |v|
      check_in = v.time_in
      check_out = v.time_out || Time.now
      !(check_out < flagged_in) && !(check_in > flagged_out) && v != self
    end
  end

  def overlap_users
    users = self.overlap_visits.map do |v|
      v.user
    end
    users.uniq
  end
end
