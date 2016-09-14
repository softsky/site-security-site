**CSRF Attacks, XSRF or Sea-Surf – What They Are and How to Defend Against Them**
=================================================================================

Cross-Site Request Forgery, or CSRF for short is a common and regular
online attack. CSRF also goes by the acronym XSRF and the phrase
“Sea-Surf”. CSRF attacks include a malicious exploit of a website in
which a user will transmit malicious requests that the target website
trusts without the user’s consent. In [Cross-Site Scripting
(XSS)](http://www.acunetix.com/websitesecurity/cross-site-scripting/),
the attacker exploits the trust a user has for a website, with CSRF on
the other hand, the attacker exploits the trust a website has against a
user’s browser.

Basically, an attacker will use CSRF to trick a victim into accessing a
website or clicking a URL link that contains malicious or unauthorized
requests. It is called ‘malicious’ since the CSRF attack will use the
identity and privileges of the victim and impersonate them in order to
perform any actions desired by the attacker, such as change form
submission details, and launch purchases or payments for the attacker or
a third-party account.

Upon a request against most websites, browsers will include along any
credentials related with the particular website, such as the session
cookie of the user, basic authentication credentials, the IP address of
the user, etc. Thus, if user’s authentication session is still valid, an
attacker can use CSRF to launch any desired requests against the
website, without the website being able to distinguish whether the
requests are legitimate or not.

**A Simple Example of a Cross-Site Request Forgery**
----------------------------------------------------

As described above, in order for a CSRF attack to be performed, the user
must be authenticated with the target website. Assuming the victim is
authenticated, the attacker can include a link or script in a
third-party website that the victim visits. Thus, when the victim visits
that website or link, the rogue script will be executed without the
victim being aware of it. For instance, in a chat forum, an attacker
posts a message which contains an image tag or an HTML image element.
However, the source of the image contains a link which performs an
action on a victim’s bank website account. So, instead of an image file
the attacker has included a link that performs a bank transaction. Below
is an example of the image tag containing a rogue URL.

&lt;img
src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=Fred"&gt;

The above is a CSRF attack using an HTTP GET request. As we shall see
later, a prevention method would allow only HTTP POST requests, in order
to prevent the above attack method. However, this can be easily
bypassed, since an attacker can use an HTTP POST request to perform a
CSRF attack.

**CSRF Example Using an HTTP POST Request**
-------------------------------------------

In this example the attacker will use an HTTP POST request to realize a
CSRF attack. Since the HTTP GET request is not allowed to be used as a
prevention measure against a CSRF attack, an attacker can use the HTTP
POST request which will perform the CSRF as successfully as the HTTP GET
request. It is very difficult for the target website to distinguish
between legitimate and rogue HTTP GET or POST requests, since the
requests are sent from a “trusted” browser. That means that if no
prevention measures are in place, a CSRF attack can be performed
transparently without the victim or target website realizing it.

The purpose of the attack, in this example, is to change the profile
information of a particular user (victim) on the target website. The
target website for this example will be http://testphp.vulnweb.com/.

![](media/website-security/csrf-attacks.md-images/media/image14.jpg){width="5.0in"
height="4.430555555555555in"}

The victim has an account on testphp.vulnweb.com which includes personal
information as seen below.

![](media/website-security/csrf-attacks.md-images/media/image10.jpg){width="5.0in"
height="4.430555555555555in"}

The attacker uses CSRF to change the information on the victim’s
profile. This, as mentioned earlier, requires the victim to be
authenticated with the target website. A user can update the profile
information by using the given form in the ‘Your profile’ page. The code
of the particular form is shown below.

CSRF Example in – http://testphp.vulnweb.com/userinfo.php

&lt;form name="form1" method="post" action=""&gt;\
&lt;table border="0" cellspacing="1" cellpadding="4"&gt;\
&lt;tr&gt;\
&lt;td valign="top"&gt;Name:&lt;/td&gt;&lt;td&gt;&lt;input type="text"
value="James Markus" name="urname" style="width:200px"&gt;&lt;/td&gt;\
&lt;/tr&gt;\
&lt;tr&gt;&lt;td valign="top"&gt;Credit card
number:&lt;/td&gt;&lt;td&gt;&lt;input type="text"
value="1254-5498-5233-5569" name="ucc"
style="width:200px"&gt;&lt;/td&gt;\
&lt;/tr&gt;\
&lt;tr&gt;&lt;td valign="top"&gt;E-Mail:&lt;/td&gt;&lt;td&gt;&lt;input
type="text" value="example@vulnweb.com" name="uemail"
style="width:200px"&gt;&lt;/td&gt;\
&lt;/tr&gt;\
&lt;tr&gt;&lt;td valign="top"&gt;Phone
number:&lt;/td&gt;&lt;td&gt;&lt;input type="text" value="+44 123 12345
123" name="uphone" style="width:200px"&gt;&lt;/td&gt;\
&lt;/tr&gt;\
&lt;tr&gt;&lt;td
valign="top"&gt;Address:&lt;/td&gt;&lt;td&gt;&lt;textarea wrap="soft"
name="uaddress" rows="5" style="width:200px"&gt;North London, London,
England&lt;/textarea&gt;&lt;/td&gt;\
&lt;/tr&gt;\
&lt;tr&gt;&lt;td colspan="2" align="right"&gt;&lt;input type="submit"
value="update" name="update"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;\
&lt;/form&gt;

From the above code we can identify the input fields which will receive
information from a user and send to the website. These are called
urname, ucc, uemail, uphone and uaddress and are shown below.

&lt;input type="text" value="John Doe" name="urname"
style="width:200px"&gt;\
&lt;input type="text" value="1254-5498-5233-5569" name="ucc"
style="width:200px"&gt;\
&lt;input type="text" value="example@vulnweb.com" name="uemail"
style="width:200px"&gt;\
&lt;input type="text" value="+44 123 12345 123" name="uphone"
style="width:200px"&gt;\
&lt;textarea wrap="soft" name="uaddress" rows="5"
style="width:200px"&gt;\
North London, London, England&lt;/textarea&gt;

When the user clicks the ‘Update’ button of the form userinfo.php, an
HTTP POST request will be sent that will contain the above parameters
along with their values accordingly.

Since the website does not have any prevention measures against CSRF,
the attacker can use this form (http://testphp.vulnweb.com/userinfo.php)
to submit any desired information without the user’s consent. The
attacker will perform this by embedding the actual code of the update
form in his own website and when the victim visits the attacker’s
website, the form, including any desired information of the attacker,
will be submitted to the target website.

This is the malicious website of the attacker.

![](media/website-security/csrf-attacks.md-images/media/image15.jpg){width="5.777777777777778in"
height="4.458333333333333in"}

The attacker’s website is a normal online photo gallery website.
However, it contains a hidden form which will auto submit and update the
victim’s profile on testphp.vulnweb.com.

The hidden iframe exists in the myimages.php page.

&lt;iframe src="http://www.vulnweb.com/updateif.php"
style="display:none"&gt;&lt;/iframe&gt;

This loads another page of the attacker’s website. The website contains
the actual userinfo.php page code which auto submits and updates the
particular userinfo.php of the current victim. This happens
automatically every time a user accesses this website.

The updateif.php page contains the actual form code which auto submits
the desired information the attacker has set.

&lt;body onload="document.getElementById('f').submit()"&gt;\
&lt;form id="f" action="http://testphp.vulnweb.com/userinfo.php"
method="post" name="form1"&gt;\
&lt;input name="urname" value="attacker’svalue"&gt;\
&lt;input name="ucc" value=" attacker’svalue"&gt;\
&lt;input name="uemail" value=" attacker’svalue"&gt;\
&lt;input name="uphone" value=" attacker’svalue"&gt;\
&lt;textarea name="uaddress"
wrap="soft"&gt;&lt;attacker’svalue&gt;&lt;/textarea&gt;\
&lt;input name="update" value="update"&gt;\
&lt;/form&gt;\
&lt;/body&gt;

This form retrieves the value information from a text file. When the
updateif.php is called, the information (set earlier) by the attacker is
retrieved and placed in the value fields. Then the form is auto
submitted and the target page is loaded. These operations are performed
inside a hidden iframe, thus the victim will not see the target website.

The attacker has an admin page – www.vulnweb.com/hackpanel – from where
values values to be submitted on the target website can be set.

![](media/website-security/csrf-attacks.md-images/media/image08.jpg){width="5.013888888888889in"
height="6.375in"}

The admin hack panel is a control page where the attacker can set the
information that will be submitted to the target website when the CSRF
attack is realized.

From this website, the attacker can set new information. (Note: For the
purposes of this example, there is a reset button which will reset the
values of the target website) This information is stored in a file, from
which the updateif.php (seen earlier) will load and submit the
attacker’s value.

So, as we mentioned earlier, in order for the attacker to perform a CSRF
attack and his information to be submitted, the main requirement is for
the victim to be logged into the target website. When the victim visits
the attackers’ website, the hidden iframe will load the code of the
update profile form found in the userinfo.php (target’s update profile
form) with the attacker’s desired information and auto submit them to
the target website. This operation is the exact operation the victim
could perform to update his profile. However, due to the CSRF
vulnerability a third party entity such as an attacker can use this
operation to submit malicious information without the user being able to
know about it.

The attacker sets the desired information in the
http://www.vulnweb.com/hackpanel/ page and clicks ‘Update’. The
information is stored in the file.

![](media/website-security/csrf-attacks.md-images/media/image13.jpg){width="5.013888888888889in"
height="6.388888888888889in"}

The attacker’s information is ready to be loaded when the attacker’s
website is visited.

When the victim visits the attacker’s website at
[www.vulnweb.com/index.php](http://www.vulnweb.com/index.php), nothing
will happen since there is not any malicious code in the ‘Home’ page.
The victim needs to access the
[www.vulnweb.com/myimages.php](http://www.vulnweb.com/myimages.php) page
where the malicious code exists, and the attacker’s information will be
submitted to the target website (testphp.vulnweb.com/).

![](media/website-security/csrf-attacks.md-images/media/image05.jpg){width="5.5in"
height="4.472222222222222in"}

As soon as the victim visits the myimages.php page, the hidden iframe is
loaded executing the CSRF attack. Below is the HTTP POST request which
is made when the victim accesses the attacker’s malicious /myimages.php
page.

Host: testphp.vulnweb.com\
Connection: keep-alive\
Content-Length: 140\
Cache-Control: max-age=0\
Origin: http://www.vulnweb.com\
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5
(KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5\
Content-Type: application/x-www-form-urlencoded\
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8\
Referer: http://www.vulnweb.com/updateif.php\
Accept-Encoding: gzip,deflate,sdch\
Accept-Language: en-GB,en-US;q=0.8,en;q=0.6\
Accept-Charset: ISO-8859-1,utf-8;q=0.7,\*;q=0.3\
Cookie: login=acuart%2Facuart\
\
urname=h4xor&ucc=1111-2222-3333-4444&uemail=spam%40myspam.com&uphone=%2B800+666+666+666&uaddress=Hacking+the+universe%21%21%21&update=update

The above HTTP POST request shows that the Host to which the POST
request is sent is testphp.vulnweb.com but the origin is www.vulnweb.com
with a referrer being the updateif.php page of the attackers website.
Moreover, the Cookie information is included in the POST request which
is the first requirement in order for the POST request to be
authenticated and the CSRF to be realized. Finally, the parameters
information is included in the POST request and will be submitted to the
target website.

When the POST request is made the browser already has the authentication
session for the target website and it includes the authentication
details in the POST request as it should do in any other legitimate POST
request made by the victim. This particular rogue POST request is
exactly the same as a legitimate POST request with the same Host target
but from a different origin. The browser, as normal, sends the POST
request and the server (in this case) is not able to differentiate
between a legitimate and rogue POST request since both are performed by
the trusted browser in the same way.

There is not any information included in the POST request (such as a
token value, seen later) which will help the server to validate a POST
request as not malicious. This results in the server processing both
POST requests in the normal way.

![](media/website-security/csrf-attacks.md-images/media/image12.jpg){width="5.069444444444445in"
height="4.458333333333333in"}

From the above image you can notice that the profile information of the
victim on the target website has been changed.

The rogue information was submitted and successfully updated the
victim’s profile on the target website. The victim has no indication of
what happened since this operation is transparent to the user. The
attacker has completed his attack successfully in this scenario. In
another scenario an attacker could change the admin passwords, perform
illegal transactions, and more.

NOTE: The particular operation will be performed for any user that
accesses the attacker’s website. In case the particular user has an
account in the target website and is logged in, then the user’s profile
information will be updated with the ones of the attacker. For this
particular example, we assumed that there were no security measures in
place that might block the CSRF attack.

**Prevention Measures**
-----------------------

There are many suggested prevention measures that can be implemented to
mitigate CSRF attacks. Some of them, though, are not complete solutions
and leave room for the attack to still work. For example:

-   The use of a secret cookie – This method will not work because all
    > cookies related to the target website will be submitted as usual
    > as in a normal (legitimate) HTTP request.

-   Accept POST requests only – This suggestion falls short because
    > attackers can deceive an end-user to submit a forged POST request
    > unknowingly using social engineering methods.

-   URL Rewriting – An incomplete solution since some session
    > information is included or exposed in the URL.

Let’s take a look at some measures that do actually mitigate a CSRF
attack.

**Use of Tokens**
-----------------

A prevention measure could be the implementation and inclusion of tokens
in a user’s (current) session. Tokens are long cryptographic values that
are difficult to guess. These will be generated when a user’s session
begins and will be associated with this particular user’s session. This
challenge token will be included in each request, which will be used by
the server side to verify the legitimacy of the end-user’s request.

In order for an attacker to forge a HTTP request, they would have to
know the particular challenge value (token) of the victim’s session. The
disclosure of the challenge token in the URL (GET requests) should be
done wisely and with awareness of the CSRF attack.

Challenge tokens can be used in the ViewState option of the ASP.NET.
Since it is possible for an attacker to obtain or guess the parameter
values of a ViewState then the inclusion and use of a token can make the
ViewState unique and protected to CSRF attacks.

Moreover, tokens can be used in the submission of double cookies. The
server-side will generate a strong random value which will be included
in the submitted cookie on the user’s machine. This will act as the
session ID. On sending a POST request, the website will require the
particular session ID to be included as a hidden value in the submission
form and be included in the cookie as well. If the two values are the
same, the POST request will be considered as valid and submitted
successfully. Therefore, even if the attacker is able to include any
value in the form, based on the same-origin policy, the attacker will
not be able to retrieve or modify the token value in the cookie and
launch a CSRF attack unless they manage to guess the session ID value.

**Other Security Measures**
---------------------------

Another prevention measure is the use of challenge-response options.
Despite the fact that this measure affects the user experience, it can
strongly defend against CSRF attacks.

Furthermore, users should be made aware of potential threats. For
example, users should:

-   Log out from web applications when they have finished using them.

-   Use the web browser with safety – that means making sure not to save
    > any login credentials on the web browser and using legitimate and
    > secure browser extensions.

Finally, you should scan your website using a web vulnerability scanner
to detect any Cross-Site Request Forgery vulnerabilities so you can fix
them before they cause any issues.

![](media/website-security/csrf-attacks.md-images/media/image11.jpg){width="6.267716535433071in"
height="3.361111111111111in"}

Acunetix Web Vulnerability Scanner will crawl your website, detect any
CSRF vulnerabilities and alert you if any are found. It also provides
you with a detailed description of weakness and the exact location your
website is vulnerable, and gives you a detailed explanation on how to
solve it. Make sure your website is secure by[downloading the trial
version of Acunetix Web Vulnerability
Scanner](http://www.acunetix.com/cross-site-scripting/scanner-download/).
