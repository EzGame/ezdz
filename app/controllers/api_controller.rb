require 'api_exception'

class ApiController < ActionController::Base
  include SpotifyHelper

  rescue_from ApiException::BadRequest do |exception|
    render json: {
      :status => 400,
      :message => exception.message
    }
  end

  # Search entire database and returns a light model
  # @param q - the search term, tags, title, id
  # @param limit - number of results to limit
  # @param offset - how many entries in (pagnation)
  # @param sort - column to sort by, date,
  def search
    query = _get_param(:q, 'String', 'all')
    limit = _get_param(:limit, 'Fixnum', 10)
    offset = _get_param(:offset, 'Fixnum', 0)
    # XXX ezdz - sql injection warning!
    sort = _get_param(:sort, 'String', 'created_at desc')

    results = (query == 'all') ? Post.all : Post.search(query)
    results = results.
      limit(limit).
      where('id >= ?', offset).
      order(sort)
    max_id = results.maximum(:id)

    render json: _respond_with({
      data: results.preview,
      max_id: max_id
    })
  end


  # Return all the results and returns a light model
  # @param limit - number of results to limit
  # @param offset - how many entries in (pagnation)
  def index
    limit = _get_param(:limit, 'Fixnum', 10)
    offset = _get_param(:offset, 'Fixnum', 0)
    cats = _get_param(:categories, 'String', '');

    categories = cats.split(',').map(&:downcase)
    results = Post.all.
      limit(limit).
      where('id >= ?', offset).
      where(type: categories).
      order('created_at desc')
    max_id = results.maximum(:id)

    render json: _respond_with({
      data: results.preview,
      max_id: max_id
    })
  end


  # Return a specific result, full model
  # @param id -
  def show
    id = _get_param(:id, 'String')

    result = Post.from_hashid(id)
    render json: _respond_with(result.full)
  end


  private
    # Return params[symbol] if it exists, otherwise return default
    # if default is not set, params must be present
    def _get_param( symbol, type, default = nil )
      param = params[symbol]
      klass = param.class.name

      if param.present?
        return _convert_param(param, type)
      elsif param.blank? && default.present?
        return default
      else # params.blank? && default.blank?
        raise ApiException::BadRequest.new "#{symbol} is missing from request!"
      end
    end


    def _convert_param( param, type )
      if type == 'Fixnum'
        param.to_i
      else
        param
      end
    end


    def _respond_with( results )
      if results.empty?
        status = 204
        message = "No content available!"
      else
        status = 200
        message = "Success!"
      end

      return {
        :status => status,
        :message => message,
        :data => results
      }
    end
end
