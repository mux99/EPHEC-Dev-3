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
            token = SecureRandom.hex
            Token.create(user_id: user.id, token: token)
            render json: {:check => result, :username => user.name, :tag => user.tag, :token => token}
        end
    end

    def update 
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        end
        user.update(name: params[:n]) unless params[:n].nil?
        if user.authenticate(params[:op])
            user.update(password: params[:p]) unless params[:p].nil?
        end
    end

    def destroy 
        User.destroy_by(email: params[:e]) unless User.find_by(email: params[:e]).nil?
    end

    def projects 
        session_token = request.headers['Authorization']&.split(' ')&.last
        user = User.joins(:tokens).where("tokens.token = '#{session_token}'").first
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        else
            user_projects = ProjectsUser.joins(:project).where(user_id: user.id)
            res = {}
            user_projects.each do |p|
                project = Project.find_by(id: p.project_id)
                res[project.id] = {
                    :name => project.name,
                    :description => project.description,
                    :owner => project.owner
                }
            end
            render json: res
        end
    end
end
