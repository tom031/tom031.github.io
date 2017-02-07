---
layout: "post"
title: "Go for a walk with Jekyll on a cloudy day: Part 1"
published: true
date : 2017-02-06
category: ""
categories: ""
tags: ""
author: Tom Dinh
---
<h3>Part 1: Deploy Jekyll on Azure</h3>
<p> When I planned to create this blog, I also planned cloud-based my blog, this would be a piece of cake if I used WordPress because Azure with DreamSpark subscription allow the user to “one-click deploy” a WordPress on Azure. Jekyll is totally different (This is Jekyll on Azure, not GitHub-Pages)..</p>

<p>Azure allow you to deploy by Git CLI (locally), as well as, continuous deployment with GitHub repo, but like GitHub-Pages, you can’t access the static files such as a JSON data file when your page is deploying, per my own experiences on my blog page in 5 cases after following those solutions.</p>

[Channel 9 Develop and Deploy Jekyll Static Blog to Azure from Visual Studio with Bash on Ubuntu on Windows](https://channel9.msdn.com/Blogs/WinCoder/Develop-and-Deploy-Jekyll-Static-Blog-to-Azure-from-Visual-Studio-Code-with-Bash-on-Ubuntu-on-Window)

[Publish a website with Jekyll using extention on Azure](https://gordon-breuer.de/azure/2016/03/01/Publish-a-website-with-Jekyll-and-Github-on-Windows-Azure.html)

[Deploy Jekyll Azure App Service](http://hintcoding.azurewebsites.net/azure/2016/04/16/deploy-jekyll-azure-app-service-one.html
)

<p>This is scenarios summarizing table:</p>

Scenarios| Description | Built Status
:---:|:---:|---:
[1](#Scenario1)|Used built in Jekyll extension on Azure | Fail
[2](#Scenario2)|Not used built in Jekyll extension, using **Git CLI**  and `deploy.cmd` and `getruby.cmd`|Success
[3](#Scenario3)|Used built in Jekyll extension without `deploy.cmd` and `getruby.cmd` | Fail
[4](#Scenario4)|Used `.deployment` without extension | Success
[5](#Scenario5)|Continuous deployment of Scenario 4 on GitHub repo | Success

[Conclusion](#Conclusion)
<p>The very first step you need to setup a Azure App Service</p>
<p>When you success created, this is how the Web root look like</p>

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/Azure%20first%20init.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/Azure%20first%20init.jpg" border="0" alt=" photo Azure first init.jpg"/></a>

<div id="Scenario1"><h3>Scenario 1: Used built in Jekyll extension on Azure</h3></div>
<p>Step 2: install Jekyll extension</p>
<p>In your Web App, go to Extension>Add>Jekyll.</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/add%20jekyll%20extention.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/add%20jekyll%20extention.jpg" border="0" alt=" photo add jekyll extention.jpg"/></a>
<p>This is how the root look like with Extension added</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/Jekyll%20extention.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/Jekyll%20extention.jpg" border="0" alt=" photo Jekyll extention.jpg"/></a>
<p>Step 3: Push and the Error</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/error%20deployment%20failse.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/error%20deployment%20failse.jpg" border="0" alt=" photo error deployment failse.jpg"/></a>

<div id="Scenario2"><h3>Scenario 2: Not used built in Jekyll extension, using **Git CLI**  and `deploy.cmd` and `getruby.cmd`</h3></div>
When you push, Kudu is smart enough to using `deploy.cmd` and `getruby.cmd` to setup evething up for you on the cloud like running in localhost environment with `jekyll serve` command.
<p>And this is how the root look</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/noextentiondeploy.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/noextentiondeploy.jpg" border="0" alt=" photo noextentiondeploy.jpg"/></a>

<div id="Scenario3"><h3>Scenario 3: Used built in Jekyll extension without `deploy.cmd` and `getruby.cmd`</h3></div>
<p>after push the error page similar with Scenario 1, which is confict Ruby version.</p>

<div id="Scenario4"><h3>Scenario 4: Used `.deployment` without extension</h3></div>
<code>[config] <br/>
project = _site</code>
<p>this 2 lines of code in `.deployment` are enough for Kudu to deploy your rendered page in _site folder.</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/PureJekyll.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/PureJekyll.jpg" border="0" alt=" photo PureJekyll.jpg"/></a>
<div id="Scenario5"><h3>Scenario 5: Continuous deployment of Scenario 4 on GitHub repo</h3></div>
<p>On your App go to Deployment option choose GitHub and branch.</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/github%20with%20pure%20jekyll.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/github%20with%20pure%20jekyll.jpg" border="0" alt=" photo github with pure jekyll.jpg"/></a>
<p>Azure will automatically deploy your code after every commit you push on that branch.</p>
<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllandClouds/continues%20deploy.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllandClouds/continues%20deploy.jpg" border="0" alt=" photo continues deploy.jpg"/></a>

<div id="Conclusion"><h3>Conclusion</h3></div>
The fail of Scenario 1 and 3 are cause by the confict of Ruby version of Jekyll's runtime dependency on the server lead to not found the required bundler.

Kudu is smart enough for deploy a hold environment or just a static files folder like scenario 2  and 4. Azure's feature: continuous deployment is very handy for deploying code from GitHub.