# GIT HUB GUIDE FOR NEWBS:

## Table of Contents

### Get Started Quick:

1. [Never Used GitHub Before? - Get Started Quick](#never-used-github-before)




### Common Errors and Solutions

#### Errors:

1.  [Updates were rejected because the tip of your current branch is behind](#tip-of-your-current-branch-is-behind)

---

## Contents:

### Get Started Quick Guide

<a name="never-used-github-before"></a>

1) [Download or Clone remote repository to local location](#download-clone-remote-repository-to-local)
2) [Create a local GitHub repository](#create-local-github-repository)
    <!-- B.  Create a local GitHub repository with "git init" -->
    <!-- C.   -->
    
    
    
    <a name="download-clone-remote-repository-to-local"></a> Download or Clone remote repository to local location:
    
        A. Download
            
            1.  Download .zip file
            2.  Browse to Directory and Extract
            
        B. Clone remote Repository to Local Location:
            
            1.  Browse to Directory you want to Store Repository (in your command window of choice)
            2.  At Command Prompt Run:

                git clone "url link provided by GitHub"
                
                git clone https://github.com/RecursiveThinking/recursive_thinking_website.git
    
    <a name="create-local-github-repository"></a> Create a local GitHub repository:
    
        I have no idea what I was thinking about when I wrote this...
    
### Common Errors and Solutions

1)
    <a name="tip-of-your-current-branch-is-behind"></a>Updates were Rejected
    
    Occurs when:  Trying to push to master - command: 
    
    ```git push origin master```
    
        Full Error:
    
        failed to push some refs to 'your https/github link here'
        hint: Updates were rejected because the tip of your current branch is behind
        hint: its remote counterpart.  Integrate the remote changes (e.g.
        hint: 'git pull ...') before pushing again.
        hint: See the 'Note about fast-forwards' in 'git push --help' for details

    Solutions:
    
    To see the changes between the local branch and the master branch - use
    
    ```git diff --stat master origin/master```
    
    ```javascript
    function(var){
        return var
    }
    ```
    
    
    
    
    
    
    
    
    
    <!-- Helpful links: -->
    
    <!-- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet -->
    <!-- https://guides.github.com/features/mastering-markdown/ -->
    <!-- https://docs.kumu.io/guides/markdown.html -->
    
    
    
    <!-- Images -->
    <!-- ![Kumu Logo](http://blog.kumu.io/content/images/2015/08/kumu-logo-cutout-full-dark.png) -->