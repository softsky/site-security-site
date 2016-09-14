**Better DOM-based XSS Vulnerabilities Detection**
==================================================

**The Dangers of XSS Attacks**
------------------------------

[Cross-site scripting](http://www.acunetix.com/websitesecurity/xss/)
(also referred to as XSS) is a vulnerability that allows an attacker to
send malicious code (usually in the form of JavaScript) to another user.
This vulnerability is being used more and more in real-world attacks and
can have a very [damaging impact on affected
websites](http://www.ehackingnews.com/2013/01/yahoo-mail-accounts-hacked-by-dom-based.html).

Two recent incidents highlighted the severity of this vulnerability:

1.  Apple’s Developer Website was recently hacked and the [hacker used
    > XSS
    > vulnerabilities](http://mytechblog.com/2013/07/apple-developer-website-hacked-what-happened/)
    > to achieve its goal. Tens of thousands of customer data records
    > were at risk as a result of the attack and the developer website
    > was non-functional for more than a week.

2.  Canonical’s Ubuntu Forums were also hacked [using a XSS
    > vulnerability](http://blog.canonical.com/2013/07/30/ubuntu-forums-are-back-up-and-a-post-mortem/):
    > the attacker sent private messages to three administrators
    > claiming that there was a server error on the announcement page
    > and asking the Forum administrators to take a look. The private
    > message contained an XSS exploit and the attacker managed to steal
    > their cookies gaining access to the administrator control panel.
    > 1.82 million logins and email addresses were stolen.

As seen in the examples above, XSS vulnerabilities can be very dangerous
and should be fixed as soon as possible.

Acunetix Web Vulnerability Scanner is the market leader at detecting XSS
vulnerabilities and in [version
9](http://www.acunetix.com/vulnerability-scanner/) we make it even
better with improvements in the detection of DOM-based XSS
vulnerabilities.

While a traditional cross-site scripting vulnerability exploits
server-side code, document object model [(DOM) based cross-site
scripting](http://www.acunetix.com/blog/web-security-zone/articles/dom-xss-explained/)
is a type of vulnerability which affects the script code being executed
in the client’s browser.

DOM-based XSS vulnerabilities are much harder to detect than classic
[XSS vulnerabilities](https://www.acunetix.com/websitesecurity/xss/)
because they reside on the script code from the website. An automated
scanner needs to be able to execute the script code without errors and
to monitor the execution of this code to detect such vulnerabilities.
Very few web vulnerability scanners can really accomplish this. In
comparison, classic XSS vulnerabilities are easier to detect as the
detection process doesn’t require the capability of executing and
monitoring script code. Most web vulnerability scanners can only detect
the classic XSS vulnerabilities.

**How Acunetix WVS Detects DOM XSS Vulnerabilities**
----------------------------------------------------

Acunetix WVS version 9 introduces the [DeepScan
technology](http://www.acunetix.com/websitesecurity/crawling-html5-javascript-websites/),
which drastically improves the automatic detection of [DOM-based
XSS](http://www.acunetix.com/blog/web-security-zone/articles/dom-xss-explained/)
by tracing the execution of the script code from the scanned website.
Acunetix WVS can now monitor a list of sources such as document
location, Referrer, and window.name, and trace the data flow until it
reaches various sinks that can cause an XSS vulnerability. Examples of
such sinks are eval function, document.write, location change and so on.

Here is an example of a DOM-based XSS vulnerability discovered in our
[testhtml5](http://testhtml5.vulnweb.com/) website.

![](media/website-security/improving-dom-xss-vulnerabilities-detection.md-images/media/image03.png){width="4.166666666666667in"
height="1.1388888888888888in"}

*Click to enlarge*

In the alert details shown above, the data from window.name source
reaches an ‘evaluate code’ sink (such as the function eval, setTimeout)
and therefore the script code is deemed to be vulnerable.

However, other DOM-based XSS vulnerabilities are much harder to detect
than this one. Nowadays, more and more modern HTML5 websites are using
the location hash to store custom data. A good example of such web
applications are Single Page Applications (SPA).

A single-page application (SPA) is a web application or web site that
fits on a single web page with the goal of providing a more fluid user
experience akin to a desktop application. In an SPA, the appropriate
resources are dynamically loaded and added to the page as necessary,
usually in response to user actions.

Our new [test HTML 5 website](http://testhtml5.vulnweb.com/) was built
as a SPA web application. Its URLs are designed to look like:

-   http://testhtml5.vulnweb.com/\#/popular

-   http://testhtml5.vulnweb.com/\#/latest

-   http://testhtml5.vulnweb.com/\#/latest/page/1

-   http://testhtml5.vulnweb.com/\#/carousel

-   http://testhtml5.vulnweb.com/\#/archive

-   http://testhtml5.vulnweb.com/\#/about

-   http://testhtml5.vulnweb.com/\#/contact

-   http://testhtml5.vulnweb.com/\#/redir?url=http://pwnies.com/nominations/index.html

All the URLs shown above are using the location hash to determine the
target page. There is only one real page (/) and this is page is loading
various sections of the website by using the value of the location hash
parameter. The web server doesn’t see any of the URLs above, everything
is happening only in the client’s browser and the page is not reloaded
(making the navigation faster).

However, even this type of web applications can have vulnerabilities.
For example, the number after the /\#/latest/page hash sequence can be
manipulated and see how this data is being parsed.

Acunetix WVS version 9 is capable of automatically finding such complex
vulnerabilities. It gathers a list of all the location hash URIs and
analyzes them trying to identify patterns. It then split them in
fragments (like it does on URL path fragments) and manipulates each
fragment individually.

For example, the URI /\#/latest/page/1 is split in 3 fragments (based on
the / character) and each fragment is tested. DeepScan manipulates each
fragment and monitors the script execution in order to identify if the
execution reaches any DOM XSS sinks.

In this case, the page parameter is indeed vulnerable and Acunetix WVS
issued the following alert:

![](media/website-security/improving-dom-xss-vulnerabilities-detection.md-images/media/image04.png){width="4.166666666666667in"
height="0.8611111111111112in"}

*Click to enlarge*

Using the location hash printed above is possible to exploit the
DOM-based XSS vulnerability.

Acunetix WVS goes even further.

Another interesting URI is
/\#/redir?url=http://pwnies.com/nominations/index.html. This URI is
using the query string notation of specifying parameters but inside the
location hash. Acunetix WVS can handle this situation by understanding
that the URL is a query string parameter and manipulates it accordingly
and issues the following alert:

![](media/website-security/improving-dom-xss-vulnerabilities-detection.md-images/media/image05.png){width="4.166666666666667in"
height="0.875in"}

*Click to enlarge*

The URL parameter from the /\#/redir hash is used to redirect to a
certain URL. The code looks like this:

&lt;script&gt;\
var redirUrl =
decodeURIComponent(window.location.hash.slice(window.location.hash.indexOf("?url=")+5));\
if (redirUrl) window.location = redirUrl;\
&lt;/script&gt;

The code looks for the ?url= in the location hash and if found, it
assigns what follows to the window.location property. This of course is
causing an XSS vulnerability.

The detection of DOM-based XSS vulnerabilities is very laborious, making
them difficult to detect manually. The situation is not going to
improve, since DOM XSS vulnerabilities are expected to be more
widespread in modern[HTML5 web
sites](http://www.acunetix.com/vulnerability-scanner/html5-website-security/).
Acunetix Web Vulnerability version 9 can detect such vulnerabilities
automatically, thereby reducing the resource-intensive task of detecting
such vulnerabilities.
