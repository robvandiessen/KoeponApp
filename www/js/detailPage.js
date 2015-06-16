function getDetails(val){
    var index = val.substr(val.length - 1);
    var cat = val.substring(0, val.length - 1);
    
    
    var titel = document.getElementById('pendelTitel');
    var beschrijving = document.getElementById('beschrijving');
    alert('index: '+index+" cat: "+cat);
    if(cat ==='Horeca'){
        titel.innerHTML = pendels.Pendels.Horeca[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Horeca[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Horeca[index].img);
    } 
    else if(cat ==='Cultuur'){
        titel.innerHTML = pendels.Pendels.Cultuur[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Cultuur[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Cultuur[index].img);
    } 
    else if(cat ==='Entertainment'){
        titel.innerHTML = pendels.Pendels.Entertainment[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Entertainment[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Entertainment[index].img);
    } 
    else if(cat ==='Shoppen'){
        //alert(pendels.Pendels.Shoppen[index].titel);
        titel.innerHTML = pendels.Pendels.Shoppen[index].titel;
        beschrijving.innerHTML = pendels.Pendels.Shoppen[index].beschrijving;
        $('#pendelImg').attr('src',pendels.Pendels.Shoppen[index].img);
    }
}