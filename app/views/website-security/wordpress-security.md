---
title: WordPress Security: Top tips to secure your WordPress Application
author: Arsen A. Gutsal
layout: text-and-images
---

# WordPress Security: Top tips to secure your WordPress Application


WordPress sites are notoriously lacking when it comes to security. Be it
due to an insufficient security expertise of the developer, or the use
of one of the many plugins available (of which the security cannot be
guaranteed).

With WordPress running on 1 in 5 sites on the Internet, it is no
surprise that they are a very popular target for both experienced
hackers and script-kiddies alike. In 2013 around 90,000 WordPress sites
were hijacked for use in a botnet. They are also a popular target for
malware.

This is why we’ve taken some time to detail some measures which can be
taken to address the basic security holes or malpractices that are
commonly present in thousands of WordPress sites.

## Running the Latest Version of WordPress

Running the latest version of any software is probably first the most
obvious security measure that should be taken. However, with [over 86%
of WordPress installations running outdated versions of
WordPress](https://wordpress.org/about/stats/), this point is still one
that needs to be stressed.

Each update of WordPress not only brings with it new features, but more
importantly, it brings with it bugfixes and security fixes, which help
your WordPress site remain safe against common, easy-to-exploit
vulnerabilities.

![](/media/website-security/wordpress-security.md-images/media/image07.jpg)

*WordPress (Core) Updates Screen*

## Running the Latest Versions of Themes and Plugins

Running the latest version of WordPress alone is not enough – your
site’s plugins and themes could still contain vulnerabilities that can
compromise the security of your WordPress site.

The Slider Revolution plugin is a good example of how outdated plugins
and themes can compromise your site’s security. Slider Revolution is a
very popular WordPress plugin which also happens to be used by a [large
number](http://marketblog.envato.com/news/affected-themes/) of WordPress
themes sold on the Envato Market. The vulnerable plugin allowed
malicious users to steal database credentials, which would then
potentially allow total compromise of the WordPress site through it’s
database.

![](/media/website-security/wordpress-security.md-images/media/image04.jpg)

*Plugins Update Screen*

Therefore, making sure that the themes and plugins you are running are
all updated to their latest versions is essential. By keeping your
plugins and themes up to date, you can make sure your site is covered
with the latest security updates.

![](/media/website-security/wordpress-security.md-images/media/image01.jpg)

*Themes Update Screen*

SOFTSKY performs [WordPress security
scans](http://www.acunetix.com/vulnerability-scanner/wordpress-security-scan/),
identifying WordPress installations, and will launch version specific
security checks to ensure your website is secure.

## Be Selective When Choosing Plugins and Themes

WordPress allows you to extend and customize your site with thousands of
plugins and themes. While extending your site’s capabilities and
customization is important, it should not come at the price of your
website’s security.

Even if your WordPress installation, plugins and themes are all up to
date, it does not mean that a site is not vulnerable to attack. Plugin
enumeration allows attackers to discover what plugins your WordPress
site is using. By avoiding the installation of unnecessary plugins you
would automatically be reducing your site’s attack surface.

When choosing which plugins and themes to use, be selective. Before
installing a plugin or theme, read about it (ideally on sources other
than the plugin/theme developer’s site). This prevents you from
installing malware such as the [Tools Pack malware
plugin](http://www.acunetix.com/vulnerabilities/vulnerability/ToolsPack_malware_plugin).

Check how many downloads the plugin or theme has and when it was last
updated by its authors. The more downloads and recent updates the plugin
or theme has indicates that it is in wide use and that it is being
actively maintained by its authors, which means that if a vulnerability
is found, it likely to be fixed quicker.

## Remove Inactive Users

Keeping inactive users on your WordPress site increases your attack
surface. Users, especially Administrators and others which have the
ability to modify content, are possibly one of the weakest points of any
site because unfortunately, most users tend to choose weak passwords.

If you absolutely need to keep inactive users in your WordPress
database, change their role to ‘Subscriber’ in order to limit any
actions that could be performed.

## Security Configurations – Prevent Directory Listing

**Heads up** – Depending on your webserver’s configuration, activated
plugins and/or themes, the following could break some functionality. It
is strongly advised to try out any configuration in a testing/staging
environment before changing any configuration on production servers.

[Directory
Listing](http://www.acunetix.com/blog/articles/directory-listing-information-disclosure/)
occurs when the web server does not find an index file (i.e. an
index.php or index.html), if directory listing is turned on, the server
will display an HTML page listing the contents of the directory.

![](/media/website-security/wordpress-security.md-images/media/image06.jpg)

*Directory Listing in Apache HTTP Server on a WordPress site*

Disclosure of this information could make a site vulnerable to attacks
by revealing information that can be used by an attacker seeking to
exploit a vulnerability in a WordPress plugin, theme, or even the web
server itself.

While it is not a WordPress-specific security measure to disable
directory listing, several WordPress sites running on default
installations of [Apache HTTP
Server](http://www.acunetix.com/websitesecurity/apache-security/) have
directory listing enabled.

In order to disable directory listing in Apache HTTP Server, you will
need to add the following configuration in your WordPress site’s
.htaccess file (this is usually located in your website’s root
directory).

	Options -Indexes

## Complex Security Keys

**Heads up** – Depending on your webserver’s configuration, activated
plugins and/or themes, the following could break some functionality. It
is strongly advised to try out any configuration in a testing/staging
environment before changing any configuration on production servers.

WordPress makes use of a set of long, random and complex Security Keys.
These keys consist of a number of encryption keys as well as
[cryptographic salts.](http://en.wikipedia.org/wiki/Salt_(cryptography))

Security Keys ensure better encryption of information stored in the
users’ cookies. There are a total of eight security keys that WordPress
uses – `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`,
`NONCE_KEY`, `AUTH_SALT`,`SECURE_AUTH_SALT`, `LOGGED_IN_SALT`,
and `NONCE_SALT`.

A Security Key functions similarly to a very strong password or
passphrase and should contain elements that make it harder to generate
enough options to crack. WordPress Security Keys also make use of
cryptographic salts to further strengthen the security of the generated
result.

You can either make your own random keys, or you can use WordPress’
[online key generator](https://api.wordpress.org/secret-key/1.1/salt/)
to do this for you. Simply copy and paste the keys generated by the
generator into your wp-config.php file.

## Restrict Access to wp-admin Directory

Password protecting your WordPress admin area through a layer of HTTP
authentication is an effective measure to thwart attackers attempting to
guess users’ passwords. Additionally, if attackers manages to steal a
user’s password, they will need to get past HTTP authentication in order
to gain access to WordPress login form.

![](/media/website-security/wordpress-security.md-images/media/image09.png)

*Basic HTTP Authentication*

**Warning** – Basic HTTP Authentication requires that passwords be sent
as clear text over the network. To such an extent, it is highly
recommended that you make use of HTTPS to encrypt the transfer of data.

In Apache HTTP Server, you can achieve this by creating a .htpasswd file
and adding a few configuration directives described below.

The .htpasswd file stores combinations of usernames and password hashes
which the web server will use to authenticate users. You can create a
.htpasswd file using the htpasswd command line or using an [online
password file
generator](http://www.htaccesstools.com/htpasswd-generator/).

Several Linux distributions install the htpasswd utility together with
Apache itself, however, most Debian and Ubuntu users will need to
install the apache2-utils package as follows.

	apt-get update
	apt-get upgrade
	apt-get install apache2-utils

Once htpasswd is installed, run the following command to create a new
.htpasswd file with a single user. The following command will create a
new .htpasswd file located at /srv/auth/.htpasswd with a username
ofmyuser. htpasswd will then prompt you to enter and then confirm the
password of your choice.

	 htpasswd -c /srv/auth/.htpasswd myuser

**Note** – It is highly recommended not to store .htpasswd files in a
web accessible directory. By default, all files with the .ht prefix are
not served by Apache, however this should not be assumed.

To enable basic HTTP authentication on the WordPress administration
area, you need to activate the directive described below on the wp-admin
directory and reference the .htpasswd file created earlier. Insert the
following lines into the appropriate &lt;Directory&gt; section of your
server’s Apache configuration file or in an .htaccess file within the
wp-admin directory.

	 AuthType Basic\
	 AuthUserFile /srv/auth/.htpasswd\
	 AuthName "WordPress Authenticated area."\
	 Require valid-user

The AuthType directive is specifying that the authentication type. In
this case, Basic authentication is being configured.

The AuthUserFile directive specifies the full path to the .htpasswd
file. This file is the file that shall be used to store password hashes
which the server shall later use to authenticate users with.

The AuthName directive contains an arbitrary message which the browser
will present to the user upon authentication. The Require valid-user
setting simply instructs Apache to allow any valid user to authenticate.

**Note** – While this file can be located anywhere on the filesystem, we
strongly recommend that you not place them in a web accessible
directory. By default, all files beginning with .ht are not
web-accessible in most default configurations of Apache, but this should
not be assumed.

## Disable File Editing

By default, WordPress allows administrative users to edit PHP files of
plugins and themes inside of the WordPress admin interface.

This is often the first thing an attacker would look for if they manage
to gain access to an administrative account since this functionality
allows code execution on the server.

Entering the following constant in wp-config.php, disables editing from
within the administrative interface.

       define('DISALLOW_FILE_EDIT', true);

## Prevent WordPress Username Enumeration

In many WordPress blogs, it’s possible to enumerate WordPress users
using an author’s archive page. This works if WordPress permalinks are
enabled and if the user has published one or more posts.

You can read about WordPress Username Enumeration in greater detail in
the article [WordPress Username Enumeration using HTTP
Fuzzer](http://www.acunetix.com/blog/articles/wordpress-username-enumeration-using-http-fuzzer/)

In order to prevent WordPress Username Enumeration you can add the
following rule to WordPress site’s .htaccess file (this is usually
located in your website’s root directory).

	RewriteCond %{QUERY_STRING} author=d\
	RewriteRule \^ /? \[L,R=301\]

## Enabling HTTPS for all logins and wp-admin

Strictly speaking, HTTPS is not a protocol in and of itself, but it is
rather HTTP encapsulated in
[TLS/SSL](http://www.acunetix.com/blog/articles/tls-ssl-cipher-hardening/).
TLS, or SSL, as it is commonly referred to, provides websites and web
applications with encryption of data being transmitted and
authentication to verify the identity of a host.

HTTPS is usually synonymous with shopping carts and Internet banking,
but in reality, it should be used whenever a user is passing sensitive
information to the web server and vice-versa.

TLS/SSL may significantly consume server resources depending on the
site’s traffic. Consequently, for most sites it is not required to serve
the entire site using HTTPS. WordPress’s login form and admin area, on
the other hand, are probably the most sensitive areas of a WordPress
site. It is therefore strongly advised that TLS/SSL is not only
implemented, but enforced in such areas.

WordPress provides an easy way to enforce TLS/SSL on both *wp-login* and
*wp-admin* pages. This is achieved by defining two constants in your
site’s wp-config.php file.

Note - You must already have TLS/SSL configured and working on the
server before your site will work properly with these constants set to
true.

To ensure that login credentials are encrypted during transit to the web
server, define the following constant inwp-config.php.

	define('FORCE_SSL_LOGIN', true);

To ensure that sensitive data in transit (such as session cookies) is
encrypted when using the WordPress administration panel, define the
following constant in wp-config.php.

	define('FORCE_SSL_ADMIN', true);

## Restrict Direct Access to Plugin and Theme PHP files

Allowing direct access to PHP files can be dangerous for a number of
reasons. Some plugins and theme files can contain PHP files that are not
designed to be called directly because the file would be calling
functions that would have been defined in other files. This may cause
the PHP interpreter to display errors or warnings which may lead to
information disclosure.

Another reason for restricting direct access to PHP files is to prevent
attackers from bypassing or avoiding security measures (such as
authentication) when code is split-up into smaller files (which will
then be included and used together with other code)

Some plugins and themes split-up code into smaller files and include
these files into larger pieces of code. An attacker may sometimes be
able to call one of the smaller files directly and avoid various
security measures such as input validation checks since. Most of the
times this occurs because the validation would not performed in other
files and not in the mentioned smaller modules.

Furthermore, if the register_globals directive is enabled on the server
(directive is disabled by default in PHP versions 4.2.0 and greater),
with direct access to a PHP file, an attacker may be able to carry out
several malicious actions including the ability to define PHP variables
from GET/POST requests and to bypass various protection mechanisms.

The vast majority of plugins and themes would not require a user to make
HTTP requests to PHP files directly, however, should there be an
exception, you can whitelist files and directories that require direct
access to PHP files. The following rule will redirect any direct
requests to PHP files to a page of your choosing (in the following
example the server will respond with a 404 page and status code).

	# Restrict access to PHP files from plugin and theme directories\
	RewriteCond %{REQUEST_URI} !\^/wp-content/plugins/file/to/exclude\\.php
	RewriteCond %{REQUEST_URI} !\^/wp-content/plugins/directory/to/exclude/\
	RewriteRule wp-content/plugins/(.\*\\.php)\$ - \[R=404,L\]\
	RewriteCond %{REQUEST_URI} !\^/wp-content/themes/file/to/exclude\\.php\
	RewriteCond %{REQUEST_URI} !\^/wp-content/themes/directory/to/exclude/\
	RewriteRule wp-content/themes/(.\*\\.php)\$ - \[R=404,L\]

## Prevent PHP files from executing

Since WordPress sites need to allow their users to upload new content,
WordPress’ upload directory needs to be writable. To such an extent,
your wp-content/uploads directory should be considered a potential entry
point.

The biggest potential threat is the uploading of PHP files. WordPress
won’t allow users to upload PHP files within its administrative console,
however, it may be the case that a plugin or theme allows file uploads
without using the designated WordPress APIs for doing so. This could
result in a malicious PHP file being uploaded and consequently executed
on the server.

The best approach to mitigate this potential security risk is to deny
the web server from serving any PHP files in thewp-content/uploads
directory using the following rule.

	  <Directory "/var/www/wp-content/uploads/">
	  <Files "*.php">
	  	  Order Deny,Allow
	  	  Deny from All
	  </Files>
	  </Directory>

## Secure Your Debug Logs

During development of plugins or themes, as well as during deployment of
a WordPress site, developers or system administrators may enable debug
logs to log any PHP errors that occur.

WordPress makes use of the `WP_DEBUG` constant which is defined in
wp-config.php. The constant is used to trigger the *debug* mode
throughout WordPress. The constant is set to be false by default.

Developers and administrators may also enable the `WP_DEBUG_LOG` and
`WP_DEBUG_DISPLAY` companion constants to `WP_DEBUG`. `WP_DEBUG_LOG`
creates a log file in the wp-contents folder, while `WP_DEBUG_DISPLAY`
controls whether debug messages are shown inside the HTML of pages or
not.

Any of the above will be useful while a theme, plugin or site is in
development, however, if enabled on a production website, it might cause
information disclosure – allowing malicious users to view errors and
additional logging information. The `WP_DEBUG` constant should be
disabled on production systems by either removing the constant from the
`wp-config.php` file, or setting it to false as follows.

	      define( 'WP_DEBUG', false );
