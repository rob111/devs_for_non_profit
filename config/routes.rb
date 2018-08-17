Rails.application.routes.draw do

  # possibly needed for ActionCable
  # mount ActionCable.server => '/cable'


  namespace :api do
    namespace :v1 do
      resources :chats, only: [:show]
      resources :messages, only: [:create]
      resources :developers, only: [:index, :show, :new]
      resources :clients, only: [:index, :show, :new]
      resources :projects, only: [:index, :show, :new, :update]
      resources :collaborations, only: [:new, :create]
    end
  end

  #instead of to do omniauth for :users I made it for :developers
  devise_for :developers, controllers: { omniauth_callbacks: 'developers/omniauth_callbacks' }
  devise_for :clients
  #omniauth
  # devise_for :users

  resources :users, only: [:index, :destroy]
  resources :messages, only: [:new, :create]
  resources :chats, only: [:index, :show]
  resources :projects
  resources :developers
  resources :clients do
    resources :projects
  end

  namespace :dashboard do
  	authenticated :client do
      resources :projects
  	end

  	authenticated :developer do
      resources :projects
  	end

    root to: "dashboard#index"
  end
  root to: 'homes#index'
end
