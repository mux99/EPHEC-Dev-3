require "test_helper"

class UserTest < ActiveSupport::TestCase
  test 'normal cases' do
    user = User.create(name: 'thing', tag: '4444', password: 'password', email: 'thing@thing.thing')
    assert user.save
  end

  test 'missing params' do
    user_missing_name = User.create(tag: '4456', password: 'tets', email: 'validemail@lol.com')
    assert_not user_missing_name.save

    user_missing_tag = User.create(name: 'stuff', password: 'balls', email: 'very@mail.com')
    assert_not user_missing_tag.save

    user_missing_mail = User.create(name: 'ssdkfnsg', password: 'no', tag: '4445')
    assert_not user_missing_mail.save

    user_missing_password = User.create(name: 'tioghiohg', tag: '7777', email: 'root.root@root.root')
    assert_not user_missing_password.save
  end

  test 'wrong params' do
    user_wrong_tag = User.create(name: 'test', tag: 'invalid', password: 'motdepasse', email: 'thingy')
    assert_not user_wrong_tag.save
  end
end
