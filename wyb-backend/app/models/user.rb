class User < ApplicationRecord
    has_many :visits
    has_many :businesses, through: :visits
    has_many :reports

    # validates :phone, presence: true, uniqueness: true
    # validates :email, presence: true, uniqueness: true
end
