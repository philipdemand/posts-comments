class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_body, :likes
  belongs_to :user
  has_many :comments

  def comments
    object.comments.order(created_at: :desc)
  end

end
