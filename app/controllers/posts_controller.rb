class PostsController < ApplicationController

    def create
        post = Post.new(post_params)
        if post.save
            render json: post, status: :created
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        posts = Post.order(created_at: :desc)
        render json: posts
    end

    def update
        post = Post.find(params[:id])
        if post.update(post_params)
            render json: post
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
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
