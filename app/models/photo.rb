class Photo < ActiveRecord::Base
  ## RELATIONS ##
  belongs_to :exhibit, polymorphic: true

  ## VALIDATIONS ##
  validates_presence_of :url
  validates_presence_of :imgur_hash
  validates_presence_of :imgur_delete
  validate :_url_validity

  ## CALLBACKS
  before_destroy :_remove_host_img

  def self.image_host
    if Rails::env == 'development'
      credentials = YAML.load(File.read('config/imgur.yml'))
    else
      credentials = ENV
    end

    Imgurapi::Session.new(
      client_id: credentials['client_id'],
      client_secret: credentials['client_secret'],
      refresh_token: credentials['refresh_token'],
      access_token: credentials['access_token']
    )
  end

  def self.upload( img )
    self.image_host.image.image_upload(img)
  end

  def self.create_with_file!( file_path )
    image = MiniMagick::Image.open(file_path)
    image.format "png"

    # resize
    sizes = image.dimensions
    if 1.0*sizes[0]/sizes[1] < 1.5
      image.resize "750x#{(750.0*sizes[1]/sizes[0]).round}"
    else
      image.resize "#{(500.0*sizes[0]/sizes[1]).round}x500"
    end

    # crop
    sizes = image.dimensions
    if sizes[0] > 750
      w_offset = 1.0 * (sizes[0] - 750) / 2
      image.shave "#{w_offset.to_i}x0"
    elsif sizes[1] > 500
      h_offset = 1.0 * (sizes[1] - 500) / 2
      image.shave "0x#{h_offset.to_i}"
    end

    img = self.upload(image.path)
    self.create!({
      url: img.link,
      imgur_hash: img.id,
      imgur_delete: img.deletehash
    })
  end

  private
    def _url_validity
      unless self.url =~ URI::regexp
        errors.add(:url, "Url is invalid!")
      end
    end

    def _remove_host_img
      self.class.image_host.image.image_delete(self.imgur_hash)
    end
end