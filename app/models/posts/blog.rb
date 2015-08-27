class Blog < Post
  validate :_meta_data_validity

  def self.new_with_params( params )
    new_post = Post.new({
      type: 'Blog',
      title: params['title'],
      hashid: self._hash_id,
      meta: {
        body: params['body']
      }
    })

    new_post.all_tags = params['tags']
    new_post.photo = Photo.find(params['cover'])

    new_post
  end

  private
    def _meta_data_validity
      if self.meta[:body].blank?
        errors.add(:body, "Cannot be blank!")
      end
    end
end
