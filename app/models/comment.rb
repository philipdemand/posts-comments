class Comment < ApplicationRecord
    belongs_to :post
    validates :comment_body presence: true
end
