# Git Essentials

## Benefits of Git:
* History - You can see the exact changes you made to a project some time ago. It could have you troubleshoot something that caused an error in your code, or give you the benefit of just moving to that point in time.
* Collaboration - You don't have to wait for someone else to make their changes.
* Feature Branch - You can set up separate branches for coding different features. Lets say branch A is header, and branch B is footer. When you feel like working on the header, work in the header branch. When you're finished coding the changes, you merge the branch back into your tree.

## Git Vocab
* Repository - The repository refers to your project.
* Working directory - The directory containing your project. Any changes made inside this directory are tracked by Git.
* Staging - Control what gets committed. 
* Commit - Git's way of saving changes to staged files.
* Push - Took the repository on our hard drive and pushed it up to the server.
* Pull - To 'pull' the latest changes from the server into our local repository.

## Personalizing Git
git config --global user.name "Tanner"
git config --global user.email "tolheiser@outlook.com"

# Git Commands

## Directories
*pwd* - This command prints the working directory.
*cd 'folderNameHere'* - Changes to the designated directory. Pro tip: You can click and drag a folder to designate the directory.
*mkdir "hello-world"* - mkdir = make directory. In this example, it created the folder 'hello-world' inside the working directory.

## Repositories
First navigate to the directory you want to make a repo in
*git init* - Creates an empty git repo in the working directory.

### Creating new, empty files from the command line
*touch "index.html"* - Creates an empty index.html file in the working dir.

### Viewing Changes
*git status* - Displays the files which have changes.

### Staging a file
*git add index.html*

You can then check the status with 'git status', which will return: 'Changes to be committed" with new file: index.html. 

### Creating a commit
*git commit -m "My first commit"* - think of '-m' as standing for message. 

### Restore to the last commit
*git checkout -- .* - Restores the files to the way they were when you last made the commit.

### Cloning a Repo
*git clone https://github.com/LearnWebCode/welcome-to-git* 