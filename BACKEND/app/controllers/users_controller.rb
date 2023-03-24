class UsersController < ApplicationController
    require 'securerandom'
    include UsersHelper
    def auth
        user = User.find_by(email: params[:e])
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        end
        result = user.authenticate(params[:p]) != false
        render json: {:check => result, :username => user.name, :tag => user.tag, :token => SecureRandom.hex}
    end

    def new
        user_not_exists = User.find_by(email: params[:e]).nil?
        if user_not_exists
            new_user = User.create(name: params[:n], email: params[:e], password: params[:p], tag: generate_usertag)
            render json: {:token => SecureRandom.hex, :username => new_user.name, :tag => new_user.tag}
        else
            render json: {:error => ERR_USER_EXIST}
        end
    end

    def update 
        user = User.find_by(email: params[:e])
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        end
        user.update(name: params[:n]) unless params[:n].nil?
        user.update(password: params[:p]) unless params[:p].nil?
    end

    def destroy 
        User.destroy_by(email: params[:e]) unless User.find_by(email: params[:e]).nil?
    end

    def ispremium
        user = User.find_by(email: params[:e])
        render json: {:premium => user.premium} unless user.nil?
    end

    def changepremium
        user = User.find_by(email: params[:e])
        user.update(premium: params[:p] == 'true') unless user.nil?
    end

    def projects 
        user = User.find_by(email: params[:e])
        if user.nil?
            render json: {:error => ERR_USER_NOT_EXIST}
        end
        users_projects = Project.joins('projects-users').where(:user_id, user.id)
        project_ids = []
        user_projects.each do |p|
            project_ids += [p.id]
        end
        render json: {:projects => project_ids}
    end
end
