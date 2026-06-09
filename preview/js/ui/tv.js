(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
    
    var channels = [];  
    var channel_container = 6;
    var current_channel = 0;
    var last_channel = 0;
    var prev_channel = 0;
    var current_focus = 0;
    var console = window.console;
    var mac_address = "145289b5dad7b80e";
//    var channel_0;
//    var channel_1; 
//    var channel_2;
//    var channel_3;
//    var channel_4; 
//    var channel_5; 
//    var channel_6; 
//    var channel_7;
//    var channel_8;
    var ch_con_arr = [];
    var ch_con_lng = 0;
    var log = document.getElementById("log");
    var current_input = hcap.externalinput.ExternalInputType.TV;
    var channel_count=0;
    var debug = true;
    var cpu = false;
    var memory = false;
//    var ch_list_cont;
    var is_ch_list_showed = true;
    var tmr_hide_ch_list;
    var debug_error = 0;
//    var ch_info_cont;
//    var ch_number;
//    var ch_title;
//    var tmr_hide_ch_info;
//    var info_cont;
//    var is_info_cont_showed = false;
    var current_numpad = "";
    var tmr_numpad_pressed;
    var is_prev_channel_processed = false;
    var isSuppportLocalStorage;
    
    var $tv_mid_content;
    var $channel_title;
    var $tv_cont;
    var is_group_showed = false;
    var $tv_group;
    var tmr_channel_title;
    var server_url = "192.168.60.4";
//    var server_url = "192.168.120.201";
    
    $(function() {
//        console.log(current_channel);
        $tv_mid_content = $("#tv_mid_content");
        $channel_title = $("#channel_title");
        $tv_cont = $("#tv");
        $tv_group = $("#tv_group");
        is_prev_channel_processed = false;
        //ch_list_cont = $("#ch_list_cont");
//        channel_0 = document.getElementById("channel_0");
//        channel_1 = document.getElementById("channel_1");
//        channel_2 = document.getElementById("channel_2");
//        channel_3 = document.getElementById("channel_3");
//        channel_4 = document.getElementById("channel_4");
//        channel_5 = document.getElementById("channel_5");
//        channel_6 = document.getElementById("channel_6");
//        channel_7 = document.getElementById("channel_7");
//        channel_8 = document.getElementById("channel_8");
//        ch_con_arr = [channel_0, channel_1, channel_2, channel_3,
//                                 channel_4, channel_5, channel_6, channel_7,
//                                 channel_8];
//        ch_info_cont = $('#ch_info_cont');
//        ch_number = $('#ch_number');
//        ch_title  = $('#ch_title');
//        info_cont = $('#info-cont');
//        ch_con_lng = ch_con_arr.length;
        isSuppportLocalStorage = supportsLocalStorage();
        if (isSuppportLocalStorage){
            if (window.localStorage.getItem("cic.mac") !== null){
                mac_address = window.localStorage.getItem("cic.mac");
            }else{
                get_device_id();
            }
        }
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
       hcap.video.setVideoSize({
            "x" : 0, 
            "y" : 0,
            "width" : 1280,
            "height" : 720,
            "onSuccess" : function() {
//                    console.log("onSuccess");
                return true;
            }, 
            "onFailure" : function(f) {
//                    console.log("onFailure : errorMessage = " + f.errorMessage);
                return false;
            }
       });
        hcap_listener();
        get_channel_list();
//        showInfoCont();
//        if (debug){
//            cpu = $("#cpu");
//            memory = $("#memory");
//            cpu.show();
//            memory.show();
//            showResource();
//        }
        return false;
    });
    $("#tv_mid_content").on("focus", ".channel_container", function(){
        var $this = $(this);
        $channel_title.html($this.children().attr("alt"));
        
    })
    .on("click", ".channel_container", function(){
        if (is_ch_list_showed === true){
            if (current_channel !== this.dataset.id){
                current_channel = Number(this.dataset.id);
            }
            if (current_channel !== last_channel){
    //                            last_channel = current_channel; 
    //                            hide_ch_list();
                clearTimeout(tmr_hide_ch_list);
    //            console.log(channels[current_channel]);
                //#######################
                var ch = channels[current_channel];
                hcap.channel.requestChangeCurrentChannel({
                    "channelType" : hcap.channel.ChannelType.IP, 
                    "logicalNumber" : current_channel,
                    "programNumber" : current_channel, 
                    "ip" : ch.ip4,
                    "port" :  Number(ch.port),
                    "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                    "onSuccess" : function() {
    //                    alert("YES");
//                        $("#tv_bottom_content").html("YES");
                        if (last_channel === -1){
                            last_channel =0;
                        }
                        prev_channel = last_channel;
                        last_channel = current_channel; 
                        current_numpad = "";
    //                    show_ch_info(current_channel,channels[current_channel].name);
                        hide_ch_list();
//                        tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                        return false;

                    }, 
                    "onFailure" : function(f) {
    //                    alert("NO");
//                        $("#tv_bottom_content").html("onFailure : errorMessage = " + f.errorMessage);
                        console.log("onFailure : errorMessage = " + f.errorMessage);
                        return false;
                    }
                });
                //#######################
//                        if (last_channel === -1){
//                            last_channel =0;
//                        }
//                        prev_channel = last_channel;
//                        last_channel = current_channel; 
//                        current_numpad = "";
//    //                    show_ch_info(current_channel,channels[current_channel].name);
//                        hide_ch_list();
                //#######################
            }else{ // current_channel == last_channel
                hide_ch_list();
            }
        }
//        else{
//            show_ch_list();
//        }
//        alert(current_channel);
    });
    
    $(document).keydown(function(e){
//         if (current_input === hcap.externalinput.ExternalInputType.TV){
            e = e || window.event;
            switch(e.which || e.keyCode){

                case  hcap.key.Code.LEFT:
                    if (is_ch_list_showed === false){
                        return false;
                    }
                case  hcap.key.Code.CH_DOWN:
                case  hcap.key.Code.PAGE_UP:
//                    $("#ch_info_cont").hide();
//                    console.log(current_channel);
                    current_channel =  (current_channel - 1 + channel_count) % channel_count;
                    if (is_ch_list_showed === false){
                        var ch = channels[current_channel];
                         hcap.channel.requestChangeCurrentChannel({
                            "channelType" : hcap.channel.ChannelType.IP, 
                            "logicalNumber" : current_channel,
                            "programNumber" : current_channel, 
                            "ip" : ch.ip4,
                            "port" :  Number(ch.port),
                            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                            "onSuccess" : function() {
                                
                                if (last_channel === -1){
                                    last_channel =0;
                                }
                                clearTimeout(tmr_channel_title);
                                $channel_title.show();
                                
                                prev_channel = last_channel;
                                last_channel = current_channel;    
                                current_numpad = "";
                                $channel_title.html(ch.name);
                                tmr_channel_title = setTimeout(hide_channel_title, 5000);
                                return false;
                            }, 
                            "onFailure" : function(f) {
				console.log("onFailure : errorMessage = " + f.errorMessage);
                                return false;
                            }
                        });
                    }else{
                        clearTimeout(tmr_hide_ch_list);
                        $("#ch_"+current_channel).focus();
                        tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                    }
                    return false;
                case  hcap.key.Code.RIGHT:
                    if (is_ch_list_showed === false){
                        return false;
                    }
                case  hcap.key.Code.CH_UP:
                case  hcap.key.Code.PAGE_DOWN:
                    
                    current_channel = (current_channel + 1) % channel_count;
                    if (is_ch_list_showed === false){
                        var ch = channels[current_channel];
                         hcap.channel.requestChangeCurrentChannel({
                            "channelType" : hcap.channel.ChannelType.IP, 
                            "logicalNumber" : current_channel,
                            "programNumber" : current_channel, 
                            "ip" : ch.ip4,
                            "port" :  Number(ch.port),
                            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                            "onSuccess" : function() {
                                if (last_channel === -1){
                                    last_channel =0;
                                }
                                clearTimeout(tmr_channel_title);
                                $channel_title.show();
                                
                                prev_channel = last_channel;
                                last_channel = current_channel;   
                                current_numpad = ""; 
                                $channel_title.html(ch.name);
                                tmr_channel_title = setTimeout(hide_channel_title, 5000);
                                return false;
                            }, 
                            "onFailure" : function(f) {
				console.log("onFailure : errorMessage = " + f.errorMessage);
                                return false;
                            }
                        });
                    }else{
                        clearTimeout(tmr_hide_ch_list);
                        $("#ch_"+current_channel).focus(); 
                        tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                    }
                    return false;
                case hcap.key.Code.DOWN:
                    if (is_ch_list_showed === false){
                        current_channel = (current_channel + 1) % channel_count;
                        var ch = channels[current_channel];
                        hcap.channel.requestChangeCurrentChannel({
                            "channelType" : hcap.channel.ChannelType.IP, 
                            "logicalNumber" : current_channel,
                            "programNumber" : current_channel, 
                            "ip" : ch.ip4,
                            "port" :  Number(ch.port),
                            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                            "onSuccess" : function() {
                                if (last_channel === -1){
                                    last_channel =0;
                                }
                                clearTimeout(tmr_channel_title);
                                $channel_title.show();
                                
                                prev_channel = last_channel;
                                last_channel = current_channel;   
                                current_numpad = ""; 
                                $channel_title.html(ch.name);
                                tmr_channel_title = setTimeout(hide_channel_title, 5000);
//                                $("#ch_"+current_channel).focus();
//                                show_ch_info(current_channel,channels[current_channel].name);
                                return false;
                            }, 
                            "onFailure" : function(f) {
				console.log("onFailure : errorMessage = " + f.errorMessage);
                                return false;
                            }
                        });
                    }else{
                        clearTimeout(tmr_hide_ch_list);
                        if ((current_channel + channel_container) > channel_count -1){
                            current_channel = current_channel % channel_container;
                        }else{
                            current_channel = (current_channel + channel_container);
                        }
                        $("#ch_"+current_channel).focus(); 
                        tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                    }
                    break;
                case hcap.key.Code.UP:
//                    console.log(current_channel );
                    if (is_ch_list_showed === false){
                        current_channel =  (current_channel - 1 + channel_count) % channel_count;
                        var ch = channels[current_channel];
                        hcap.channel.requestChangeCurrentChannel({
                            "channelType" : hcap.channel.ChannelType.IP, 
                            "logicalNumber" : current_channel,
                            "programNumber" : current_channel, 
                            "ip" : ch.ip4,
                            "port" :  Number(ch.port),
                            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                            "onSuccess" : function() {
                                if (last_channel === -1){
                                    last_channel =0;
                                }
                                clearTimeout(tmr_channel_title);
                                $channel_title.show();
                                
                                prev_channel = last_channel;
                                last_channel = current_channel;    
                                current_numpad = "";
                                $channel_title.html(ch.name);
                                tmr_channel_title = setTimeout(hide_channel_title, 5000);
//                                $("#ch_"+current_channel).focus();
//                                show_ch_info(current_channel,channels[current_channel].name);
                                return false;
                            }, 
                            "onFailure" : function(f) {
				console.log("onFailure : errorMessage = " + f.errorMessage);
                                return false;
                            }
                        });
                    }else{
                        clearTimeout(tmr_hide_ch_list);
                        if ((current_channel - channel_container) <0){
                            current_channel = (Math.floor(channel_count /  channel_container) * channel_container) +     (current_channel % channel_container);
                            if (current_channel > channel_count -1 ){
                                current_channel = ((Math.floor(channel_count /  channel_container) -1) * channel_container) +     (current_channel % channel_container);
                            }
                        }else{
                            current_channel = current_channel - channel_container;
                        }
                        $("#ch_"+current_channel).focus();
                        tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                    }
//                    current_channel = (current_channel - channel_container)
//                    console.log(current_channel);
//                    if (is_ch_list_showed === true){
//                        clearTimeout(tmr_hide_ch_list);
//                        if (current_channel - current_focus - ch_con_lng < 0){
//                            if (current_channel - current_focus > 0){
//                                current_channel = current_focus;
//                                show_channel(0);
//                            }else{
//                                current_focus = 0;
//                                current_channel = 0;
//                                ch_con_arr[current_focus].focus();
//                                
//                            }
//                        }else{
//                            current_channel = current_channel - ch_con_lng;
//                            show_channel(current_channel - current_focus);
//                        }
//                        tmr_hide_ch_list = setTimeout(hide_ch_list, 5000);
//                        return false;
//                    }
                    break;
                case hcap.key.Code.BACK:
                case hcap.key.Code.PORTAL:
                case hcap.key.Code.EXIT:
                    if (channels.length === 0){
                            window.location.replace("menu.html");
                    }
                      var ch = channels[0];
                      hcap.channel.setStartChannel({
                        "channelType" : hcap.channel.ChannelType.IP, 
                        "logicalNumber" : current_channel,//current_channel,
                        "programNumber" : current_channel,//current_channel, 
                        "ip" : ch.ip4,
                        "port" : Number(ch.port),
                        "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                        "onSuccess" : function() {
//                            show_ch_info(current_channel,channels[current_channel].name);
                            window.location.replace("menu.html"); 
                            return false;

                        }, 
                        "onFailure" : function(f) {
                            window.location.replace("menu.html"); 
                            return false;
                        }
                    });
//                    show_portal();
    //                alert("portal");
                    return false;
                case hcap.key.Code.ENTER:
//                    if (channel_count === 0){
//                        show_ch_list();
//                    }
                    if (is_ch_list_showed === false){					
                            // clearTimeout(tmr_hide_ch_list);
                            show_ch_list();	
                    }
//                    if (is_ch_list_showed !== true){
//                        show_ch_list();
//                    }
//                    if (is_ch_list_showed === true){
//                        if (current_channel !== last_channel){
////                            last_channel = current_channel; 
////                            hide_ch_list();
//                            clearTimeout(tmr_hide_ch_list);
//                            hcap.channel.requestChangeCurrentChannel({
//                                "channelType" : hcap.channel.ChannelType.IP, 
//                                "logicalNumber" : current_channel,
//                                "programNumber" : current_channel, 
//                                "ip" : channels[current_channel].ip4,
//                                "port" :  Number(channels[current_channel].port),
//                                "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
//                                "onSuccess" : function() {
//                                    prev_channel = last_channel;
//                                    last_channel = current_channel; 
//                                    current_numpad = "";
//                                    show_ch_info(current_channel,channels[current_channel].name);
//                                    tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
//                                    return false;
//
//                                }, 
//                                "onFailure" : function(f) {
//                                    console.log("onFailure : errorMessage = " + f.errorMessage);
//                                    return false;
//                                }
//                            });
//                        }else{ // current_channel == last_channel
//                            hide_ch_list();
//                        }
//                    }else{
//                        show_ch_list();
//                    }
//                    break;
//                case hcap.key.Code.INFO:
//                    if (is_info_cont_showed === true){
//                        info_cont.hide(function(){
//                            is_info_cont_showed = false;
//                        }); 
//                    }else{
//                        info_cont.show(500, function(){
//                            is_info_cont_showed = true;
//                        });
//                    }
                    break;
//                case hcap.key.Code.NUM_9:
                case hcap.key.Code.LAST_CH:
                    if (prev_channel === -1){
                        return false;
                    }
                    if (is_prev_channel_processed === false){
                        is_prev_channel_processed = true;
                        if (last_channel === prev_channel ){
                            is_prev_channel_processed = false;
                            return false;
                        }
    //                    current_channel = prev_channel;
                        var ch = channels[prev_channel];
                        hcap.channel.requestChangeCurrentChannel({
                            "channelType" : hcap.channel.ChannelType.IP, 
                            "logicalNumber" : prev_channel,
                            "programNumber" : prev_channel, 
                            "ip" : ch.ip4,
                            "port" :  Number(ch.port),
                            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                            "onSuccess" : function() {
//                                 if (is_ch_list_showed){
//                                    if (prev_channel < current_focus){
//                                        current_focus = prev_channel;
////                                        ch_con_arr[prev_channel].focus();
////                                        show_channel(0);
//                                    }else{
////                                        show_channel(prev_channel-current_focus);
//                                    }
//                                }
                                current_channel = prev_channel;
                                prev_channel = last_channel;
                                last_channel = current_channel; 
                                current_numpad = "";
                                if (is_ch_list_showed === true){
                                    clearTimeout(tmr_hide_ch_list);
                                    $("#ch_"+current_channel).focus();
                                    tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                                }
//                                show_ch_info(current_channel,channels[current_channel].name);
//                                tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                                is_prev_channel_processed = false;
                                return false;

                            }, 
                            "onFailure" : function(f) {
                                console.log("onFailure : errorMessage = " + f.errorMessage);
                                current_numpad = "";
                                is_prev_channel_processed = false;
                                return false;
                            }
                        });
                    }
                    return false;
//                    break;
                case 65:
                case hcap.key.Code.RED:
                    if (is_ch_list_showed === true){
                        if (is_group_showed === true){
                            document.getElementById("tv_left").style.width = "0px";
                            document.getElementById("tv_right").style.left = "0px";
                            document.getElementById("tv_right").style.width = "1280px";
    //                        generateChannel(channels);
                            is_group_showed = false;
                            tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
                        }else{
                            clearTimeout(tmr_hide_ch_list);
                            document.getElementById("tv_left").style.width = "250px";
                            document.getElementById("tv_right").style.left = "250px";
                            document.getElementById("tv_right").style.width = "1030px";
    //                        generateChannel(channels);
                            is_group_showed = true;
                        }
                    }
//                    window.location.replace("group.html");
                break;
            
                case hcap.key.Code.NUM_0:
                case hcap.key.Code.NUM_1:
                    if (is_group_showed === true){
                        
                        if (is_ch_list_showed === true){
                            
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - All Channels");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=0", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);
                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                        
                    }
                case hcap.key.Code.NUM_2:
                    if (is_group_showed === true){
                        if (is_ch_list_showed === true){
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - News");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=1", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);

                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                    }
                case hcap.key.Code.NUM_3:
                    if (is_group_showed === true){
                        if (is_ch_list_showed === true){
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - Sports");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=2", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);

                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                    }
                case hcap.key.Code.NUM_4:
                    if (is_group_showed === true){
                        if (is_ch_list_showed === true){
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - Entertainment");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=3", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);

                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                    }
                case hcap.key.Code.NUM_5:
                    if (is_group_showed === true){
                        if (is_ch_list_showed === true){
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - Kids");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=4", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);

                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                    }
                case hcap.key.Code.NUM_6:
                    if (is_group_showed === true){
                        if (is_ch_list_showed === true){
                            clearTimeout(tmr_hide_ch_list);
                            $tv_group.html("TV - Documentation");
                            $.post("http://"+server_url+"/controlpanel/channeljson.php?cat=5", 
                                    { deviceID : ""+mac_address },
                                    function(result){
                                        channels = result;
                                        channel_count = result.length;
                                        generateChannel(result);

                                        last_channel = -1;
                                        prev_channel = current_channel = 0;
                    //                    console.log("Channel Count "+channel_count);
    //                                    startChannel();
                                        if(channel_count >0){
                                            $("#ch_0").focus();
                                        }
                                        return false;
                                    },
                                    "json"
                            ).fail(function(){
                    //            $("#tv_bottom_content").html("NO");
                                return;
                            });
                        }
                        break;
                    }
                case hcap.key.Code.NUM_7:
                case hcap.key.Code.NUM_8:
                case hcap.key.Code.NUM_9:
                    if (is_group_showed === true){
                        break;
                    }
                    current_numpad = numpad_pressed((e.keyCode - hcap.key.Code.NUM_0), current_numpad, $channel_title);
                    break;
                default:
    //              console.log("default: "+ e.keyCode);
//                    $("#tv_bottom_content").html("other "+e.keyCode);
//                    alert("other"+ e.keyCode);
                    break;
            }
            //return false, eventnya dikunci sampai sini, gak dikirim ke windows
            return true;
//         }
//         return true;
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
    };
    
    var show_portal = function show_portal(){
        
        window.location.replace("menu.html");
//        $("#ch_list_cont").hide();
//        $("#ch_info_cont").hide();
        
        return true;
    };
    
    var get_channel_list = function get_channel_list(){
        $.post("http://"+server_url+"/controlpanel/channeljson.php", 
                { deviceID : ""+mac_address },
                function(result){
                    channels = result;
                    channel_count = result.length;
                    generateChannel(result);
                    startChannel();
                    return false;
                },
                "json"
        ).fail(function(){
        });
        return true;
    };
    
    var generateChannel = function generateChannel(c){
        var tmp = "";
        c.forEach(function(element, index){
            console.log(element);
            tmp += "<div class=\"col col-md-2\">\n"
                 + "<a href=\"#\" id=\"ch_"+index+"\" class=\"channel_container\" data-channel=\""+element.id+"\" data-id=\""+index+"\"><img src=\"images/ch/"+element.img+"\" alt=\""+element.name+"\" width=\"90\" height=\"75\"/><span class=\"ch_num\"> "+ index+"</span></a>\n"
                 + "</div>\n";
//            if (index % channel_container === 5){
//                tmp += "<br/>\n";
//            }
        });
        $tv_mid_content.html(tmp);
//        console.log(current)
//        $("#ch_"+current_channel).focus();
        return;
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
//                                     console.log("CURRENT MAC : " + r.mac);
                                            // $("#welcome-message").prepend("CURRENT MAC : " + r.mac);
                                            // save mac address to localStorage
                                            mac_address = r.mac;
                                    }
                                    return false;
                             }, 
                             "onFailure" : function(r) {
//                                console.log("onFailure : errorMessage = " + r.errorMessage);
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

//    var show_channel = function show_channel(index){
//        channel_0.innerHTML = index+". "+channels[index].name+"&nbsp";
//        channel_1.innerHTML = ((index+1)%channel_count)+". "+channels[(index+1)%channel_count].name+"&nbsp";
//        channel_2.innerHTML = ((index+2)%channel_count)+". "+channels[(index+2)%channel_count].name+"&nbsp";
//        channel_3.innerHTML = ((index+3)%channel_count)+". "+channels[(index+3)%channel_count].name+"&nbsp";
//        channel_4.innerHTML = ((index+4)%channel_count)+". "+channels[(index+4)%channel_count].name+"&nbsp";
//        channel_5.innerHTML = ((index+5)%channel_count)+". "+channels[(index+5)%channel_count].name+"&nbsp";
//        channel_6.innerHTML = ((index+6)%channel_count)+". "+channels[(index+6)%channel_count].name+"&nbsp";
//        channel_7.innerHTML = ((index+7)%channel_count)+". "+channels[(index+7)%channel_count].name+"&nbsp";
//        channel_8.innerHTML = ((index+8)%channel_count)+". "+channels[(index+8)%channel_count].name+"&nbsp";
//        return false;
//    }
    var startChannel = function startChannel(){
        /*
        var ch = channels[current_channel];
        hcap.channel.requestChangeCurrentChannel({
            "channelType" : hcap.channel.ChannelType.IP, 
            "logicalNumber" : current_channel,
            "programNumber" : current_channel, 
            "ip" : ch.ip4,
            "port" : Number(ch.port),
            "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
            "onSuccess" : function() {
                prev_channel = last_channel;
                last_channel = current_channel;
                current_numpad = "";
                $("#ch_"+current_channel).focus();
//                            show_ch_info(current_channel,channels[current_channel].name);
//                            ch_con_arr[current_focus].focus();
//                            show_channel(current_channel);
                return false;

            }, 
            "onFailure" : function(f) {
                return false;
            }
        });*/
        hcap.channel.getStartChannel({
            "onSuccess" : function(s) {
//                last_channel = current_channel = s.programNumber;
                last_channel = current_channel = 0;
                $("#ch_"+current_channel).focus();
//                show_ch_info(current_channel,channels[current_channel].name);
                return false;
            }, 
            "onFailure" : function(f) {
                console.log("onFailure : errorMessage = " + f.errorMessage);
                // $("#welcome-message").prepend("getStartChannel onFailure : errorMessage = " + f.errorMessage);
                //kalau failed, ambil current_channel = 0;
                if (f.errorMessage === "Hcap::instance()->get_start_channel() failed"){
                    current_channel = 0;
                    var ch = channels[current_channel];
                    hcap.channel.setStartChannel({
                        "channelType" : hcap.channel.ChannelType.IP, 
                        "logicalNumber" : current_channel,//current_channel,
                        "programNumber" : current_channel,//current_channel, 
                        "ip" : ch.ip4,
                        "port" : Number(ch.port),
                        "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                        "onSuccess" : function() {
                            $("#ch_"+current_channel).focus();
//                            show_ch_info(current_channel,channels[current_channel].name);
                            return false;

                        }, 
                        "onFailure" : function(f) {
                            return false;
                        }
                    });
//                    if (isSuppportLocalStorage){
//                        if (window.localStorage.getItem("cic.ch") !== null){
//                            current_channel = Number(window.localStorage.getItem("cic.ch"));
//                        }
//                    }
                    hcap.channel.requestChangeCurrentChannel({
                        "channelType" : hcap.channel.ChannelType.IP, 
                        "logicalNumber" : current_channel,
                        "programNumber" : current_channel, 
                        "ip" : ch.ip4,
                        "port" : Number(ch.port),
                        "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                        "onSuccess" : function() {
                            prev_channel = last_channel;
                            last_channel = current_channel;
                            current_numpad = "";
                            $("#ch_"+current_channel).focus();
//                            show_ch_info(current_channel,channels[current_channel].name);
//                            ch_con_arr[current_focus].focus();
//                            show_channel(current_channel);
                            return false;

                        }, 
                        "onFailure" : function(f) {
                            return false;
                        }
                    });
                }	
                return false;
            }
        });
        return false;
    };
    // welcome screen and legend
