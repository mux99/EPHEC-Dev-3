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
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0006')
    post '/api/users', params: {n: "name", p: "motdepasse", e: "stuff@stuff.stuff"}
    assert_response 409

    user = User.create!(name: "stuff", email: "stuff@stuff.nope", password: "stuff", tag: '0000')
    post '/api/login', params: {e: "stuff@stuff.nope", p: 'invalid_password'}
    assert_response 401

    post '/api/login', params: {e: "not@exist.com", p: "irrelevent"}
    assert_response 404
  end

  test 'get endpoints valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    tok = Token.create!(user_id: user.id, token: SecureRandom.hex)

    get '/api/me', headers: {'Authorization': "Bearer #{tok.token}"}
    assert_response 200
    assert_empty (["email", "name", "tag", "creation_date", "theme", "id"] - JSON.parse(@response.body).keys)

    get '/api/user_projects', headers: {'Authorization': "Bearer #{tok.token}"}
    assert_response 200
  end

  test 'delete endpoints valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    tok = Token.create!(user_id: user.id, token: SecureRandom.hex)

    delete '/api/login', headers: {'Authorization': "Bearer #{tok.token}"}
    assert_response :success
    assert_empty Token.where(user_id: user.id)
  end
end
