# GIT HUB GUIDE FOR NEWBS:

## Get Started Quick:

1. [Never Used GitHub Before?](#never-used-github-before)























## Common Errors and Solutions


Errors:


1.  [Updates were rejected because the tip of your current branch is behind](#tip-of-your-current-branch-is-behind)



#### Get Started Quick

<a name="never-used-github-before"></a>Never Used GitHub Before?

1) [Download / Clone remote repository to local location](#download-clone-remote-repository-to-local)
2) [Create a local GitHub repository](#create-local-github-repository)
    <!-- B.  Create a local GitHub repository with "git init" -->
    <!-- C.   -->
    
    
    
    <a name="download-clone-remote-repository-to-local"></a> Download / Clone remote repository to local location:
    
        Either 
    
    <a name="create-local-github-repository"></a> Create a local GitHub repository:
    
        Either 
    
#### Common Errors and Solutions

1)
    <a name="tip-of-your-current-branch-is-behind"></a> Create a local GitHub repository:
    
    Occurs when:  Trying to push to master - "git push origin master"
    
        Full Error:
    
        failed to push some refs to 'your https/github link here'
        hint: Updates were rejected because the tip of your current branch is behind
        hint: its remote counterpart.  Integrate the remote changes (e.g.
        hint: 'git pull ...') before pushing again.
        hint: See the 'Note about fast-forwards' in 'git push --help' for details

    Solutions:
    
    To see the changes between the local branch and the master branch - use
    
    git diff --stat master origin/master