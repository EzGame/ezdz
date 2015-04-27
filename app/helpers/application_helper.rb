module ApplicationHelper
  def meta_tag( attrs )
    "<meta #{attrs.map{|k,v| "#{k}='#{v}'"}.join(" ")}/>"
  end
end
