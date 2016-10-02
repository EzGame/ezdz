Overview
========
EZDZ.io is the personal website created for and by [David Zhang]
(https://github.com/ezdzdev)

Ruby on Rails & Web Components


Front End File Structure
========================
EZDZ.io front end technologies uses webpack & angular

    cd web/


Requires
========
ruby 2.2.0
rails 4.2.0
npm 2.1.6


Setup
=====
Heroku Build Packs:

    heroku buildpacks:add -i 1 https://github.com/heroku/heroku-buildpack-nodejs
    heroku buildpacks:add -i 2 https://github.com/heroku/heroku-buildpack-ruby

Setup subdomains:

    blog.ezdz.io         ezdz.herokuapp.com
    ezdz.io              ezdz.herokuapp.com
    gaming.ezdz.io       ezdz.herokuapp.com
    photography.ezdz.io  ezdz.herokuapp.com
    story.ezdz.io        ezdz.herokuapp.com
    www.ezdz.io          ezdz.herokuapp.com

Setup Imgur API credentials:

    heroku config:add imgur_access_token=_
    heroku config:add imgur_client_id=_
    heroku config:add imgur_client_secret=_
    heroku config:add imgur_refresh_token=_