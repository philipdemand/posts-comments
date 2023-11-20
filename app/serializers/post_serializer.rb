class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_body
  has_many :comments
end
