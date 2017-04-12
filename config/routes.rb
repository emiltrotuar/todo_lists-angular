TodoLists::Application.routes.draw do
  devise_for :users, skip: :registrations, controllers: {
    sessions: 'users/sessions',
  }
  get '/users/me', to: 'users#me'

  resources :notes, only: [:index, :create, :destroy]
  resources :tasks, except: [:new, :show, :edit]

  root to: 'application#index'
end
