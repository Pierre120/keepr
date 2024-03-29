# keepr
keepr is an online inventory management web application. Registered users can add inventory workspaces -- providing an organized setup of multiple inventory groups. It can be accessed here -- [keepr](https://keeprph.herokuapp.com/).


## HOW TO INSTALL *keepr*
*__NOTE__: If you downloaded the ZIP file of this project you can skip step 1.* 

1. Clone the repository.
```
git clone https://github.com/Pierre120/keepr.git
```
Go to the `keepr` project folder.
```
cd keepr
```

2. Install dependencies.
```
npm install
```

3. Running project.<br/>
*__NOTE__: If you're using your local MongoDB server then be sure that your server is up and running.*
```
npm run dev
```


## FEATURES
All the features of this project can be found in our 
[MP - Phase 0 document](https://docs.google.com/document/d/1RjlozwxHbKs-vMKJAeNAD51cs9LC3cwS/edit?usp=sharing&ouid=107324234949978838161&rtpof=true&sd=true).


## WHILE ON DEVELOPMENT
### COMPILING SASS
Compilation is needed whenever there are saved changes with the SASS (`.scss`) files.
```
npm run compile:sass
```
This command behaves like the `npm run dev` command.<br/>
Every changes made to the SASS files it will automatically compile it to CSS.

### RUNNING ON LOCAL MONGODB SERVER
Starting up the local MongoDB server is needed since the application needs to connect to a MongoDB server.<br/>
Run this command in a separate command prompt, terminal or any terminal-like program.
```
mongod
```

### SETTING UP LOCAL ENVIRONMENT VARIABLES
1. Add a `.env` file in the root path (`.`) of the project folder. The same directory level as the `.env.example` file.
2. Copy the contents of `.env.example` file to `.env` file.
3. Set the `PORT` value to `5000`.
```
PORT=5000
SESSION_SECRET=
MONGODB_URL=""
```
4. Set the `MONGODB_URL` to `"mongodb://localhost/<db-name>"`.<br/>
*__PS__: I used this --> `MONGODB_URL="mongodb://localhost/keepr_db"`*
```
PORT=5000
SESSION_SECRET=
MONGODB_URL="mongodb://localhost/<db-name>"
```


## IMPORTANT NOTES FOR COLLABORATORS
- Tab: 2 spaces
- Create a branch for a specific feature
  - For all or most feature branch, be sure to create a local test branch for each models. You're going to place the additional lines of code for testing in its test branch.
- Don't create a pull request unless the feature is done
- Be sure to recompile the SASS files when there are modifications
- `Ctrl + C` for terminating the run commands
