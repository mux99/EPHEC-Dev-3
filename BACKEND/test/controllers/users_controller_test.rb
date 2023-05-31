require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'post endpoints valid params' do
    post '/api/users', params: {e: 'stuff@mail.microsoft', n: 'name', p: 'secure_password69'}
    assert_response :success
    
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    post '/api/login', params: {e: 'stuff@stuff.stuff', p: 'stuff'}
    assert_response :success
  end

  test 'post endpoints invalid params' do
    post '/api/users', params: {n: "name", p: "motdepasse"}
    assert_response 204

    user = User.create!(name: "stuff", email: "stuff@stuff.nope", password: "stuff", tag: '0000')
    post '/api/login', params: {e: "stuff@stuff.nope", p: 'invalid_password'}
    assert_response 204
  end
end
