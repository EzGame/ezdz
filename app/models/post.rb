class Post < ActiveRecord::Base
  ## Validations ##
  validates_presence_of :photo
  validates_presence_of :title
  validates_presence_of :type
  validates_presence_of :meta

  ## Relations ##
  has_one :photo, as: :exhibit

  ## Enum & Stuff ##
  serialize :meta, Hash

  # Define search in here
end
