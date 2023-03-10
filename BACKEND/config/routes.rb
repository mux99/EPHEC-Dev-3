Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  #status query (not really useful)
  get '/api/status', to: 'application#status'

  #users queries
  get '/api/user', to: 'users#check'
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
  post '/api/project', to: 'projects#new'
  get '/api/projects/timelines', to: 'projects#timelines'

  #timelines queries
  post '/api/timelines/new', to: 'timelines#new'
  delete '/api/timelines/:id', to: 'timelines#destroy'
  put '/api/timelines/:id', to: 'timelines#update'
  get '/api/timelines/:id', to: 'timelines#show'
  # Defines the root path route ("/")
  # root "articles#index"
end
