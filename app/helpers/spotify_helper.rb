module SpotifyHelper
  require 'rspotify'

  def authenticate
    if Rails::env == 'development'
      credentials = YAML.load(File.read('config/spotify.yml'))
    else
      credentials = ENV
    end

    RSpotify.authenticate(
      credentials['spotify_client_id'],
      credentials['spotify_client_secret']
    )
  end

  def playlists
    if authenticate

    end
  end

  def recently_played
    # TODO they dont have it yet: https://github.com/spotify/web-api/issues/12
  end

  # INFO
  # User id: 22ds23ddfucrcfnackgd7cj4a
  # Profile page: https://open.spotify.com/user/22ds23ddfucrcfnackgd7cj4a

  # IDEA
  # Could be cool for a collab playlist made by others
end