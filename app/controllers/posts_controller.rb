class PostsController < ApplicationController

    def create
        post = Post.create(post_params)
        render json: post, status: :created
    end

    def index
        posts = Post.all
        render json: posts
    end

    def update
        post = Post.find(params[:id])
        post.update(post_params)
        render json: post
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.require(:post).permit(:post_body)
    end

end