//    var showInfoCont = function showInfoCont(){
//        window.setTimeout( function(){
//            info_cont.show(500);
//            is_info_cont_showed = true;
//        },10000);
//    };
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
    var hide_ch_list = function hide_ch_list(){
        clearTimeout(tmr_hide_ch_list);
        console.log("@@@");
//        ch_list_cont.hide(300);
        $tv_cont.hide(300);
        is_ch_list_showed = false;
        //fungsi current_channel = last_channel adalah untuk mengembalikan fokus
        //current_channel ke channel yang sedang dimainkan di screen.
        //kondisi itu akan terjadi saat channel list dibuka dan channel dipindah
        //pindah, tetapi tidak diganti dan dibiarkan autohide.
        current_channel = last_channel;
        tmr_channel_title = setTimeout(hide_channel_title, 5000);
        return true;
    };
    var hide_channel_title = function hide_channel_title(){
        $channel_title.hide();
    };
    var show_ch_list = function show_ch_list(){
//        if (current_channel < current_focus){
//            current_focus = current_channel;
//            show_channel(0);
//        }else{
//            show_channel(current_channel - current_focus);
//        }
//        ch_list_cont.show(300, function(){
//            ch_con_arr[current_focus].focus();
//            is_ch_list_showed = true;
//        });
        clearTimeout(tmr_channel_title);
        $tv_cont.show(300, function(){
            $channel_title.show();
            $("#ch_"+current_channel).focus();
//            $("#tv_bottom_content").html("CUR:  "+current_channel);
            is_ch_list_showed = true;
        });
	tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
    };
