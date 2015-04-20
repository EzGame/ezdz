Rails.application.routes.draw do

  # Home/Root
  root 'home#index'
  resources :home, :only => :index

  # Blog/Articles
  resources :blog do
    # hashid
    # index, show
  end

  # Photography Gallery
  resources :studio do
    #hashid
    #index, show
  end

  # Admin, WIP
  namespace :admin do
    # SU privileges
  end

end
