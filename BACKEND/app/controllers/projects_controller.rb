class ProjectsController < ApplicationController
    def show
        @project = Project.joins(:users).where(["users.id = ? and projects.name = ?"], params[:oi], params[:n])
        @project_timelines = Timeline.joins('projects-timelines'.to_sym).where(project_id: @project.id)
        render json: {timelines: @project_timelines.map{|x| x.json}}
    end

    def new
    end

    def update 
    end

    def destroy 
    end

    def timelines 
    end
end
