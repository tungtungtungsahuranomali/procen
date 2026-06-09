/***********************************************************  
 * (c) Copyright 2011. All Rights Reserved
 * LG Soft India Pvt. Ltd.
 * Bangalore - 560071
 * India.
 *
 * Project Name	: CTV
 * Group		: LGSI-SAM
 * Security		: Confidential
 ***********************************************************/

/**********************************************************
 * Filename		: watchtv.js
 * Purpose		: Watch tv class
 * Platform		: LG TV Browser
 * Author(s)		: Neelima Mangaj
 * E-mail id.		: neelima.mangaj@lge.com
 * Creation date 	: <02. 12. 2011>
 *				
 * Modifications:
 *
**********************************************************/

var watchtv = function () {
	var self = this;
	var channel_info_animation_timeout;
	var channel_info_animated = false;
	var highlighted = 0;
	var max_highlighted = 9;
	var channel_0 = document.getElementById("channel_0");
	var channel_1 = document.getElementById("channel_1");
	var channel_2 = document.getElementById("channel_2");
	var channel_3 = document.getElementById("channel_3");
	var channel_4 = document.getElementById("channel_4");
	var channel_5 = document.getElementById("channel_5");
	var channel_6 = document.getElementById("channel_6");
	var channel_7 = document.getElementById("channel_7");
	var channel_8 = document.getElementById("channel_8");
	var $ch_select = $('#ch_select');
	var base_number = hcap.key.Code.NUM_0;
	var channel_list_container = $("#channel_list_container");
	var is_channel_show = false;
	var last_channel = 0;
	var $channel_number = $("#channel_number");
	var $channel_title = $("#channel_title");
	var $channel_info = $("#channel-info");
	var tmr_select_ch;
	var tmr_hide_ch;
	var tmr_hide_ch_list;
	var tmp_channel="";
    // handles key events
	this.process_key_events = function(e){
        //alert("watchtv");
        switch (e.keyCode){
			// case hcap.key.Code.LIST:
			// case KEY_RIGHT:
				// if (is_channel_show === false){
					// channel_list_container.show(300);
					// is_channel_show = true;
				// }else{
					// channel_list_container.hide(300);
					// is_channel_show = false;
				// }
				// break;
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
				// $ch_select.html(""+(e.keyCode-base_number));
				clearTimeout(tmr_hide_ch_list);
				this.select_channel(e.keyCode-base_number);
				tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
				break;
			case KEY_ENTER: //  show the app on clicking PORTAL
				clearTimeout(tmr_hide_ch_list);
				if (is_channel_show === true){
					if (current_channel !== last_channel){
						// sudah ada channel-info, tinggal dipercantik
						// clearTimeout(tmr_hide_ch);
						// $ch_select.html(current_channel);
						// tmr_hide_ch = setTimeout(hide_ch_select, 8000);
						hcap.channel.requestChangeCurrentChannel({
							 "channelType" : hcap.channel.ChannelType.IP, 
							 "logicalNumber" : current_channel,
							 "programNumber" : current_channel, 
							 "ip" : channels[current_channel].ip4,
							 "port" :  Number(channels[current_channel].port),
							 "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
							 "onSuccess" : function() {
								 console.log("onSuccess");
								 // $("#welcome-message").prepend("onSuccess");
								 return false;
								
							 }, 
							 "onFailure" : function(f) {
								 console.log("onFailure : errorMessage = " + f.errorMessage);
								 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
								 return false;
							 }
						});
						last_channel =  current_channel;
					}
					hide_ch_list();
				}else{
					// current_channel = last_channel;
					if (current_channel< highlighted){
						$("#channel_"+highlighted).removeAttr("class");
						highlighted = current_channel;
						$("#channel_"+highlighted).attr("class", "active");
						this.show_channel(0);
					}else{
						this.show_channel(current_channel-highlighted);
					}
					channel_list_container.show(300);
					tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
					is_channel_show = true;
				}
            break;
			case hcap.key.Code.SETTINGS:
				var is_setting_show = true;
			break;
			case  hcap.key.Code.DOWN:
			case  hcap.key.Code.CH_DOWN:
			case  hcap.key.Code.PAGE_DOWN:
			// case KEY_DOWN://key_up
				current_channel++;
				if (current_channel === channel_count){
					current_channel = 0;
				}
				
				$("#channel_"+highlighted).removeAttr("class");
				if (highlighted < max_highlighted -1){
					highlighted++;
					
				}else{
					if (current_channel === 0){
						highlighted = 0;
						this.show_channel(current_channel);
					}else{
						this.show_channel(current_channel-max_highlighted+1);
					}
				}
				$("#channel_"+highlighted).attr("class", "active");
				if (is_channel_show === false){
					
					// clearTimeout(tmr_hide_ch);
					// $ch_select.html(current_channel);
					// tmr_hide_ch = setTimeout(hide_ch_select, 8000);
					hcap.channel.requestChangeCurrentChannel({
						 "channelType" : hcap.channel.ChannelType.IP, 
						 "logicalNumber" : current_channel,
						 "programNumber" : current_channel, 
						 "ip" : channels[current_channel].ip4,
						 "port" :  Number(channels[current_channel].port),
						 "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
						 "onSuccess" : function() {
							 console.log("onSuccess");
							 // $("#welcome-message").prepend("onSuccess");
							 return false;
							
						 }, 
						 "onFailure" : function(f) {
							 console.log("onFailure : errorMessage = " + f.errorMessage);
							 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
							 return false;
						 }
					});
					last_channel =  current_channel;
				}else{
					clearTimeout(tmr_hide_ch_list);
					tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
				}
			break;
			case  hcap.key.Code.UP:
			case  hcap.key.Code.CH_UP:
			case  hcap.key.Code.PAGE_UP:
			 // case KEY_UP://key_up
				current_channel--;
				if (current_channel === -1){
					current_channel = channel_count-1;
				}
				
				$("#channel_"+highlighted).removeAttr("class");
				if (highlighted > 0){
					highlighted--;
					
				}else{
					if (current_channel === channel_count-1){
						highlighted = max_highlighted-1;
						this.show_channel(channel_count-max_highlighted);
					}else{
						this.show_channel(current_channel);
					}
				}
				$("#channel_"+highlighted).attr("class", "active");
				if (is_channel_show === false){
					
					// clearTimeout(tmr_hide_ch);
					// $ch_select.html(current_channel);
					// tmr_hide_ch = setTimeout(hide_ch_select, 8000);
					hcap.channel.requestChangeCurrentChannel({
						 "channelType" : hcap.channel.ChannelType.IP, 
						 "logicalNumber" : current_channel,
						 "programNumber" : current_channel, 
						 "ip" : channels[current_channel].ip4,
						 "port" :  Number(channels[current_channel].port),
						 "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
						 "onSuccess" : function() {
							 console.log("onSuccess");
							 // $("#welcome-message").prepend("onSuccess");
							 return false;
							
						 }, 
						 "onFailure" : function(f) {
							 console.log("onFailure : errorMessage = " + f.errorMessage);
							 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
							 return false;
						 }
					});
					last_channel =  current_channel;
				}else{
					clearTimeout(tmr_hide_ch_list);
					tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
				}
			// if(ischannel){
				// hcap.channel.requestChangeCurrentChannel({
					 // "channelType" : hcap.channel.ChannelType.IP, 
					 // "logicalNumber" : 2,
					 // "programNumber" : 2, 
					 // "ip" : "228.110.6.22",
					 // "port" : 1234,
					 // "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
					 // "onSuccess" : function() {
						 // console.log("onSuccess");
						 // $("#welcome-message").prepend("onSuccess");
						
					 // }, 
					 // "onFailure" : function(f) {
						 // console.log("onFailure : errorMessage = " + f.errorMessage);
						 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
					 // }
					// });
				// ischannel = false;
			// }else{
				// hcap.channel.requestChangeCurrentChannel({
					 // "channelType" : hcap.channel.ChannelType.IP, 
					 // "logicalNumber" : 1,
					 // "programNumber" : 1, 
					 // "ip" : "228.110.6.1",
					 // "port" : 1234,
					 // "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
					 // "onSuccess" : function() {
						 // console.log("onSuccess");
						 // $("#welcome-message").prepend("onSuccess");
						
					 // }, 
					 // "onFailure" : function(f) {
						 // console.log("onFailure : errorMessage = " + f.errorMessage);
						 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
					 // }
					// });
				// ischannel = true;
			// }
			break;
			case  hcap.key.Code.RIGHT:
				if (is_channel_show === true){
					clearTimeout(tmr_hide_ch_list);
					if (current_channel  + (max_highlighted-1-highlighted) + max_highlighted > channel_count-1){//batas besar selanjutnya > maks channel
						if (current_channel  + (max_highlighted-1-highlighted) < channel_count-1 ){ 
							current_channel = channel_count - max_highlighted + highlighted;
							this.show_channel(channel_count - max_highlighted);
						}else{
							$("#channel_"+highlighted).removeAttr("class");
							highlighted = max_highlighted - 1;
							current_channel = channel_count-1;
							$("#channel_"+highlighted).attr("class", "active");
							// this.show_channel(channel_count - max_highlighted);
						}
					}else{
						current_channel = current_channel+max_highlighted;
						this.show_channel(current_channel-highlighted);
					}
					tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
					console.log("RIGHT current_channel: "+current_channel+", highlighted: "+ highlighted+", max_highlighted: "+max_highlighted);
					is_channel_show = true;
				}
			break;
			case  hcap.key.Code.LEFT:
				if (is_channel_show === true){
					clearTimeout(tmr_hide_ch_list);
					if (current_channel - highlighted - max_highlighted<0){ //batas kecil selanjutnya < 0
						if (current_channel - highlighted > 0){
							current_channel = highlighted;
							this.show_channel(0);
						}else{
							$("#channel_"+highlighted).removeAttr("class");
							highlighted = 0;
							current_channel = 0;
							$("#channel_"+highlighted).attr("class", "active");
							// this.show_channel(0);
						}
					}else{
						current_channel = current_channel-max_highlighted;
						this.show_channel(current_channel-highlighted);
					}
					// if(current_channel-max_highlighted-1< 0){
						// if ( current_channel < max_highlighted ){
							// $("#channel_"+highlighted).removeAttr("class");
							// highlighted = 0;
							// current_channel = 0;
							// $("#channel_"+highlighted).attr("class", "active");
							// this.show_channel(0);
						// }else{
							// current_channel =  highlighted;
							// this.show_channel(0);
						// }
						// console.log("current_channel-(max_highlighted) -1 < 0 ");
					// }else{
						// console.log("else");
						// current_channel = current_channel-max_highlighted;
						// this.show_channel(current_channel-highlighted);
					// }
					tmr_hide_ch_list = setTimeout(hide_ch_list, 10000);
					console.log("LEFT current_channel: "+current_channel+", highlighted: "+ highlighted+", max_highlighted: "+max_highlighted);
					is_channel_show = true;
				}
			break;
			case  hcap.key.Code.BACK:
				if (is_channel_show === true){
					clearTimeout(tmr_hide_ch_list);
					hide_ch_list();
					return;
				}
				

			case  hcap.key.Code.EXIT:
				clearTimeout(tmr_hide_ch_list);
				$("#toatl-screen").show();
				// hcap.key.removeKeyItem({
					 // "keycode" : 0x0000026D,
					 // "onSuccess" : function() {
						 // console.log("removeKeyItem onSuccess");
						// $("#welcome-message").prepend("removeKeyItem onSuccess");
					 // }, 
					 // "onFailure" : function(f) {
						 // console.log("removeKeyItem onFailure : errorMessage = " + f.errorMessage);
						// $("#welcome-message").prepend("removeKeyItem onFailure : errorMessage = " + f.errorMessage);
					 // }
				// });
				if (is_channel_show === true){
					hide_ch_list();
				}
				current_screen = screen_map[MENU]; //set event handler screen to Menu 
				
				main_menu_index = 0;
				current_screen.current_item_focus(); // set focus on channel_guide button in Menu
				
				//hide currently showing screen and display Welcome screen
				$("#" + screen_ids[displayed_screen_index]).hide(); 
				displayed_screen_index = 4;
				$(".right-top","#right-col").css("visibility", "hidden"); //hide the small logo in right top corner
				$("#welcome-screen").show();
				is_welcome = true; 
				resize_tv_screen();
				//remove registered
					
				break;
			// case KEY_RIGHT:
				// // this.showChannelInfo(current_channel ,channels[current_channel]);
			// break;
			default:
				// $("#welcome-message").prepend("AAA keycode = " + e.keyCode);
        }  
		return false;		
    };
    
    // sets tv video to full screen
    function resize_to_full_screen() {
        // var hcap = new IHcap(); 
        // hcap.set_video_size(0,0,1280,720);
		hcap.video.setVideoSize({
			 "x" : 0, 
			 "y" : 0,
			 "width" : 1280,
			 "height" : 720,
			 "onSuccess" : function() {
				 console.log("onSuccess");
				 return false;
			 }, 
			 "onFailure" : function(f) {
				 console.log("onFailure : errorMessage = " + f.errorMessage);
				 return false;
			 }
		});
		return false;
    };
    
	//shows watch tv screen
    this.show = function(){
        resize_to_full_screen();  //show tv in full screen
        $("#toatl-screen").hide();  // hides the html app
		
		// var $channel_number = $("#channel_number");
		// var $channel_title = $("#channel_title");
		// var $channel_info = $("#channel-info");
		 // hcap.key.addKeyItem({
			 // "keycode" : 0x0000026D,
			 // "virtualKeycode" : hcap.key.Code.LIST,
			 // "attribute" : 2,
			 // "onSuccess" : function() {
				 // console.log("addKeyItem List onSuccess");
				 // $("#welcome-message").prepend("addKeyItem List onSuccess");
				 
			 // }, 
			 // "onFailure" : function(f) {
				 // console.log("addKeyItem List onFailure : errorMessage = " + f.errorMessage);
				 // $("#welcome-message").prepend("addKeyItem List onFailure : errorMessage = " + f.errorMessage);
			 // }
		// });
		//register event
        return false;
    };
	this.showChannelInfo = function(index,channel){
		$channel_number.html(index);
		$channel_title.html(channel.name);
		//var channel_info = $("#channel-info");
		if (!channel_info_animated){
			channel_info_animated = true;
			$channel_info .animate({ top: '0px' }, 500, function(){
				var $this = $(this);
				channel_info_animation_timeout = setTimeout(function(){
					$this.animate({ top: '-120px'}, 500, function(){
						channel_info_animated = false;
						return false;
					});
					return false;
				},3000);
				return false;
			});
		}else{
			clearTimeout(channel_info_animation_timeout);
			channel_info_animation_timeout = setTimeout(function(){
					$channel_info.animate({ top: '-120px'}, 500, function(){
						channel_info_animated = false;
						return false;
					});
				},3000);
		}
		return false;
	};
	
	this.show_channel = function(index){
			channel_0.innerHTML = index+". "+channels[index].name+"&nbsp";
			channel_1.innerHTML = ((index+1)%channel_count)+". "+channels[(index+1)%channel_count].name+"&nbsp";
			channel_2.innerHTML = ((index+2)%channel_count)+". "+channels[(index+2)%channel_count].name+"&nbsp";
			channel_3.innerHTML = ((index+3)%channel_count)+". "+channels[(index+3)%channel_count].name+"&nbsp";
			channel_4.innerHTML = ((index+4)%channel_count)+". "+channels[(index+4)%channel_count].name+"&nbsp";
			channel_5.innerHTML = ((index+5)%channel_count)+". "+channels[(index+5)%channel_count].name+"&nbsp";
			channel_6.innerHTML = ((index+6)%channel_count)+". "+channels[(index+6)%channel_count].name+"&nbsp";
			channel_7.innerHTML = ((index+7)%channel_count)+". "+channels[(index+7)%channel_count].name+"&nbsp";
			channel_8.innerHTML = ((index+8)%channel_count)+". "+channels[(index+8)%channel_count].name+"&nbsp";
			return false;
	}
	function timer_done (index){
		//play tmp_channel and reset it
		// console.log(index+" SSS "+ index.length);
		index = Number(index);
		if(index >= channel_count){
			clearTimeout(tmr_hide_ch);
			$ch_select.html("---");
			tmr_hide_ch = setTimeout(hide_ch_select, 3000);
			tmp_channel = "";
			return false;
		}
		hcap.channel.requestChangeCurrentChannel({
			 "channelType" : hcap.channel.ChannelType.IP, 
			 "logicalNumber" : index,
			 "programNumber" : index, 
			 "ip" : channels[index].ip4,
			 "port" :  Number(channels[index].port),
			 "ipBroadcastType" : hcap.channel.IpBroadcastType.UDP, 
			 "onSuccess" : function() {
				if (current_channel< highlighted){
					$("#channel_"+highlighted).removeAttr("class");
					highlighted = current_channel;
					$("#channel_"+highlighted).attr("class", "active");
					self.show_channel(0);
				}else{
					self.show_channel(current_channel-highlighted);
				}
				return false;
			 }, 
			 "onFailure" : function(f) {
				 // console.log("onFailure : errorMessage = " + f.errorMessage);
				 // $("#welcome-message").prepend("onFailure : errorMessage = " + f.errorMessage);
				 return false;
			 }
		});
		tmr_hide_ch = setTimeout(hide_ch_select, 3000);
		last_channel =  index;
		current_channel = last_channel;
		tmp_channel = "";
		return false;
	};
	function hide_ch_select(){
		// console.log("hide_ch_select");
		$ch_select.html("");
		return false;
	}
	function hide_ch_list(){
		channel_list_container.hide(300);
		is_channel_show = false;
		current_channel = last_channel;
		return false;
	}
	this.select_channel = function(index){
		clearTimeout(tmr_select_ch);
		clearTimeout(tmr_hide_ch);
		tmp_channel +=  "" + index ;
		// console.log(tmp_channel+" aaa "+ tmp_channel.length);
		$ch_select.html(tmp_channel);
		if (tmp_channel.length<3){
			//tambah timer
			
			tmr_select_ch = setTimeout(function(){
				timer_done(tmp_channel) ;
			}
			, 2500 );
		}else{
			//langsung buka
			timer_done(tmp_channel);
		}
		// console.log(tmp_channel+" "+ tmp_channel.length);
		// if (tmp_channel )
		// tmr_select_ch = setTimeout(timer_done(index), 2500 );
		return false;
	}
	
	
    return false;
}

