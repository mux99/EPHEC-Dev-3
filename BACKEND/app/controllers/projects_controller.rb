class ProjectsController < ApplicationController
    include UsersHelper

    def show_pub
        if params[:search].present?
            public_projects = Project.where(visibility: true).where("name LIKE ? OR description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
        else
            public_projects = Project.where(visibility: true)
        end
        res = {}
        public_projects.each do |p|
            tmp = Image.joins(:project).where(project_id: p.id, cover: true).first
            img = tmp.url unless tmp.nil?
            owner = User.find_by(id: p.owner)
            res[p.id] = {
                :name => p.name,
                :description => p.description,
                :owner => owner.name,
                :tag => owner.tag,
                :img => img
            }
        end
        render json: res
    end

    def download
        project = Project.find(params[:id])
        owner = User.find(project.owner)
        timelines = Timeline.joins(:projects_timeline).where("projects_timelines.project_id = '#{project.id}'")
        render json: {timelines: timelines.map{|x| {json: x.json,
            start: x.start,
            end: x.end,
            desc: x.description}},
            name: project.name,
            description: project.description,
            text: project.json["text"],
            owner: owner.name,
            tag: owner.tag}
    end

    def new
        session_token = request.headers['Authorization']&.split(' ')&.last
        owner = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if session_token.nil? || owner.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            tmp = {
                :text => "text",
                :events => []
            }
            new_project = Project.create(name: "project name", description: "project description", owner: owner.id, visibility: false, json: tmp)
            ProjectsUser.create(user_id: owner.id, project_id: new_project.id)
        end
        render json: { id: new_project.id }
    end

    def show
        project = Project.find(params[:id])
        if not project.visibility
            session_token = request.headers['Authorization']&.split(' ')&.last
            user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
            if session_token.nil? || user.nil?
                render json: {:error => ERR_USER_NOT_EXIST}
                return
            else
                if project.nil? || ProjectsUser.find_by(user_id: user.id, project_id: params[:id]).nil?
                    render json: {}
                    return
                end
            end
        end
        owner = User.find(project.owner)
        tmp = Image.joins(:project).where(project_id: params[:id], cover: true).first
        img = tmp.url unless tmp.nil?
        timelines = ProjectsTimeline.where(project_id: params[:id])
        timelines_ids = []
        timelines.each do |t|
            timelines_ids += [t.timeline_id]
        end
        res = {
            :name => project.name,
            :description => project.description,
            :owner => owner.name,
            :tag => owner.tag,
            :visible => project.visibility,
            :image => img,
            :text => project.json["text"],
            :timelines => timelines_ids
        }
        render json: res
    end

    def update
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if session_token.nil? || user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            project = Project.find(params[:id])
            project.update(name: params[:n]) unless params[:n].nil?
            project.update(description: params[:d]) unless params[:d].nil?
            project.update(visibility: params[:v]) unless params[:v].nil?
            tmp = project.json
            tmp["text"] = params[:t] unless params[:t].nil?
            project.update(json: tmp)
        end
    end

    def destroy
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if session_token.nil? || user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            Image.destroy_by(project_id: params[:id])
            ProjectsUser.destroy_by(project_id: params[:id])
            timelines = ProjectsTimeline.find_by(project_id: params[:id])
            if not timelines.nil?
                timelines.each do |t|
                    Timeline.find(t.timeline_id).destroy
                    t.destroy
                end
            end
            Project.destroy_by(id: params[:id])
        end
    end

    def add_user
    	new_user = User.find_by(email: params[:e])
    	ProjectUser.create(user_id: new_user.id, project_id: params[:p])
    end

    def rm_user
    	ProjetsUser.destroy_by(user_id: params[:u], project_id: params[:p])
    end

    def members
        project = Project.find(params[:id])
        members = ProjectsUser.where(project_id: project.id)
        render json: {owner: project.owner, members: members.map {|x| x.id}}
    end
end
