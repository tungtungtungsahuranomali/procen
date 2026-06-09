(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
    var isSuppportLocalStorage;
    var console = window.console;
    var mac_address = "145289b5dad7b80e";
    var log = document.getElementById("log");
    var $time;
    var $celcius;
    var days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");  
    var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    var weather_key = "103cedcf5b1c0a4452a75f45ed823e65";
    var lat = "0.98277778";
    var lon = "104.03388889";
    
    var current_menu;
     // loading expand paragraphs
   var $nav_system = $('#js-nav-system');
   var $body = $('body');
   var app_id ="";

   // events on main menu
   // mouse !
//   var $i=0;
   $nav_system.on('mouseenter', '.js-nav-system__item', function(event) {
         var $this = $(this),
             $subnav_link = $this.children('.js-nav-system__link'),
             $subnav = $this.children('.js-nav-system__subnav');

         $this.attr({
            'data-show-sub': 'true'
         });

         // show submenu
         if ($subnav.length === 1) {
            $subnav.attr({
               'data-visually-hidden': 'false'
            });
         }

      })
      .on('mouseleave', '.js-nav-system__item', function(event) {
         var $this = $(this),
             $subnav_link = $this.children('.js-nav-system__link'),
             $subnav = $this.children('.js-nav-system__subnav');

         $this.attr({
            'data-show-sub': 'false'
         });
         // show submenu
         if ($subnav.length === 1) {
            $subnav.attr({
               'data-visually-hidden': 'true'
            });
         }

      })
      // keyboard
    .on('focus', '.js-nav-system__link', function(event) {
//          console.log("FOCUSED "+$i);
         var $this = $(this),
             $parent = $nav_system,//$this.parents('#js-nav-system'),
             $parent_item = $this.parents('.js-nav-system__item'),
             $subnav = $this.next('.js-nav-system__subnav');

         $parent_item.attr({
            'data-show-sub': 'true'
         });

         // hide other menus and show submenu activated
         $parent.find('.js-nav-system__subnav').attr({
            'data-visually-hidden': 'true'
         });

         if ($subnav.length === 1) {
            $subnav.attr({
               'data-visually-hidden': 'false'
            });
         }

      })
      .on('focusout', '.js-nav-system__link', function(event) {
         var $this = $(this),
             $parent = $nav_system,//$this.parents('#js-nav-system'),
             $parent_item = $this.parents('.js-nav-system__item');

         $parent_item.attr({
            'data-show-sub': 'false'
         });
      })
      .on('keydown', '.js-nav-system__link', function(event) {
//          console.log("KeyUP system__link "+$i);
         var $this = $(this),
             $parent = $nav_system,//$this.parents('#js-nav-system'),
             $parent_item = $this.parents('.js-nav-system__item'),
             $subnav = $this.next('.js-nav-system__subnav');

         // event keyboard left
         if (event.keyCode === 37) {
            // select previous nav-system__link

            // if we are on first => activate last
            if ($parent_item.is(".js-nav-system__item:first-child")) {
               $parent.find(" .js-nav-system__item:last-child ").children(".js-nav-system__link").focus();
            }
            // else activate previous
            else {
               $parent_item.prev().children(".js-nav-system__link").focus();
            }
            event.preventDefault();
         }

         // event keyboard right
         if (event.keyCode === 39) {
            // select previous nav-system__link

            // if we are on last => activate first
            if ($parent_item.is(".js-nav-system__item:last-child")) {
               $parent.find(" .js-nav-system__item:first-child ").children(".js-nav-system__link").focus();
            }
            // else activate next
            else {
               $parent_item.next().children(".js-nav-system__link").focus();
            }
            event.preventDefault();
         }

         // event keyboard up
         if (event.keyCode === 38) {
            // select first nav-system__subnav__link
//            console.log($subnav.length);
//            console.log($subnav);
            if ($subnav.length === 1) {
               // if submenu has been closed => reopen
               $subnav.attr({
                  'data-visually-hidden': 'false'
               });
               // and select first item
               $subnav.find(" .js-nav-system__subnav__item:last-child ").attr({
                  'data-visually-hidden': 'false'
               }).children(".js-nav-system__subnav__link").focus();
            }
            event.preventDefault();
         }

         // event keyboard bottom
         if (event.keyCode === 40) {
            // select first nav-system__subnav__link
//            console.log($subnav.length);
            if ($subnav.length === 1) {
               // if submenu has been closed => reopen
               $subnav.attr({
                  'data-visually-hidden': 'false'
               });
               // and select first item
               $subnav.find(".js-nav-system__subnav__item:first-child").attr({
                  'data-visually-hidden': 'false'
               }).children(".js-nav-system__subnav__link").focus();
            }
            event.preventDefault();
         }
         
         // event shift + tab 
         if (event.shiftKey && event.keyCode === 9) {
            if ($parent_item.is(".js-nav-system__item:first-child")) {
               $subnav.attr({
                  'data-visually-hidden': 'true'
               });
            } else {

               var $prev_nav_link = $parent_item.prev('.js-nav-system__item').children(".js-nav-system__link"),
                   $subnav_prev = $prev_nav_link.next('.js-nav-system__subnav');
               if ($subnav_prev.length === 1) { // hide current subnav, show previous and select last element
                  $subnav.attr({
                     'data-visually-hidden': 'true'
                  });
                  $subnav_prev.attr({
                    'data-visually-hidden': 'false'
                  });
                  $subnav_prev.find(" .js-nav-system__subnav__item:last-child ").children(".js-nav-system__subnav__link").focus();
                  event.preventDefault();
               }
            }
         }

      })
// $subnav.attr({
//                  'data-visually-hidden': 'false'
//               });
   // events on submenu item
   
    .on('keydown', '.js-nav-system__subnav__link', function(event) {
//          console.log("KeyDOwn subnav_link "+$i);
         var $this = $(this),
             $subnav = $this.parents('.js-nav-system__subnav'),
             $subnav_item = $this.parents('.js-nav-system__subnav__item'),
             $nav_link = $subnav.prev('.js-nav-system__link'),
             $nav_item = $nav_link.parents('.js-nav-system__item'),
             $nav = $nav_system;//$nav_link.parents('#js-nav-system');
             
//            console.log($i++);
         // event keyboard bottom
         if (event.keyCode === 40) {
            // if we are on last => activate first
//            console.log( $subnav_item);
            $subnav_item.attr({
                  'data-visually-hidden': 'true'
               });
            if ($subnav_item.is("li.js-nav-system__subnav__item:last-child")) {
//                console.log("true");
               $subnav.find("li.js-nav-system__subnav__item:first-child").attr({
                  'data-visually-hidden': 'false'
               }).children(".js-nav-system__subnav__link").focus();
            }
            // else activate next
            else {
//                console.log("AAA");
//                console.log($subnav_item.next("li.js-nav-system__subnav__item"));
               $subnav_item.next("li.js-nav-system__subnav__item").attr({
                  'data-visually-hidden': 'false'
               }).children(".js-nav-system__subnav__link").focus();
               
            }
            event.preventDefault();
         }
         // event keyboard top
         if (event.keyCode === 38) {
            // if we are on first => activate last
            $subnav_item.attr({
                  'data-visually-hidden': 'true'
               });
            if ($subnav_item.is("li.js-nav-system__subnav__item:first-child")) {
//                console.log("INI");
               $subnav.find("li.js-nav-system__subnav__item:last-child ").attr({
                  'data-visually-hidden': 'false'
               }).find(".js-nav-system__subnav__link").focus();
            }
            // else activate previous
            else {
//                console.log("ITU");
               $subnav_item.prev("li.js-nav-system__subnav__item").attr({
                  'data-visually-hidden': 'false',
               }).children(".js-nav-system__subnav__link").focus();
            }
            event.preventDefault();
         }
         // event keyboard Esc
         if (event.keyCode === 27) {
            // close the menu
            $nav_link.focus();
            $subnav.attr({
               'data-visually-hidden': 'true'
            });
            $subnav_item.attr({
                'data-visually-hidden': 'true'
            });
            event.preventDefault();
         }
         // event keyboard right
         if (event.keyCode === 39) {
            // select next nav-system__link
            $subnav.attr({
               'data-visually-hidden': 'true'
            });
            $subnav_item.attr({
                'data-visually-hidden': 'true'
            });
            // if we are on last => activate first and choose first item
            if ($nav_item.is(".js-nav-system__item:last-child")) {
               var $next = $nav.find(" .js-nav-system__item:first-child ").children(".js-nav-system__link");
               $next.focus();
               var $subnav_next = $next.next('.js-nav-system__subnav');
               if ($subnav_next.length === 1) {
                  $subnav_next.find(" .js-nav-system__subnav__item:first-child ").children(".js-nav-system__subnav__link").focus();
               }
            }
            // else activate next
            else {
               var $next = $nav_item.next().children(".js-nav-system__link");
               $next.focus();
               var $subnav_next = $next.next('.js-nav-system__subnav');
               if ($subnav_next.length === 1) {
                  $subnav_next.find(" .js-nav-system__subnav__item:first-child ").children(".js-nav-system__subnav__link").focus();
               }
            }
            event.preventDefault();
         }
         // event keyboard left
         if (event.keyCode === 37) {
            // select prev nav-system__link
            $subnav.attr({
               'data-visually-hidden': 'true'
            });

            $subnav_item.attr({
                'data-visually-hidden': 'true'
                });
            // if we are on first => activate last and choose first item
            if ($nav_item.is(".js-nav-system__item:first-child")) {
               var $prev = $nav.find(" .js-nav-system__item:last-child ").children(".js-nav-system__link");
               $prev.focus();
               var $subnav_prev = $prev.next('.js-nav-system__subnav');
               if ($subnav_prev.length === 1) {
                  $subnav_prev.find(".js-nav-system__subnav__item:first-child ").children(".js-nav-system__subnav__link").focus();
               }
            }
            // else activate prev
            else {
               var $prev = $nav_item.prev().children(".js-nav-system__link");
               $prev.focus();
               var $subnav_prev = $prev.next('.js-nav-system__subnav');
               if ($subnav_prev.length === 1) {
                  $subnav_prev.find(".js-nav-system__subnav__item:first-child ").children(".js-nav-system__subnav__link").focus();
               }
            }
            event.preventDefault();
         }
         // event tab 
         if (event.keyCode === 9 && !event.shiftKey) { // if we are on last subnav of last item and we go forward => hide subnav 
//            if ($nav_item.is(".js-nav-system__item:last-child") && $subnav_item.is(".js-nav-system__subnav__item:last-child")) {
//               $subnav.attr({
//                  'data-visually-hidden': 'true'
//               });
//            }
         }

      })
      .on('focus', '.js-nav-system__subnav__link', function(event) {
         var $this = $(this),
             $subnav = $this.parents('.js-nav-system__subnav'),
             $subnav_item = $this.parents('.js-nav-system__subnav__item'),
             $nav_link = $subnav.prev('.js-nav-system__link'),
             $nav_item = $nav_link.parents('.js-nav-system__item'),
             $nav = $nav_link.parents('.js-nav-system__item');

         $nav_item.attr({
            'data-show-sub': 'true'
         });
      })
      .on('focusout', '.js-nav-system__subnav__link', function(event) {
         var $this = $(this),
             $subnav = $this.parents('.js-nav-system__subnav'),
             $subnav_item = $this.parents('.js-nav-system__subnav__item'),
             $nav_link = $subnav.prev('.js-nav-system__link'),
             $nav_item = $nav_link.parents('.js-nav-system__item'),
             $nav = $nav_link.parents('.js-nav-system__item');

         $nav_item.attr({
            'data-show-sub': 'false'
         });
      });
    
    //##########################################################################
    $(function() {
//        $('#menu_cont').animate({ left: 0}, {duration: 1500, easing: 'swing'});
        
        $time = $("#date");
        $celcius = $("#celcius");
        
        isSuppportLocalStorage = supportsLocalStorage();
        if (isSuppportLocalStorage){
            if (window.localStorage.getItem("cic.menu") !== null){
                current_menu = Number(window.localStorage.getItem("cic.menu"));
            }
            if (window.localStorage.getItem("cic.mac") !== null){
                mac_address = setRoomInfo(window.localStorage.getItem("cic.mac"));
            }else{
                get_device_id();
            }
            
        }else{
            get_device_id();
        }
        
            if ($nav_system.length) { // if there is at least one :)

                // initialization
                var $nav_system_link = $('.js-nav-system__link');

                $nav_system_link.each(function(index_to_expand) {
                   var $this = $(this),
//                       index_lisible = index_to_expand + 1,
                       $subnav = $this.next('.js-nav-system__subnav');

                   // if there is a subnav adjacent to the link
                   if ($subnav.length === 1) {
                      $subnav.attr({
                         'data-visually-hidden': 'true'
                      });
                   }
                });

             }
             
            $nav_system.find(".js-nav-system__item:first-child").trigger("mouseover")
                    .find(".js-nav-system__link").focus();

    //        setRoomInfo(mac_address);

            getWeather();
            
	showTime($time);
	setInterval(function(){
            showTime($time);
        }, 30000);
        
//        $nav_system.find(".js-nav-system__link:nth-child(2)").focus();
        
        $("#screen_share").on("click", function(){
//            console.log("GAGAG");
            var $this = $(this);
//            $this.blur(function(){
//            
////                $this.parent(".js-nav-system__link").blur();
//            
////               $subnav_item.prev().attr({
////                  'data-visually-hidden': 'false'
////               }).children(".js-nav-system__subnav__link").focus();
////            console.log("SASASA");
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
////                var $nav_link = $nav_system.find(".js-nav-system__item:first-child")
////                        .children(".js-nav-system__link");
////                $nav_link.focus();
////                $nav_link.children(".js-nav-system__subnav").first().children(".js-nav-system__subnav__link").focus();
//                $(this).off("blur");
//            });
//            $this.blur();
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();


//            $this.blur(function(){
//                $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//                $(this).off("blur");
//            });
            $this.blur();
            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
            $nav_system.find(".js-nav-system__item:first-child")
                        .children(".js-nav-system__link").focus();
//            app_id = "144115188075859002";
            app_id = "144115188075855880";
            hcap.preloadedApplication.launchPreloadedApplication({
                "id" : app_id, // Screen Share
                "onSuccess" : function() {
                    
//                    $body.hide();
//                        console.log("onSuccess");
                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
                       return false;
                },
                "onFailure" : function(f) {
//                        console.log("onFailure : errorMessage = " + f.errorMessage);
                        // $("#welcome-message").prepend("launchPreloadedApplication onFailure : errorMessage = " + f.errorMessage);
                            window.location.replace("not_avail.html");
                       return false;
                }
           });
           return false;
        });
        
        
        $("#youtube").on("click", function(){
            var $this = $(this);
            $this.blur();
            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
            $nav_system.find(".js-nav-system__item:first-child")
                        .children(".js-nav-system__link").focus();
            app_id = "144115188075859002";// youtube
            hcap.preloadedApplication.launchPreloadedApplication({
                "id" : app_id, 
                "onSuccess" : function() {
                    
//                    $body.hide();
//                        console.log("onSuccess");
                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
                       return false;
                },
                "onFailure" : function(f) {
//                        console.log("onFailure : errorMessage = " + f.errorMessage);
                            window.location.replace("not_avail.html");
                       return false;
                }
           });
           return false;
        });

        $("#netflix").on("click", function(){
         var $this = $(this);
         $this.blur();
         $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
         $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
         $nav_system.find(".js-nav-system__item:first-child")
                     .children(".js-nav-system__link").focus();
         app_id = "144115188075859002";// netflix
         hcap.preloadedApplication.launchPreloadedApplication({
             "id" : app_id, 
             "onSuccess" : function() {
                 
//                    $body.hide();
//                        console.log("onSuccess");
                     // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
                    return false;
             },
             "onFailure" : function(f) {
//                        console.log("onFailure : errorMessage = " + f.errorMessage);
                         window.location.replace("not_avail.html");
                    return false;
             }
        });
        return false;
     });
        
        
//        $("#color_bridge").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "244115188075859012";// color_bridge
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
//        $("#cutter_pillar").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "244115188075859011";// cutter_pillar
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
//        $("#mainstream").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "244115188075859010";// mainstream
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
//        $("#gravity_ball").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "244115188075859009";// gravity_ball
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
//        $("#tv_hockey").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "244115188075859004";// tv_hockey
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
//        $("#tanks").on("click", function(){
//            var $this = $(this);
//            $this.blur();
//            $this.parents('.js-nav-system__subnav__item').attr({"data-visually-hidden" : "true"});
//            $this.closest("li").attr({'data-visually-hidden': 'true'}).closest("ul").attr({'data-visually-hidden': 'true'});           
//            $nav_system.find(".js-nav-system__item:first-child")
//                        .children(".js-nav-system__link").focus();
//            app_id = "144115188075859005";// tanks
//            hcap.preloadedApplication.launchPreloadedApplication({
//                "id" : app_id, 
//                "onSuccess" : function() {
//                    
////                    $body.hide();
////                        console.log("onSuccess");
//                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                       return false;
//                },
//                "onFailure" : function(f) {
////                        console.log("onFailure : errorMessage = " + f.errorMessage);
//                            window.location.replace("not_avail.html");
//                       return false;
//                }
//           });
//           return false;
//        });
        
        $("#browser").on("click", function(){
            var $this = $(this);
            app_id = "";
            hcap.preloadedApplication.launchPreloadedApplication({
                "id" : "144115188075855877", // Browser
                "parameters" : "{'target':'http://www.google.com/', 'fullMode': 'true', 'newtab': 'false'}",
                "onSuccess" : function() {
//                        console.log("onSuccess");
                        // $("#welcome-message").prepend("launchPreloadedApplication onSuccess ");
//                        $this.blur();
                       return false;
                },
                "onFailure" : function(f) {
//                        console.log("onFailure : errorMessage = " + f.errorMessage);
                        // $("#welcome-message").prepend("launchPreloadedApplication onFailure : errorMessage = " + f.errorMessage);
                            window.location.replace("not_avail.html");
                       return false;
                }
           });
           return false;
        });
//        $nav_system.find(".js-nav-system__link:first-child").focus();
        
        return false;
    });
    $(document).on( "keydown", function(e){
        e = e || window.event;
        switch(e.which || e.keyCode){
//            case hcap.key.Code.ENTER:
//                break;
//            case hcap.key.Code.EXIT:
//               break;
            default:
                if (app_id !== ""){
                    hcap.preloadedApplication.destroyPreloadedApplication({
                        "id" : app_id,
                        "onSuccess" : function() {
                            $nav_system.find(".js-nav-system__item:first-child").trigger("mouseover")
                                    .children(".js-nav-system__link").focus();
                            app_id = "";
//                            $body.show(function(){
//
//                                $nav_system.find(".js-nav-system__item:first-child").trigger("mouseover")
//                                        .find(".js-nav-system__link:first-child").focus();
//                                app_id = "";
//                                return true;
//                            });
    //                        console.log("onSuccess");
                            return true;
                        },
                        "onFailure" : function(f) {
    //                        console.log("onFailure : errorMessage = " + f.errorMessage);
                            return true;
                        }
                        
                   });
//                    $nav_system.find(".js-nav-system__item:first-child").trigger("mouseover")
//                            .find(".js-nav-system__link:first-child").focus();
//                    app_id = "";
                }
//              console.log("default: "+ e.keyCode);
//                alert("other"+ e.keyCode);
                break;

        }
        return true;
    });


    var supportsLocalStorage = function supportsLocalStorage() {
        try {
              return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
              return false;
        }
    };
    var print_current_mac = function print_current_mac(ip) {
        hcap.network.getNumberOfNetworkDevices({
             "onSuccess" : function(s) {
                 console.log("onSuccess : the number of network devices = " + s.count);
                 // $("#welcome-message").prepend("onSuccess : the number of network devices = " + s.count);
//                 for (var i = 0; i < s.count; i++) {
                     (function(k) {
                         hcap.network.getNetworkDevice({
                             "index" : k,
                             "onSuccess" : function(r) {
                                 if (ip === r.ip) {
                                     console.log("CURRENT MAC : " + r.mac);
                                            // $("#welcome-message").prepend("CURRENT MAC : " + r.mac);
                                            // save mac address to localStorage
                                            mac_address = setRoomInfo(r.mac);
                                    }
                                    return false;
                             }, 
                             "onFailure" : function(r) {
                                console.log("onFailure : errorMessage = " + r.errorMessage);
                                // $("#welcome-message").prepend("onFailure getNetworkDevice: errorMessage = " + r.errorMessage);
                                return false;
                             }
                         });

                         return false;
                     })(0);
//                 }
                return false;
             }, 
             "onFailure" : function(f) {
                console.log("onFailure : errorMessage = " + f.errorMessage);
                // $("#welcome-message").prepend("onFailure NumberOfNetworkDevices: errorMessage = " + f.errorMessage);
                return false;
             }
        });
        return true;
    };
    var get_device_id = function get_device_id(){
        hcap.network.getNetworkInformation({
                 "onSuccess" : function(s) {
                    print_current_mac(s.ip_address);
                    return false;
                 }, 
                 "onFailure" : function(f) {
                    console.log("onFailure : errorMessage = " + f.errorMessage);
                   // $("#welcome-message").prepend("onFailure networkinformation: errorMessage = " + f.errorMessage);
                   return false;
                 }
        });
        return true;
    };
    var setRoomInfo = function setRoomInfo(mac){
        if (supportsLocalStorage()) {
                window.localStorage.setItem("cic.mac", mac);
        }
         // get room info from mac address
         $.post("http://192.168.60.4/controlpanel/RoomInfo.php", 
                {devid: mac}, 
                function( data ) {
                    $( "#guest" ).html( ""+ data.guest_name0 );
                    $( "#guest_bottom" ).html( ""+ data.guest_name0 );
                    $( "#room" ).html( "" + data.room_name0 );
                    $( "#running-text" ).html( "" + data.r_text0 );
                    return;
                }, "json");
         return mac;
    };
    
    


    var showTime = function showTime(time){
//        console.log("time");
	var current_time = new Date();
	var current_day = current_time.getDay();	
	var current_date = current_time.getDate();
	var current_year = current_time.getFullYear();
	var current_month = current_time.getMonth() + 1;
	var current_hour = current_time.getHours();
	var current_min = current_time.getMinutes();
	var tmp_time = "";
        
	tmp_time =	(current_hour > 9 ? current_hour  : ("0"+current_hour)) + ":" +
                (current_min < 10 ? "0" : "") + current_min;
        var str_time = days[current_day]+ ", " + current_date + " " + 
                months[current_month-1] + " " + current_year + " <span id=\"time\">" + tmp_time + "</span>";
        time.html(str_time);
	return false;

    };
    var getWeather = function getWeather(){
        var get_url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat+"&lon="+lon+"&APPID="+weather_key;
        $.get(get_url, function(data){
//            console.log(data.main.temp);
            $celcius.html(data.main.temp);
        });
    };
  
  })

);




