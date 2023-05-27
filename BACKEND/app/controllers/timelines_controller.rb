class TimelinesController < ApplicationController
    def new
        project = Project.find(params[:id])
        tmp = {
            :d_year => 365.25,
            :d_month => [{n: "Jan", d: 31},{n: "Fev", d: 28.25},{n: "Mar", d: 31},{n: "Avr", d: 30},{n: "May", d: 31},{n: "Jun", d: 30},{n: "Jul", d: 31},{n: "Aug", d: 31},{n: "Sep", d: 30},{n: "Oct", d: 31},{n: "Nov", d: 30},{n: "Dec", d: 31}],
            :periods => []         
        }
        new_timeline = Timeline.create(name: "Timeline name", description: "timeline description", start: "0000/00/00", end: "0000/00/00", json: tmp)
        ProjectsTimeline.create(timeline_id: new_timeline.id, project_id: params[:id])
        render json: { id: new_timeline.id }
    end

    def destroy
        ProjectsTimeline.destroy_by(timeline_id: params[:id])
    	Timeline.destroy_by(id: params[:id])
    end

    def update
    	timeline = Timeline.find(params[:id])
    	timeline.update(name: params[:n]) unless (params[:n].nil? || params[:n] == "")
    	timeline.update(description: params[:d]) unless (params[:d].nil? || params[:n] == "")
    	timeline.update(start: params[:s]) unless params[:s].nil?
    	timeline.update(end: params[:e]) unless params[:e].nil?
    	#timeline.update(json: params[:j]) unless params[:j].nil?
    end

    def show
        timeline = Timeline.find(params[:tid])
        project = Project.find(params[:pid])
        tmp = []
        project.json["events"].each do |e|
            if e["timelines"].include? params[:tid]
                tmp += [e]
            end
        end
        render json: {
            name: timeline.name,
            description: timeline.description,
            start: timeline.start,
            end: timeline.end,
            d_year: timeline.json["d_year"],
            d_month: timeline.json["d_month"],
            periods: timeline.json["periods"],
            events: tmp
        }
    end
end
