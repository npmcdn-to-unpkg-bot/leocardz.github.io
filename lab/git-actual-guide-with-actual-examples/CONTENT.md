**Git** is a free distributed revision control system for source code management (SCM). It is open source and
designed to increase the speed and the efficiency on distributed and non-linear workflow projects. Additionally it
improves its data integrity. You can download it from [git-scm.com/downloads][0].

### First things first On **Git** world, you need to get used to some terms that will come up frequently. They are:

* **repository**: also shortened as "repo", it's a directory where your project code will be managed and
versionized. It can be local to a folder on your computer or it can be a storage space on an online host.
* **commit**: it's a command that create a "snapshot" of the current state of your repository in time, giving
you a checkpoint to which you can analyse or restore your project to any previous state (other commits).
* **commit hash**: it's a SHA1 hash linked to a commit working as its id. Although its 40-digit-long size, you
only need the 4 or 6 first chars to refer it.
* **branch**: branches are separate areas of development where you can work without interfering to each other.
It's by this way that Git is collaborative. There's at least one branch in your repo and you should never work
in a repository which other person is working on. You create a branch for you instead.
* **staging area** or **index**: a cache of files that you want to commit. An area where files added to
index are enrolled.
* **staged** files: files prepared for a commit, added to index
* **unstaged** files: files not prepared to commit, not added to index.
* **working directory**: the root folder where you perform your coding.
* **working copy**: the folders and files that you're currently using. It's always local.
* **snapshot**: it's a "time registration" of your project in time created by a commit. A "version".
* **history**: it's a "book" that contains everything of all the registrations of your project since your
gitted it.

### Customizing Git configuration: git config

This command allows you to configure your **Git** installation globally or on an individual repository. It can
define from user info to preferences to the behavior of a repository. Below you'll find the most used git config
commands.

_git config user.name <name\>_ and _git config --global user.email <email\>_ define author's info that
will be shown on commits and logs.

    
    
        $ git config --global user.name Leonardo Cardoso
        $ git config --global user.email leo@leocardz.com
    
    

You also can create a shortcut to git command (e.g. 'git stage' as 'git add').
_git config --global alias.
_

    
    
        $ git config --global alias.stage add
        $ git config --global alias.co commit
        $ git config --global alias.cane "commit --amend --no-edit"
    
    

_git co_ will work as _git commit_.

You can choose your preferred editor. **Git**'s default one is [vi][1].
_git config --global core.editor <editor\>_
Setting [Sublime Text][2] as default.

    
    
        $ git config --global core.editor "subl -n -w"
    
    

Every next editing thing will be open on your preferred editor.

### Creating a repo: git init \[--bare\] 

To create a repository with a working directory where you can actually work, you simply need to use this command
inside the directory:

    
    
        $ git init
        Initialized empty Git repository in ~/git_101/.git/
    
    

After creating it you will see that the directory contains a .git folder where all the git stuff goes and you will
work at the level where the .git folder is.

Bare repository is a git repository without a working directory, so you can't work on it. Typically, when you are on
a server, you have no need to have a working directory. Additionally, bare repositories are usually central
repositories where all collaborators move their work to. It's a way to synchronize efforts between multiple people.

    
    
        $ git init --bare
        Initialized empty Git repository in ~/git_101_bare/
    
    

### Cloning an existing repo: git clone \[--bare\] <repo\> \[<directory\>\] 

This command is similar to _git init_, but it clones a repo instead of creating one. Additionally, it creates a
remote called 'origin' for the repo cloned from, sets up a local [branch ][3] based on the remote's active branch (generally master), and creates remote-tracking branches for all
the branches in the repo.

    
    
        $ mkdir git_102
        $ git clone git_101 git_102
        Cloning into 'git_102'...
        done.
    
    

It works for bare repos as well:

    
    
        $ mkdir gg
        $ git clone --bare git@github.com:LeonardoCardoso/mvn-repo.git gg
        Cloning into bare repository 'gg'...
        remote: Counting objects: 24, done.
        remote: Compressing objects: 100% (11/11), done.
        remote: Total 24 (delta 1), reused 24 (delta 1)
        Receiving objects: 100% (24/24), 282.70 KiB | 125.00 KiB/s, done.
        Resolving deltas: 100% (1/1), done.
        Checking connectivity... done.
    
    

