# LekkiProject_v2

This is the second version of a full stack real estate web application that allows users to view and add real estate properties for sale. It allows users to also search properties available based on property address, owner, number of bedrooms, minimum and maximum price. In addition users can add images of properties and update exsiting property information.

In this version, the application was integrated with Keycloak OpenID technology for user management and authentication. This allows for authentication, authorization and strict user based functionalities such as updating properties based on user role.

Keycloak was integrated with both the front-end (React) and backend (node-express) of the application to ensure maximum security, As such proper running of the application requires the installation of keycloak on local machine.

The appliction saves property data to a mongo db database which i have created and connected to and saves property images to my cloudinary account. The frontend fetches these data and displays. The config links of these dependencies are found in the .env and can be customized.

# Running application
Running this application in a development environment requires 3 steps. namely: Keycloak set up and application set up. 


# Setting Up Keycloak
- First, visit https://www.keycloak.org/downloads and download the recent version of the keycloak server distribution (Distribution powered by Quarkus ).
- Unzip and extract the files from the downloaded zipped file.
- Navigate into the bin folder of the keycloak file, open up a terminal in this folder and run "kc.sh start-dev" (on linux) or "kc.bat start-dev" (on windows) to start up the keycloak dev environment server.

- - Note: The keycloak server runs on port 8080 and so this port should be left open on your local host. 
- - - Also keycloak  reauires installation of the recent java JDK ( to download go to https://www.oracle.com/java/technologies/downloads/).
- - - make sure to set up JAVA_HOME environment variable in your local machine. This variable should be mapped to the path of your local java installation.

- Once the keycloak server starts, open http://localhost:8080/ on your browser and create an admin user.

- Go the admin console (http://localhost:8080/admin) and login with the credentials of the created admin user.

- follow the getting started instructions on https://www.keycloak.org/getting-started/getting-started-zip to create a realm, two clients; one for the frontend and one for the backend, users.

- Assign client roles Admin and user to users on both clients and app-admin and app-user to users on the realm level. The application was implemented using these role names.

- Once these setups are done, navigate to the installation tap of each client on the keycloak admin consloe, copy the content of the keycloak.json files and replace the content of the keycloak.json file of both the HomesandNooks and HomesandNooksAPI folders of the codebase.

NOTE: the frontend api should be set to public Access type while the backend client should have access type of bearer-only.


# Running the App
Once the keycloak set up is done, follow the following procedures to run the app. 

- To start, This method will require installing the javascript node dependency. The link to download node is https://nodejs.org/en/download/

- Once node has been installed, Open up a terminal and CD into the homesandnooksAPI folder of this application and run "npm install" to install the node dependencies of the backend of the application.

- On the same terminal run "npm start" to start the api server and connect to my mongo database. #This terminal should be left running.

- Open a new terminal inside the homesandnooks folder and run "npm install" to install frontend dependencies.
- Once the installs are done run "npm start" to start the app.
- Go to localhost:3000 to view the running app.


# Customizations
- In addition, you can also customize the app by creating a cloudinary account and updating the .env file on th homesandnooksAPI folder with your cloudinary details as specified in the .env file.
- Also, you can also change the name of the images during docker build, But this will require editing the docker-compose.yml file with the new image names.

# Important Notes
- I have included the .env file to allow easier access.


