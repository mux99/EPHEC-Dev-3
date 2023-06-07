class ApplicationController < ActionController::Base
    def status
        render json: { msg: 'connection established' }
    end

    def index
        render file: Rails.root.join('public', 'index.html')
    end
end
