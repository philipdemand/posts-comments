class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ update destroy ]

  def index
    @posts = Post.order(created_at: :desc)
    render json: @posts
  end

  def create
    @post = Post.create(post_params)
    render json: @post, status: :created
  end

  def update
    @post.update(post_params)
    render json: @post
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private
    
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:post_body)
    end
end
