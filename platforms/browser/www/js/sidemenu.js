function showMenu(){
	$('#overlay_sidemenu').css( "background-color", "rgba(0,0,0,0.5)" );
        $('#overlay_sidemenu').css( "display", "initial" );
	$('#navToggler').hide();
	$('#navToggler2').show();
}

function hideMenu(){
	$('#overlay_sidemenu').css( "background-color", "rgba(0,0,0,0.0)" );
        $('#overlay_sidemenu').css( "display", "none" );
	$('#navToggler2').hide();
	$('#navToggler').show();
}