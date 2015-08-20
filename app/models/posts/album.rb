class Album < Post
  validates :_meta_data_validity
  private

    def _meta_data_validity
      true
    end
end
