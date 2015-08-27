class PhotosController < AuthenticationController
  def new
  end

  def create
    photo = Photo.create_with_file!(params["files"].first.path)
    render json: photo
  end
end
