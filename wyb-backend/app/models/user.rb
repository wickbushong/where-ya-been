class User < ApplicationRecord
    has_many :visits
    has_many :businesses, through: :visits
end