### Adding files to staging area: git add <file\>

Let's create the file _new\_file.txt_. It has to be created inside the working directory where you initialised
git.
_git add <file\>_

    
    
        $ vi new_file.txt
        $ git add new_file.txt 
    
    

By this doing, our _new\_file.txt_ is at the staging area and ready to be committed.

To add all files that are not staged, use:

    
    
        $ git add .
    
    

### Removing files from staging area: git rm \[--cached\] <file\>

To remove a file from staging area and/or tracking, use _git rm \[--cached\] <file\>_.

    
    
        $ git rm new_file.txt 
    
    

Caution: to remove all files, use:

    
    
        $ git rm .
    
    

To remove file from version control and keep it in the working repository, use _git rm --cached <file\>_.

    
    
        $ git rm --cached new_file.txt 
    
    

### Committing a file: git commit \[-m\] \[<message\>\]

Committing a file is to tell **Git** to create a snapshot of the state of you project. All your added, modified,
removed files since the last commit will have their status updated with this new commit. A message can be added to
describe briefly what was changed.

Let's commit our _new\_file.txt_ that we have already added:
_git commit -m <message\>_

    
    
        $ git commit -m "Initial commit"
        [master (root-commit) 13abdd5] Initial commit
         1 file changed, 1 insertion(+)
         create mode 100644 new_file.txt
    
    

You also have the option to open your editor on commit. Just use:
_git commit_

    
    
        $ vi .gitignore
        $ git add . gitignore
        $ git commit
    
    

Editor will open. So you can add your message...

    
    
        .gitignored added
        # Please enter the commit message for your changes. Lines starting
        # with '#' will be ignored, and an empty message aborts the commit.
        # On branch master
        # Changes to be committed:
        #       new file:   .gitignore
        #
    
    

    
    
        [master 44e0174] .gitignored added
         1 file changed, 1 insertion(+)
         create mode 100644 .gitignore
    
    

### .gitignore: A special file

_.gitignore_ is a file that **Git** always looks before its commands. There you can tell git which files are
not (and will be not) tracked. It's a simple text file and you can use regular expressions to block more than one
file at once, like

    
    
        $ vi .gitignore
    
    

Editor will open. So you can add your files which won't be tracked anymore...

     
            thisFileWillBeIgnored.txt
            # file ignored
    
            dir/
            # entire directory ignored
    
            anotherDir/starting*
            # only files that start with "starting" inside anotherDir will be ignored
    
            *.jar
            # all jar files will be ignored
    
        
    

If a file is already being tracked, you need to remove it, so it won't be tracked anymore.
Otherwise, it will keep being tracked.

### Editting a commit: git commit --amend \[\[-m <message\>\] \[--no-edit\]\]

This command is extremely useful because it allows you to change last commit info such as message or even adding or
removing files. But, be aware! If your commit has already been pushed to remote repo, you have to force-pushing.
You will learn about it later...

If you noticed in our commit 13ab (hash), we added a message ".gitignored added", but we want to change this message
because the real name of the file is .gitignore. We can do it as follows:

    
    
        $ git commit --amend
    
    

Your editor will open and you can change the message to ".gitignore added", save it and close.

     
            [master 85c2310] .gitignore added
             1 file changed, 1 insertion(+)
             create mode 100644 .gitignore
        
    

You also can edit it inline using _git commit --amend -m <message\>_

     
            $ git commit --amend -m ".gitignore added"
            [master 1d5a33b] .gitignore added
             1 file changed, 1 insertion(+)
             create mode 100644 .gitignore
        
    

If something was forgotten and you changed them but you don't want to change the commit message, you can do it using
_git commit -amend --no-edit_.

### Showing details of a commit: git show <commit\>

This command shows the details of a commit, like what files were added, modified and what was modified, removed. In
our case, I created .gitignore file with the text "thisFileWillBeIgnored.txt".

     
            $ git show 85c2
            commit 85c23104b895497bf00bf59e964c48e152729150
            Author: Leonardo
            <leo@leocardz.com>
            Date: Mon Jan 26 00:55:57 2015 +0000
    
            .gitignore added
    
            diff --git a/.gitignore b/.gitignore
            new file mode 100644
            index 0000000..79591b7
            --- /dev/null
            +++ b/.gitignore
            @@ -0,0 +1 @@
            +thisFileWillBeIgnored.txt
        
    

