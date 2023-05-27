class EventsController < ApplicationController
  def new
    project = Project.find(params[:pid])
    timeline = Timeline.find(params[:tid])
    project_json = project.json
    tmp = {
        :id => SecureRandom.hex,
        :timelines => [params[:tid]],
        :title => "event name",
        :description => "event description",
        :image => "",
        :date => timeline.start
    }
    project_json["events"] += [tmp]
    project.update(json: project_json)
    render json: tmp
  end

  def show
    project_events = Project.find(params[:pid]).json["events"]
    event = project_events.select {|e| e["ID"] == params[:eid]}
    render json: event
  end

  def destroy
    project = Project.find(params[:pid])
    project_json = project.json
    project_json["events"].reject! { |p| p["id"] == params[:eid] }
    project.update(json: project_json)
  end

  def update
    project = Project.find(params[:pid])
    project_json = project.json
    project_events = project_json["events"]
    index = 0
    project_events.each_with_index do |e, i|
        if e["id"] == params[:eid]
            index = i
            break
        end
    end
    project_events[index][:title] = params[:title] unless params[:title].nil?
    project_events[index][:description] = params[:description] unless params[:description].nil?
    project_events[index][:date] = params[:date] unless params[:date].nil?
    project_json["events"] = project_events
    project.update(json: project_json)
  end
end
