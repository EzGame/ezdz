class Tag < ActiveRecord::Base
  ## Validations ##
  validates_uniqueness_of :name

  ## Relations ##
  has_many :post_tags
  has_many :posts, through: :post_tags
end
