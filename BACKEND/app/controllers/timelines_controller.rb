class TimelinesController < ApplicationController
    def new
        project = Project.find(params[:id])
        new_timeline = Timeline.create(name: "Timeline name", description: "timeline description", start: "", end: "")
        ProjectsTimeline.create(timeline_id: new_timeline.id, project_id: params[:id])
        render json: { id: new_timeline.id }
    end

    def destroy
    	Timeline.destroy_by(id: params[:i])
    end

    def update
    	timeline = Timeline.find(params[:id])
    	timeline.update(name: params[:n]) unless params[:n].nil?
    	timeline.update(description: params[:d]) unless params[:d].nil?
    	timeline.update(start: params[:s]) unless params[:s].nil?
    	timeline.update(end: params[:e]) unless params[:e].nil?
    	timeline.update(json: params[:j]) unless params[:j].nil?
    end

    def show
        timeline = Timeline.find(params[:id])
        project = Project.find(params[:p])
        events = project.json.events.select { |e| e.timelines.include? timeline.id }
        render json: { name: timeline.name, description: timeline.description, start: timeline.start, end: timeline.end, events: events }
    end
end
