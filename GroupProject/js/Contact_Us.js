// jquery code to zoomInOut map image added in page
$(document).ready(function() {
    function zoomInOut() {
        $('#ds_zoom_image').animate({ 
            width: '700px', 
            height: '350px'
        }, 3000, function() {
            $('#ds_zoom_image').animate({ 
                width: '700px', 
                height: '300px' 
            }, 3000, zoomInOut);
        });
    }
    zoomInOut(); 
});
// jquery code to zoomInOut map image added in page
