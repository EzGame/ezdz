class Blog < Post
  validate :_meta_data_validity

  private
    def _meta_data_validity
      if self.meta[:html].blank?
        errors.add(:html, "Cannot be blank!")
      end
    end
end
