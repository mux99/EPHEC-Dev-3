require "test_helper"

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "get endpoints valid params" do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    # get '/api/projects'
    # assert_response :success
    get "/api/projects/#{proj.id}"
    assert_response :success

    get "/api/projects/#{proj.id}/users"
    assert_response :success

    get "/api/projects_dl/#{proj.id}"
    assert_response :success
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
end
