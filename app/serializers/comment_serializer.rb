class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_body, :created_at, :user_username, :likes, :post_id

  def user_username
    object.user.username
  end
end
