class HomeController < ApplicationController
  layout :_layout

  rescue_from ActiveRecord::RecordNotFound do |e|
    render text: "Doesn't exist", status: 404
  end

  def welcome
    # Shows our home page
  end

  def show
    @post = Post.
        includes(:photo).
        find_by_hashid(params[:hashid])
  end

  def about
  end

  private
  def _layout
    false
  end
end
