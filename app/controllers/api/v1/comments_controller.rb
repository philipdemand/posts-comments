class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ update destroy ]

  def create
    @post = Post.find(params[:id])
    @comment = @post.comments.create(comment_params)
    render json: @comment, status: :created
  end

  def update
    @comment.update(comment_params)
    render json: @comment
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private
    
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:comment_body)
    end
end
