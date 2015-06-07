class ComponentGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  def copy_component_file
    component_name = file_name.gsub('_','-')
    camelized_name = file_name.camelize
    file_templates = %w(
      component.handlebars
      component.html
      component.scss
      component.ts
      component.test.html
    )

    file_templates.each do |file|
      file_destination = (file.include? "test") ?
          "web/tests/#{file.gsub('component', component_name)}" :
          "web/src/#{component_name}/#{file.gsub('component', component_name)}"

      copy_file file, file_destination
      gsub_file file_destination, 'XcomponentX', component_name
      gsub_file file_destination, 'XComponentX', camelized_name
    end
  end
end
