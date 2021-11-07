# directory-api

## Deployed at:- https://teledirectory-api.herokuapp.com/

## Endpoint Available:-
1. Sign Up:- api/signup
2. Login:- api/login
3. Fetch All Contacts:- api/fetch-contacts
4. Add Contact:- api/add-contact
5. Get Contact By ID:- api/contact/{ID}
6. Modify Contact By ID:- api/modify-contact/{ID}
7. Delete Contact By ID:- api/delete-contact/{ID}

## Deploying on Heroku:
1. Login to Heroku account.
2. Create a new github repository and push the code to it.
3. Create a new Heroku Application.
4. Connect the application to Github repository by going to Deploy section in the dashboard.
5. Go to Setting section in the dashboard, then to "Config Vars" and add the environment variables.
6. Finally deploy the main branch.

### Note: 
Following environment variables are required for the application to run:-
1. TOKEN_KEY
2. URI
3. USER
4. PASS