### Viewing only the files that were changed in the last commit: git show --pretty="format:" --name-only <commit\>

     
           git show --pretty="format:" --name-only c158503
            README
            
    

### Status of a repository: git status

If you want to see the current status of the current branch your project, you can use _git status_ to show that
like listing which files are staged, unstaged, and untracked. _git status_ lets you inspect the working
directory and the staging area.

     
            $ git status
            On branch master
            Untracked files:
              (use "git add
            ..." to include in what will be committed)
    
                new_file2.txt
    
                nothing added to commit but untracked files present (use "git add" to track)
        
    

### Logging: git log

This command displays committed snapshots and all their info. With it, you can list the project history, filter it,
and search for specific changes. In contrast to _git status_, _git log_ only operates on the committed
history.

     
            $ git log
            commit 85c23104b895497bf00bf59e964c48e152729150
            Author: Leonardo
            <leo@leocardz.com>
            Date:   Mon Jan 26 00:55:57 2015 +0000
    
                .gitignore added
    
            commit 13abdd57ba00fd53a4bf5dfeb054a2277eff5026
            Author: Leonardo Cardoso
            <leo@leocardz.com>
            Date:   Fri Jan 23 13:36:05 2015 +0000
    
                Initial commit
        
    

Showing changed files, just add _--stat_:

    
        
    
    
            $ git log --stat
            commit 85c23104b895497bf00bf59e964c48e152729150
            Author: Leonardo
            <leo@leocardz.com>
            Date:   Mon Jan 26 00:55:57 2015 +0000
    
                .gitignore added
    
             .gitignore | 1 +
             1 file changed, 1 insertion(+)
    
            commit 13abdd57ba00fd53a4bf5dfeb054a2277eff5026
            Author: Leonardo Cardoso
            <leo@leocardz.com>
            Date:   Fri Jan 23 13:36:05 2015 +0000
    
                Initial commit
    
             new_file.txt | 1 +
             1 file changed, 1 insertion(+)
    
    
    
    
    
        
    

To shorten the messages excluding the empty lines, you can use _git log --stat --oneline_:

     
            $ git log --stat --oneline
            85c2310 .gitignore added
             .gitignore | 1 +
             1 file changed, 1 insertion(+)
            13abdd5 Initial commit
             new_file.txt | 1 +
             1 file changed, 1 insertion(+)
        
    

Show messages formatted, just use --pretty=oneline. It also works for git show.

     
            $ git log --pretty=oneline
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

If you want to format a commit to a .patch file like to attach to an email, just use it:
_git format-patch -1 <commit\>_

     
            $ git format-patch -1 85c2
            0001-.gitignore-added.patch
        
    

### Showing who committed the staged file: git blame <file\>

**Git** lets you show who manipulated a file by using _git blame_ command.

     
            $ git blame new_file.txt
            13abdd5 (Leonardo Cardoso 2015-01-23 13:36:05 +0000 1) First file
        
    

Showing author's email instead the author's name:

     
            $ git blame -e new_file.txt
            76a33985 (<leo@leocardz.com> 2015-01-26 01:27:05 +0000 1) Second file
        
    

To show the changes in a subset of commits using hashes:

     
            $ git blame 76a3..13ab new_file.txt
            13abdd5 (Leonardo Cardoso 2015-01-23 13:36:05 +0000 1) First file
        
    

If the file is big, you can use regular expressions to know who included some block of code in it.

    
        
            $ git blame newest_file.txt
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  1)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  2)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  3) foo (){
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  4)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  5) }
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  6)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  7) bar (){
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  8)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000  9) }
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 10)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 11) main (){
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 12)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 13) }
    
            $ git blame -L/^main/,/^}/ newest_file.txt
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 11) main (){
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 12)
            40bcf0d2 (Leonardo 2015-01-26 01:32:50 +0000 13) }
    
    
    
        
    

Note: _git blame_ only works on staged files.

     
            $ git blame thisFileWillBeIgnored.txt
            fatal: no such path 'thisFileWillBeIgnored.txt' in HEAD
        
    

### List branch files: git ls-files 

