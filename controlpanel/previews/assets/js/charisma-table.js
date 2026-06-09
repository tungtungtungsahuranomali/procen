
// var site_url = "http://192.168.118.58/iptvman/";
//var site_url = "http://iptv.cic.net.id/iptvman/";
var site_url = "";
$(document).ready(function () {
    //themes, change CSS with JS
    //default theme(CSS) is cerulean, change it if needed
    var defaultTheme = 'cerulean';
    var currentTheme = $.cookie('currentTheme') == null ? defaultTheme : $.cookie('currentTheme');
    var msie = navigator.userAgent.match(/msie/i);
    
    site_url = $("#site_url").val();
    $.browser = {};
    $.browser.msie = {};

    $('.navbar-toggle').click(function (e) {
        e.preventDefault();
        $('.nav-sm').html($('.navbar-collapse').html());
        $('.sidebar-nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    var $sidebarNav = $('.sidebar-nav');

    // Hide responsive navbar on clicking outside
    $(document).mouseup(function (e) {
        if (!$sidebarNav.is(e.target) // if the target of the click isn't the container...
            && $sidebarNav.has(e.target).length === 0
            && !$('.navbar-toggle').is(e.target)
            && $('.navbar-toggle').has(e.target).length === 0
            && $sidebarNav.hasClass('active')
            )// ... nor a descendant of the container
        {
            e.stopPropagation();
            $('.navbar-toggle').click();
        }
    });


    //ajax menu checkbox
    $('#is-ajax').click(function (e) {
        $.cookie('is-ajax', $(this).prop('checked'), {expires: 365});
    });
    $('#is-ajax').prop('checked', $.cookie('is-ajax') === 'true' ? true : false);

    //disbaling some functions for Internet Explorer
    if (msie) {
        $('#is-ajax').prop('checked', false);
        $('#for-is-ajax').hide();
        $('#toggle-fullscreen').hide();
        $('.login-box').find('.input-large').removeClass('span10');

    }


    //highlight current / active link
    $('ul.main-menu li a').each(function () {
        if ($($(this))[0].href == String(window.location))
            $(this).parent().addClass('active');
    });

    //establish history variables
    var
        History = window.History, // Note: We are using a capital H instead of a lower h
        State = History.getState(),
        $log = $('#log');

    //bind to State Change
    History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        $.ajax({
            url: State.url,
            success: function (msg) {
                $('#content').html($(msg).find('#content').html());
                $('#loading').remove();
                $('#content').fadeIn();
                var newTitle = $(msg).filter('title').text();
                $('title').text(newTitle);
                docReady();
            }
        });
    });

    //ajaxify menus
    $('a.ajax-link').click(function (e) {
        if (msie) e.which = 1;
        if (e.which != 1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
        e.preventDefault();
        $('.sidebar-nav').removeClass('active');
        $('.navbar-toggle').removeClass('active');
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink = $(this);
        History.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');
    });

    $('.accordion > a').click(function (e) {
        e.preventDefault();
        var $ul = $(this).siblings('ul');
        var $li = $(this).parent();
        if ($ul.is(':visible')) $li.removeClass('active');
        else                    $li.addClass('active');
        $ul.slideToggle();
    });

    $('.accordion li.active:first').parents('ul').slideDown();

    //other things to do on document ready, separated for ajax calls
    docReady();
	
	// $('.dataTables_filter label input').val('testing');
	 $('.dataTables_filter label input').focus();
	 // $( ".datepicker" ).datepicker({
		// changeMonth: true,
        // changeYear: true,
		// dateFormat: 'yy-mm-dd'
	 // });
	 
	$('.btn-occupy').click(function (e) {
		e.preventDefault();
		if ($('input:checkbox[name=room]:checked').length === 0){
			alert('Please Select A Room');
			return;
		}
		$('#myModal').modal('show');
		$("input:checkbox[name=room]:checked").each(function(){
			var checkBox = "<br/><input type='checkbox' name='room' value='" + $(this).val() + "' checked='checked'/> <b>" + $(this).attr('id').slice(0,3) + "</b> ";
			$(checkBox).appendTo($('#room_name_occupy'));
		
			// $.post(site_url+'management/occupy/'+device_id,  guest_data, function(data){
				// alert(data);
			// });
		});
		$('#confirmation-yes').off('click').on('click', function(){
			
			// var guest_data = {"guest_name[0]" : guest_name, "gender[0]" : gender, "id_language[0]"  : lang, "birthday[0]" : birthday} ; // OK
			 var guest_data = {post_data: []};//  = { data: [{guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday}]};  // OK2
			$("#room_name_occupy input:checkbox[name=room]:checked").each(function(){
				var device_id = $(this).val();
                                var escape_device_id = device_id.replace(/:/g, '\\:');
				var guest_name = $('table tr#'+escape_device_id+' > td:nth-child(2) > input').val();
				var gender = $('table tr#'+escape_device_id+' > td:nth-child(3) > input[type="radio"][name="gen-'+escape_device_id+'"]:checked').val();
				var lang = $('table tr#'+escape_device_id+' > td:nth-child(4) > input[type="radio"][name="lang-'+escape_device_id+'"]:checked').val();
				var birthday = $('table tr#'+escape_device_id+' > td:nth-child(5) > input[type="text"][name="birth-'+escape_device_id+'"]').val();
				var o = {};
				o[device_id] = {guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday};
				guest_data.post_data.push(o);
				
			});
			$.post(site_url+'management/occupy',  guest_data, function(data){
				if (data === "true"){
					//alert("BERHASIL");
					$('#myModal').modal('hide');
					//location.reload();
				}else{
					alert( "TRY AGAIN!!!");
					$('#myModal').modal('hide');
				}
			});
		});
	});
	
	$('.btn-vacant').click(function (e) {
		e.preventDefault();
		if ($('input:checkbox[name=room]:checked').length === 0){
			alert('Please Select A Room');
			return;
		}
		$('#myView').modal('show');
		$("input:checkbox[name=room]:checked").each(function(){
			var checkBox = "<br/><input type='checkbox' name='room' value='" + $(this).val() + "' checked='checked'/> <b>" + $(this).attr('id').slice(0,3) + "</b> ";
			$(checkBox).appendTo($('#room_name_vacant'));
		
			// $.post(site_url+'management/occupy/'+device_id,  guest_data, function(data){
				// alert(data);
			// });
		});
		$('#confirmation-vacant-yes').off('click').on('click', function(){
			
			// var guest_data = {"guest_name[0]" : guest_name, "gender[0]" : gender, "id_language[0]"  : lang, "birthday[0]" : birthday} ; // OK
			 var device_data = {post_data: []};//  = { data: [{guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday}]};  // OK2
					
			$("#room_name_vacant input:checkbox[name=room]:checked").each(function(){
				var device_id = $(this).val();
				device_data.post_data.push(device_id);
				
			});
			$.post(site_url+'management/vacant',  device_data, function(data){
				if (data === "true"){
					//alert("BERHASIL");
					$('#myView').modal('hide');
					location.reload();
				}else{
					alert( "TRY AGAIN!!!");
					$('#myView').modal('hide');
				}
			});
		});
	});
	
});


function docReady() {
    //prevent # links from moving to top
    $('a[href="#"][data-top!=true]').click(function (e) {
        e.preventDefault();
    });

    //chosen - improves select
    $('[data-rel="chosen"],[rel="chosen"]').chosen();

    //tabs
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    //tooltip
    $('[data-toggle="tooltip"]').tooltip();


    //popover
    $('[data-toggle="popover"]').popover();

    //datatable
    $('.datatable').dataTable({
		"bPaginate": false,
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        },
    });
    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        else                       $('i', $(this)).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $target.slideToggle();
    });
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
    $('.btn-reset').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
    $('.btn-refresh').click(function (e) {
        e.preventDefault();
        location.reload();
    });
    // $('.btn-edit').click(function (e) {
        // e.preventDefault();
        // $('#myModal').modal('show');
    // });
    // $('.btn-delete').click(function (e) {
        // e.preventDefault();
        // $('#myModal').modal('show');
    // });
