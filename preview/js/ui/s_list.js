(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
//    var isSuppportLocalStorage;
//    var console = window.console;
//    var mac_address = "145289b5dad7b80e";
//    var log = document.getElementById("log");
//    var $time;
//    var $celcius;
//    var days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");  
//    var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
//    var weather_key = "103cedcf5b1c0a4452a75f45ed823e65";
//    var lat = "0.98277778";
//    var lon = "104.03388889";
    
//    var current_menu;
//    var content;
    var $desc = $("#desc");
    
    var $list = $("#single-l_list");
    var current_focus = 0;
    var list_count =0;
    var is_desc_focus = false;
    //##########################################################################
    $(function() {
//        $('#menu_cont').animate({ left: 0}, {duration: 1500, easing: 'swing'});  
//        $pict = $("#pict");
        $desc = $("#desc");
        
    
//        isSuppportLocalStorage = supportsLocalStorage();
//        if (isSuppportLocalStorage){
//            if (window.localStorage.getItem("cic.menu") !== null){
//                current_menu = Number(window.localStorage.getItem("cic.menu"));
//            }
//            if (window.localStorage.getItem("cic.mac") !== null){
//                mac_address = setRoomInfo(window.localStorage.getItem("cic.mac"));
//            }else{
//                get_device_id();
//            }
//            
//        }else{
//            get_device_id();
//        }
        
        
//        setRoomInfo(mac_address);
        
//        getWeather();
        
//	showTime($time);
//	setInterval(function(){
//            showTime($time);
////        }, 30000);
//        var content = window.location.hash.substring(1);
//        getContent(content);
//        console.log(window.location.hash.substring(1));

        getList();
        return false;
    });
    $(document).keydown(function(e){
        e = e || window.event;
        switch(e.which || e.keyCode){
            case hcap.key.Code.ENTER:
                break;
            case hcap.key.Code.CH_DOWN:
            case hcap.key.Code.DOWN:
            case hcap.key.Code.PAGE_DOWN:
                if (is_desc_focus === false){
                    current_focus = (current_focus + 1) % list_count;

                    $("#it_"+current_focus).focus();
    //                document.location.href="#it_"+current_focus;
                }
                break;
            case hcap.key.Code.CH_UP:
            case hcap.key.Code.UP:
            case hcap.key.Code.PAGE_UP:
                if (is_desc_focus === false){
                    current_focus = (current_focus - 1 + list_count) % list_count;
                    $("#it_"+current_focus).focus();
    //                document.location.href="#it_"+current_focus;
                }
                break;
            case hcap.key.Code.RIGHT:
                if (is_desc_focus === false){
                    $("#it_"+current_focus).click();
                }
                break;
            case hcap.key.Code.LEFT:
                if (is_desc_focus === true){
                    $desc.blur();
                }
                break;
            case hcap.key.Code.BACK:
                if (is_desc_focus === true){
                    $desc.blur();
                    break;
                }
            case hcap.key.Code.PORTAL:
            case hcap.key.Code.EXIT:
                window.location.replace("menu.html");
                return false;
            default:
                break;

        }
        return true;
    });
    $list.on("click", ".list_item", function(e){
       e.preventDefault();
       var $this = $(this);
       var id = $this.data("item");
       var order = $this.data("id");
       if (current_focus !== order){
           current_focus = order;
       }
       var get_url = "http://192.168.60.4/iptvman/out/s-list/"+id;
        $.get(get_url, function(data){
//            console.log(data);
//            $title_content.html(data.title);
//            $desc.html(data.description);
//            $desc.focus();
//            $pict.attr("src", data.img_desc);
            $desc.html(data.description);
            $desc.focus();
            return;
        }, "json");
       return;
//       alert(id);
    }).on("focus", ".list_item", function(){
//        var $this = $(this);
//        var top = $this.position().top ;
////        console.log(top);
//        $list.scrollTop(top );
        this.scrollIntoView(false);
        return;
    });
    $desc.on("focus", function(){
        $("#it_"+current_focus).addClass("active");
        is_desc_focus = true;
    }).on("blur", function(){
        $("#it_"+current_focus).removeClass("active").focus();
        this.innerHTML = "";
        is_desc_focus = false;
    });
//    var supportsLocalStorage = function supportsLocalStorage() {
//        try {
//              return 'localStorage' in window && window['localStorage'] !== null;
//        } catch (e) {
//              return false;
//        }
//    };
//    var print_current_mac = function print_current_mac(ip) {
//        hcap.network.getNumberOfNetworkDevices({
//             "onSuccess" : function(s) {
//                 console.log("onSuccess : the number of network devices = " + s.count);
//                 for (var i = 0; i < s.count; i++) {
//                     (function(k) {
//                         hcap.network.getNetworkDevice({
//                             "index" : k,
//                             "onSuccess" : function(r) {
//                                 if (ip === r.ip) {
//                                     console.log("CURRENT MAC : " + r.mac);
//                                            mac_address = setRoomInfo(r.mac);
//                                    }
//                                    return false;
//                             }, 
//                             "onFailure" : function(r) {
//                                console.log("onFailure : errorMessage = " + r.errorMessage);
//                                return false;
//                             }
//                         });
//
//                         return false;
//                     })(i);
//                 }
//                return false;
//             }, 
//             "onFailure" : function(f) {
//                console.log("onFailure : errorMessage = " + f.errorMessage);
//                return false;
//             }
//        });
//        return true;
//    };
//    var get_device_id = function get_device_id(){
//        hcap.network.getNetworkInformation({
//                 "onSuccess" : function(s) {
//                    print_current_mac(s.ip_address);
//                    return false;
//                 }, 
//                 "onFailure" : function(f) {
//                    console.log("onFailure : errorMessage = " + f.errorMessage);
//                   return false;
//                 }
//        });
//        return true;
//    };
//    var setRoomInfo = function setRoomInfo(mac){
//        if (supportsLocalStorage()) {
//                window.localStorage.setItem("cic.mac", mac);
//        }
//         // get room info from mac address
//         $.post("http://iptv.cic.net.id/hk/RoomInfo.php", 
//                {devid: mac}, 
//                function( data ) {
//                    $( "#guest" ).html( ""+ data.guest_name0 );
//                    $( "#guest_bottom" ).html( ""+ data.guest_name0 );
//                    $( "#room" ).html( "" +data.room_name0 );
//                    return;
//                }, "json");
//         return mac;
//    };
//    var showTime = function showTime(time){
////        console.log("time");
//	var current_time = new Date();
//	var current_day = current_time.getDay();	
//	var current_date = current_time.getDate();
//	var current_year = current_time.getFullYear();
//	var current_month = current_time.getMonth() + 1;
//	var current_hour = current_time.getHours();
//	var current_min = current_time.getMinutes();
//	var tmp_time = "";
//        
//	tmp_time =	(current_hour > 10 ? current_hour  : ("0"+current_hour)) + ":" +
//                (current_min < 10 ? "0" : "") + current_min;
//        var str_time = days[current_day]+ ", " + current_date + " " + 
//                months[current_month-1] + " " + current_year + " <span id=\"time\">" + tmp_time + "</span>";
//        time.html(str_time);
//	return false;
//
//    };
//    var getWeather = function getWeather(){
//        var get_url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+lat+"&lon="+lon+"&APPID="+weather_key;
//        $.get(get_url, function(data){
////            console.log(data.main.temp);
//            $celcius.html(data.main.temp);
//        });
//    };

    var getList = function getList(){
        var get_url = "http://iptv.cic.net.id/iptvman/out/s-list";
        $.get(get_url, function(data){
//            console.log(data);
//            $title_content.html(data.title);
//            $desc.html(data.description);
//            $desc.focus();
//            $pict.attr("src", data.img_desc);
            genList(data);
            return;
        }, "json");
        return;
    };
//    <a id=\"it_1\" href=\"#\" class=\"list_item\" tabindex=\"1\">
//                        <div class=\"sub_title\">Subpl 1</div> 
//                    </a>
    var genList = function genList(l){
//        console.log(l);
        var tmp = "";
        l.forEach(function(el, i){
//           console.log(element); 
            tmp += "<a id=\"\it_"+i+"\" href=\"#\" class=\"list_item\" tabindex=\""+i+"\" data-item=\""+el.id+"\" data-id=\""+i+"\">\n" 
                    + "<img class=\"bg_title\" src=\""+el.bg+"\" width=\"411px\" height=\"105px\"  />\n"
                    + "<div class=\"sub_title\" tabindex=\"-1\">"+el.item+"</div>\n"
                    + "</a>\n";
            return;
        });
        $list.html(tmp);
        list_count = l.length;
        if (l.length > 0){
            $("#it_0").focus();
        }
        return;
    };
//    var getContent = function getContent(c){
//        var get_url = "http://iptv.cic.net.id/iptvman/out/s-item/"+c;
//        $.get(get_url, function(data){
//            console.log(data);
//            $title_content.html(data.title);
//            $desc.html(data.description);
//            $desc.focus();
//            $pict.attr("src", data.img_desc);
//            return;
//        }, "json");
//        return;
//    };
  })

);