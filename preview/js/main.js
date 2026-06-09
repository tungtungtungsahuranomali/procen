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
 * Filename		: main.js
 * Purpose		: 
 * Platform		: LG TV Browser
 * Author(s)		: Jileesh Sathyan
 * E-mail id.		: 
 * Creation date 	: <11, 10, 2011>
 *				
 * Modifications:
 *
**********************************************************/



var weather_obj; 
// var menu;
var event_handler;
// var info = new information();
// var guide = new channel_guide();
var ischannel = true;
var channels = [];
var current_channel = 0;
var channel_count = 0;
var XHRObj2 = null;
var $day = $("#day");//.html(days[current_day]);
var $month = $("#month");//.html(current_month);
var $date = $("#date");//.html(current_date);
var $year = $("#year");//.html(current_year);
var $time = $("#time");//.html(time);
var $period = $("#period");//.html(period);
// var $welcome = $( ".welcome","#welcome-screen" );
$("document").ready(function() {
	event_handler = new event_handler();
	// menu = new menu();
	
	show_time();
	setInterval(show_time, 30000);
	event_handler.init();
	// menu.init();
	get_channel_list();
	get_device_id();
	$('#wrapper').show(function (){
		$('#loading').hide(1000);
		return false;
	});
	
	$('body').addClass('loaded');
	return false;
	
});
supportsLocalStorage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};

receiveName = function(){

	 var data = JSON.parse(this.XHRObj2.responseText);
	 
	 $( ".welcome","#welcome-screen" ).html( this.XHRObj2.responseText );
	return false;
};


var days = new Array("Sun","Mon","Tue","wed","Thu","Fri","Sat"); 
function show_time () {
	var current_time = new Date();
	var current_day = current_time.getDay();	
	var current_date = current_time.getDate();
	var current_year = current_time.getFullYear();
	var current_month = current_time.getMonth() + 1;
	var current_hour = current_time.getHours();
	var current_min = current_time.getMinutes();
	var time = "";
	var period = "";
	if(current_hour == 0) 
		current_hour = 12;
	time =	(current_hour > 12 ? current_hour - 12 : current_hour) + ":" +
         (current_min < 10 ? "0" : "") + current_min;
    period =   (current_hour > 12 ? "PM" : "AM");
	$day.html(days[current_day]);
	$month.html(current_month);
	$date.html(current_date);
	$year.html(current_year);
    $time.html(time);
	$period.html(period);
	return false;
}

function resize_tv_screen() {
	hcap.video.setVideoSize({
		 "x" : 38, 
		 "y" : 110,
		 "width" : 395,
		 "height" : 222,
		 "onSuccess" : function() {
			 console.log("onSuccess");
			return false;
		 }, 
		 "onFailure" : function(f) {
			 console.log("onFailure : errorMessage = " + f.errorMessage);
			return false;
		 }
	});
}

