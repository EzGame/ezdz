class Blog < ActiveRecord::Base
  has_many :photos, as: :exhibit
  validates_presence_of :photos, if: type.album?
  validates_absence_of :photos, if: type.article?

  enum type: [ :article, :album ]

  def to_preview_json
    return {
      :title       => self.title,
      :date        => self.created_at.strftime('%A, %B %d %Y'),
      :body        => self.body.truncate_words(100),
      :first_photo => self.photos.first.url,
      :tags        => self.tags.split(','),
      :type        => self.type,
      :preview     => true
    }.to_json
  end

  def to_full_json
    return {
      :title       => self.title,
      :date        => self.created_at.strftime('%A, %B %d %Y'),
      :body        => self.body,
      :first_photo => self.photos.first.url,
      :photos      => self.photos.drop(1).collect(&:url),
      :tags        => self.tags,
      :type        => self.type,
      :preview     => false
    }.to_json
  end

  # TODO comment records
end
