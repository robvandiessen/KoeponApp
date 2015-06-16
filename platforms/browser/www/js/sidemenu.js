function showMenu(){
	$('#overlay_sidemenu').css( "background-color", "rgba(0,0,0,0.5)" );
	$('#navToggler').hide();
	$('#navToggler2').show();
}

function hideMenu(){
	$('#overlay_sidemenu').css( "background-color", "rgba(0,0,0,0.0)" );
	$('#navToggler2').hide();
	$('#navToggler').show();
}