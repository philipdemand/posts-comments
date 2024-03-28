class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ update destroy upvote ]
  skip_before_action :authorized, only: :index

  def index
    @posts = Post.order(created_at: :desc)
    render json: @posts
  end

  def create
    @user = User.find(session[:user_id])
    @post = @user.posts.create!(post_params)
    render json: @post, status: :created
  end

  def update
    if session[:user_id] == @post.user_id
      @post.update!(post_params)
      render json: @post
    else
      render json: { error: 'Unauthorized: You do not have permission to update this post.' }, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id] == @post.user_id
      @post.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized: You do not have permission to delete this post.' }, status: :unauthorized
    end
  end

  def upvote
    @post.update(likes: @post.likes + 1)
    render json: { likes: @post.likes }
  end

  private
    
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:post_body)
    end
end
