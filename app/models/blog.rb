class Blog < ActiveRecord::Base
  has_many :photos, as: :exhibit
  validates_presence_of :photos, if: type.album?

  enum type: [ :article, :album ]

  def to_preview_json
    return {
      :title  => self.title,
      :body   => self.body.truncate_words(100),
      :photos => self.photos.first.collect(&:url),
      :tags   => self.tags.split(','),
      :type   => self.type
    }.to_json
  end

  def to_full_json
    return {
      :title  => self.title,
      :body   => self.body,
      :photos => self.photos.collect(&:url),
      :tags   => self.tags,
      :type   => self.type
    }.to_json
  end

  # TODO comment records
end
