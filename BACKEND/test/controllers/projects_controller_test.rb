require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "get endpoints valid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    # get '/api/projects'
    # assert_response :success
    get "/api/projects/#{proj.id}"
    assert_response 200
    assert_empty (["name", "description", "owner", "tag", "visible", "image", "text", "timelines", "events"] - JSON.parse(@response.body).keys)

    get "/api/projects/#{proj.id}/users"
    assert_response 200
    assert_empty (["owner", "members"] - JSON.parse(@response.body).keys)

    get "/api/projects_dl/#{proj.id}"
    assert_response 200
    assert_empty (["timelines", "name", "description", "text", "owner", "tag"] - JSON.parse(@response.body).keys)
  end

  test "get endpoints invalid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")

    assert_raises(ActiveRecord::RecordNotFound){
      get "/api/projects/invalid_id"
    }

    assert_raises(ActiveRecord::RecordNotFound){
      get "/api/projects/invalid_id/users"
    }

    assert_raises(ActiveRecord::RecordNotFound){
      get "/api/projects_dl/invalid_id"
    }
  end

  test "post endpoints valid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    tok = Token.create!(user_id: user.id, token: SecureRandom.hex)

    post '/api/projects', headers: {'Authorization': "Bearer #{tok.token}"}
    assert_response 201
    assert JSON.parse(@response.body).keys.include? "id"
  end

  test "post endpoints invalid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")

      post '/api/projects', headers: {'Authorization': "Bearer tokenthatdoesntexist"}
      assert_response 401

      post '/api/projects', headers: {'NoAuth': 'xD'}
      assert_response 401
  end

  test "put endpoints valid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    user2 = User.create!(name: "nothing", email: "stuff@stuff.com", password: "nah", tag: '4206')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")

    put "/api/projects/#{proj.id}", params: {n: "new_name"}
    assert_response :success
    assert Project.find(proj.id).name == "new_name"

    put "/api/projects/#{proj.id}", params: {d: "wow a new description!"}
    assert_response :success
    assert Project.find(proj.id).description == "wow a new description!"

    put "/api/projects/#{proj.id}", params: {v: false}
    assert_response :success
    assert_not Project.find(proj.id).visibility

    put "/api/projects/#{proj.id}", params: {e: "stuff@stuff.com"}
    assert_response :success
    assert_not_nil ProjectsUser.where(user_id: user2.id, project_id: proj.id)
  end

  test "delete endpoints valid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    user2 = User.create!(name: "nothing", email: "stuff@stuff.com", password: "nah", tag: '4206')
    ProjectsUser.create!(user_id: user2.id, project_id: proj.id)

    delete "/api/projects/#{proj.id}/user", params: {u: user2.id}
    assert_response :success
    assert_empty ProjectsUser.where(user_id: user2.id, project_id: proj.id)

    delete "/api/projects/#{proj.id}"
    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound){
      Project.find(proj.id)
    }
  end

  test 'delete endpoints invalid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    user2 = User.create!(name: "nothing", email: "stuff@stuff.com", password: "nah", tag: '4206')
    ProjectsUser.create!(user_id: user2.id, project_id: proj.id)

    assert_raises(ActiveRecord::RecordNotFound){
      delete "/api/projects/#{proj.id}/user", params: {u: 'invalid'}
    }
    assert_raises(ActiveRecord::RecordNotFound){
      delete "/api/projects/invalid/user", params: {u: user2.id}
    }
    delete "/api/projects/#{proj.id}/user", params: {u: user.id}
    assert_response 403
  end
end
