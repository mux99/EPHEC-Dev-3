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
    timeline_periods = timeline_json["periods"]
    index = 0
    timeline_periods.each_with_index do |e, i|
        if e["id"] == params[:id]
            index = i
            break
        end
    end
    timeline_periods[index]["title"] = params[:n] unless params[:n].nil?
    timeline_periods[index]["description"] = params[:d] unless params[:d].nil?
    timeline_periods[index]["start"] = params[:s] unless params[:s].nil?
    timeline_periods[index]["end"] = params[:e] unless params[:e].nil?
    timeline_periods[index]["color"] = params[:c].sub("%23", "#") unless params[:c].nil?
    timeline_json["periods"] = timeline_periods
    timeline.update(json: timeline_json)
  end
end
