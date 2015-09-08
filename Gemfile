source 'https://rubygems.org'
ruby '2.2.1'

### Back End Gems ###
gem 'hashids',  '1.0.2'     # Hashids is for bidirectional hashing
gem 'jbuilder', '2.0'       # https://github.com/rails/jbuilder
gem 'imgurapi'              # Imgur as image host
gem 'image_optim'           # Lossless img compression
gem 'image_optim_pack'      # Compression binaries
gem 'rack', '~> 1.6.4'

### Middleware Gems ###
gem 'rails', '4.2.0'        # Bundle edge Rails instead
gem 'turbolinks'            # Turbolinks makes links in web app faster
gem 'httparty', '0.13.3'    # httparty for sending RESTful API requests

group :development, :test do
  gem 'better_errors'       # Way better exception screen for debugging
  gem 'byebug'              # Server debugger
  gem 'spring'              # Spring speeds up development
  gem 'awesome_print'       # Get some color into the console
  gem 'mysql2'              # Use mysql as database
end

group :production do
  gem 'pg'                  # Use mysql as database
end
