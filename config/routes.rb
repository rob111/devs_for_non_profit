Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :chats, only: [:index, :show, :create]
      resources :messages, only: [:create]
      resources :developers, only: [:index, :show, :new]
      resources :clients, only: [:index, :show, :new]
      resources :projects, only: [:index, :show, :new, :update]
      resources :collaborations, only: [:new, :create]
    end
  end

  devise_for :developers, :controllers => { :omniauth_callbacks => "callbacks" }
  devise_for :clients

  resources :users, only: [:index, :destroy]
  resources :chats, only: [:index, :show]
  resources :projects

  resources :developers do
    resources :developer_infos, only: [:new, :create, :edit, :update]
  end

  resources :clients do
    resources :projects
    resources :client_infos, only: [:new, :create, :edit, :update]
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
