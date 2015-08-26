class PhotosController < AuthenticationController
  def new
  end

  def create
    # This should be in library
    # imgur_session = ::Imgurapi::Session.new(client_id: '1dbaa9f1efc5062', client_secret: '6f5237149abd91fd10ec70b2af6d0e60ba593637', refresh_token: '98d8f866d5cb67f2810edcf739f4d67953718b75', access_token: '4dd454d3f7b8c8382b67c8a0677f83da218e2072')
    # img = imgur_session.image.image_upload(params["files"].first.path)
    # photo = Photo.new({url: img.link}).save
    render json: Photo.last.as_json
  end
end
