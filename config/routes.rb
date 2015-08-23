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
    get 'search', to: 'api#search'
    get 'index', to: 'api#index'
    get 'show', to: 'api#show'
  end

  # Admin routes
  scope '/admin' do
    get '/', to: 'posts#index'
    #resources :photos
    resources :blogs, controller: "posts", type: "Blog"
    resources :albums, controller: "posts", type: "Album"
    resources :decks, controller: "posts", type: "Deck"
    resources :narratives, controller: "posts", type: "Narrative"
  end
end
