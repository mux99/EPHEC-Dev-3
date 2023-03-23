Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  #status query (not really useful)
  get '/api/status', to: 'application#status'

  #users queries
  get '/api/user', to: 'users#auth'
  post '/api/user', to: 'users#new'
  put '/api/user', to: 'user#update'
  get '/api/user/premium', to: 'users#ispremium'
  put '/api/user/premium', to: 'users#changepremium'
  get '/api/user_projects', to: 'users#projects'
  delete '/api/user', to: 'users#destroy'

  #projects queries
  get '/api/projects/:id', to: 'projects#show'
  put '/api/projects/:id', to: 'projects#update'
  delete '/api/projects/:id', to: 'projects#destroy'
  put '/api/project/:id/user', to: 'projects#add_user'
  delete '/api/project/:id/user', to: 'projects#rm_user'
  post '/api/project', to: 'projects#new'

  #timelines queries
  post '/api/timelines/new', to: 'timelines#new'
  delete '/api/timelines/:id', to: 'timelines#destroy'
  put '/api/timelines/:id', to: 'timelines#update'
end
