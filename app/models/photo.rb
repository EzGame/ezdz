class Photo < ActiveRecord::Base
  belongs_to :exhibit, polymorphic: true
  validates_presence_of :url
  validate :_url_validity

  private

    def _url_validity
      true
    end
end
