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
    credentials = YAML.load(File.read('config/imgur.yml'))
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
    image_optim = ImageOptim.new(allow_lossy: true)
    image_optim.optimize_image!(file_path)

    img = self.upload(file_path)
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
