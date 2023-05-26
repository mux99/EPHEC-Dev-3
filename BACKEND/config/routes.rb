Rails.application.routes.draw do
  get 'period/new'
  get 'period/show'
  get 'period/update'
  get 'period/destroy'
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
  get '/api/projects/:pid/events/:eid', to: 'events#show'
  put '/api/projects/:pid/events/:eid', to: 'events#update'
  post '/api/projects/:pid/timelines/:tid/events', to: 'events#new'
  delete '/api/projects/:pid/events/:eid', to: 'events#destroy'

  #periods queries
  get '/api/projects/:pid/period/:id', to: 'periods#show'
  put '/api/projects/:pid/period/:id', to: 'periods#update'
  post '/api/projects/:pid/period/:id', to: 'periods#new'
  delete '/api/projects/:pid/period/:id', to: 'periods#destroy'

  #timelines queries
  post '/api/projects/:id/timelines', to: 'timelines#new'
  delete '/api/timelines/:id', to: 'timelines#destroy'
  put '/api/timelines/:id', to: 'timelines#update'
  get '/api/projects/:pid/timelines/:tid', to: 'timelines#show'
end
