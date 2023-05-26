class EventsController < ApplicationController
  def new
    project = Project.find(params[:pid])
    project_json = project.json
    tmp = {
        :id => SecureRandom.hex,
        :timelines => [params[:tid]],
        :title => "event name",
        :description => "event description",
        :image => "",
        :date => "0000/00/00"
    }
    project_json["events"] += [tmp]
    project.update(json: project_json)
  end

  def show
    project_events = Project.find(params[:pid]).json["events"]
    event = project_events.select {|e| e["ID"] == params[:eid]}
    render json: event
  end

  def destroy
    project = Project.find(params[:id])
    project_json = project.json
    project_json["events"].each do |e|
        if e["ID"] == params[:eid]
            project_json["events"] -= e
            break
        end
    end
    project.update(json: project_json)
  end

  def update
    project = Project.find(params[:pid])
    project_json = project.json
    project_events = project_json["events"]
    index = 0
    project_events.each_with_index do |e, i|
        if e["ID"] == params[:eid]
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