function get_channel_list(){
	$.getJSON("http://iptv.cic.net.id/hk/ChannelList.php", function(result) {   
		  // var items = [];
		  channels = result;
		  channel_count = result.length;
		startChannel();
		return false;
	});
}
function print_current_mac(ip) {
    hcap.network.getNumberOfNetworkDevices({
         "onSuccess" : function(s) {
             console.log("onSuccess : the number of network devices = " + s.count);
             // $("#welcome-message").prepend("onSuccess : the number of network devices = " + s.count);
//             for (var i = 0; i < s.count; i++) {
                 (function(k) {
                     hcap.network.getNetworkDevice({
                         "index" : k,
                         "onSuccess" : function(r) {
                             if (ip === r.ip) {
                                 console.log("CURRENT MAC : " + r.mac);
								 // $("#welcome-message").prepend("CURRENT MAC : " + r.mac);
								 // save mac address to localStorage
								 if (supportsLocalStorage()) {
									localStorage.setItem("cic.mac", r.mac);
								}
								 // get room info from mac address
								 $.post( "http://iptv.cic.net.id/hk/RoomInfo.php", {devid: r.mac},function( data ) {
									  $( "#guest_name" ).html( data.guest_name0 );
									  $( "#hotel_name" ).html( data.nama_hotel0 );
									  $( "#room_name" ).html( data.room_name0 );
									  // $( "#loading_welcome").hide( 5000 );
									  $( "#loading_welcome").velocity( "fadeOut", { duration: 1000 } );
								 }, "json");
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
//             }
			return false;
         }, 
         "onFailure" : function(f) {
             console.log("onFailure : errorMessage = " + f.errorMessage);
			 // $("#welcome-message").prepend("onFailure NumberOfNetworkDevices: errorMessage = " + f.errorMessage);
			return false;
         }
    });
}
function get_device_id(){
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
}

function startChannel(){
	hcap.channel.getStartChannel({
     "onSuccess" : function(s) {
         console.log("onSuccess :" + 
             "\n channel type      : " + s.channelType     +
             "\n logical number    : " + s.logicalNumber   +
             "\n frequency         : " + s.frequency       +
             "\n program number    : " + s.programNumber   +
             "\n major number      : " + s.majorNumber     +
             "\n minor number      : " + s.minorNumber     +
             "\n satellite ID      : " + s.satelliteId     +
             "\n polarization      : " + s.polarization    +
             "\n rf broadcast type : " + s.rfBroadcastType +
             "\n ip                : " + s.ip              +
             "\n port              : " + s.port            +
             "\n ip broadcast type : " + s.ipBroadcastType +
             "\n symbol rate       : " + s.symbolRate      +
             "\n pcr pid           : " + s.pcrPid          +
             "\n video pid         : " + s.videoPid        +
             "\n video stream type : " + s.videoStreamType +
             "\n audio pid         : " + s.audioPid        +
             "\n audio stream type : " + s.audioStreamType +
             "\n signal strength   : " + s.signalStrength  +
             "\n source address    : " + s.sourceAddress);
			 current_channel = s.logicalNumber;
			 // $("#welcome-message").prepend("onSuccess :" + 
             // "\n channel type      : " + s.channelType     +
             // "\n logical number    : " + s.logicalNumber   +
             // "\n frequency         : " + s.frequency       +
             // "\n program number    : " + s.programNumber   +
             // "\n major number      : " + s.majorNumber     +
             // "\n minor number      : " + s.minorNumber     +
             // "\n satellite ID      : " + s.satelliteId     +
             // "\n polarization      : " + s.polarization    +
             // "\n rf broadcast type : " + s.rfBroadcastType +
             // "\n ip                : " + s.ip              +
             // "\n port              : " + s.port            +
             // "\n ip broadcast type : " + s.ipBroadcastType +
             // "\n symbol rate       : " + s.symbolRate      +
             // "\n pcr pid           : " + s.pcrPid          +
             // "\n video pid         : " + s.videoPid        +
             // "\n video stream type : " + s.videoStreamType +
             // "\n audio pid         : " + s.audioPid        +
             // "\n audio stream type : " + s.audioStreamType +
             // "\n signal strength   : " + s.signalStrength  +
             // "\n source address    : " + s.sourceAddress);
		screen_map[WATCHTV].show_channel(current_channel);
		return false;
     }, 
     "onFailure" : function(f) {
         console.log("onFailure : errorMessage = " + f.errorMessage);
			 // $("#welcome-message").prepend("getStartChannel onFailure : errorMessage = " + f.errorMessage);
			 if (f.errorMessage === "Hcap::instance()->get_start_channel() failed"){
				hcap.channel.setStartChannel({
					 "channelType" : hcap.channel.ChannelType.IP, 
					 "logicalNumber" : current_channel,
					 "programNumber" : current_channel, 
					 "ip" : channels[current_channel].ip4,
					 "port" : Number(channels[current_channel].port),
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
				
				hcap.channel.requestChangeCurrentChannel({
					 "channelType" : hcap.channel.ChannelType.IP, 
					 "logicalNumber" : current_channel,
					 "programNumber" : current_channel, 
					 "ip" : channels[current_channel].ip4,
					 "port" : Number(channels[current_channel].port),
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
			 }	
			return false;
		 }
	});
}