namespace :web do

  DESTINATION = "public/web/lib"
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
    # Compile typescript
    puts "\e[1;33m** Compiling Typescripts\e[0;31m"
    sources[:typescript].each do |src|
      next if src.match /d\.ts$/
      out = dst(src, '.ts')
      response = system("tsc -t ES5 #{src} -out #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end


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

    puts "\e[1;33m** Copying HTML\e[0;31m"
    sources[:html].each do |src|
      out = dst(src, '.html')
      response = system "cp #{src} #{out}"

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:html].present?

    # copy over vendors
    puts "\e[1;33m** Copying over vendors\e[0;31m"
    `cp -r #{Rails.root}/web/src/vendor #{Rails.root}/public/web/lib/vendor`

    # copy over tests
    puts "\e[1;33m** Copying over tests\e[0;31m"
    `cp -r #{Rails.root}/web/tests #{Rails.root}/public/web/`
  end


  desc 'Sets up required node packages on global, requires super user'
  task :setup do
    system 'sudo npm install -g handlebars'
    system 'sudo npm install -g typescript'
    system 'sudo npm install -g vulcanize'
  end


  namespace :make do
    desc 'Compiles all front end assets from web/ to public/web/'
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

    desc 'Cleans up all front end assets in public/web/'
    task :clean do
      system "rm -rf #{Rails.root}/public/web"
    end
  end
end
