Rails.application.routes.draw do
  # High level entry routes
  root to: 'home#welcome', constraints: { subdomain: /.+/ }
  get '/p/:hashid', to: 'home#show', constraints: { subdomain: /.+/ }
  get '/about', to: 'home#about', constraints: { subdomain: /.+/ }

  # API routes for json data
  scope '/api' do
    get 'search', to: 'api#search'
    get 'index', to: 'api#index'
    get 'show', to: 'api#show'
  end

  # Admin routes
  scope '/admin' do
    get '/', to: 'posts#index'
    resources :photos
    resources :blogs, controller: "posts", type: "Blog", except: :index
    resources :photography, controller: "posts", type: "Photography", except: :index
    resources :gaming, controller: "posts", type: "Gaming", except: :index
    resources :writing, controller: "posts", type: "Writing", except: :index
  end
end
