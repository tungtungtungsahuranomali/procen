(function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(hcap, JSON, window.jQuery, window, document);

  }(function(hcap, JSON, $, window, document ) {

    var $title_content;
    var $pict;
    var $desc;
    //##########################################################################
    $(function() {
//        $('#menu_cont').animate({ left: 0}, {duration: 1500, easing: 'swing'});
        $title_content = $("#title_content");
        $pict = $("#pict");
        $desc = $("#desc");
    

        getdataharris();

        return false;
    });
    $(document).keydown(function(e){
        e = e || window.event;
        switch(e.which || e.keyCode){
            case hcap.key.Code.ENTER:
                break;
                case hcap.key.Code.BACK:
                case hcap.key.Code.PORTAL:
                case hcap.key.Code.EXIT:
                    window.location.replace("menu.html");
                    return false;
            default:
                break;

        }
        return true;
    });








  var getdataharris = function getdataharris(){
        $.get("http://192.168.60.4/controlpanel/informationcsrjson.php", 
                function(result){
                    generatedata(result);
                    return false;
                },
                "json"
        ).fail(function(){
        });
        return true;
    };
    
    var generatedata = function generatedata(c){
        c.forEach(function(data){
            console.log(data);
            $title_content.html(data.judul);
            $desc.html(data.deskripsi);
            $desc.focus();
            //$pict.attr("src", data.gambar_about);     
        });
        return;
    };






  })

);