If you are a Unix-based SO user you certainly are familiar to _ls_ command, or _dir_ for Windows users. To
list the files of the current branch, use the following command:

     
            $ git ls-files
            .gitignore
            new_file.txt
            newest_file.txt
        
    

### Viewing differences between two commits in a file: git diff

_git diff_ shows changes between commits, commit and working tree, etc.

     
            $ git diff
            diff --git a/README b/README
            index aad5bd..fd9e415 100644
            --- a/README
            +++ b/README
            @@ -1 +1,2 @@
            This is the README file.
            +One more line.
        
    

_git diff HEAD_ shows the differences between the working directory and the most recent commit:

     
            $ git diff HEAD
            diff --git a/README b/README
            index aad5bd..fd9e415 100644
            --- a/README
            +++ b/README
            @@ -1 +1,2 @@
            This is the README file.
            +One more line.
        
    

If you added the files, but still want to view the difference to the last commit, _git diff --cached_ lets you
to see that. It shows difference between the staging area (index) and the last commit:

     
            $ git diff --cached
            diff --git a/README b/README
            index aad5bd..fd9e415 100644
            --- a/README
            +++ b/README
            @@ -1 +1,2 @@
            This is the README file.
            +One more line.
        
    

Viewing differences between two commits in a file: _git diff <hash\>..<hash\> <file\>_

     
            $ git diff 76a3..13ab new_file.txt
            diff --git a/new_file.txt b/new_file.txt
            index 20d5b67..4c5fd91 100644
            --- a/new_file.txt
            +++ b/new_file.txt
            @@ -1 +1 @@
            -Second file
            +First file
        
    

### Creating branches: git branch

One of the most important things on **Git** is branches. When you create a new branch, it will have the same
history and files of the current branch which you created the one from unless you specify the commit. To create a
new branch, just type: _git branch <branch\>_

     
            $ git branch developer
        
    

To list branches, just use: _git branch_
The \* indicates the current branch your project is.

     
            $ git branch
            developer
            * master
        
    

To list all branches, local and remote, just use: _git branch -a_

     
            $ git branch -a
              developer
              * master
              remotes/origin/developer
              remotes/origin/master
        
    

To go to the new branch, just use: _git checkout <branch\>_

     
            $ git checkout developer
            Switched to branch ‘developer'
        
    

To create a new branch from specified commit, just use:_git checkout <branch\> &ltcommit\>_

     
            $ git branch new_branch_name 0aa034c
        
    

### Delete a branch: git branch -d <branch\>

To delete a branch is simple: _git branch -d <branch\>_

     
            $ git branch -d developer
            Deleted branch developer (was 48f97a4).
        
    

To force deletion, use a capital "D": _git branch -D <branch\>_

### Adding a remote repo: git remote

This command lets you create, view, and delete connections to other repositories. It's most used to add the bare
repository of your local repository.
_git remote add origin <path\>_

     
            $ git remote add origin ../git_init_bare
            $ git remote add origin https://github.com/LeonardoCardoso/Movement.git
        
    

To change the origin path of a already set origin, you can use the following command:
_git remote set-url origin <path\>_

     
            $ git remote set-url origin ../git_101_bare
        
    

To check the origin, just use:

     
            $ git remote -v
            origin ../git_101_bare (fetch)
            origin ../git_101_bare (push)
        
    

### Pushing to a repo: git push <remote\> <branch\>

Pushing to a repo means to send all your local committed modifications to remote branch that you specify. It can be
done by the following command:
_git push <remote\> <branch\>_

     
            $ git push origin master
            Counting objects: 12, done.
            Delta compression using up to 4 threads.
            Compressing objects: 100% (7/7), done.
            Writing objects: 100% (12/12), 1010 bytes | 0 bytes/s, done.
            Total 12 (delta 1), reused 0 (delta 0)
            To ../git_101_bare/
             * [new branch]      master -> master
        
    

You can also force a push by using one of the two commands:
_git push <remote\> <branch\> --force_ or _git push -f <remote\> <branch\>_

     
            $ git push origin master -f
        
    

**Warning: force-pushing will overwrite the remote branch with the state of your local one.** If there are
commits on remote branch that you don't have in your local branch, you **will** lose those commits.

