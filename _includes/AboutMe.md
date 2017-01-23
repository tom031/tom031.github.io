<!-- include in about.html-->
<h3> Hi ! <br/> My name is Tom Dinh.</h3>
    <p> Actually I got two names: <a href="https://en.wikipedia.org/wiki/%C4%90inh_dynasty">Đinh</a> Mạnh Hoàng is my Viet paper
        name legally. but people call me Tom, in Vietnamese writing is <b> Tôm </b>, it means a <i>lobster/shrimp/prawn</i>,
        it not short for Thomas like in English. In Thai, it means boiling process.</p>
    {% for image in site.static_files %} {% if image.path contains 'pictures/postPics/About/lobster.jpg' %}
    <img src="{{ site.baseurl }}{{ image.path }}" alt="Hello!, it's me!'" /> {% endif %} {% endfor %}

    <h4>Ok, that's enough for my name. And this is my story. </h4>

    <p>I'm a developer, my coding journey starts in 2009 since I went to the university.</p>
    <h3>So, if you wonder why I become a code adventurer?.</h3>
    <p>{% markdown %}Well, as a youngster like every youngster, I love computer games and video games. My first PC, which my parents gave
        me in 2005 is [a heavy CRT secondhand PC]({{ site.baseurl }}/pictures/postPics/About/upgratetime.jpg){:target="_blank"} with 20GB HDD, 256MB of RAM, 
        Pentium IV first gen run Windows XP and a dial-up
        connection. That was a whole new world for me that time to start my adventure in IT world.{% endmarkdown %}</p>

    {% markdown %} ![coding]({{ site.baseurl }}/pictures/postPics/About/kidcode.jpg) {% endmarkdown %}

    <p>In high school, I learned to use the computer professionally, the first start with DOS Command lines and Windows them
        come to Pascal and C with Turbo Pascal, Borland Turbo C and FoxPro those are my first IDE ever. This time was simple
        I learned some code syntax as loops; switch; if and nested, just to solve some elementary algebra equations as Linear
        equation; Quadratic equation ... </p>
    {% markdown %} ![Hacking]({{ site.baseurl }}/pictures/postPics/About/hacking.jpg) {% endmarkdown %}

    <p>From 2008 to 2015 at university, I learned VB; C#; Java; Javascript, HTML/CSS to develop some study projects using VB.Net
        Forms and PHP solutions such as Joomla, Wordpress. OpenCart and Prestashop. I sometimes use Eclipse for PHP project
        but Visual Studio is my best friend IDE since the VB.NET time, until today when I work with ASP.NET MVC and AngularJS.</p>
