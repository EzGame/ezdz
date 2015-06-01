source 'https://rubygems.org'

### Back End Gems ###
gem 'hashids',  '1.0.2'     # Hashids is for bidirectional hashing
gem 'jbuilder', '2.0'       # https://github.com/rails/jbuilder
gem 'sqlite3',  '1.3.10'    # Use sqlite3 as the database for Active Record

### Middleware Gems ###
gem 'rails', '4.2.0'        # Bundle edge Rails instead
gem 'turbolinks'            # Turbolinks makes links in web app faster
gem 'httparty', '0.13.3'    # httparty for sending RESTful API requests

### Front-End Gems ###
gem 'sass-rails'            # Use SCSS for stylesheets
gem 'jquery-rails'          # Use jquery as the JavaScript library
gem 'velocityjs-rails'      # Use velocity js as animation library
gem 'uglifier', '2.7.1'     # Uglifier for production assets

group :development, :test do
  gem 'better_errors'       # Way better exception screen for debugging
  gem 'spring'              # Spring speeds up development
  gem 'rspec'               # Specs
end

group :production do
  gem 'capistrano', '~> 2.12.0'
  gem 'unicorn', '~> 4.1.0'
end