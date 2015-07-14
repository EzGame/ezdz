Rails.application.routes.draw do
  # High level entry routes
  root to: 'home#home'
  scope module: 'home' do
    get 'home'
    get 'blogs'
    get 'albums'
    get 'photos'
  end

  # API routes for json data
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
