<?php

  if (!false)
  {
    $greetings = "You're unauthorized";
    $getauth = "<a class='auth' href='/auth'>Sign in</a>|<a class='auth' href='/reg'>Sign Up</a>";
  }
?>

<html>
  <head><title>Auth page</title>

  <meta name="viewport" content="initial-scale=1.0,min-scale=1.0,max-scale=1.0,width=device-width,user-scalable=no">

  <link rel="stylesheet" type="text/CSS" href="/m/css/style.css">


  <script type="text/javascript" src="/m/js/common_lib.js"></script>
</head>
  <body>
<div id="nav_draw">
  <div id="nav_draw_wrapper">
      <div class="head">Header</div>

      <a href='#'><div class="item">Home</div></a>
      <div class="item">News</div>
      <div class="item">Forum</div>
      <div class="item">Help</div>
      <div class="item">FAQ</div>
      <div class="item">About Us</div>
  </div>
</div>
<div id="header_wrapper">
  <div id="header">
  <div id="left_bar">
    <div id="hamburger">
      <div id="hamburger_circle">
        <span class="hamburger_hr" id="top_hr"></span>
        <span class="hamburger_hr" id="middle_hr"></span>
        <span class="hamburger_hr" id="bottom_hr"></span>
      </div>
    </div>
    <div id="navdraw_touch_bar"></div>
  </div>
  <div id="logo_title">mellogang</div>
  <div id="right-bar"></div>
  </div>
</div>
<div id="content_hover"></div>
<div id="content">
  <div id="content_wrapper">
  <div id="info"></div>

  <?php
  $i=0;

  while($i<10000){
  echo $i."<br>";
  $i++;
  }
  ?>
  </div>
</div>
  </body>


<script type="text/javascript" src="/m/js/plugins/navdraw.js">
 /* function initDrawer(){
    var hamburger_body = getById("hamburger"),
        hamburger_circle = getById("hamburger_circle"),
        top_hr = getById("top_hr"),
        mid_hr = getById("middle_hr"),
        bot_hr = getById("bottom_hr"),
        theDraw = getById("nav_draw"),
        theContent = getById("content"),
        contentHover = getById("content_hover"),
        contentWrapper = getById("content_wrapper");

        scrollY_temp = 0;



        addEvent(hamburger_body, "click", shoveTheDrawer, false);
        addEvent(contentHover, "click", shoveTheDrawer, false);

        function shoveTheDrawer(ev)
        {
          if (theDraw.className == '' || theDraw.className == 'closed')
          {
            scrollY_temp = window.pageYOffset;
            theDraw.style.left = 0;
            contentHover.style.display = 'block';
            setTimeout(function(){ contentHover.style.opacity = 1; },20);
            circleTranform(true);
            theDraw.className = 'opened';
          } else {
            theDraw.style.left = '-290px';
            contentHover.style.opacity = 0;
            setTimeout(function(){ contentHover.style.display = 'none'; },100);
            circleTranform(false);
            theDraw.className = 'closed';
            window.scrollTo(0, scrollY_temp);
          }
        }
        function circleTranform(flag)
        {
          if (flag)
          {
            hamburger_circle.style.transform = 'rotate(180deg)';
            hamburger_circle.style.background = '#eee'

            top_hr.style.width = '14px';
            top_hr.style.marginLeft = '19px';
            top_hr.style.transform = 'rotate(38deg) translateY(5px)';

            middle_hr.style.width = '17px';
            middle_hr.style.marginLeft = '11px';

            bottom_hr.style.width = '14px';
            bottom_hr.style.marginLeft = '19px';
            bottom_hr.style.transform = 'rotate(-38deg) translateY(-5px)';
          }
          else
          {
            hamburger_circle.style.transform = 'rotate(360deg)';
            hamburger_circle.style.background = '';


            timeout = setTimeout(function()
            {
              hamburger_circle.style.transition = 'none';
              hamburger_circle.style.transform = 'rotate(0deg)';
              setTimeout(function(){hamburger_circle.style.transition = 'background .2s, transform .2s';}, 20);
              clearTimeout(timeout);
              timeout = FALSE;
            },300);


            top_hr.style.width = '23px';
            top_hr.style.marginLeft = '8px';
            top_hr.style.transform = 'rotate(0deg) translateY(0px)';

            middle_hr.style.width = '23px';
            middle_hr.style.marginLeft = '8px';

            bottom_hr.style.width = '23px';
            bottom_hr.style.marginLeft = '8px';
            bottom_hr.style.transform = 'rotate(0deg) translateY(0px)';
        }
      }
  }
  window.onload = function(){
    initDrawer();
    getById("header").style.opacity = 0.98;

};*/
</script>
<script type="text/javascript">
window.onload = function(){
    getById("header").style.opacity = 0.98;
    var hamburger_body = getById("hamburger"),
        hamburger_circle = getById("hamburger_circle"),
        top_hr = getById("top_hr"),
        mid_hr = getById("middle_hr"),
        bot_hr = getById("bottom_hr"),
        nav_touch_bar = getById("navdraw_touch_bar"),
        theDraw = getById("nav_draw"),
        theContent = getById("content"),
        contentHover = getById("content_hover"),
        contentWrapper = getById("content_wrapper");
    NavDrawJS({
        nav_draw: theDraw,
        nav_touch_bar: nav_touch_bar,
        hamburger: hamburger_circle,
        first_hamb_layer: top_hr,
        middle_hamb_layer: mid_hr,
        last_hamb_layer: bot_hr
    })
}
</script>
</html>
