class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :business
  scope :active, -> {where("time_out = nil")}
end
