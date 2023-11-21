class CommentsController < ApplicationController

    def create
        post = Post.find(params[:id])
        comment = post.comments.new(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
            render json: comment
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        head :no_content
    end

    private

    def comment_params
        params.require(:comment).permit(:comment_body)
    end

end
