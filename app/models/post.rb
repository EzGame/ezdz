class Post < ActiveRecord::Base
  ## Validations ##
  validates_presence_of :photo
  validates_presence_of :title
  validates_presence_of :type
  validates_presence_of :meta
  validates :hashid, presence: true, uniqueness: true
  validate :_type_validity

  ## Relations ##
  has_one :photo, as: :exhibit
  has_many :post_tags
  has_many :tags, through: :post_tags

  ## Enum & Stuff ##
  serialize :meta, Hash
  SALT = "19910826" # To remove from repo and use ENV['SALT']
  LENG = 6 # Same thing

  def self.find_by_tags( name )
    Post.includes(:tags).where("tags.name" => name).limit(1)
  end

  def self.find_by_hashid( hashid )
    # XXX ezdz - overwrite default find_by so we get activerecord class
    # This should only be one record at all times
    Post.where(:hashid => hashid)
  end

  # Define search in here
  def self.search( query )
    query = query.to_s.downcase

    # Return active record relation
    select("distinct posts.id, posts.*").
      joins("left outer join post_tags on post_tags.post_id = posts.id").
      joins("left outer join tags on tags.id = post_tags.tag_id").
      where("tags.name = ? OR
             posts.hashid = ? OR
             posts.type = ? OR
             (posts.title LIKE '%#{query}%')",query, query, query)
  end

  def to_json
    {}
  end

  def all_tags=(names)
    self.tags = names.split(",").map do |name|
      Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

  protected
    def self._hash_id
      # REALLY BAD HACK
      self._hasher.encode((self.maximum(:id) || 0) + 1)
    end

  private
    def _type_validity
      true
    end

    def self._hasher
      Hashids.new(SALT, LENG)
    end
end