**Warning: be cautious about amending commits that you have already shared with other people.** Amending commits
essentially rewrites them. So they will have different hashes, which poses a problem if other people have copies of
the old commit that you've rewritten. Anyone who has a copy of the old commit will need to re-synchronize their work
with your newly re-written commit, which can sometimes be difficult. So, although the usefulness of amending, avoid
to do that if you shared the previous one with other

### Fetching a branch: git fetch <remote\> \[<remote branch\>\] \[:<local branch\>\]

This command imports commits from a remote repository into your local repo. The resulting commits are stored as
remote branches instead of the normal local branches. To fetch all branches from the origin repo. _git fetch <remote\>_

     
            $ git fetch origin
        
    

Same as the above command, but only fetch the specified branch:
_git fetch <remote\> <remote branch\>_

     
            $ git fetch origin developer
        
    

If you want to fetch a branch and automatically create a local branch linked to it, use:
_git fetch <remote\> <remote branch\>:<local branch\>_

     
            $ git fetch origin developer:dev
            From ../git_101_bare
             * branch developer  -> FETCH_HEAD
        
    

Our last example will create a local branch named _dev_ that links to _developer_. If you do not add the
local branch on git command _(:<local branch\>)_, the branch will be fetched to your local repo as a remote
branch, but no working copy branch will be created to link that.

### Pulling a branch: git pull <remote\> <branch\>

_git pull_ does a _git fetch_ followed by a _git merge_. As
told before, you can use git fetch at time you want to update your remote-tracking branches under refs/remotes/<remote\>.
It won't affect your working copy though.

However, if there is an update on a remote branch and your working copy branch is not up to date with the new
modifications, but you want to bring the updates and automatically merge it, you can simply use:
_git pull <remote\> <branch\>_

     
            $ git pull origin developer
            From ../git_101_bare
            * branch developer -> FETCH_HEAD
            Already up-to-date.
        
    

### Merging branches: git merge <branch\>

_git merge_ is design to join two or more development histories together. To merge them, you can use:
_git merge <branch\>_

     
            $ git checkout master
            $ git merge developer
            Updating 40bcf0d..9e97315
            Fast-forward
             file_on_dev_branch.txt | 0
             1 file changed, 0 insertions(+), 0 deletions(-)
             create mode 100644 file_on_dev_branch.txt
        
    

The file we created on developer branch is brought to master branch.

### Manipulating Multiple Commits: git rebase

This command allows you to edit multiple commits messages or join commits. The command is _git rebase -i <commit\>_.
But, instead of using the commit hash, you can use _HEAD~<number of commits\>_ that will show the previous N
commits before the most recent one. For example: $ git rebase -i HEAD~3

     
            $ git rebase -i 9e97
            pick 40bcf0d newest_file.txt added
            pick 9e97315 Filed added on Dev branch
            pick 18b2e67 File on third branch
    
            # Rebase 76a3398..18b2e67 onto 76a3398
            #
            # Commands:
            #  p, pick = use commit
            #  r, reword = use commit, but edit the commit message
            #  e, edit = use commit, but stop for amending
            #  s, squash = use commit, but meld into previous commit
            #  f, fixup = like "squash", but discard this commit's log message
            #  x, exec = run command (the rest of the line) using shell
            #
            # These lines can be re-ordered; they are executed from top to bottom.
            #
            # If you remove a line here THAT COMMIT WILL BE LOST.
            #
            # However, if you remove everything, the rebase will be aborted.
            #
            # Note that empty commits are commented out
    
    
        
    

When you use this command, the commit you chose is selected. And all of the commits before it is listed and some
explanations too.

For example, we want to change the commit message of 9e97315\. So, we only need to change the word _pick_ at
left side of 9e97315 to _reword_ and save the file.
After that, you file editor will be open to change the message.

     
            reword 9e97315 Filed added on Dev branch
        
    

     
            A new file added on Developer branch
    
            # Please enter the commit message for your changes. Lines starting
            # with '#' will be ignored, and an empty message aborts the commit.
            # rebase in progress; onto 76a3398
            # You are currently editing a commit while rebasing branch 'third' on '76a3398'.
            #
            # Changes to be committed:
            #     new file:   file_on_dev_branch.txt
            #
        
    

     
            [detached HEAD b0c6af7] A new file added on Developer branch
             1 file changed, 0 insertions(+), 0 deletions(-)
             create mode 100644 file_on_dev_branch.txt
            Successfully rebased and updated refs/heads/developer.
        
    

