class ProjectsController < ApplicationController
    include UsersHelper

    def show_pub
        if params[:search].present?
            public_projects = Project.where(visibility: true).where("name LIKE ? OR description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
        else
            public_projects = Project.where(visibility: true)
        end
        res = []
        public_projects.each do |p|
            tmp = Image.find_by(project_id: p.id)
            img = tmp.url unless tmp.nil?
            owner = User.find_by(id: p.owner)
            res += [{
                :id => p.id,
                :name => p.name,
                :description => p.description,
                :owner => owner.name,
                :tag => owner.tag,
                :img => img
            }]
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
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        tmp = {
            :text => "text",
            :events => []
        }
        new_project = Project.create!(name: "project name", description: "project description", owner: user.id, visibility: false, json: tmp)
        ProjectsUser.create(user_id: user.id, project_id: new_project.id)
        Image.create(project_id: new_project.id, cover: true, url: "https://placehold.co/1280x720/")
        render json: { id: new_project.id }
    end

    def show
        project = Project.find(params[:id])
        if not project.visibility
            session_token = request.headers['Authorization']&.split(' ')&.last
            user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
            perms = ProjectsUser.find_by(user_id: user.id).perms
        end
        owner = User.find(project.owner)
        tmp = Image.find_by(project_id: project.id)
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
            :timelines => timelines_ids,
            :events => project.json["events"]
        }
        res["perms"] = perms unless perms.nil?
        render json: res
    end

    def update
        project = Project.find(params[:id])
        tmp = {}
        tmp[:name] = params[:n] unless params[:n].nil?
        tmp[:description] = params[:d] unless params[:d].nil?
        tmp[:visibility] = params[:v] unless params[:v].nil?
        if !params[:t].nil?
            tmp2 = project.json
            tmp2["text"] = params[:t] unless params[:t].nil?
            tmp[:json] = tmp2
        end
        image = Image.find_by(project_id: params[:id]).update(url: params[:i]) unless params[:i].nil?
        project.update(tmp)
    end

    def destroy
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

    def add_user
    	new_user = User.find_by(email: params[:e])
    	ProjectsUser.create(user_id: new_user.id, project_id: params[:id])
    end

    def rm_user
    	ProjectsUser.destroy_by(user_id: params[:u], project_id: params[:id])
    end

    def members
        project = Project.find(params[:id])
        members = ProjectsUser.where(project_id: project.id)
        render json: {owner: project.owner, members: members.map {|x| x.id}}
    end
end
