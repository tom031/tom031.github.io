# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "tom031.github.io"
  spec.version       = "0.1.1"
  spec.authors       = ["Tom Dinh"]
  spec.email         = ["tomdinhnz@gmail.com"]

  spec.summary       = "A Jekyll theme by Tom Dinh"
  spec.homepage      = "https://tom031.github.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_development_dependency "jekyll", "~> 2.4"
  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
end
