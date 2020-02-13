# Git Essentials

**Benefits of Git:**
* History - You can see the exact changes you made to a project some time ago. It could have you troubleshoot something that caused an error in your code, or give you the benefit of just moving to that point in time.
* Collaboration - You don't have to wait for someone else to make their changes.
* Feature Branch - You can set up separate branches for coding different features. Lets say branch A is header, and branch B is footer. When you feel like working on the header, work in the header branch. When you're finished coding the changes, you merge the branch back into your tree.

**Git Vocab**
* Repository - The repository refers to your project.
* Working directory - The directory containing your project. Any changes made inside this directory are tracked by Git.
* Staging - Control what gets committed. 
* Commit - Git's way of saving changes to staged files.
* Push - Took the repository on our hard drive and pushed it up to the server.
* Pull - To 'pull' the latest changes from the server into our local repository.

**Personalizing Git**
git config --global user.name "Tanner"
git config --global user.email "tolheiser@outlook.com"

## Git Commands

**General Command Line Commands**
*pwd* - This command prints the working directory.
*cd 'folderNameHere'* - Changes to the designated directory. Pro tip: You can click and drag a folder to designate the directory.
*mkdir "hello-world"* - mkdir = make directory. In this example, it created the folder 'hello-world' inside the working directory.
*touch "index.html"* - Creates an empty index.html file in the working dir.

**Cloning a Repo**
*git clone https://github.com/LearnWebCode/welcome-to-git* 

**Initializing a Repo**
First navigate to the directory you want to make a repo in
*git init* - Creates an empty git repo in the working directory.

**View Changes**
*git status* - Displays the files which have changes.

**Staging a file**
*git add index.html*
Alternatively, *git add -A* stages all of the changes.

You can then check the status with 'git status', which will return: 'Changes to be committed' with new file: index.html. 

**Unstaging a file**
*git reset* will unstage all changes, alternatively *git reset 'fileName'* will unstage that specific file.

**Committing Changes**
*git commit -m "My first commit"* - think of '-m' as standing for message. 

**Diff: Display the last changes on a file since the last commit**
*git diff {filename}*

**Checkout: Restore to the last commit**
*git checkout -- .* - Restores the files to the way they were when you last made the commit.

**Pushing a file to the remote repo**
* *git push {remote} {branch-name}*
* *git push -u origin {branch-name}* - Pushes the new branch.

**Remote: Location of where your changes are being pushed to**
* *git remote -v* - Will reveal the location of the repo. 
* *git remote* - Gives you the remote's name.

**Setting the Remote URL**
*git remote set-url origin git@github.com:tOlheiser/travel-site.git*

## Working with Branches

**Creating a new Branch**
*git branch {branch-name}* - This creates a branch **locally**.

**Pushing the new branch into the remote repository**
*git push -u {remote} {branch-name}*

**Viewing Branches**
*git branch* or *git branch --list*

**Deleting a Branch**
*git branch -d {branch-name}*

### Checkout: Switch from one branch to another
*git checkout {name-of-your-branch}*

**Key things to Remember**
* Changes in your current branch must be committed or stashed before you switch.
* The branch you want to check out must exist in your local environment.

**Creating & Switching to a Branch Simultaneously**
*git checkout -b {name-of-your-branch}* - '-b' being short for branch.

### Merge
Git Merge is used when you've completed development in your branch and everything works fine, and you're ready to merge the branch with the parent branch.

**Note**: You must be on the specific branch that you want to merge with your feature branch.

**Steps**
* Switch to the dev branch: *git checkout dev*
* Before merging, update your local dev branch: *git fetch*
* Merge the branches: *git merge {feature-branch}*

**Again, it's important to ensure your dev branch has the latest version before merging.**

## Git Pull

This command is used to get updates from the remote repo. It's a combination of **git fetch** and **git merge**. Meaning that when you invoke git pull, it gets updates from the remote repository *(git fetch)*, and immediately applies the latest changes in your local *(git merge)*

**General Format:**
*git pull {repository}* - Repository is the URL to your repo.

**Pulling from a specific branch:**
*git pull {remote-name} {branch-name}*
* Remote name is the name of your remote repository.
* Branch name indicates the name of your branch.

**Note**: If you have uncommitted changes, the 'merge' portion of git pull will fail and your local branch will be untouched. 

If there are multiple remotes, the 'git pull' command might not supply enough information. You may need to enter *git pull origin* or *git pull upstream*