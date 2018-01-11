FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixture/indexのコピー.png'))
    user
    group
  end
end
