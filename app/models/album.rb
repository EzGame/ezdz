class Album < ActiveRecord::Base
  has_many :photos, as: :exhibit
  validates_presence_of :photos
end
