namespace :web do

  DESTINATION = "public/web/src"
  def dst( src, type )
    filename = File.basename(src, type)
    case type
    when '.handlebars'
      return DESTINATION + "/#{filename}.handlebars.js"
    when '.scss'
      return DESTINATION + "/#{filename}.css"
    when '.ts'
      return DESTINATION + "/#{filename}.js"
    else
      return DESTINATION + "/#{filename}#{type}"
    end
  end


  def compile( sources )
    # Compile handlebars
    puts "\e[1;33m** Compiling handlebars\e[0;31m"
    sources[:handlebars].each do |src|
      out = dst(src, '.handlebars')
      response = system("handlebars #{src} -f #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:handlebars].present?


    # Compile scss
    puts "\e[1;33m** Compiling SASS\e[0;31m"
    sources[:scss].each do |src|
      out = dst(src, '.scss')
      response = system("sass --sourcemap=none #{src} #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:scss].present?


    # Compile typescript
    puts "\e[1;33m** Compiling Typescripts\e[0;31m"
    sources[:typescript].each do |src|
      next if src.match /d\.ts$/
      out = dst(src, '.ts')
      response = system("tsc #{src} -out #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end


    # Copy over lib
  end


  # copy over node modules
  # compile
  # compile sass *.scss output/.scss
  # Compile sass into css

  # # Compile typescripts to js
  # TypeScript::Node.compile_file('web/src/dz-blog/dz-blog.ts', '--target', 'ES5')
  # # vulcanize somehow
  # if Rails.env.production?
  #   # uglify js
  # end

  # goal is to have a single html import for access to all components
  desc 'Sets up required node packages on global, requires admin password'
  task :setup do
    system 'sudo npm install -g handlebars'
    system 'sudo npm install -g typescript'
    system 'sudo npm install -g vulcanize'
  end


  namespace :make do
    desc 'TODO'
    task :all do
      # Find source files
      sources = {
          :handlebars => Dir.glob("web/src/**/*.handlebars"),
          :html       => Dir.glob("web/src/**/*.html"),
          :scss       => Dir.glob("web/src/**/*.scss"),
          :typescript => Dir.glob("web/src/**/*.ts")
      }

      compile(sources)
    end

    desc 'TODO'
    task :clean do
      system "rm -rf #{Rails.root}/public/web"
    end
  end
end
