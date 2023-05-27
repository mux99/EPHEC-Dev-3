class PeriodsController < ApplicationController
  def new
    timeline = Timeline.find(params[:tid])
    timeline_json = timeline.json
    tmp = {
        :id => SecureRandom.hex,
        :title => "period name",
        :description => "description",
        :color => "#252525",
        :start => timeline.start,
        :end => timeline.end
    }
    timeline_json["periods"] += [tmp]
    timeline.update(json: timeline_json)
    render json: tmp
  end

  def show
    timeline_events = Project.find(params[:pid]).json["periods"]
    event = timeline_events.select {|e| e["ID"] == params[:eid]}
    render json: event
  end

  def destroy
    timeline = Timeline.find(params[:tid])
    timeline_json = timeline.json
    timeline_json["periods"].reject! { |p| p["id"] == params[:id] }
    timeline.update(json: timeline_json)
  end

  def update
    timeline = Timeline.find(params[:tid])
    timeline_json = timeline.json
    timeline_events = timeline_json["periods"]
    index = 0
    timeline_events.each_with_index do |e, i|
        if e["id"] == params[:id]
            index = i
            break
        end
    end
    timeline_events[index][:title] = params[:n] unless params[:n].nil?
    timeline_events[index][:description] = params[:d] unless params[:d].nil?
    timeline_events[index][:start] = params[:s] unless params[:s].nil?
    timeline_events[index][:end] = params[:e] unless params[:e].nil?
    timeline_events[index][:color] = params[:c] unless params[:c].nil?
    timeline_json["periods"] = timeline_events
    timeline.update(json: timeline_json)
  end
end
