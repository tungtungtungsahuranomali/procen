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
//            case hcap.key.Code.CH_DOWN:
//            case hcap.key.Code.DOWN:
//            case hcap.key.Code.PAGE_DOWN:
//                $desc.
//                break;
//            case hcap.key.Code.CH_UP:
//            case hcap.key.Code.UP:
//            case hcap.key.Code.PAGE_UP:
//                break;
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
        $.get("http://192.168.60.4/controlpanel/about1json.php", 
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
            console.log(data.gambar_about);
            $title_content.html(data.judul_about);
            $desc.html(data.deskripsi_about);
            $desc.focus();
            $pict.attr("src", data.gambar_about);     
        });
        return;
    };






  })

);