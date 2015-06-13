class Photo < ActiveRecord::Base
  belongs_to :exhibit, polymorphic: true
  validates_presence_of :url
end