To check, let's log.

     
            $ git log --pretty=oneline
            0648d95242ff6ea5705b344aa0c86f6d956d8888 One more file on dev
            b0c6af74e252828ae8b44791f5787b9f78ce3b6a A new file added on Developer branch
            40bcf0d2c74384cd6d0514883718ab25c162cd14 newest_file.txt added
            76a339851ee01b5eedd9d787d232b4cc5da595cc Changed content new_file.txt
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

To join commits, you use _squash_. And the commit you will squash will be meld to the previous commit. And so
will their changes.

     
            pick 85c2310 .gitignore added
            pick 76a3398 Changed content new_file.txt
            squash 40bcf0d newest_file.txt added
            pick b0c6af7 A new file added on Developer branch
            pick 0648d95 One more file on dev
    
            # Rebase 13abdd5..0648d95 onto 13abdd5
        
    

When you save the file, the file editor will be prompted.

     
            # This is a combination of 2 commits.
            # The first commit's message is:
    
            Changed content new_file.txt
    
            # This is the 2nd commit message:
    
            newest_file.txt added
    
            # Please enter the commit message for your changes. Lines starting
            # with '#' will be ignored, and an empty message aborts the commit.
            # rebase in progress; onto 13abdd5
            # You are currently editing a commit while rebasing branch 'developer' on '13abdd5'.
            #
            # Changes to be committed:
            #     modified:   new_file.txt
            #     new file:   newest_file.txt
            #
        
    

Here we removed those two commit messages and we put the message "Squashed commit" instead and save it.

     
    
            Squashed commit
    
            # Please enter the commit message for your changes. Lines starting
            # with '#' will be ignored, and an empty message aborts the commit.
            # rebase in progress; onto 13abdd5
            # You are currently editing a commit while rebasing branch 'developer' on '13abdd5'.
            #
            # Changes to be committed:
            #     modified:   new_file.txt
            #     new file:   newest_file.txt
            #
        
    

     
            $ git log --pretty=oneline
            2ff5a4e099b7798787fe8e00167211c1e3e2afe2 One more file on dev
            e6b0e3a59acf76cd41f53752178d6de9768a9247 A new file added on Developer branch
            da7176b55efd62e999a2a82e7f254d37498034c0 Squashed commit
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

### Revert to a previous Git commit using git revert

This command undoes a committed snapshot. But, instead of removing the commit from the project history, it undoes
the changes introduced by the commit and appends a **new** commit. This prevents Git from losing history, which
is important for the integrity.

     
            $ git log --pretty=oneline
            dd0562dfca2fecf5c938857689a24a40fcb304ae Merge branch 'developer' of ../git_101_bare into developer
            2ff5a4e099b7798787fe8e00167211c1e3e2afe2 One more file on dev
            e6b0e3a59acf76cd41f53752178d6de9768a9247 A new file added on Developer branch
            da7176b55efd62e999a2a82e7f254d37498034c0 Squashed commit
            18b2e6771a04dc2ceabf9c4b2dcb4a00d9815eb5 File on third branch
            9e97315bcbc29140db0a6d8245c5c7a69143cdda Filed added on Dev branch
            40bcf0d2c74384cd6d0514883718ab25c162cd14 newest_file.txt added
            76a339851ee01b5eedd9d787d232b4cc5da595cc Changed content new_file.txt
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
    
        
    

     
            $ git revert 18b2
            [developer 0494017] Revert "File on third branch"
             1 file changed, 0 insertions(+), 0 deletions(-)
             delete mode 100644 file.txt
    
        
    

     
            $ git log --pretty=oneline
            04940178e51e297cd577eab608a417850c430949 Revert "File on third branch"
            dd0562dfca2fecf5c938857689a24a40fcb304ae Merge branch 'developer' of ../git_101_bare into developer
            2ff5a4e099b7798787fe8e00167211c1e3e2afe2 One more file on dev
            e6b0e3a59acf76cd41f53752178d6de9768a9247 A new file added on Developer branch
            da7176b55efd62e999a2a82e7f254d37498034c0 Squashed commit
            18b2e6771a04dc2ceabf9c4b2dcb4a00d9815eb5 File on third branch
            9e97315bcbc29140db0a6d8245c5c7a69143cdda Filed added on Dev branch
            40bcf0d2c74384cd6d0514883718ab25c162cd14 newest_file.txt added
            76a339851ee01b5eedd9d787d232b4cc5da595cc Changed content new_file.txt
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

