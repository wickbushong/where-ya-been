Rails.application.routes.draw do
  resources :reports
  resources :visits
  resources :businesses do
      resources :visits
  end
  resources :users do
    resources :reports
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
