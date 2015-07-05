Rails.application.routes.draw do
  # Home/Root
  root 'home#index'

  scope '/api' do
    resources :blogs, only: [:index, :show] do
      get 'search', on: :collection
      resources :photos, only: :index
    end
    resources :albums, only: [:index, :show] do
      get 'search', on: :collection
      resources :photos, only: :index
    end
    resources :photos, only: [:index, :show]
  end

  # Logged in to do edits
  scope '/admin' do
    resources :blogs
    resources :albums
    resources :photos
  end
end
