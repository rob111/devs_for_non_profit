Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :developers, only: [:index, :show, :new]
      resources :clients, only: [:index, :show, :new]
      resources :projects, only: [:index, :show, :new, :update]
      resources :collaborations, only: [:new, :create]
    end
  end

  devise_for :developers
  devise_for :clients

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
