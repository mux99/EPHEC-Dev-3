require "test_helper"

class ImageTest < ActiveSupport::TestCase
  test 'normal cases' do
    img = Image.create(project_id: projects(:proj).id, url: 'https://docs.enlightenment.org/python-efl/current/_static/logo.png')
    assert img.save
  end

  test 'missing params' do
    img_no_params = Image.new
    assert_not img_no_params.save

    img_missing_url = Image.create(project_id: 'e042a855-9d18-45fd-b85a-9d1b99cb7b19')
    assert_not img_missing_url.save

    img_missing_proj = Image.create(url: 'https://cdn.discordapp.com/attachments/1045329788295983137/1107607580223737876/20230507_142602.png')
    assert_not img_missing_proj.save
  end

  test 'wrong params' do
    img_invalid_proj = Image.create(project_id: 'invalid id that doesnt exist', url: 'https://url.url')
    assert_not img_invalid_proj.save
  end
end
