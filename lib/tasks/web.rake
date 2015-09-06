namespace :web do
  # TODO: set target(dst) path
  # TODO: use absolute paths
  # TODO: set module name
  # TODO: hiearchial make

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


  def filter(arr, regex)
    arr.select{|i| i[regex] }
  end


  def compile_production( sources, rule )
    puts "\e[1;33m** Vulcanizing\e[0;31m"
    htmls = filter(sources, /^ez-/).map do |html|
      "<link rel=\"import\" href=\"lib/#{html}.html\">"
    end
    scripts = filter(sources, /(<script|<link)/)
    file = File.open("public/web/temp", "w+")
    file.write([scripts, htmls].flatten.join("\n"))
    file.seek(0)
    return unless system("vulcanize #{file.path} > public/web/#{rule}.html")
    File.delete(file.path);
  end


  def compile_development( sources, minify = false )
    puts "\e[1;33m** Compiling Typescripts\e[0;31m"
    sources[:typescript].each do |src|
      next if src.match /d\.ts$/
      out = dst(src, '.ts')
      # next unless compile?( src, out )
      return unless system("tsc -t ES5 #{src} -out #{out}")
      system("minify --output #{out.gsub(/\.js$/, '.min.js')} #{out}") if minify

      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:typescript].present?

    puts "\e[1;33m** Compiling handlebars\e[0;31m"
    sources[:handlebars].each do |src|
      out = dst(src, '.handlebars')
      next unless compile?( src, out )
      return unless system("handlebars #{src} -f #{out}")

      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:handlebars].present?

    puts "\e[1;33m** Compiling SASS\e[0;31m"
    sources[:scss].each do |src|
      out = dst(src, '.scss')
      next unless compile?( src, out )
      mini = (minify) ? "--style compressed" : ""
      return unless system("sass --sourcemap=none #{mini} #{src} #{out}")

      puts "\e[32m#{src} ~> #{out}\e[0m"
    end if sources[:scss].present?

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
    task :all, [:mini] do |t, args|
      sources = {
          :handlebars => Dir.glob("web/src/**/*.handlebars"),
          :html       => Dir.glob("web/src/**/*.html"),
          :scss       => Dir.glob("web/src/**/*.scss"),
          :typescript => Dir.glob("web/src/**/*.ts")
      }

      compile_development(sources, args[:mini] || false)
    end


    desc 'Compiles all web assets, bundles into a single file where possible'
    task :prod, [:rule] do |t, args|
      Rake::Task["web:make:clean"].invoke
      Rake::Task["web:make:all"].invoke(true)

      if args[:rule].present?
        path = "web/#{args[:rule]}.rule"
        raise "Cannot find #{path}!!" unless File.exists?(path)

        sources = File.open(path,"r").read.split(/\n/)
      else
        sources = Dir.glob("web/src/**/*")
      end

      compile_production(sources, args[:rule] || "components")
    end


    desc 'Cleans up all front end assets in public/web/'
    task :clean do
      puts "\e[1;33m** Cleaning up public/web/\e[0;31m"
      system "rm -rf #{Rails.root}/public/web"
    end


    desc 'Starts up file watcher for web assets'
    task :start do
      require 'filewatcher'
      puts "\e[1;33m** Starting to watch web/\e[0;31m"

      FileWatcher.new(["lib/", "Rakefile"]).watch do |filename|
        puts "Changed " + filename
      end
    end
  end
end
