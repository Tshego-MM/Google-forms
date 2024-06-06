# Google-forms


# How to set up the Database
## requirements docker

* open new terminal in wsl 
* CD into google-forms/docker
* Run 'docker compose up --build'

This will lanch the post server and run the flyway migrations

# How to setup up the backend
## requirements: a running docker container and node

* open a new terminal that has node installed
* CD into google-forms/backend
* run 'npm i' to get all the packages
* run 'npm start' to launch the server

# How to setup the front end
## requirements: a running backend and node

* open a new terminal that has node installed
* CD into google-froms/
* run 'npm i' to get all the packages
* run 'npm start' to launch the front end


# please request environment file to run the project