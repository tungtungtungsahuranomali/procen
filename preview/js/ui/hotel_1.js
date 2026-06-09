(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
    

    var console = window.console;
    var mac_address = "145289b5dad7b80e";
 
    var current_input = hcap.externalinput.ExternalInputType.TV;
    var debug = true;
    var debug_error = 0;
    var cpu = false;
    var memory = false;
   
    var isSuppportLocalStorage;
    var images;
    var count_images;
    var image;
    var cur_image = 0;
    var tmr_generateImage;
    
    var left;
    var right;
    var key_down = false;
    $(function() {
        image = $("#image");
        left = $("#left");
        right = $("#right");
        isSuppportLocalStorage = supportsLocalStorage();
       
        hcap.mode.setHcapMode({
            "mode" : hcap.mode.HCAP_MODE_1,
            "onSuccess" : function() {
                console.log("onSuccess");
                return true;
            }, 
            "onFailure" : function(f) {
                console.log("onFailure : errorMessage = " + f.errorMessage);
                return true;
            }
        });
        hcap_listener();
        loadImages();
        if (debug){
            cpu = $("#cpu");
            memory = $("#memory");
            cpu.show();
            memory.show();
            showResource();
        }
        return false;
    });
    $(document).keydown(function(e){
          e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.UP:
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_UP:
                case hcap.key.Code.LEFT:
                    if (key_down === false){
                        left.addClass("active");
                        key_down = true;
                    }
                    return true;
                case  hcap.key.Code.DOWN:
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_DOWN:
                case hcap.key.Code.RIGHT:
                    if (key_down === false){
                       right.addClass("active");
                        key_down = true;
                    }
                    return true;
                default:
    //              console.log("default: "+ e.keyCode);
    //                alert("other"+ e.keyCode);
                    break;
            }
            //return false, eventnya dikunci sampai sini, gak dikirim ke windows
            return true;
    });
    $(document).keyup(function(e){
//         if (current_input === hcap.externalinput.ExternalInputType.TV){
            e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.UP:
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_UP:
                case hcap.key.Code.LEFT:
                    clearTimeout(tmr_generateImage);
                    left.removeClass("active");
                    right.removeClass("active");
                    key_down = false;
                    cur_image = (cur_image - 1 + count_images) % count_images;
                    generateImages(images, cur_image);
                    return true;
                case  hcap.key.Code.DOWN:
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_DOWN:
                case hcap.key.Code.RIGHT:
                    clearTimeout(tmr_generateImage);
                    left.removeClass("active");
                    right.removeClass("active");
                    key_down = false;
                    cur_image = (cur_image + 1) % count_images;
                    generateImages(images, cur_image);
                    return true;
                   
                case hcap.key.Code.PORTAL:
                case hcap.key.Code.BACK:
                    window.location.replace("menu.html"); 
    //                show_portal();
    //                alert("portal");
                    return false;
                case hcap.key.Code.ENTER:
                    
                    break;
                case hcap.key.Code.INFO:
                    break;
                case hcap.key.Code.LAST_CH:
                    break;
                case hcap.key.Code.NUM_0:
                case hcap.key.Code.NUM_1:
                case hcap.key.Code.NUM_2:
                case hcap.key.Code.NUM_3:
                case hcap.key.Code.NUM_4:
                case hcap.key.Code.NUM_5:
                case hcap.key.Code.NUM_6:
                case hcap.key.Code.NUM_7:
                case hcap.key.Code.NUM_8:
                case hcap.key.Code.NUM_9:
                    break;
                default:
    //              console.log("default: "+ e.keyCode);
    //                alert("other"+ e.keyCode);
                    break;
            }
            //return false, eventnya dikunci sampai sini, gak dikirim ke windows
            return true;
    });
    
    var hcap_listener = function hcap_listener(){
        document.addEventListener(
            "external_input_changed",
            function() {
                hcap.externalinput.getCurrentExternalInput({
                    "onSuccess" : function(s) {
                        current_input = s.type;
                        return true;
                    }, 
                    "onFailure" : function(f) {
                        console.log("onFailure : errorMessage = " + f.errorMessage);
                        return true;
                    }
               });
               return true;
            },
            false
       );
       return true;
    }
    
