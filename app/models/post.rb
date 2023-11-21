class Post < ApplicationRecord
    has_many :comments, dependent: :destroy
    validates :post_body, presence: true
end
