class Blog < ActiveRecord::Base
  has_many :photos, as: :exhibit

  def to_preview_hash
    return {
      :id          => self.id,
      :title       => self.title,
      :date        => self.created_at.strftime('%A, %B %d %Y'),
      :body        => self.body.truncate_words(30) + '</p>',
      :first_photo => self.photos.first.try(&:url),
      :tags        => self.tags.split(','),
      :preview     => true
    }.as_json
  end

  def to_full_hash
    return {
      :id          => self.id,
      :title       => self.title,
      :date        => self.created_at.strftime('%A, %B %d %Y'),
      :body        => self.body,
      :first_photo => self.photos.first.try(&:url),
      :photos      => self.photos.drop(1).collect(&:url),
      :tags        => self.tags.split(','),
      :preview     => false
    }.as_json
  end

  def dup
    newBlog = super
    newBlog.photos = photos
    newBlog.save
  end

  # TODO comment records
  # TODO tags all to upper case
end
