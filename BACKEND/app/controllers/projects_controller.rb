class ProjectsController < ApplicationController
    include UsersHelper

    def show
        project = Project.find(params[:id])
        owner = User.find(project.owner)
        timelines = Timeline.joins(:projects_timeline).where("projects_timelines.project_id = '#{project.id}'")
        render json: { timelines: timelines.map{|x| x.json}, name: project.name, description: project.description, owner_name: owner.name}
    end
    
    def new
        session_token = request.headers['Authorization']&.split(' ')&.last
        owner = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if session_token.nil? || owner.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            new_project = Project.create(name: "project name", description: "project description", owner: owner.id, visibility: false)
            ProjectsUser.create(user_id: owner.id, project_id: new_project.id)
        end
        render json: { id: new_project.id }
    end

    def show_pub
        public_projects = Project.joins(:images).where(visibility: true)
        res = {}
        public_projects.each do |p|
            cover_img = Image.where(project_id: p.id, cover: true)[0]
            res[p.id] = {
                :name => p.name,
                :description => p.description,
                :owner => p.owner,
                :img => cover_img.url
            }
        end
        render json: res
    end

    def update
        project = Project.find(params[:id])
		project.update(name: params[:n]) unless params[:n].nil?
		project.update(description: params[:d]) unless params[:d].nil?
		project.update(visibility: params[:v]) unless params[:v].nil?
    end

    def destroy
    	Project.destroy_by(params[:i])
    end

    def add_user
    	new_user = User.find_by(email: params[:e])
    	ProjectUser.create(user_id: new_user.id, project_id: params[:p])
    end

    def rm_user
    	ProjetsUser.destroy_by(user_id: params[:u], project_id: params[:p])
    end
end
