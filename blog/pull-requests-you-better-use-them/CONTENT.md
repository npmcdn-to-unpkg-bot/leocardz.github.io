Pull requests are a feature that many of repository hosting service provides such [GitHub][0] and [Bitbucket][1]. It is a better way of submitting contributions to a project using a distributed version control system such as Git or Mercurial and easier for developers to collaborate.

It is important to highlight that PRs are a **workflow feature**, and **not** a feature of the version control system itself. And pull requesting occurs when a developer asks for changes committed to an external repository, often the local repository and a different branch from the branch you want to pull request to, to be considered for inclusion in a project's main repository.

PRs are basically a mechanism for a developer to tell team members that he/she has completed a feature and it's ready to be included often on other branch by merging. Thus, all team members are notified of a new PR and can inspect it and merge it, including you _~ but it's not a good practice ~_.

Generally, the hosting services provide a complete forum showing all info about the changes, who did it, why did it... 

PR flow is basically:

1. You made changes on your branch and pull it to your respective branch on remote repository
2. Then, on its hosting service there is a link to create a pull request where you choose the repo which is the source of the modifications and the destination.
3. The team members, **not you**, analyse your modifications, discuss them, alter them, aprove them.
4. When all is ok, the project maintainer merges it.
5. PR is closed.

Below is an real example of one of my repo in GitHub: [Facebook Link Preview][2]. Some developers has forked my repo and pull-requested to it.

**List of pull requests**

![](http://i.imgur.com/62s5kwF.png) 

**Pull request flow**

![](http://i.imgur.com/Z982tWa.png) 

**Pull request commit**

![](http://i.imgur.com/d87b0Nj.png) 

Here are two links to know about them:

* [GitHub pull requests][3]
* [Bitbucket pull requests][4]


[0]: http://github.com
[1]: http://bitbucket.com
[2]: https://github.com/LeonardoCardoso/Facebook-Link-Preview/
[3]: https://help.github.com/articles/using-pull-requests/
[4]: https://www.atlassian.com/git/tutorials/making-a-pull-request/