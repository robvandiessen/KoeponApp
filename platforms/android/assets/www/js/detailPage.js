function getDetails(val){
    var index = val.substr(val.length - 1);
    var cat = val.substring(0, val.length - 1);
    
    var shop = [];
    
    var titel = document.getElementById('pendelTitel');
    var beschrijving = document.getElementById('beschrijving');

    if(cat ==='Horeca'){
        titel.innerHTML = pendels.Pendels.Horeca[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Horeca[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Horeca[index].img); 
        $('#pendelBar').attr('src',pendels.Pendels.Horeca[index].barcode);
    } 
    else if(cat ==='Cultuur'){
        titel.innerHTML = pendels.Pendels.Cultuur[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Cultuur[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Cultuur[index].img);
        $('#pendelBar').attr('src',pendels.Pendels.Cultuur[index].barcode);
    } 
    else if(cat ==='Entertainment'){
        titel.innerHTML = pendels.Pendels.Entertainment[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Entertainment[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Entertainment[index].img);
        $('#pendelBar').attr('src',pendels.Pendels.Entertainment[index].barcode);
    } 
    else if(cat ==='Shoppen'){
        //alert(pendels.Pendels.Shoppen[index].titel);
        titel.innerHTML = pendels.Pendels.Shoppen[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Shoppen[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Shoppen[index].img);
        $('#pendelBar').attr('src',pendels.Pendels.Shoppen[index].barcode);
        shoppenUsed[index] = true;
    }
    else if(cat ==='Weetjes'){
        //alert(pendels.Pendels.Shoppen[index].titel);
        titel.innerHTML = pendels.Pendels.Weetjes[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Weetjes[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Weetjes[index].img);
    }
}