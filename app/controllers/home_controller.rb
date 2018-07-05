class HomeController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound do |e|
    render text: "Doesn't exist", status: 404
  end

  def welcome
    Rails.logger.info(request.subdomain)
  end

  def show
    @post = Post.
        includes(:photo).
        find_by_hashid(params[:hashid])
  end

  def about
  end
end
