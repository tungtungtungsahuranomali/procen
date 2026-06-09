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
    $(function() {
//        $('#menu_cont').animate({ left: 0}, {duration: 1500, easing: 'swing'});
        $time = $("#date");
        $celcius = $("#celcius");
        isSuppportLocalStorage = supportsLocalStorage();
        if (isSuppportLocalStorage){
//            if (window.localStorage.getItem("cic.menu") !== null){
//                current_menu = Number(window.localStorage.getItem("cic.menu"));
//            }
            if (window.localStorage.getItem("cic.mac") !== null){
                mac_address = setRoomInfo(window.localStorage.getItem("cic.mac"));
            }else{
                get_device_id();
            }
            
        }else{
            get_device_id();
        }
        
        
        
//        setRoomInfo(mac_address);
        
        getWeather();
        
	showTime($time);
	setInterval(function(){
            showTime($time);
        }, 30000);
        setTimeout(toMenu, 30000);
        return false;
    });
    $(document).keydown(function(e){
        e = e || window.event;
        switch(e.which || e.keyCode){
            case hcap.key.Code.ENTER:
                window.location.replace("menu.html"); 
                break;
            default:
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
                    $( "#room" ).html( "" +data.room_name0 );
                    $( "#running-text" ).html( "" + data.r_text0 );
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
        });
    };
    var toMenu = function toMenu(){
//        console.log("AA");
        window.location.replace("menu.html"); 
    }
  })

);

