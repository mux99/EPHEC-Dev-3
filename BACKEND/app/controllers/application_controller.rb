class ApplicationController < ActionController::API
    def status
        render json: { msg: 'connection established' }
    end
end
