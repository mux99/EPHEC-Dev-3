require "test_helper"

class TimelinesControllerTest < ActionDispatch::IntegrationTest
  test 'get endpoints valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    timeline = Timeline.create(name: "Timeline name", description: "timeline description", start: "0000/00/00", end: "0000/00/00", json: {})

    get "/api/projects/#{proj.id}/timelines/#{timeline.id}"
    assert_response :success
    assert_empty (["name", "description", "start", "end", "d_year", "d_month", "periods", "events"] - JSON.parse(@response.body).keys)
  end

  test 'get endpoints invalid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0001')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")

    assert_raises(ActiveRecord::RecordNotFound){
      get "/api/projects/#{proj.id}/timelines/nope"
    }

    assert_raises(ActiveRecord::RecordNotFound){
      get "/api/projects/notexist/timelines/neither"
    }
  end

  test 'post endpoint valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0001')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")

    post "/api/projects/#{proj.id}/timelines"
    assert JSON.parse(@response.body).keys.include? "id"
    assert_response 201
  end

  test 'post endpoints invalid params' do
    assert_raises(ActiveRecord::RecordNotFound){
      post '/api/projects/notexist/timelines'
    }
  end

  test 'put endpoint valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0001')
    tmp = {
      :d_year => 365.25,
      :d_month => [{n: "Jan", d: 31},{n: "Fev", d: 28.25},{n: "Mar", d: 31},{n: "Avr", d: 30},{n: "May", d: 31},{n: "Jun", d: 30},{n: "Jul", d: 31},{n: "Aug", d: 31},{n: "Sep", d: 30},{n: "Oct", d: 31},{n: "Nov", d: 30},{n: "Dec", d: 31}],
      :periods => []         
    }
    timeline = Timeline.create!(name: "Timeline name", description: "timeline description", start: "0000/00/00", end: "0000/00/00", json: tmp)
    
    put "/api/timelines/#{timeline.id}", params: {n: "new name"}
    assert_response :success
    assert Timeline.find(timeline.id).name == "new name"

    put "/api/timelines/#{timeline.id}", params: {d: "new desc"}
    assert_response :success
    assert Timeline.find(timeline.id).description == "new desc"

    put "/api/timelines/#{timeline.id}", params: {s: "2005/02/03", e: "2009/01/02"}
    assert_response :success
    assert Timeline.find(timeline.id).start == "2005/02/03" and Timeline.find(timeline.id).end == "2009/01/02"
  end

  test 'put endpoint invalid params' do
    assert_raises(ActiveRecord::RecordNotFound){
      put '/api/timelines/invalid'
    }
  end

  test 'delete endpoints valid params' do
    user = User.create!(name: "stuff", email: "stuff@stuff.stuff", password: "stuff", tag: '0000')
    proj = Project.create!(owner: user.id, visibility: true, name: "sample", description: "random")
    timeline = Timeline.create(name: "Timeline name", description: "timeline description", start: "0000/00/00", end: "0000/00/00", json: {})
    ProjectsTimeline.create!(project_id: proj.id, timeline_id: timeline.id)

    delete "/api/timelines/#{timeline.id}"
    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound){
      Timeline.find(timeline.id)
    }
    assert_empty ProjectsTimeline.where(project_id: proj.id, timeline_id: timeline.id)
  end

  test 'delete endpoints invalid params' do
    assert_raises(ActiveRecord::RecordNotFound){
      delete '/api/timelines/invalid'
    }
  end
end
