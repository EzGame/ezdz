# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile vendor assets.
Rails.application.config.assets.precompile +=
    %w( normalize.css animate.css font-awesome.css )
Rails.application.config.assets.precompile +=
    %w( d3.js transit.js velocity.js )

# Precompile additional assets.
Rails.application.config.assets.precompile +=
    %w( home.js home.css )
