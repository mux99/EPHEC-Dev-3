class UsersController < ApplicationController
    require 'securerandom'
    include UsersHelper

    def new
        user_not_exists = User.find_by(email: params[:e]).nil?
        if user_not_exists
            new_user = User.create(name: params[:n], email: params[:e], password: params[:p], tag: generate_usertag)
        end
    end

    def auth
        user = User.find_by(email: params[:e])
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        end
        result = user.authenticate(params[:p]) != false
        if result
            token_value = SecureRandom.hex
            token = Token.create(user_id: user.id, token: token_value)
            render json: {:check => result, :token => token_value, :ttl => token.ttl}
        end
    end

    def logoff
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if params[:a] != true
            tokens = Token.where(user_id: user.id)
            tokens.each do |t|
                t.destroy
            end
        else
            Token.find_by(token: session_token).first.destroy
        end
    end

    def info
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        render json: {
            :email => user.email,
            :name => user.name,
            :tag => user.tag,
            :creation_date => user.created_at,
            :theme => user.json["theme"],
            :id => user.id
        }
    end

    def update 
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if session_token.nil? || user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            user.update(name: params[:n]) unless params[:n].nil?
            if user.authenticate(params[:op])
                user.update(password: params[:p]) unless params[:p].nil?
            end
            user_json = user.json
            begin
                user_json["theme"] = JSON.parse(params[:t]) unless params[:t].nil?
            rescue IndexError
                user_json = {"theme" => JSON.parse(params[:t])} unless params[:t].nil?
            end
            
            user.update!(json: user_json) 
        end
    end

    def destroy
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            user.destroy
        end
    end

    def projects 
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        user_projects = ProjectsUser.joins(:project).where(user_id: user.id)
        if params[:search].present?
            user_projects = user_projects.where("projects.name LIKE ? OR projects.description LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
        end
        res = []
        user_projects.each do |p|
            project = Project.find_by(id: p.project_id)
            # next unless project.name.include?(params[:search]) || project.description.include?(params[:search])
            owner = User.find_by(id: project.owner)
            tmp = Image.find_by(project_id: project.id)
            img = tmp.url unless tmp.nil?
            res += [{
                :id => project.id,
                :name => project.name,
                :description => project.description,
                :owner => owner.name,
                :tag => owner.tag,
                :img => img
            }]
        end
        render json: res
    end
end