//    var show_ch_info = function show_ch_info(number, title){
//        ch_number.html(""+number);
//        ch_title.html(title);
//        clearTimeout(tmr_hide_ch_info);
//        ch_info_cont.show(function(){
//            tmr_hide_ch_info = setTimeout(function(){
//                ch_info_cont.hide(300);
//            },5000);
//        });
//        //timer hide
//    };
    var numpad_pressed = function numpad_pressed(num, current_numpad, channel_title){
        clearTimeout(tmr_channel_title);
        clearTimeout(tmr_numpad_pressed);
        if(is_ch_list_showed === true){
            clearTimeout(tmr_hide_ch_list);
        }
//        clearTimeout(tmr_hide_ch_info);
        current_numpad += "" + num;
        channel_title.show(function(){
            this.innerHTML = current_numpad;
        });
//        ch_info_cont.stop(true,true);
//        ch_info_cont.show();
        if (current_numpad.length<3){
            tmr_numpad_pressed = setTimeout(function(){
                trigger_channel_changed(current_numpad);
                current_numpad = "";
            }, 2000);
        }else{
            trigger_channel_changed(current_numpad);
            current_numpad = "";
        }
        return current_numpad;
    };
    var trigger_channel_changed = function trigger_channel_changed(index){
        index = Number(index);
        if (index >= channel_count){
            $channel_title.html("X");
            current_numpad="";
            tmr_channel_title = setTimeout(hide_channel_title, 5000);
            return;
        }
        if (index !== last_channel){
            
//            clearTimeout(tmr_hide_ch_list);
//            tmr_hide_ch_list = setTimeout(hide_ch_list,5000);
//################################
            var ch = channels[index];
            hcap.channel.requestChangeCurrentChannel({
                "channelType" : hcap.channel.ChannelType.IP, 
                "logicalNumber" : index,
                "programNumber" : index, 
                "ip" : ch.ip4,
                "port" : Number(ch.port),
                "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
                "onSuccess" : function() {
                    
                    prev_channel = last_channel;
                    last_channel = current_channel = index;
                    current_numpad = "";
                    $channel_title.html(ch.name);
                    hide_ch_list();
                    $("#ch_"+index).focus(); 
//                    show_ch_info(index,channels[index].name);
                    return false;

                }, 
                "onFailure" : function(f) {
                    return false;
                }
            });
//################################
//            prev_channel = last_channel;
//            last_channel = current_channel = index;
//            current_numpad = "";
//            hide_ch_list();
//            $("#ch_"+index).focus(); 
//################################
        }else{
//            ch_info_cont.hide(1000);
            current_numpad = "";
            tmr_channel_title = setTimeout(hide_channel_title, 5000);
            return;
        }
    };
  })
);
