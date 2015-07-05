namespace :web do
  # TODO: set target(dst) path
  # TODO: use absolute paths
  # TODO: set module name

  DESTINATION = "public/web/lib"
  def dst( src, type )
    filename = File.basename(src, type)
    dst = ""
    case type
    when '.handlebars'
      dst = DESTINATION + "/#{filename}.handlebars.js"
    when '.scss'
      dst = DESTINATION + "/#{filename}.css"
    when '.ts'
      dst = DESTINATION + "/#{filename}.js"
    else
      dst = DESTINATION + "/#{filename}#{type}"
    end
  end


  def compile?( src, dst )
    mtime = File.mtime(src).to_i
    begin
      ctime = File.mtime(dst).to_i
    rescue
      ctime = 0
    end
    return (mtime > ctime) ? true : false
  end


  def compile_production( sources )
    puts "\e[1;33m** Compiling Typescripts\e[0;31m"
    srcs = sources[:typescript].join(" ")
    return unless system("tsc --removeComments -t ES5 #{srcs} --out public/web/component.js")
    return unless system("minify --output public/web/component.min.js public/web/component.js")

    puts "\e[1;33m** Compiling handlebars\e[0;31m"
    srcs = sources[:handlebars].join(" ")
    return unless system("handlebars --min #{srcs} --output public/web/component.handlebars.js")

    puts "\e[1;33m** Compiling SASS\e[0;31m"
    # Hack together a local file, write imports to it
    file = File.open("temp","w+")
    file.write(sources[:scss].map{ |i| "@import \"#{i}\";" }.join("\n"))
    file.seek(0);
    return unless system("scss --sourcemap=none --style compressed #{file.path} public/web/component.css")
    File.delete(file.path);

    puts "\e[1;33m** Copying over vendors\e[0;31m"
    `cp -r #{Rails.root}/web/vendors #{Rails.root}/public/web/`

    puts "\e[1;33m** Writing HTML\e[0;31m"
    # Hack together an HTML
    # TODO, proper html imports
    file = File.open("public/web/component.html","w+")
    string = <<-STRING
      #{ Dir.glob('public/web/vendors/*.js').map { |v|
           "<script src=\"#{v.gsub('public/web/','')}\"></script>"
         }.join("\n") }
      <link rel="stylesheet" href="component.css">
      <script src="component.handlebars.js"></script>
      <script src="component.min.js"></script>
    STRING
    file.write(string);
    file.close
  end


  def compile_development( sources )
    puts "\e[1;33m** Compiling Typescripts\e[0;31m"
    sources[:typescript].each do |src|
      next if src.match /d\.ts$/
      out = dst(src, '.ts')
      next unless compile?( src, out )
      response = system("tsc -t ES5 #{src} -out #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:typescript].present?

    puts "\e[1;33m** Compiling handlebars\e[0;31m"
    sources[:handlebars].each do |src|
      out = dst(src, '.handlebars')
      next unless compile?( src, out )
      response = system("handlebars #{src} -f #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:handlebars].present?

    puts "\e[1;33m** Compiling SASS\e[0;31m"
    sources[:scss].each do |src|
      out = dst(src, '.scss')
      next unless compile?( src, out )
      response = system("sass --sourcemap=none #{src} #{out}")

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:scss].present?

    # TODO: vulcanize this
    puts "\e[1;33m** Copying HTML\e[0;31m"
    sources[:html].each do |src|
      out = dst(src, '.html')
      next unless compile?( src, out )
      response = system "cp #{src} #{out}"

      return unless response
      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:html].present?

    # copy over vendors
    if compile?( "#{Rails.root}/web/vendors/", "#{Rails.root}/public/web/vendors" )
      puts "\e[1;33m** Copying over vendors\e[0;31m"
      `cp -r #{Rails.root}/web/vendors #{Rails.root}/public/web/`
    end

    # copy over tests
    if compile?( "#{Rails.root}/web/tests", "#{Rails.root}/public/web/tests" )
      puts "\e[1;33m** Copying over tests\e[0;31m"
      `cp -r #{Rails.root}/web/tests #{Rails.root}/public/web/`
    end
  end


  desc 'Sets up required node packages on global, requires super user'
  task :setup do
    system 'sudo npm install -g handlebars'
    system 'sudo npm install -g typescript'
    system 'sudo npm install -g minifier'
  end


  namespace :make do
    desc 'Compiles all web assets from web/ to public/web/'
    task :all do
      sources = {
          :handlebars => Dir.glob("web/src/**/*.handlebars"),
          :html       => Dir.glob("web/src/**/*.html"),
          :scss       => Dir.glob("web/src/**/*.scss"),
          :typescript => Dir.glob("web/src/**/*.ts")
      }

      compile_development(sources)
    end

    desc 'Compiles all web assets, bundles into a single file where possible'
    task :prod do
      sources = {
          :handlebars => Dir.glob("web/src/**/*.handlebars"),
          :html       => Dir.glob("web/src/**/*.html"),
          :scss       => Dir.glob("web/src/**/*.scss"),
          :typescript => Dir.glob("web/src/**/*.ts")
      }

      compile_production(sources)
    end

    desc 'Cleans up all front end assets in public/web/'
    task :clean do
      system "rm -rf #{Rails.root}/public/web"
    end
  end

  # Compile test code
  # task :test do
  #   puts "Test A - Ruby"
  #   start = Time.now
  #   mtime = File.mtime('web/src/ez-ajax-history/ez-ajax-history.ts')
  #   ctime = File.mtime('public/web/lib/ez-ajax-history.js');
  #   if mtime > ctime
  #     puts "compile"
  #   else
  #     puts "skip"
  #   end
  #   puts "Test A - #{(Time.now - start).seconds}"

  #   puts "Test B - Bash"
  #   start = Time.now
  #   mtime = `stat -f %m web/src/ez-ajax-history/ez-ajax-history.ts`
  #   ctime = `stat -f %m public/web/lib/ez-ajax-history.js`
  #   if mtime > ctime
  #     puts "compile"
  #   else
  #     puts "skip"
  #   end
  #   puts "Test B - #{(Time.now - start).seconds}"
  # end
end
