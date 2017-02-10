---
layout: "post"
title: "How to: Jekyll and Disqus on mutiple domains"
published: "true"
date : 2017-02-10
category: ""
categories: ""
tags: ""
author: Tom Dinh
---
In this article I defined some issues with Jekyll and Disqus on multiple domains, as well as solution and debug the encountered errors.

**Note**: Due to the highlight code syntax executed. To display, the code below may wrong syntax. You need to reformat it on the right syntax before use. Thanks.

|Issues|| Solution || Errors || Debug |
|---- || :----: || :----:  ||----:|
|Jekyll|| [Section 1](#Section1) || [URL](#URL) || [URL](#URL) |
|Disqus|| [Section 2](#Section2) || [Load errors](#Loaderrors) || [Trusted Domains](#TrustedDomains) |


************

### Define issues
1. Jekyll itself is a simple, blog-aware, static site generator with no databases needed, but it has site data under _data folder or any static files supported. Because GitHub-Pages was tailored to hosting on GitHub repo and deeply integrated with Jekyll, that why you need some tricks to hosting Jekyll and GitHub-Pages with multiple domain names or continuous delivery/deployment on your server.

2. Disqus a commenting system hosting service for websites and online communities, it provides you comment counting and comment widget, and you need to do the right configuration for Disqus if you want your blog’s comments hosting on multiple domain, as well as your blogs or websites.

<div id ="Section1"></div>

### Solutions

+ **Section 1: Jekyll** 
<span id="URL"></span>
Technically, Jekyll is a static site generator, it allowing you to host on any web server, it like you go in a time machine travel back to 90s, the earlier era of the Internet.

[23 ancient web sites that are still alive](http://gizmodo.com/5960831/23-ancient-web-sites-that-are-still-alive)

The tricks for Jekyll to be able to host or continuous delivery/deployment to multiple server is inside the `_config.yml` where 2 value:

`baseurl: "" `# the subpath of your site, e.g. /blog

`url: ""` # the base hostname & protocol for your site

will define your hosting and domain name and you consuming data from it by using `site.baseurl` and `site.url` in your page for internally links.

My suggestion is leave it all blank, without any predefine value Jekyll smart enough to get your current host and protocol, to prepend for your internally links. Your internal page navigation on different domains till working like nothing happen.

<div id ="Section2"></div>

+ **Section 2: Disqus** 

It is a lot more to do with Disqus than Jekyll, from create your new `site/forum/disqus_shortname` to `JavaScript configuration variables`.
In this section, I just want to show the trick to config your disqus working on multiple domain.

If you don’t know how to add disqus into your Jekyll blog, there are many blog posts about it, or you can quickly go here: [adding-disqus-to-a-jekyll-blog](http://sgeos.github.io/jekyll/disqus/2016/02/14/adding-disqus-to-a-jekyll-blog.html).

**On Disqus website**

1.	Create your site with your `disqus_shortname` for your blog and then go to `Admin`.

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/Admin%20site.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/Admin%20site.jpg" border="0" alt=" photo Admin site.jpg"/></a>

2.	Go to `Setting` and set your `Website URL` with a default domain.

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/WebsiteURL.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/WebsiteURL.jpg" border="0" alt=" photo WebsiteURL.jpg"/></a>

**This is importance** because even you have multiple domains you need to have a **default domain** name for Disqus to be able to generate your `Discussions link` for each of your post, and it also easy for you to `maintain/migrate/moderate` your blog comments later.

3.	Go to `Advanced` add your `Trusted Domains`.

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/trusteddomain.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/trusteddomain.jpg" border="0" alt=" photo trusteddomain.jpg"/></a>

Ok, that is done for the Disqus setup, next you need to config JavaScript variables on your  development environment.

[**JavaScript configuration variables**](https://help.disqus.com/customer/en/portal/articles/472098-javascript-configuration-variables)

Below is the code for `disqus_config` function, two importance variables are:

{% highlight javascript %}
{% raw %}
this.page.identifier = {{ page.id }};
this.page.title = {{ page.title }};
{% endraw %}
{% endhighlight %}


{% highlight javascript %}
{% raw %}
var disqus_shortname = {{ site.disqus }};
		var disqus_config = function () {
			this.page.identifier = {{ page.id }};
			this.page.title = {{ page.title }};
			//this.page.url = // optional
		}; 
{% endraw %}
{% endhighlight %}


+ `this.page.identifier` should be unique, in this case you can use **{{ page.id }}** this will return a relative link of your post, eg `/2016/11/22/welcome-to-Toms-blog`. 

+ `this.page.title` allowing Disqus to create a discussion hosting on Disqus with you post’s title.

+ `this.page.url` is optional but since you leave `site.url` and `site.baseurl` blank , you need to get your protocol and domain with JavaScript or `site.url` + `page.url` , due to `this.page.url` required an **absolute URL**.

{% highlight javascript %}
{% raw %}
var getProtocol = document.location.protocol;
var getDomain = document.domain;				
this.page.url = getProtocol + '//' + getDomain + {{ page.url }};
or
this.page.url = {{site.url}} + {{ page.url }};
console.log(this.page.url);
{% endraw %}
{% endhighlight %}

# Extra

If your follow *Brendan A R Sechter’s* instruction you may use **disqus count**, to make it work on multiple domains you need extra `data dash variable` in the htmt tag, it is `data-disqus-identifier` or `data-disqus-url` (required `this.page.url`).

In `post` layout the code will be

{% highlight html %}
{% raw %}
<a href={{ post.url }}#disqus_thread data-disqus-identifier={{ page.id }}>0 Comments</a> 
{% endraw %}
{% endhighlight %}

In your `index.html` will look like
{% highlight html %}
{% raw %}
<a href={{ post.url }}#disqus_thread  data-disqus-identifier={{ post.id }}>0 Comments</a>  
{% endraw %}
{% endhighlight %}

### Note: 

It will take around `20 mins` for Disqus async your comments count on those link, so be patient it will update soon.

<span id="Loaderrors"></span>

## Errors encountered

Your page may have some errors like

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/errorloadJPG.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/errorloadJPG.jpg" border="0" alt=" photo errorloadJPG.jpg"/></a>

or

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/disqus-issue.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/disqus-issue.jpg" border="0" alt=" photo disqus-issue.jpg"/></a>

It causes by **Trusted Domains** in the initialize discussion link process on Disqus.
<span id="TrustedDomains"></span>

### Simplify

 When a post with load include Disqus Widget, it will create a `Discussion link` hosting on Disqus, so be careful of the first load (you should use your **default domain** to do the first/test load). If it not a **Trusted Domains** it will not load the widget cause Disqus need to create a discussion first, ( if you test it on localhost when init link on **default domain** finished, you need to restart Jekyll).

You can double check when is the Discussion link is created or not on Disqus.

<a href="http://s498.photobucket.com/user/tom0313/media/Blog%20post/JekyllDiscusHosing/discusslinkJPG.jpg.html" target="_blank"><img src="http://i498.photobucket.com/albums/rr350/tom0313/Blog%20post/JekyllDiscusHosing/discusslinkJPG.jpg" border="0" alt=" photo discusslinkJPG.jpg"/></a>

If you have any question please comment below. Happy blogging.