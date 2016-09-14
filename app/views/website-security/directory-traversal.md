**Directory Traversal Attacks**
===============================

**What is a Directory Traversal Attack?**
-----------------------------------------

Properly controlling access to web content is crucial for running a
secure web server. Directory traversal is an HTTP exploit which allows
attackers to access restricted directories and execute commands outside
of the web server’s root directory.

Web servers provide two main levels of security mechanisms

-   Access Control Lists (ACLs)

-   Root directory

An Access Control List is used in the authorization process. It is a
list which the web server’s administrator uses to indicate which users
or groups are able to access, modify or execute particular files on the
server, as well as other access rights.

![](media/website-security/directory-traversal.md-images/media/image01.gif){width="3.0972222222222223in"
height="4.708333333333333in"}

The root directory is a specific directory on the server file system in
which the users are confined. Users are not able to access anything
above this root.

For example: the default root directory of IIS on Windows
isC:\\Inetpub\\wwwroot and with this setup, a user does not have access
toC:\\Windows but has access to C:\\Inetpub\\wwwroot\\news and any other
directories and files under the root directory (provided that the user
is authenticated via the ACLs).

The root directory prevents users from accessing sensitive files on the
server such as cmd.exe on Windows platforms and the passwd file on
Linux/UNIX platforms.

This vulnerability can exist either in the web server software itself or
in the web application code.

In order to perform a directory traversal attack, all an attacker needs
is a web browser and some knowledge on where to blindly find any default
files and directories on the system.

**What an Attacker can do if your Website is Vulnerable**
---------------------------------------------------------

With a system vulnerable to directory traversal, an attacker can make
use of this vulnerability to step out of the root directory and access
other parts of the file system. This might give the attacker the ability
to view restricted files, or even more dangerous, allowing the attacker
to execute powerful commands on the web server which can lead to a full
compromise of the system.

Depending on how the website access is set up, the attacker will execute
commands by impersonating himself as the user which is associated with
“the website”. Therefore it all depends on what the website user has
been given access to in the system.

**Example of a Directory Traversal Attack via Web Application Code**
--------------------------------------------------------------------

In web applications with dynamic pages, input is usually received from
browsers through GET or POST request methods. Here is an example of an
HTTP GET request URL

GET http://test.webarticles.com/show.asp?view=oldarchive.html HTTP/1.1\
Host: test.webarticles.com

With this URL, the browser requests the dynamic page show.asp from the
server and with it also sends the parameter view with the value of
oldarchive.html. When this request is executed on the web server,
show.aspretrieves the file oldarchive.htm from the server’s file system,
renders it and then sends it back to the browser which displays it to
the user. The attacker would assume that show.asp can retrieve files
from the file system and sends the following custom URL.

GET
http://test.webarticles.com/show.asp?view=../../../../../Windows/system.ini
HTTP/1.1\
Host: test.webarticles.com

This will cause the dynamic page to retrieve the file system.ini from
the file system and display it to the user. The expression ../ instructs
the system to go one directory up which is commonly used as an operating
system directive. The attacker has to guess how many directories he has
to go up to find the Windows folder on the system, but this is easily
done by trial and error.

**Example of a Directory Traversal Attack via Web Server**
----------------------------------------------------------

Apart from vulnerabilities in the code, even the web server itself can
be open to directory traversal attacks. The problem can either be
incorporated into the web server software or inside some sample script
files left available on the server.

The vulnerability has been fixed in the latest versions of web server
software, but there are web servers online which are still using older
versions of IIS and Apache which might be open to directory traversal
attacks. Even tough you might be using a web server software version
that has fixed this vulnerability, you might still have some sensitive
default script directories exposed which are well known to hackers.

For example, a URL request which makes use of the scripts directory of
IIS to traverse directories and execute a command can be

GET
http://server.com/scripts/..%5c../Windows/System32/cmd.exe?/c+dir+c:\\
HTTP/1.1\
Host: server.com

The request would return to the user a list of all files in the C:\\
directory by executing the cmd.exe command shell file and run the
command dir c:\\ in the shell. The %5c expression that is in the URL
request is a web server escape code which is used to represent normal
characters. In this case %5c represents the character \\.

Newer versions of modern web server software check for these escape
codes and do not let them through. Some older versions however, do not
filter out these codes in the root directory enforcer and will let the
attackers execute such commands.

**How to Check for Directory Traversal Vulnerabilities**
--------------------------------------------------------

The best way to check whether your web site and web applications are
vulnerable to directory traversal attacks is by using a Web
Vulnerability Scanner. A Web Vulnerability Scanner crawls your entire
website and automatically checks for directory traversal
vulnerabilities. It will report the vulnerability and how to easily fix
it. Besides directory traversal vulnerabilities a web application
scanner will also check for SQL injection, Cross-site Scripting and
other web vulnerabilities.

[Acunetix Web Vulnerability
Scanner](http://www.acunetix.com/vulnerability-scanner/) scans for [SQL
Injection](http://www.acunetix.com/websitesecurity/sql-injection),
[Cross Site
Scripting](http://www.acunetix.com/websitesecurity/cross-site-scripting/),
[Google
Hacking](http://www.acunetix.com/websitesecurity/google-hacking/) and
many more vulnerabilities.

**Preventing Directory Traversal Attacks**
------------------------------------------

First of all, ensure you have installed the latest version of your web
server software, and sure that all patches have been applied.

Secondly, effectively filter any user input. Ideally remove everything
but the known good data and filter meta characters from the user input.
This will ensure that only what should be entered in the field will be
submitted to the server.

**Check if your Website is Vulnerable to Attack with Acunetix Web Vulnerability Scanner**
-----------------------------------------------------------------------------------------

Acunetix Web Vulnerability Scanner ensures website security by
automatically checking for [SQL
Injection](http://www.acunetix.com/vulnerability-scanner/sql-injection/),
[Cross Site
Scripting](http://www.acunetix.com/cross-site-scripting/scanner-download/),
Directory Traversal and other vulnerabilities. It checks password
strength on authentication pages and automatically audits shopping
carts, forms, dynamic content and other web applications. As the scan is
being completed, the software produces detailed reports that pinpoint
where vulnerabilities exist. [Download the trial version of Acunetix
WVS](http://www.acunetix.com/vulnerability-scanner/download/)
