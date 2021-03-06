---
title: Types of XSS
author: Arsen A. Gutsal
layout: text-and-images
---

**Types of XSS**
================

XSS can be used [in a range of ways to cause serious
problems](http://www.softsky.com.ua/websitesecurity/cross-site-scripting/).
The traditional (and dangerous) uses of XSS is the ability for an
attacker to steal session cookies allowing an attacker to impersonate a
victim. However, XSS is not just about stealing cookies, XSS has been
used to wreak havoc on social networks, spread malware, website
defacements, phish for credentials and even used in conjunction with
social engineering techniques to escalate to more damaging attacks.

Cross-site Scripting can be classified into three major categories —
*Stored XSS*, *Reflected XSS* and *DOM-based XSS*.

**Stored XSS**
--------------

The most damaging type of XSS is Stored (Persistent) XSS. Stored XSS
attacks involves an attacker injecting a script (referred to as the
payload) that is permanently stored (persisted) on the target
application (for instance within a database). The classic example of
stored XSS is a malicious script inserted by an attacker in a comment
field on a blog or in a forum post.

When a victim navigates to the affected web page in a browser, the XSS
payload will be served as part of the web page (just like a legitimate
comment would). This means that victims will inadvertently end-up
executing the malicious script once the page is viewed in a browser.

**Reflected XSS**
-----------------

The second, and by far most common type of XSS is Reflected XSS. In
Reflected XSS, the attacker’s payload script has to be part of the
request which is sent to the web server and reflected back in such a way
that the HTTP response includes the payload from the HTTP request. Using
Phishing emails and other social engineering techniques, the attacker
lures the victim to inadvertently make a request to the server which
contains the XSS payload and ends-up executing the script that gets
reflected and executed inside the browser. Since Reflected XSS isn’t a
persistent attack, the attacker needs to deliver the payload to each
victim – social networks are often conveniently used for the
dissemination of Reflected XSS attacks.

**DOM-based XSS**
-----------------

DOM-based XSS is an advanced type of XSS attack which is made possible
when the web application’s client side scripts write user provided data
to the Document Object Model (DOM). The data is subsequently read from
the DOM by the web application and outputted to the browser. If the data
is incorrectly handled, an attacker can inject a payload, which will be
stored as part of the DOM and executed when the data is read back from
the DOM. Read more about [DOM-based
XSS](https://www.softsky.com.ua/blog/articles/dom-xss-explained/) »

The most dangerous part of DOM-based XSS is that the attack is often a
client-side attack, and the attacker’s payload is never sent to the
server. This makes it even more difficult to detect for Web Application
Firewalls (WAFs) and security engineers analyzing the server’s logs
since they will never even see the attack.

Among various objects that make up the DOM, there are some objects in
particular which an attacker can manipulate in order to generate the XSS
condition. Such objects include the URL (document.URL), the part of the
URL behind the hash (location.hash) and the Referrer
(document.referrer).