//	 $( ".datepicker" ).datepicker({
//					changeMonth: true,
//					changeYear: false,
//					dateFormat: 'yy-mm-dd'
//				 });
				$('[class*=btn-occupy-]').click(function (e) {
					e.preventDefault();
					
					var arr = $(this).attr('class').split('-');
					var device_id = arr[3];
					// var device_id = $(this).attr('class').slice(-13);
					$('#myModal').modal('show');
					//alert($(this).parent().parent().children("td:nth-child(2)").html());
					
					$('#confirmation-yes').off('click').on('click', function(){
                                                var escape_device_id = device_id.replace(/:/g, '\\:');
//                                        console.log(escape_device_id);
//                                        console.log('table tr#'+escape_device_id+' > td:nth-child(2) > input');
						var guest_name = $('table tr#'+escape_device_id+' > td:nth-child(2) > input').val();
						var gender = $('table tr#'+escape_device_id+' > td:nth-child(3) > input[type="radio"][name="gen-'+escape_device_id+'"]:checked').val();
						var lang = $('table tr#'+escape_device_id+' > td:nth-child(4) > input[type="radio"][name="lang-'+escape_device_id+'"]:checked').val();
						var birthday = $('table tr#'+escape_device_id+' > td:nth-child(5) > input[type="text"][name="birth-'+escape_device_id   +'"]').val();
						// var guest_data = {"guest_name[0]" : guest_name, "gender[0]" : gender, "id_language[0]"  : lang, "birthday[0]" : birthday} ; // OK 1
						//var guest_data = { post_data: [ {guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday}]}; // OK2
						var guest_data = { post_data: []};
						var o = {};
						o[device_id] = {guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday};
						guest_data.post_data.push(o); 
						//var guest_data =  [{guest_name : guest_name, gender : gender, id_language  : lang, birthday : birthday}];
						
						$.post(site_url+'management/occupy',  guest_data, function(data){
							
							if (data === "true"){
								//alert("BERHASIL");
								$('#myModal').modal('hide');
								//$('.datatable').DataTable().ajax.reload("", false);
								//location.reload();
							}else{
								alert( "TRY AGAIN!!!");
								$('#myModal').modal('hide');
							}
						});
					});
				
				});
				$('[class*=btn-vacant-]').click(function (e) {
					e.preventDefault();
					var arr = $(this).attr('class').split('-');
					var device_id = arr[3];
					 // var device_id = $(this).attr('class').slice(-13);
					$('#myView').modal('show');
					var device_data = { post_data: []};
					device_data.post_data.push(device_id);
					
					$('#confirmation-vacant-yes').off('click').on('click', function(){
						$.post(site_url+'management/vacant', device_data, function(data){
							//alert(data);
							if (data === "true"){
								//alert("BERHASIL");
								$('#myView').modal('hide');
								location.reload();
							}else{
								alert( "TRY AGAIN!!!");
								$('#myView').modal('hide');
							}
						});
					});
					//alert($(this).parent().parent().children("td:nth-child(2)").html());
					// $.post(site_url+'management/view/'+device_id, function(data){
						// var json = JSON.parse(data);
						// $('#room_name_for_reset').html(json[0].room_name);
						// $('#confirmation-yes').attr("href", site_url+"management/reset/"+device_id);
					// });
				});

}


//additional functions for data table
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
}
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                    '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', { action: "previous" }, fnClickHandler);
            $(els[1]).bind('click.DT', { action: "next" }, fnClickHandler);
        },

        "fnUpdate": function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
				
            }
        }
    }
});

function resetModalOccupy(){
	$('#room_name_occupy').html('');
}

function resetModalVacant(){
	$('#room_name_vacant').html('');
}
function resetModal(){
	$('#room_name').html('#Room');
	$('#guest_name').html('#Guest');
	$('#language').html('#Language');
	$('#birthday').html('#Birthday');
}
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#previewedImage').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#viewImageFnb").change(function(){
    readURL(this);
});
