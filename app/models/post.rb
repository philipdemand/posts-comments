class Post < ApplicationRecord
    has_many :comments, -> { order(created_at: :desc) }, dependent: :destroy
    validates :post_body, presence: true
end
