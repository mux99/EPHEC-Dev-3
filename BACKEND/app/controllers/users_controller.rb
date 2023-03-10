class UsersController < ApplicationController
    include UsersHelper
    def check
        @user = User.find_by(email: params[:e])
        @result = @user.authenticate(params[:p]) != false
        render json: {:check => @result}
    end

    def new
        @user_exists = User.find_by(email: params[:e]).nil?
        if @user_exists
            render json: {:error => 'Error: user exists'}
        else
            User.create(name: params[:n], email: params[:e], password: params[:p], tag: generate_usertag)
            render json: {:error => nil}
        end
    end

    def update 
    end

    def destroy 
    end

    def ispremium
    end

    def changepremium
    end

    def projects 
    end
end
