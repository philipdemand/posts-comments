class Post < ApplicationRecord
    has_many :comments
    validates :post_body presence: true
end
