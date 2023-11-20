Rails.application.routes.draw do

  namespace :api do
    resources :posts, only: [:create, :index, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
    post '/posts/:id/comments', to: 'comments#create'
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
