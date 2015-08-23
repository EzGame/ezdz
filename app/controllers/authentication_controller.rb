class AuthenticationController < ActionController::Base
  # Some sort of basic auth here
  before_filter lambda {
    puts "Authentication"
  }

  def login
    # Do login
  end

  def logout
    # Do logout
  end
end
