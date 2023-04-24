Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  #users queries
  post '/api/users', to: 'users#new'
  post '/api/login', to: 'users#auth'
  get '/api/me', to: 'user#info'
  put '/api/me', to: 'user#update'
  delete '/api/me', to: 'users#destroy'
  get '/api/user_projects', to: 'users#projects'

  #projects queries
  get '/api/projects/:id', to: 'projects#show'
  post '/api/projects', to: 'projects#new'
  
  put '/api/projects/:id', to: 'projects#update'
  delete '/api/projects/:id', to: 'projects#destroy'
  put '/api/projects/:id/user', to: 'projects#add_user'
  delete '/api/projects/:id/user', to: 'projects#rm_user'
  get '/api/projects/:id/event', to: 'projects#event_show'
  put '/api/projects/:id/event', to: 'projects#event_update'
  post '/api/projects/:id/event', to: 'projects#event_add'
  delete '/api/projects/:id/event', to: 'projects#event_rm'
  get '/api/projects', to: 'projects#show_pub'

  #timelines queries
  post '/api/timelines', to: 'timelines#new'
  delete '/api/timelines/:id', to: 'timelines#destroy'
  put '/api/timelines/:id', to: 'timelines#update'
  get '/api/timelines/:id', to: 'timeline#show'
end
