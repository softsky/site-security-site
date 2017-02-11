<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns:d="http://some.ns"
   xmlns:xhtml="http://www.w3.org/1999/xhtml"
   exclude-result-prefixes="xhtml d"
   version="2.0">
  <xsl:output method="html" indent="yes" encoding="utf-8" doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN"/>
  <data xmlns="http://some.ns">
    <head>
      <meta>
        <keywords>Some keywords</keywords>
        <description>Some detailed description</description>
        <author>Arsen A. Gutsal, gutsal.arsen@gmail.com</author>
        <identifier-URL></identifier-URL>
        <directory></directory>
        <coverage>Worldwide</coverage>
        <distribution>Global</distribution>
        <rating>General</rating>
        <revisit-after>7 days</revisit-after>
        <subtitle>Some subtitle</subtitle>
        <target>all</target>
        <date>Sept. 27, 2010</date>
        <search>2010-09-27</search>

        <!-- Mobile Specific Metas -->
        <viewport>width=device-width, initial-scale=1, maximum-scale=1</viewport>
      </meta>
      <link href="/css/bootstrap/bootstrap.min.css"/>
      <link href="/css/font-awesome.min.css"/>
      <link href="/css/font-cabin.css"/>
      <link href="/css/owl.carousel.css"/>
      <link href="/css/owl.theme.css"/>
      <link href="/css/owl.transitions.css"/>
      <link href="/css/magnific-popup.css" rel="stylesheet"/>
      <link href="/css/animate.css"/>
      <link href="/css/lp-style.css"/>
      <!-- Switcher Styles-->
      <link id="switcher-css" media="all"/>
      <!-- END Switcher Styles-->
      <!-- Template Color Demo Examples-->
      <link rel="alternate stylesheet" href="/css/colors/green.css" title="green" media="all"/>
      <script src="/js/assets/html5shiv.min.js"></script>
      <script src="/js/assets/respond.min.js"></script>
    </head>
    <script  src="/js/assets/lodash.min.js"/>
    <script  src="/js/assets/jquery-1.11.1.min.js"/>
    <script  src="/js/assets/bootstrap.min.js"/>
    <script  src="/js/assets/jquery.mixitup.min.js"/>
    <script  src="/js/assets/jquery.bxslider.min.js"/>
    <script  src="/js/assets/jquery.flexslider-min.js"/>
    <script  src="/js/assets/jquery.magnific-popup.min.js"/>
    <script  src="/js/assets/wow.min.js"/>
    <!-- <script  src="/bootstrap-validator/dist/validator.min.js"/> -->
    <script  src="/js/assets/owl.carousel.js"/>
    <script  src="/js/assets/jquery.parallax-1.1.3.js"/>
    <script  src="/js/assets/jquery.sticky.js"/>
    <script  src="/js/easing.js"/>
    <script  src="/js/contact.js"/>
    <script  src="/js/custom.js"/>
    <script  src="/js/main.js"/>
    <script  src="/js/style-switcher.js"/>
  </data>

  <xsl:template match="d:meta/*">
    <meta name="{name()}" content="{text()}"/>
  </xsl:template>
  
  <xsl:template match="d:link">
    <link rel="stylesheet" type="text/css">
      <xsl:for-each select="@*">
        <xsl:attribute name="{name(.)}"><xsl:value-of select="."/></xsl:attribute>
      </xsl:for-each>
    </link>
  </xsl:template>
  
  <xsl:template match="d:script">
    <script type="text/javascript">
      <xsl:for-each select="@*">
        <xsl:attribute name="{name(.)}"><xsl:value-of select="."/></xsl:attribute>
      </xsl:for-each>
    </script>
  </xsl:template>    
  
  <xsl:template match="/">    
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-us" class="no-js">      
      <head>                
        <meta charset="utf-8"/>
        <title><xsl:value-of select="/d:page/d:title"/></title>
        <!-- <xsl:for-each select="document('')/xsl:stylesheet/d:data/d:head/d:meta/*">
             <meta name="{name()}"/>                        
        </xsl:for-each> -->
        <xsl:apply-templates select="document('')/xsl:stylesheet/d:data/d:head/d:meta/*"/>
        <xsl:apply-templates select="document('')/xsl:stylesheet/d:data/d:head/d:link"/>
        <xsl:apply-templates select="document('')/xsl:stylesheet/d:data/d:head/d:script"/>
        <!-- The HTML5 shim, for IE6-8 support of HTML5 elements-->
      </head>
      <body data-spy="scroll" data-target="#main-menu">
        <!-- Start Page loader-->
        <div id="pageloader">
          <div class="loader">
            <img src="/images/progress.gif" width="100" alt="loader"/>
          </div>
        </div>
        <!-- End Page loader-->
        <!-- Start Home Slider-->
        <section id="home">
          <div class="slider-overlay">
          </div>
          <div class="hm flexslider">
            <ul class="slides">
              <li class="slider1 bg">
              </li>
              <li class="slider2 bg">
              </li>
              <li class="slider3 bg">
              </li>
            </ul>
          </div>
          <!-- Home slider-->
          <!-- start text slider-->
          <div class="tx">
            <div class="tx-cell">
              <div class="slider-text">
                <ul id="text-slider">
                  <li>
                    <h1>Welcome to SOFTSKY</h1>
                  </li>
                  <li>
                    <h1>We Show Your Security Problems</h1>
                  </li>
                  <li>
                    <h1>We Help Your Business Stay Safe</h1>
                  </li>
                </ul>
                <p>We secure. We believe in the power of protection. No matter what your website represents - it must be safe and secure.</p>
                <div class="page-scroll scroll">
                  <a class="btn btn-lg btn-primary btn-color-white" href="#services">Learn more
                  </a>
                  <a class="btn btn-lg btn-primary btn-color-white" href="#pricing">Pricing
                  </a>
                </div>
              </div>
              <div class="embedded-form">
                <h2 style="color:white;">Scan now for free</h2>
                <div class="col-md-12 contact-form wow zoomIn" data-wow-duration="700ms" data-wow-delay="300ms">
                  <div class="contact-form">
                    <form id="ajax-form-0" name="ajax-form" action="/scan/new" method="post" data-toggle="validator">
                      <div class="row">
                        <div class="col-md-12">
                          <input class="form-control" name="url" placeholder="Website URL" type="url" required="true"/>
                        </div>
                        <div class="col-md-12 hidden" id="details">
                          <ul class="list-group">
                          </ul>
                          <div class="code">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label for="name">
                            <span class="error" id="err-name-0">Please enter name </span>
                          </label>
                          <input class="form-control" id="name-0" name="name" placeholder="Full Name" type="text"/>
                        </div>
                        <div class="col-md-6">
                          <label for="email">
                            <span class="error" id="err-email-0">Please enter e-mail </span>
                            <span class="error" id="err-emailvld-0">Email is not a valid format </span>
                          </label>
                          <input class="form-control" id="email-0" name="email" placeholder="Your Email" type="email"/>
                        </div>
                        <div class="col-md-12 text-right">
                          <button class="btn btn-default btn-lg" id="send-0" type="submit" name="submit">FREE Scan </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="error text-align-center" id="err-form-0">There was a problem validating the form please check!</div>
                        <div class="error text-align-center" id="err-timedout-0">The connection to the server timed out!</div>
                        <div class="error" id="err-state-0">
                        </div>
                      </div>
                    </form>
                    <div id="ajaxsuccess-0">Your scan has been queued. We will send you email when it's started.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Slider-->
        <!-- Start Navigation-->
        <header id="header">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#main-menu">
                  <span class="sr-only">Toggle navigation </span>
                  <span class="fa fa-bars">
                  </span>
                  <span class="icon-bar">
                  </span>
                  <span class="icon-bar">
                  </span>
                </button>
                <!-- Start Logo-->
                <div class="logo-nav">
                  <a title="SOFTSKY" href="/">
                    <img src="/img/softsky-logo-transparent-143x59.png"/>
                  </a>
                  <strong>Security Audit Scanner </strong>
                </div>
                <!-- End Logo-->
                <div class="clear-toggle">
                </div>
                <div class="collapse scroll navbar-right" id="main-menu">
                  <ul class="nav">
                    <li class="active">
                      <a href="#home">Home </a>
                    </li>
                    <li>
                      <a href="#services">Services </a>
                    </li>
                    <li>
                      <a href="#features">Works </a>
                    </li>
                    <li>
                      <a href="#pricing">Pricing </a>
                    </li>
                    <li>
                      <a href="#clients">Clients</a>
                    </li>n
                    <li class="hidden">
                      <a href="#blog">Blog</a>
                    </li>
                    <li>
                      <a href="#team">Team</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <!-- End main-menu-->
              </div>
            </div>
          </div>
        </header>
        <!-- End Navigation-->
        <!-- Start Services-->
        <section class="section" id="services">
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Our Services
                    </span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <!-- Services Item #1-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="300ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-calendar-o effect-8">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Free Quick Security Audit</h4>
                    <p>Our heuristics quickly analyze your network configuration/services
                      to determine if you might have security issues.</p>
                  </div>
                </div>
              </div>
              <!-- Services Item #3-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="400ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-calendar-check-o">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Full Security Audit </h4>
                    <p>Our robots will analyze your infrastructure and point you to issues that could be used for penetration attack against you.</p>
                  </div>
                </div>
              </div>
              <!-- Services Item #5-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-graduation-cap">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Expert Security Audit </h4>
                    <p>If something was not found by machine, our experts will manually analyze your system.</p>
                  </div>
                </div>
              </div>
              <!-- Services Item #4-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="600ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-diamond">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Bug Bounty Program </h4>
                    <p>Our Ninja Squad will attempt to find breaches in your website security and report you. </p>
                  </div>
                </div>
              </div>
              <!-- Services Item #2-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="700ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-magic">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Expert Tweaking</h4>
                    <p>We understand and websites and webserver differs. We will provide fine configuration tunning to meet your needs.</p>
                  </div>
                </div>
              </div>
              <!-- Services Item #8-->
              <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="800ms">
                <div class="services-box">
                  <div class="services-icon">
                    <i class="fa fa-support">
                    </i>
                  </div>
                  <div class="services-detail">
                    <h4>Update &amp; Support </h4>
                    <p>We provide high-tech email/phone support for our</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.row-->
          </div>
          <!-- /.container-->
        </section>
        <!-- End Services-->
        <!-- Start portfolio-->
        <!-- End Call to Action-->
        <!-- Start Features-->
        <section class="section" id="features">
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Work Process</span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <div class="col-md-12 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="features-intro">
                  <!-- <h3>Passionate about crafting modern and usable design!</h3>-->
                  <p>We want to make Internet safer!</p>
                </div>
              </div>
              <div class="features-main">
                <!-- Start Features Left-->
                <div class="col-md-4 wow zoomIn" data-wow-duration="700ms" data-wow-delay="800ms">
                  <div class="features-left">
                    <!-- Features Item #1-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-group">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>Planning</h4>
                        <p>We analyze your architectural/coding/configuration issues and plan how to improve.</p>
                      </div>
                    </div>
                    <!-- Features Item #2-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-trophy">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>Staging Preparation</h4>
                        <p>We help you prepare staging server that duplicate your production server. </p>
                      </div>
                    </div>
                    <!-- Features Item #3-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-tag">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>Consulting</h4>
                        <p>We consult your system administrators on security/administation skills he/she could have missed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Features Left-->
                <!-- Start Features Image-->
                <div class="col-md-4 hidden-xs wow zoomIn" data-wow-duration="700ms" data-wow-delay="800ms">
                  <img src="/images/device.png" alt="Features Image"/>
                </div>
                <!-- End Features Image-->
                <!-- Start Features Right-->
                <div class="col-md-4 wow hidden zoomIn" data-wow-duration="700ms" data-wow-delay="800ms">
                  <div class="features-right">
                    <!-- Features Item #1-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-cog">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>Development</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                    <!-- Features Item #2-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-home">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>App Design</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                    <!-- Features Item #3-->
                    <div class="features-item">
                      <div class="features-icon">
                        <i class="fa fa-film">
                        </i>
                      </div>
                      <div class="features-info">
                        <h4>Our mission</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Features Right-->
              </div>
              <!-- /.features-main-->
            </div>
            <!-- /.row-->
          </div>
          <!-- /.container-->
        </section>
        <!-- End Features-->
        <!-- Start pricing-->
        <section class="section section-white" id="pricing">
          <div class="overlay">
          </div>
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Pricing
                    </span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <!-- Price detail #1-->
              <div class="col-md-3 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="pricing-table">
                  <h1>Quick Security Audit</h1>
                  <h2>$0
                    <strong>/domain</strong>
                  </h2>
                  <div class="feature-list">
                    <ul>
                      <li>Basic recon, common
                      </li>
                      <li>Google hacking queries
                      </li>
                      <li>Enumerate pen ports
                      </li>
                      <li>Brute forces sub-domains, open services
                      </li>
                      <li>Sub-domain hijacking
                      </li>
                      <li>NMap, Metasploit scan
                      </li>
                      <li>Exploit remote shell access
                      </li>
                    </ul>
                  </div>
                  <div class="price-signup">
                    <a class="btn btn-primary btn-lg" href="/online-scan#website/0">Get Report Now
                    </a>
                  </div>
                </div>
              </div>
              <!-- Price detail #2-->
              <div class="col-md-3 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="600ms">
                <div class="pricing-table">
                  <h1>Full Security Audit
                  </h1>
                  <h2> $199
                    <strong>/domain
                    </strong>
                  </h2>
                  <div class="feature-list">
                    <ul>
                      <li>Quick Scan included
                      </li>
                      <li>1 hour Consulting
                      </li>
                      <li>NMAP Vulnerability detection
                      </li>
                      <li>W3AF, SkipFish, Nikto2 audit
                      </li>
                      <li>Automated Metasploit
                      </li>
                      <li>SSL vulnerabilities
                      </li>
                      <li>SQL Injection
                      </li>
                    </ul>
                  </div>
                  <div class="price-signup">
                    <a class="btn btn-primary btn-lg" href="/online-scan#website/1" data-subject="Full Scan">Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <!-- Price detail #3-->
              <div class="col-md-3 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="700ms">
                <div class="pricing-table">
                  <h1>Expert Security Audit
                  </h1>
                  <h2> $1199
                    <strong>/domain
                    </strong>
                  </h2>
                  <div class="feature-list">
                    <ul>
                      <li>Full Scan included
                      </li>
                      <li>5 hours Consulting
                      </li>
                      <li>Manual Metasploit
                      </li>
                      <li>Black Box
                      </li>
                      <li>White Box
                      </li>
                      <li>Source Code Inspection
                      </li>
                      <li>Overall Architecture Review
                      </li>
                    </ul>
                  </div>
                  <div class="price-signup">
                    <a class="btn btn-primary btn-lg" href="/online-scan#website/2" data-subject="Manual Scan">Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-3 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="700ms">
                <div class="pricing-table">
                  <h1>Bug Bounty
                  </h1>
                  <h2>Get a Quote
                    <strong>
                    </strong>
                  </h2>
                  <div class="feature-list">
                    <ul>
                      <li>Manual Scan included
                      </li>
                    </ul>
                  </div>
                  <div class="price-signup">
                    <a class="btn btn-primary btn-lg" href="#contact" data-subject="Bug Bounty">Contact us
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.row-->
          </div>
        </section>
        <!-- End Pricing-->
        <!-- Start Testimonial-->
        <section class="section parallax" id="testimonials">
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Testimonial
                    </span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <div class="col-md-8 col-md-offset-2">
                <div class="testimonials-carousel">
                  <!-- Start Testimonial item #1-->
                  <div class="items">
                    <div class="detail">“We use SOFTSKY to improve security for all our clients worldwide as their work is very comprehensive and their customer service is stellar. They provide useful recommendations to fix the vulnerabilities their checks discover and we highly recommend their services"
                    </div>
                    <div class="name">
                      <a href="https://www.linkedin.com/in/neerajkamdar">Neeraj Kamdar
                      </a>(Founder, Orrasis Ltd.)
                    </div>
                  </div>
                  <!-- Start Testimonial item #2-->
                </div>
              </div>
            </div>
          </div>
          <!-- /.container-->
        </section>
        <!-- End Testimonial-->
        <!-- Start clients-->
        <section class="section" id="clients">
          <div class="container wow fadeInUp" data-wow-duration="700ms" data-wow-delay="600ms">
            <div class="row">
              <div class="clients-carousel">
                <div class="col-md-3 col-xs-6">
                  <a href="http://www.paramountbusinessjets.com">
                    <figure>
                      <img src="/images/clients-logo/clients-logo1.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6">
                  <a href="http://www.marsresearch.com">
                    <figure>
                      <img src="/images/clients-logo/clients-logo2.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6">
                  <a href="http://www.zoomtivity.com">
                    <figure>
                      <img src="/images/clients-logo/clients-logo3.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6">
                  <a href="http://russia-insider.com">
                    <figure>
                      <img src="/images/clients-logo/clients-logo4.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6 hidden">
                  <a href="#">
                    <figure>
                      <img src="/images/clients-logo/clients-logo5.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6 hidden">
                  <a href="#">
                    <figure>
                      <img src="/images/clients-logo/clients-logo6.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6 hidden">
                  <a href="#">
                    <figure>
                      <img src="/images/clients-logo/clients-logo7.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
                <!-- Start clients item-->
                <div class="col-md-3 col-xs-6 hidden">
                  <a href="#">
                    <figure>
                      <img src="/images/clients-logo/clients-logo8.png" alt=""/>
                    </figure>
                  </a>
                </div>
                <!-- End clients item-->
              </div>
            </div>
            <!-- /row-->
          </div>
          <!-- /container-->
        </section>
        <!-- End clients-->
        <!-- Start facts-->
        <section class="section parallax" id="facts">
          <div class="overlay">
          </div>
          <div class="container">
            <div class="row">
              <!-- Start facts info #1-->
              <div class="col-lg-3 col-md-3 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
                <div class="facts-detail">
                  <i class="fa fa-group">
                  </i>
                  <span>200+
                  </span>
                  <p>Clients
                  </p>
                </div>
              </div>
              <!-- Start facts info #2-->
              <div class="col-lg-3 col-md-3 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="400ms">
                <div class="facts-detail">
                  <i class="fa fa-gift">
                  </i>
                  <span>600+
                  </span>
                  <p>Completed Projects
                  </p>
                </div>
              </div>
              <!-- Start facts info #3-->
              <div class="col-lg-3 col-md-3 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="facts-detail">
                  <i class="fa fa-trophy">
                  </i>
                  <span>50
                  </span>
                  <p>Issues Reported
                  </p>
                </div>
              </div>
              <!-- Start facts info #4-->
              <div class="col-lg-3 col-md-3 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="600ms">
                <div class="facts-detail">
                  <i class="fa fa-coffee">
                  </i>
                  <span>3
                  </span>
                  <p>Cups of Coffee
                  </p>
                </div>
              </div>
            </div>
            <!-- /row-->
          </div>
          <!-- /container-->
        </section>
        <!-- End facts-->
        <!-- Start blog-->
        <!-- Start Team-->
        <section class="section" id="team">
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Meet the Team
                    </span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <!-- Start Team item #1-->
              <div class="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="team-member">
                  <img class="image" src="/images/team/1.jpg" alt=""/>
                  <div class="team-info">
                    <h4>Arsen A. Gutsal
                    </h4>
                    <p>CEO, Owner
                    </p>
                    <ul class="socials">
                      <li>
                        <a href="http://facebook.com/arsen.gutsal">
                          <i class="fa fa-facebook">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="http://twitter.com/_0rthodox_">
                          <i class="fa fa-twitter">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://plus.google.com/+ArsenGutsalAtWork">
                          <i class="fa fa-google-plus">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="http://linkedin.com/in/agutsal">
                          <i class="fa fa-linkedin">
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- Start Team item #2-->
              <div class="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="team-member">
                  <img class="image" src="/images/team/2.jpg" alt=""/>
                  <div class="team-info">
                    <h4>Taras Bobalo
                    </h4>
                    <p>Security Analyst
                    </p>
                    <ul class="socials">
                      <li class="hidden">
                        <a href="#">
                          <i class="fa fa-facebook">
                          </i>
                        </a>
                      </li>
                      <li class="hidden">
                        <a href="#">
                          <i class="fa fa-twitter">
                          </i>
                        </a>
                      </li>
                      <li class="hidden">
                        <a href="#">
                          <i class="fa fa-google-plus">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/tarasbobalo">
                          <i class="fa fa-linkedin">
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- Start Team item #3-->
              <div class="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-duration="700ms" data-wow-delay="500ms">
                <div class="team-member">
                  <img class="image" src="/images/team/3.jpg" alt=""/>
                  <div class="team-info">
                    <h4>Ivan Karp
                    </h4>
                    <p>Marketing
                    </p>
                    <ul class="socials">
                      <li>
                        <a href="https://www.facebook.com/ivan.karp">
                          <i class="fa fa-facebook">
                          </i>
                        </a>
                      </li>
                      <li class="hidden">
                        <a href="#">
                          <i class="fa fa-twitter">
                          </i>
                        </a>
                      </li>
                      <li class="hidden">
                        <a href="#">
                          <i class="fa fa-google-plus">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/ivan-karp-6aa16284">
                          <i class="fa fa-linkedin">
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- /row-->
          </div>
          <!-- /container-->
        </section>
        <!-- End Team    -->
        <!-- Start Contact-->
        <section class="section parallax section-white" id="contact">
          <div class="overlay">
          </div>
          <div class="container">
            <div class="row">
              <!-- Start heading-->
              <div class="col-md-offset-2 col-md-8">
                <div class="section-header">
                  <h2 class="service">
                    <span>Contact
                    </span>
                  </h2>
                </div>
              </div>
              <!-- End heading-->
              <!-- Start contact form-->
              <div class="col-md-7 contact-form wow zoomIn" data-wow-duration="700ms" data-wow-delay="300ms">
                <div class="contact-form">
                  <form id="ajax-form" name="ajax-form" action="/api/notify/email/contact-request" method="post">
                    <div class="row">
                      <div class="col-md-6">
                        <label for="name">
                          <span class="error" id="err-name">Please enter name
                          </span>
                        </label>
                        <input class="form-control" id="name" name="name" placeholder="Full Name" type="text"/>
                      </div>
                      <div class="col-md-6">
                        <label for="email">
                          <span class="error" id="err-email">Please enter e-mail
                          </span>
                          <span class="error" id="err-emailvld">Email is not a valid format
                          </span>
                        </label>
                        <input class="form-control" id="email" name="email" placeholder="Your Email" type="email"/>
                      </div>
                      <div class="col-md-12">
                        <input class="form-control" name="url" placeholder="Website URL" type="text"/>
                      </div>
                      <div class="col-md-12">
                        <input class="form-control" name="subject" placeholder="Subject" type="text"/>
                      </div>
                      <div class="col-md-12">
                        <textarea class="form-control" id="message" name="message" rows="5" placeholder="Your Message">
                        </textarea>
                      </div>
                      <div class="col-md-12 text-right">
                        <button class="btn btn-default btn-lg" id="send" type="submit" name="submit">Send Message
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="error text-align-center" id="err-form">There was a problem validating the form please check!
                      </div>
                      <div class="error text-align-center" id="err-timedout">The connection to the server timed out!
                      </div>
                      <div class="error" id="err-state">
                      </div>
                    </div>
                  </form>
                  <div id="ajaxsuccess">Successfully sent!!
                  </div>
                </div>
                <!-- /.contact-form-->
              </div>
              <!-- contact form-->
              <!-- Start contact information-->
              <div class="col-md-4 contact-address wow zoomIn" data-wow-duration="700ms" data-wow-delay="400ms">
                <p>
                  <i class="fa fa-map-marker">
                  </i>
                  <span id="maplink">Schlyahtynec'ka 3, Gai Schevchenkivsky, Ternopil, Ukraine
                    <a href="//maps.google.com">
                    </a>
                  </span>
                </p>
                <p>
                  <i class="fa fa-envelope">
                  </i>
                  <span>info@softsky.com.ua
                  </span>
                </p>
                <p>
                  <i class="fa fa-phone">
                  </i>
                  <span>+38 (096) 5996328
                  </span>
                </p>
                <p>
                  <i class="fa fa-clock-o">
                  </i>
                  <span>Monday - Friday:
                    <strong>10:00 am - 10:00 pm
                    </strong>
                  </span>
                </p>
                <p>
                  <i class="fa fa-clock-o">
                  </i>
                  <span>Saturday - Sunday:
                    <strong>Closed
                    </strong>
                  </span>
                </p>
              </div>
              <!-- End contact information-->
            </div>
            <!-- /.row-->
          </div>
          <!-- /.container-->
        </section>
        <!-- End Contact-->
        <!-- Start footer-->
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <!-- Start footer social-->
                <ul class="list-inline footer-social">
                  <li>
                    <a href="http://facebook.com/arsen.gutsal">
                      <i class="fa fa-facebook">
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="http://linkedin.com/company/softsky">
                      <i class="fa fa-linkedin">
                      </i>
                    </a>
                  </li>
                  <li>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-twitter">
                      </i>
                    </a>
                  </li>
                </ul>
                <!-- footer copyright text-->
                <p>Copyright © SOFTSKY, 2016 All reserved
                </p>
                <!-- end of the footer copyright text-->
              </div>
            </div>
            <!-- /.row-->
          </div>
          <!-- /.container-->
        </footer>
        <!-- End footer-->
        <!-- ========================================-->
        <!---->
        <!-- Plugins-->
        <!-- build:concat /js/vendor.min.js -->
        <xsl:apply-templates select="document('')/xsl:stylesheet/d:data/d:script"/>
      </body>
      <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA' + '-81347756-1', 'auto');
        ga('send', 'pageview');
      </script>
    </html>
  </xsl:template>
</xsl:stylesheet>