### Revert to a previous Git commit using git checkout

This command allows to checkout a branch (showed previously), paths to the working tree or take the branch to some
commit in history.
_git checkout <commit\>_

     
            $ git log --pretty=oneline
            2ff5a4e099b7798787fe8e00167211c1e3e2afe2 One more file on dev
            e6b0e3a59acf76cd41f53752178d6de9768a9247 A new file added on Developer branch
            da7176b55efd62e999a2a82e7f254d37498034c0 Squashed commit
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

     
            $ git checkout e6b0
            HEAD is now at e6b0e3a... A new file added on Developer branch
        
    

     
            $ git log --pretty=oneline
            e6b0e3a59acf76cd41f53752178d6de9768a9247 A new file added on Developer branch
            da7176b55efd62e999a2a82e7f254d37498034c0 Squashed commit
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

Undoing accidental deletions

     
            $ git checkout -f
        
    

### Force Git to overwrite local files: git reset

If you want to throw out all of the changes you've been working on, you can use:
_$ git reset --HARD \[<commit\>\]_
If you don't insert the commit, it will be reseted to the most recent commit on remote.

     
            $ git reset --HARD 18b2
            HEAD is now at 18b2e67 File on third branch
        
    

     
            $ git log --pretty=oneline
            18b2e6771a04dc2ceabf9c4b2dcb4a00d9815eb5 File on third branch
            9e97315bcbc29140db0a6d8245c5c7a69143cdda Filed added on Dev branch
            40bcf0d2c74384cd6d0514883718ab25c162cd14 newest_file.txt added
            76a339851ee01b5eedd9d787d232b4cc5da595cc Changed content new_file.txt
            85c23104b895497bf00bf59e964c48e152729150 .gitignore added
            13abdd57ba00fd53a4bf5dfeb054a2277eff5026 Initial commit
        
    

### Stashing modifications: git stash

Stashing is a great way to pause what you're currently working on and come back to it later. Suppose that we are
making some changes and we are not done yet, but someone needs urgently that we fix some thing in some previous
commit. So we can freeze our local modifications using:
_git stash_

     
            $ git add .
            $ git stash
            Saved working directory and index state WIP on developer: 8178777 Merge branch 'developer'
            HEAD is now at 8178777 Merge branch 'developer'
        
    

So, the files go back to state on the most recent commit on tracking. After we do the fixes, we just need to use _git
stash list_ to visualize the existing stashes.

     
            $ git stash list
            stash@{0}: WIP on (no branch): 2ff5a4e One more file on dev
        
    

