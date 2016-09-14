**SQL Injection (SQLi)**
========================

SQL injection (SQLi) refers to an injection attack wherein an attacker
can execute malicious SQL statements (also commonly referred to as a
malicious *payload*) that control a web application’s database server
(also commonly referred to as a *Relational Database Management System –
RDBMS*). Since an SQL injection vulnerability could possibly affect any
website or web application that makes use of an SQL-based database, the
vulnerability is one of the oldest, most prevalent and most dangerous of
web application vulnerabilities.

By leveraging an SQL injection vulnerability, given the right
circumstances, an attacker can use it to bypass a web application’s
authentication and authorization mechanisms and retrieve the contents of
an entire database. SQL injection can also be used to add, modify and
delete records in a database, affecting data integrity.

To such an extent, SQL injection can provide an attacker with
unauthorized access to sensitive data including, customer data,
personally identifiable information (PII), trade secrets, intellectual
property and other sensitive information.

**How SQL Injection works**
---------------------------

In order to run malicious SQL queries against a database server, an
attacker must first find an input within the web application that is
included inside of an SQL query.

In order for an SQL injection attack to take place, the vulnerable
website needs to directly include user input within an SQL statement. An
attacker can then insert a payload that will be included as part of the
SQL query and run against the database server.

The following server-side pseudo-code is used to authenticate users to
the web application.

\# Define POST variables\
**uname = request.POST\['username'\]**\
**passwd = request.POST\['password'\]**\
\
\# SQL query vulnerable to SQLi\
sql = “**SELECT** id **FROM** users **WHERE** username=’” + **uname** +
“’ **AND** **password**=’” + **passwd** + “’”\
\
\# **Execute** the **SQL** statement\
**database**.**execute**(**sql**)

The above script is a simple example of authenticating a user with a
username and a password against a database with a table named users, and
a username and password column.

The above script is vulnerable to SQL injection because an attacker
could submit malicious input in such a way that would alter the SQL
statement being executed by the database server.

A simple example of an SQL injection payload could be something as
simple as setting the password field topassword’ OR 1=1.

This would result in the following SQL query being run against the
database server.

**SELECT** id **FROM** users **WHERE** username=’username’ **AND**
**password**=’**password**’ **OR** 1=1’

An attacker can also comment out the rest of the SQL statement to
control the execution of the SQL query further.

-- MySQL, MSSQL, Oracle, PostgreSQL, SQLite\
' OR '1'='1' **--**\
' OR '1'='1' **/\***\
-- MySQL\
' OR '1'='1' **\#**\
-- Access (using null characters)\
' OR '1'='1' **%00**\
' OR '1'='1' **%16**

Once the query executes, the result is returned to the application to be
processed, resulting in an authentication bypass. In the event of
authentication bypass being possible, the application will most likely
log the attacker in with the first account from the query result — the
first account in a database is usually of an administrative user.

**What’s the worst an attacker can do with SQL?**
-------------------------------------------------

SQL is a programming language designed for managing data stored in an
RDBMS, therefore SQL can be used to access, modify and delete data.
Furthermore, in specific cases, an RDBMS could also run commands on the
operating system from an SQL statement.

Keeping the above in mind, when considering the following, it’s easier
to understand how lucrative a successful SQL injection attack can be for
an attacker.

-   An attacker can use SQL injection to bypass authentication or even
    > impersonate specific users.

-   One of SQL’s primary functions is to select data based on a query
    > and output the result of that query. An SQL injection
    > vulnerability could allow the complete disclosure of data residing
    > on a database server.

-   Since web applications use SQL to alter data within a database, an
    > attacker could use SQL injection to alter data stored in
    > a database. Altering data affects data integrity and could cause
    > repudiation issues, for instance, issues such as voiding
    > transactions, altering balances and other records.

-   SQL is used to delete records from a database. An attacker could use
    > an SQL injection vulnerability to delete data from a database.
    > Even if an appropriate backup strategy is employed, deletion of
    > data could affect an application’s availability until the database
    > is restored.

-   Some database servers are configured (intentional or otherwise) to
    > allow arbitrary execution of operating system commands on the
    > database server. Given the right conditions, an attacker could use
    > SQL injection as the initial vector in an attack of an internal
    > network that sits behind a firewall.

**The anatomy of an SQL Injection attack**
------------------------------------------

An SQL injection needs just two conditions to exist – **a relational
database that uses SQL, and a user controllable input which is directly
used in an SQL query.**

In the example below, it shall be assumed that the attacker’s goal is to
exfiltrate data from a database by exploiting an SQL injection
vulnerability present in a web application.

Supplying an SQL statement with improper input, for example providing a
string when the SQL query is expecting an integer, or purposely
inserting a syntax error in an SQL statement cause the database server
to throw an error.

Errors are very useful to developers during development, but if enabled
on a live site, they can reveal a lot of information to an attacker. SQL
errors tend to be descriptive to the point where it is possible for an
attacker to obtain information about the structure of the database, and
in some cases, even to enumerate an entire database just through
extracting information from error messages – this technique is referred
to as *error-based SQL injection*. To such an extent, database errors
should be disabled on a live site, or logged to a file with restricted
access instead.

Another common technique for exfiltrating data is to leverage the UNION
SQL operator, allowing an attacker to combine the results of two or more
SELECT statements into a single result. This forces the application to
return data within the HTTP response – this technique is referred to as
*union-based SQL injection*.

The following is an example of such a technique. This can be seen on
**testphp.vulnweb.com**, an intentionally vulnerable website hosted by
Acunetix.

The following HTTP request is a normal request that a legitimate user
would send.

**GET http://testphp.vulnweb.com/artists.php?artist=1 HTTP/1.1**\
Host: testphp.vulnweb.com

![](media/website-security/sql-injection.md-images/media/image04.png){width="6.267716535433071in"
height="5.263888888888889in"}

Although the above request looks normal, the artist parameter in the GET
request’s query string is vulnerable to SQL injection.

The SQL injection payload below modifies the query to look for an
inexistent record by setting the value in the URL’s query string to -1
(it could be any other value that does not exist in the database,
however, an ID in a database is less likely to be a negative number).

In SQL injection, the UNION operator is commonly used to allow an
attacker to join a malicious SQL query to the original query intended to
be run by the web application. The result of the injected query will be
joined to the result of the original query, allowing an attacker to
exfiltrate data out of a database by obtaining values of columns from
other tables.

**GET http://testphp.vulnweb.com/artists.php?artist=-1 UNION SELECT 1,
2, 3 HTTP/1.1\
Host: testphp.vulnweb.com**

![](media/website-security/sql-injection.md-images/media/image03.png){width="6.267716535433071in"
height="5.263888888888889in"}

The above example proves that the query to the database can be modified
to return data which an attacker may want to extract. The following
example shows how an SQL injection payload could be used to exfiltrate
data from this intentionally vulnerable site.

**GET http://testphp.vulnweb.com/artists.php?artist=-1 UNION SELECT
1,pass,cc FROM users WHERE uname='test' HTTP/1.1\
Host: testphp.vulnweb.com**

![](media/website-security/sql-injection.md-images/media/image05.png){width="6.267716535433071in"
height="5.263888888888889in"}

**Further Reading**
-------------------

[Types of SQL
Injection](http://www.acunetix.com/websitesecurity/sql-injection2/)

[A guide to preventing SQL injection](http://bobby-tables.com/)
