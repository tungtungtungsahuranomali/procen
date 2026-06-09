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
 * Filename		: event_handler.js
 * Purpose		: Handle RCU events
 * Platform		: LG TV Browser
 * Author(s)		: Neelima Mangaj
 * E-mail id.		: neelima.mangaj@lge.com
 * Creation date 	: <22. 11. 2011>
 *				
 * Modifications:
 *
**********************************************************/

var screen_map = new Array();
//var info = new information();
var current_screen;
var MENU = "menu";
var INFO = "information";
var GUIDE = "channel_guide"
var REMOTE = "remote-help";
var FNB = "food-beverage";
var WATCHTV = "watchtv";

// var channel_info_animated = false;
function event_handler() {
    //var info = new information();
    this.init = function(){
        screen_map[MENU] = new menu();
        // screen_map[INFO] = info;
        // screen_map[GUIDE] = guide;
        // screen_map[REMOTE] = new remote_help();
        screen_map[WATCHTV] = new watchtv();
        
        current_screen = screen_map[WATCHTV];
		
        $(document).keydown(function(e) {
            e.preventDefault();
            current_screen.process_key_events(e);
			return false;
            
        });
		document.addEventListener(
			 "channel_changed", 
			 function (param) {
				 // {Boolean} param.result - true if the current channel is changed successfully, else false.
				 // {String} param.errorMessage - in case of failure, this message provides the details.
				 
				 hcap.channel.getCurrentChannel({
					 "onSuccess" : function(s) {
						 
						 // console.log("ssssssssssssss = " + s.logicalNumber);
						// $("#welcome-message").prepend("channel_changed = " + s.logicalNumber);
						screen_map[WATCHTV].showChannelInfo(current_channel ,channels[current_channel ]);
						 return false;
						
					 }, 
					 "onFailure" : function(f) {
						 console.log("onFailure : errorMessage = " + f.errorMessage);
						 return false;
					 }
				});
				return false;
			 },
			 false
		);
		
		screen_map[MENU].init();
		return false;
    }
	
}

