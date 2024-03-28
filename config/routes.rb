Rails.application.routes.draw do
  resources :users
  namespace :api do
    namespace :v1 do

      post "posts/:id/comments", to: "comments#create"
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      post '/signup', to: 'users#create'
      get "/me", to: "users#show"
      post '/posts/:id/upvote', to: 'posts#upvote'
      post '/comments/:id/upvote', to: 'comments#upvote'

      resources :comments, only: [:update, :destroy]
      resources :posts, only: [:index, :create, :update, :destroy]

    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
