class PeriodController < ApplicationController
  def new
    timeline = Timeline.find(params[:tid])
    timeline_json = timeline.json
    tmp = {
        :id => SecureRandom.hex,
        :title => "event name",
        :color => "#252525"
        :start => "0000/00/00",
        :end => "0000/00/00"
    }
    timeline_json["periods"] += [tmp]
    timeline.update(json: timeline_json)
  end

  def show
    timeline_events = Project.find(params[:pid]).json["periods"]
    event = timeline_events.select {|e| e["ID"] == params[:eid]}
    render json: event
  end

  def update
    timeline = Timeline.find(params[:id])
    timeline_json = project.json
    timeline_json["events"].each do |e|
        if e["ID"] == params[:eid]
          timeline_json["events"] -= e
            break
        end
    end
    timeline.update(json: timeline_json)
  end

  def destroy
    timeline = Project.find(params[:pid])
    timeline_json = project.json
    timeline_events = project_json["periods"]
    index = 0
    timeline_events.each_with_index do |e, i|
        if e["ID"] == params[:eid]
            index = i
            break
        end
    end
    timeline_events[index][:title] = params[:title] unless params[:title].nil?
    timeline_events[index][:description] = params[:description] unless params[:description].nil?
    timeline_events[index][:date] = params[:date] unless params[:date].nil?
    timeline_json["periods"] = timeline_events
    timeline.update(json: timeline_json)
  end
end