And to apply we use _git stash apply stash@<stash number\>_

     
             $ git stash apply stash@{0}
            On branch developer
            Changes not staged for commit:
              (use "git add
            ..." to update what will be committed)
                  (use "git checkout --
                ..." to discard changes in working directory)
    
                    modified:   one_more_file_on_dev.txt
    
                    no changes added to commit (use "git add" and/or "git commit -a")
        
    

We can quickly apply the last stash using _git stash pop_. With this command, the applied stash is also
deleted.

### Cleaning up untracked files: git clean

Files may pile up in your working directory that are left over from merges, generated, or even put mistakenly there.
No matter what, you don't need to ignore them in .gitignore, you just need to remove them. This command dries up the
current branch. The following command will list the files to be removed:
_git clean -n -d <path\>_

     
            $ git clean -n -d -x
            Would remove .DS_Store
            Would remove thisFileWillBeIgnored.txt
        
    

The command to clean is _git clean -i -d -x_

     
            $ git clean -i -d -x
            Would remove the following items:
              .DS_Store                  thisFileWillBeIgnored.txt
            *** Commands ***
                1: clean                2: filter by pattern    3: select by numbers    4: ask each
                5: quit                 6: help
            What now> 1
    
            Removing .DS_Store
            Removing thisFileWillBeIgnored.txt
        
    

### Bringing specific commit to current branch: git cherry-pick

Cherry picking in git means to choose a commit from one branch and apply it onto another. So there is no need to
merge the entire branch. Make sure you are in the right branch to cherry-pick the commit from another.
_git cherry-pick <commit-hash\>_

     
            $ git cherry-pick 45fd
            Finished one cherry-pick.
            [master]: created 567ed1: “README file."
            1 file changed, 1 insertions(+), 0 deletions(-)
            create mode 100644 README.txt
        
    

### Tagging releases: git tag

Tags are used for creating stable releases. To do that, simply use the following code:
_git tag <version\>_

     
            $ git tag 1.0
            $ git push --tags
            Counting objects: 7, done.
            Delta compression using up to 4 threads.
            Compressing objects: 100% (3/3), done.
            Writing objects: 100% (3/3), 417 bytes | 0 bytes/s, done.
            Total 3 (delta 1), reused 0 (delta 0)
            To ../git_101_bare/
             * [new tag]         1.0 -> 1.0
        
    

     
            $ git tag 2.0
            $ git push origin tag 2.0
            Total 0 (delta 0), reused 0 (delta 0)
            To ../git_101_bare/
             * [new tag]         2.0 -> 2.0
        
    

Listing tags:

     
            $ git tag -l
            1.0
            2.0
        
    

### Logging the whole thing: git reflog

Reflog is a mechanism which **Git** tracks the updates to the tip of branches. Even though the changesets are not
referenced by any branch or tag. Thus, you can go back to them. After rewriting history, the reflog contains
information about the old state of branches.

     
    
            $ git reflog
            18b2e67 HEAD@{0}: checkout: moving from developer to third
            48f97a4 HEAD@{1}: checkout: moving from master to developer
            8178777 HEAD@{2}: checkout: moving from third to master
            18b2e67 HEAD@{3}: checkout: moving from master to third
            8178777 HEAD@{4}: merge developer: Merge made by the 'recursive' strategy.
            18b2e67 HEAD@{5}: merge third: Fast-forward
            9e97315 HEAD@{6}: checkout: moving from developer to master
            48f97a4 HEAD@{7}: commit: One more file on dev
            9e97315 HEAD@{8}: checkout: moving from master to developer
            9e97315 HEAD@{9}: checkout: moving from third to master
            18b2e67 HEAD@{10}: commit: File on third branch
            9e97315 HEAD@{11}: checkout: moving from master to third
            9e97315 HEAD@{12}: merge developer: Fast-forward
            40bcf0d HEAD@{13}: checkout: moving from developer to master
            9e97315 HEAD@{14}: commit: Filed added on Dev branch
            40bcf0d HEAD@{15}: checkout: moving from master to developer
            40bcf0d HEAD@{16}: commit: newest_file.txt added
            76a3398 HEAD@{17}: commit: Changed content new_file.txt
            85c2310 HEAD@{18}: commit (amend): .gitignore added
            44e0174 HEAD@{19}: commit: .gitignored added
            13abdd5 HEAD@{20}: commit (initial): Initial commit
    
    
        
    

To go back to an old state, use _git reset --hard <commit hash\>_

### Resolving conflicts

In many cases, you might see conflicts using **Git**. It consists basically of the same part of a file is changed
on commits in two different branches without being updated before (merging). For example, if you make a change on a
particular line in a file, and your colleague working in a repository makes a change on the exact same line, a merge
conflict occurs. To solve that, you need to merge the file checking which differences must be remained in the file.
After resolving the conflicts, you can add the file to index back again.

A conflict-marked area begins with <<<<<<< and ends with \>\>\>\>\>\>\>, the conflict markers. The two conflicting blocks
themselves are divided by a =======. They need to be removed from the file after you inspect the file.

     
            <<<<<<< HEAD
    
            Here is the original change.
            =======
    
            Here is the modified change.
    
            >>>>>>> 99db324742823c55d975b605e1fc22f4253a9b7d
    
        
    

On this post, there are the main commands that you will use. But there are many others that you can check it out on
its official documentation [git-scm.com][4]

**Complementary readings**

[Git Howto: Revert a Commit Already Pushed to a Remote Repository][5]
  


[0]: http://git-scm.com/downloads
[1]: http://en.wikipedia.org/wiki/Vi” target=
[2]: http://www.sublimetext.com/” target=
[3]: #branch
[4]: http://git-scm.com
[5]: http://christoph.ruegg.name/blog/git-howto-revert-a-commit-already-pushed-to-a-remote-reposit.html