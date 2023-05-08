Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  #users queries
  post '/api/users', to: 'users#new'
  post '/api/login', to: 'users#auth'
  delete '/api/login', to: 'users#logoff'
  get '/api/me', to: 'users#info'
  put '/api/me', to: 'users#update'
  delete '/api/me', to: 'users#destroy'
  get '/api/user_projects', to: 'users#projects'

  #projects queries
  get '/api/projects', to: 'projects#show_pub'
  post '/api/projects', to: 'projects#new'
  get '/api/projects/:id', to: 'projects#show'
  get '/api/projects_dl/:id', to: 'projects#download'
  post '/api/projects', to: 'projects#new'
  
  put '/api/projects/:id', to: 'projects#update'
  delete '/api/projects/:id', to: 'projects#destroy'

  put '/api/projects/:id/user', to: 'projects#add_user'
  delete '/api/projects/:id/user', to: 'projects#rm_user'
  get '/api/projects/:id/users', to: 'projects#members'

  #events queries
  get '/api/projects/:id/event/:eid', to: 'projects#event_show'
  put '/api/projects/:id/event/:eid', to: 'projects#event_update'
  post '/api/projects/:id/event', to: 'projects#event_add'
  delete '/api/projects/:id/event/:eid', to: 'projects#event_rm'

  #timelines queries
  post '/api/projects/:id/timelines', to: 'timelines#new'
  delete '/api/timelines/:id', to: 'timelines#destroy'
  put '/api/timelines/:id', to: 'timelines#update'
  get '/api/projects/:pid/timelines/:tid', to: 'timelines#show'
end
