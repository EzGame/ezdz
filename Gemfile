source 'https://rubygems.org'
ruby '2.2.2'

### Back End Gems ###
gem 'hashids',  '1.0.2'     # Hashids is for bidirectional hashing
gem 'jbuilder', '2.0'       # https://github.com/rails/jbuilder
gem 'imgurapi'              # Imgur as image host
gem 'mini_magick', '4.2.9'  # Some magick imaging
gem 'rspotify'              # Spotify API gem
gem 'rack', '~> 2.0'

### Middleware Gems ###
gem 'rails', '5.0.0'        # Bundle edge Rails instead
gem 'turbolinks'            # Turbolinks makes links in web app faster
gem 'pg', '~> 0.21'         # Use mysql as database
gem 'httparty', '0.16.2'    # httparty for sending RESTful API requests

group :development, :test do
  gem 'better_errors'       # Way better exception screen for debugging
  gem 'pry'                 # Server debugger
  gem 'spring'              # Spring speeds up development
  gem 'awesome_print'       # Get some color into the console
end

group :production do
  gem 'puma'                # Use Puma over unicorn for concurrent requests
  gem 'rails_12factor'      # So logs can work on heroku
end
