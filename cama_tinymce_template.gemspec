$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "cama_tinymce_template/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "cama_tinymce_template"
  s.version     = CamaTinymceTemplate::VERSION
  s.authors     = ["Owen Peredo"]
  s.email       = ["owenperedo@gmail.com"]
  s.homepage    = ""
  s.summary     = "Permit to manage tinymce templates with better visualization."
  s.description = "Permit to manage tinymce templates with better visualization."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails"
  s.add_development_dependency "sqlite3"
end
