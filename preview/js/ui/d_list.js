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
    
    
    var $left_title;
    var $img;
    var $right_title;
    var $left_list = $("#left_list");
    var $right_list = $("#right_list");
    var data_page = "";
    var list_count = 0;
    var current_focus = 0;
    var is_detail_focus = false;
    $(function() {
        $time = $("#date");
        $celcius = $("#celcius");
        $left_title = $("#left_title");
        $img = $("#img");
        $right_title = $("#right_title");
        isSuppportLocalStorage = supportsLocalStorage();
        if (isSuppportLocalStorage){
            if (window.localStorage.getItem("cic.mac") !== null){
                mac_address = setRoomInfo(window.localStorage.getItem("cic.mac"));
            }else{
                get_device_id();
            }
            
        }else{
            get_device_id();
        }
       
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
        
        var content = window.location.hash.substring(1);
        loadDetail(content);
//        if (debug){
//            cpu = $("#cpu");
//            memory = $("#memory");
//            cpu.show();
//            memory.show();
//            showResource();
//        }
        
        return false;
    });
    $(document).keyup(function(e){
          e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.UP:
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_UP:
                    if (is_detail_focus === false){
                        current_focus = (current_focus - 1 + list_count) % list_count;
                        $("#dl_"+current_focus).focus();
                    }
                    break;
                case  hcap.key.Code.DOWN:
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_DOWN:
                    if (is_detail_focus === false){
                        current_focus = (current_focus + 1) % list_count;
                        $("#dl_"+current_focus).focus();
                    }
                    break;
                    
                case hcap.key.Code.RIGHT:
                    if (is_detail_focus === false){
                        $("#dl_"+current_focus).click();
                    }
                    break;
                case hcap.key.Code.LEFT:
                    if (is_detail_focus === true){
                        $right_list.blur();
                    }
                    break;
                case hcap.key.Code.BACK:
                    if (is_detail_focus === true){
                        $right_list.blur();
                        break;
                    }
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
    
    
    
    $left_list.on("click", ".list_item", function(e){
        e.preventDefault();
        var $this = $(this);
        var index = $this.data("id");
        if (current_focus !== index){
            current_focus = index;
        }
//        console.log(id);
        var data = data_page.list[index];
        $img.attr("src", data.img);
        $right_title.html(data.nama);
        loadDetailedList(data.id);
    });
    
    $right_list.on("focus", function(){
        $("#dl_"+current_focus).addClass("active");
        is_detail_focus = true;
    }).on("blur", function(){
        $("#dl_"+current_focus).removeClass("active").focus();
        this.innerHTML = "";
        is_detail_focus = false;
    });
    var supportsLocalStorage = function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

//    var showResource = function showResource(){
//        window.setTimeout(function(){
////            cpu.html(Math.random()*5000+" ");
//            hcap.system.getCpuUsage({
//                "onSuccess" : function (param) {
//                    cpu.html(param.percentage+ " %");
//                    
//                    hcap.system.getMemoryUsage({
//                        "onSuccess" : function (param) {
//                            memory.html(param.percentage+ " %");
//                            showResource();
//                        }, 
//                        "onFailure" : function(f) {
//                            memory.html(debug_error  +" onFailure : errorMessage = " + f.errorMessage);
//                            debug_error++;
//                            showResource();
//                        }
//                    });
//                }, 
//                "onFailure" : function(f) {
//                    cpu.html( debug_error  +" onFailure : errorMessage = " + f.errorMessage);
//                    debug_error++;
//                    showResource();
//                }
//           });
//        },5000);
//        return;
//    };

    var loadDetail = function loadDetail(c){
        var folder = "http://192.168.60.4/iptvman/out/d_list/"+c;
//        $.ajax({
//            url : folder,
//            success: function (data) {
//                console.log(data);
//                $(data).find("a").attr("href", function (i, val) {
//                    if( val.match(/\.(jpeg|png|gif)$/) ) { 
//                        $("body").append( "<img src='"+ folder + val +"'>" );
//                    } 
//                });
//            },
//        });
        $.ajax({url: folder,
                dataType: 'json'})
         .done(function(data){
//             images = data;
//             count_images = data.length;
//             console.log(data);
             data_page = data;
             list_count = data.list.length;
             return;
//             console.log(data);
        }).fail(function( jqXHR, textStatus ) {
            data_page = {"id": "0", "kode": "", "nama": "", "bg": "", "list": []};
            list_count = 0;
             return;
//            images = ["assets/css/images/hotel.jpg"];
//            count_images = 1;
//            console.log("Request failed" + textStatus);
        }).always(function(){
//            console.log(images);
//            generateImages(0);
//            $total.html(count_images);
            generateList(data_page, list_count);
             return;
        });
        return;
    };
    
    var generateList = function generateList( data, c){
        $left_title.html(data.nama);
        var tmp = "";
        data.list.forEach(function(el, i){
//           console.log(element); 
            tmp += "<a id=\"\dl_"+i+"\" href=\"#\" class=\"list_item\" tabindex=\""+i+"\" data-item=\""+el.id+"\" data-id=\""+i+"\">\n" 
                    + el.nama
                    + "</a>\n";
        });
        $left_list.html(tmp);
        if (c > 0){
            $("#dl_0").focus();
        }
        return;
    };
    var loadDetailedList = function loadDetailedList(id){
        var folder = "http://192.168.60.4/iptvman/out/d_list_detail/"+id;
        var loaded = "";
        $.ajax({url: folder,
                dataType: 'json'})
         .done(function(data){
//             console.log(data);
             loaded = data;
             console.log(data);
            return;
        }).fail(function( jqXHR, textStatus ) {
            loaded = [];
            return;
        }).always(function(){
            generateDetailedList(loaded);
            return;
        });
        return;
    };
    var generateDetailedList = function generateDetailedList(d){
        var tmp = "";
        d.forEach(function(el,i){
           tmp += "<div class=\"list_item\">\n"
                + "<div class=\"list_title\">"
                + el.title
                + "</div>\n"
                + "<div class=\"list_desc_cont\">\n"
                + "<div class=\"list_left\">\n"
                + "<div class=\"list_desc\">"
                + el.description
                + "</div>\n"
                + "</div>\n"
                + "<div class=\"list_right\">\n"
                + "<div class=\"list_curr\">"
                + el.curr
                + "</div>\n"
                + "<div class=\"list_val\">"
                + el.curr_val
                + "</div>\n"
                + "</div>\n"
                + "</div>\n"
                + "</div>\n";
           return;
        });
        $right_list.html(tmp);
        $right_list.focus();
        return;
    }
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
