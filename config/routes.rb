Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
  end

  # Heroku only supports one port... will need a different service when upgrading to websockets.
  # mount ActionCable.server => '/cable'

  resources :chatrooms, param: :slug
  resources :messages

  resources :games, only: [:new, :create, :update, :show, :destroy, :index, :cancel]

  get '/logout', controller: :sessions, action: :destroy

  get "*path", to: "static_pages#root"

end
