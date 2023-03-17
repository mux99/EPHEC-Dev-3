class TimelinesController < ApplicationController
    def new
        project = Project.find(params[:p])
        new_timeline = Timeline.create(name: params[:n], description: params[:d], start: params[:s], end: params[:e])
    end

    def destroy
    	Timeline.destroy_by(id: params[:i])
    end

    def update
    	timeline = Timeline.find(params[:i])
    	timeline.update(name: params[:n]) unless params[:n].nil?
    	timeline.update(description: params[:d]) unless params[:d].nil?
    	timeline.update(start: params[:s]) unless params[:s].nil?
    	timeline.update(end: params[:e]) unless params[:e].nil?
    	timeline.update(json: params[:j]) unless params[:j].nil?
    end
end
