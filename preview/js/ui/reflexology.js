'use strict';
(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
    

    var console = window.console;
    var mac_address = "145289b5dad7b80e";
 
    var current_input = hcap.externalinput.ExternalInputType.TV;
    var debug = false; 
    var debug_error = 0;
    var cpu = false;
    var memory = false;
   
    var isSuppportLocalStorage;
    var images;
    var count_images;
    var $image;
    var cur_image = 0;
    var tmr_generateImage;
    
    var $left = $("#left");
    var $right = $("#right");
    var key_down = false;
    
    var $time;
    var $celcius;
    var days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");  
    var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    var weather_key = "103cedcf5b1c0a4452a75f45ed823e65";
    var lat = "0.98277778";
    var lon = "104.03388889";
    
    var $index;
    var $total;
    
    $(function() {
        $image = $("#image");
//        left = $("#left");
//        right = $("#right");
        $time = $("#date");
        $celcius = $("#celcius");
        $index = $("#index");
        $total = $("#total");
       
  
       
//        hcap.mode.setHcapMode({
//            "mode" : hcap.mode.HCAP_MODE_1,
//            "onSuccess" : function() {
//                console.log("onSuccess");
//                return true;
//            }, 
//            "onFailure" : function(f) {
//                console.log("onFailure : errorMessage = " + f.errorMessage);
//                return true;
//            }
//        });
//        hcap_listener();
        getWeather();
        
	showTime($time);
	setInterval(function(){
            showTime($time);
            return;
        }, 30000);
        

        

        //getdataharris();
        
       loadImages();

        return false;
    });
    $(document).keyup(function(e){
          e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.UP:
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_UP:
                case hcap.key.Code.LEFT:
                    $left.removeClass("active");
                    key_down = false;
                    $left.click();
//                    if (key_down === false){
////                        left.addClass("active");
//                        key_down = true;
//                    }
                    return true;
                case  hcap.key.Code.DOWN:
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_DOWN:
                case hcap.key.Code.RIGHT:
                    $right.removeClass("active");
                    key_down = false;
                    $right.click();
//                    if (key_down === false){
////                       right.addClass("active");
//                        key_down = true;
//                    }
                    return true;
                default:
    //              console.log("default: "+ e.keyCode);
    //                alert("other"+ e.keyCode);
                    break;
            }
            //return false, eventnya dikunci sampai sini, gak dikirim ke windows
            return true;
    });
    
    $(document).keydown(function(e){
          e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.UP:
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_UP:
                case hcap.key.Code.LEFT:
                    if (key_down === false){
                        $left.addClass("active");
//                        console.log("left_pressed!!");
                        key_down = true;
                    }
                    return true;
                case  hcap.key.Code.DOWN:
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_DOWN:
                case hcap.key.Code.RIGHT:
                    if (key_down === false){
//                        console.log("right_pressed!!");
                        $right.addClass("active");
                        key_down = true;
                    }
                    return true;
                case hcap.key.Code.BACK:
                case hcap.key.Code.PORTAL:
                case hcap.key.Code.EXIT:
                    window.location.replace("menu.html");
                    return false;
                default:
    //              console.log("default: "+ e.keyCode);
    //                alert("other"+ e.keyCode);
                    break;
            }
            //return false, eventnya dikunci sampai sini, gak dikirim ke windows
            return true;
    });

    $left.on("click", function(e){
        e.preventDefault();
//       console.log("left"); 
        clearTimeout(tmr_generateImage);
        cur_image = (cur_image - 1 + count_images) % count_images;
        generateImages( cur_image);
        return;
    });
    
    $right.on("click", function(e){
        e.preventDefault();
//        console.log("right");
        clearTimeout(tmr_generateImage);
        cur_image = (cur_image + 1) % count_images;
        generateImages( cur_image);
        return;
    });
    



/*
    var supportsLocalStorage = function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };
*/






    var loadImages = function loadImages(){
        var folder = "http://192.168.60.4/controlpanel/signatejson.php";
        $.ajax({url: folder,dataType: 'json'})
         .done(function(data){
             images = data;
             count_images = data.length;
        }).fail(function( jqXHR, textStatus ) {
            
            images = ["/assets/css/images/hotel.jpg"];
            count_images = 1;
             return;
        }).always(function(){
            generateImages(0);
            $total.html(count_images);
             return;
        });
        return;
    };

      var generateImages = function generateImages(index){
        cur_image = index; 
        $image.attr("src", images[index].link_gambar);
        $index.html(index+1);
        if (count_images > 1){
            index = (index + 1) % count_images;
            tmr_generateImage = setTimeout(function(){
                generateImages( index);
                return;
            }, 12000);
        }
        return;
    };





/*
 var getdataharris = function getdataharris(){
        $.get("https://dbharris.000webhostapp.com/promotionjson.php", 
                function(result){
                   // generatedata(result);
                    generateImages(result)
                    return false;
                },
                "json"
        ).fail(function(){
        });
        return true;
    };


      var generateImages = function generateImages(c){
        cur_image = index; 
         c.forEach(function(data){
            console.log(data);
            $image.attr("src", data.judul_gambar);
        });
        
        $index.html(index+1);
        if (count_images > 1){
            index = (index + 1) % count_images;
            tmr_generateImage = setTimeout(function(){
                generateImages( index);
                return;
            }, 12000);
        }
        return;
    };
    

    /*
    var generatedata = function generatedata(c){
        c.forEach(function(data){
            console.log(data);
        });
        return;
    };

    */
  




    var setRoomInfo = function setRoomInfo(mac){
        if (supportsLocalStorage()) {
                window.localStorage.setItem("cic.mac", mac);
        }
         // get room info from mac address
         $.post("http://192.168.60.4/hk/RoomInfo.php", 
                {devid: mac}, 
                function( data ) {
                    $( "#guest" ).html( ""+ data.guest_name0 );
                    $( "#guest_bottom" ).html( ""+ data.guest_name0 );
                    $( "#room" ).html( "" +data.room_name0 );
//                    $( "#hotel_name" ).html( data.nama_hotel0 );
                    return;
                  // $( "#loading_welcome").hide( 5000 );
//                                                     $( "#loading_welcome").velocity( "fadeOut", { duration: 1000 } );
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
            return;
        });
        return;
    };
  })
);