//    var print_current_mac = function print_current_mac(ip) {
//        hcap.network.getNumberOfNetworkDevices({
//             "onSuccess" : function(s) {
//                 console.log("onSuccess : the number of network devices = " + s.count);
//                 // $("#welcome-message").prepend("onSuccess : the number of network devices = " + s.count);
//                 for (var i = 0; i < s.count; i++) {
//                     (function(k) {
//                         hcap.network.getNetworkDevice({
//                             "index" : k,
//                             "onSuccess" : function(r) {
//                                 if (ip === r.ip) {
//                                     console.log("CURRENT MAC : " + r.mac);
//                                            // $("#welcome-message").prepend("CURRENT MAC : " + r.mac);
//                                            // save mac address to localStorage
//                                            if (supportsLocalStorage()) {
//                                                   window.localStorage.setItem("cic.mac", r.mac);
//                                           }
//                                            // get room info from mac address
////                                            $.post( "http://iptv.cic.net.id/hk/RoomInfo.php", {devid: r.mac},function( data ) {
////                                                     $( "#guest_name" ).html( data.guest_name0 );
////                                                     $( "#hotel_name" ).html( data.nama_hotel0 );
////                                                     $( "#room_name" ).html( data.room_name0 );
////                                                     // $( "#loading_welcome").hide( 5000 );
////                                                     $( "#loading_welcome").velocity( "fadeOut", { duration: 1000 } );
////                                            }, "json");
//                                    }
//                                    return false;
//                             }, 
//                             "onFailure" : function(r) {
//                                console.log("onFailure : errorMessage = " + r.errorMessage);
//                                // $("#welcome-message").prepend("onFailure getNetworkDevice: errorMessage = " + r.errorMessage);
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
//                // $("#welcome-message").prepend("onFailure NumberOfNetworkDevices: errorMessage = " + f.errorMessage);
//                return false;
//             }
//        });
//        return true;
//    }
//    var get_device_id = function get_device_id(){
//        hcap.network.getNetworkInformation({
//                 "onSuccess" : function(s) {
//                    print_current_mac(s.ip_address);
//                    return false;
//                 }, 
//                 "onFailure" : function(f) {
//                    console.log("onFailure : errorMessage = " + f.errorMessage);
//                   // $("#welcome-message").prepend("onFailure networkinformation: errorMessage = " + f.errorMessage);
//                   return false;
//                 }
//        });
//        return true;
//    }
//    
    supportsLocalStorage = function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    var showResource = function showResource(){
        window.setTimeout(function(){
//            cpu.html(Math.random()*5000+" ");
            hcap.system.getCpuUsage({
                "onSuccess" : function (param) {
                    cpu.html(param.percentage+ " %");
                    
                    hcap.system.getMemoryUsage({
                        "onSuccess" : function (param) {
                            memory.html(param.percentage+ " %");
                            showResource();
                        }, 
                        "onFailure" : function(f) {
                            memory.html(debug_error  +" onFailure : errorMessage = " + f.errorMessage);
                            debug_error++;
                            showResource();
                        }
                    });
                }, 
                "onFailure" : function(f) {
                    cpu.html( debug_error  +" onFailure : errorMessage = " + f.errorMessage);
                    debug_error++;
                    showResource();
                }
           });
        },5000);
    };
    var loadImages = function loadImages(){
        var folder = "http://iptv.cic.net.id/hk/images/hotel/";
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
             images = data;
             count_images = data.length;
            console.log("YES");
//            for(var i=0; i< data.length; i++){ 
//                $("body").append( "<img src='"+ folder + data[i] +"'/>" );
//            }
        }).fail(function( jqXHR, textStatus ) {
            console.log("FAIL");
            images = ["assets/css/images/hotel.jpg"];
            count_images = 1;
//            console.log("Request failed" + textStatus);
        }).always(function(){
//            console.log(images);
            generateImages(images,0);
        });
    };
    
    var generateImages = function generateImages(img, index){
//        console.log("Tes"+index+img);
        cur_image = index;
        image.css("background-image", "url("+img[index]+")");
        if (img.length > 1){
            index = (index + 1) % img.length;
            tmr_generateImage = setTimeout(function(){
                generateImages(img, index);
            }, 12000);
        }
    };
  })
);
