class PostsController < AuthenticationController
  layout nil
  before_action :_set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
  end

  def show
  end

  def new
    @post = _post_type.new
  end

  def edit
  end

  def create
    @post = _post_type.new(_post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render action: 'show', status: :created, location: @post }
      else
        format.html { render action: 'new' }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @post.update(_post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render action: 'show', status: :ok, location: @post }
      else
        format.html { render action: 'edit' }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def _set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def _post_params
      params[:post]
    end

    def _post_types
      %w(Album Blog Deck Narrative)
    end

    def _post_type
      params[:type].constantize if params[:type].in? _post_types
    end
end
