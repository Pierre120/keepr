# keepr
keepr is an online inventory management web application. Registered users can add inventory workspaces -- providing an organized setup of multiple inventory groups.


## HOW TO INSTALL *keepr*
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

3. Running project.
```
npm run dev
```


## WHILE ON DEVELOPMENT
### COMPILING SASS
Compilation is needed whenever there are saved changes with the SASS (`.scss`) files.
```
npm run compile:sass
```
This command behaves like the `npm run dev` command.
Every changes made to the SASS files it will automatically compile it to CSS.


## IMPORTANT NOTES FOR COLLABORATORS
- Tab: 2 spaces
- Create a branch for a specific feature
- Don't create a pull request unless the feature is done
- Be sure to re-compile the SASS files when there are modifications
- `Ctrl + C` for terminating the run commands
