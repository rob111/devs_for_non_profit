Rails.application.routes.draw do

  namespace :dashboard do
    namespace :developer do
      resources :projects, only: [:index, :show, :new]
    end
  end

  devise_for :developers
  devise_for :clients

  namespace :dashboard do
  	authenticated :client do
      resources :projects, module: "client", :only => [:show, :index]
  	end

  	authenticated :developer do
      resources :projects, module: "developer"
  	end

    root to: "dashboard#index"
  end



  get 'homes/index'
  root to: 'homes#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
