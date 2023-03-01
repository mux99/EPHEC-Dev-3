class ApplicationController < ActionController::API
    def status
        render json: { data: 'connection established' }
    end
end
