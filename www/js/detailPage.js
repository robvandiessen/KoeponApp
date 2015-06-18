var index;
var cat;

function getDetails(val) {
    index = val.substr(val.length - 1);
    cat = val.substring(0, val.length - 1);

    var titel = $('#detail_page #banner_overzicht .kop_detail');
    var beschrijving = $('#detail_page .subscr_detail');
    var img = $('#detail_page #banner_overzicht img');
    var logo = $('#detail_page #logo_detail img');
    var barcode = $('#detail_page #pendelBar');
    var adress = $('#detail_page .adress_overzicht');
    
    var category = $('#detail_page .subscr_overzicht');
    category.html(cat);

    if (cat === 'Horeca') {
        titel.html(pendels.Pendels.Horeca[index].titel);
        beschrijving.html(pendels.Pendels.Horeca[index].beschrijving);
        img.attr('src', pendels.Pendels.Horeca[index].img);
        logo.attr('src', pendels.Pendels.Horeca[index].logo);
        //barcode.attr('src', pendels.Pendels.Horeca[index].barcode);
        adress.html(pendels.Pendels.Horeca[index].adres);
    }
    else if (cat === 'Cultuur') {
        titel.html(pendels.Pendels.Cultuur[index].titel);
        beschrijving.html(pendels.Pendels.Cultuur[index].beschrijving);
        img.attr('src', pendels.Pendels.Cultuur[index].img);
        logo.attr('src', pendels.Pendels.Cultuur[index].barcode);
        //barcode.attr('src', pendels.Pendels.Horeca[index].barcode);
        adress.html(pendels.Pendels.Horeca[index].adres);
    }
    else if (cat === 'Entertainment') {
        titel.html(pendels.Pendels.Entertainment[index].titel);
        beschrijving.html(pendels.Pendels.Entertainment[index].beschrijving);
        img.attr('src', pendels.Pendels.Entertainment[index].img);
        logo.attr('src', pendels.Pendels.Entertainment[index].barcode);
        //barcode.attr('src', pendels.Pendels.Horeca[index].barcode);
        adress.html(pendels.Pendels.Horeca[index].adres);
    }
    else if (cat === 'Shoppen') {
        titel.html(pendels.Pendels.Shoppen[index].titel);
        beschrijving.html(pendels.Pendels.Shoppen[index].beschrijving);
        img.attr('src', pendels.Pendels.Shoppen[index].img);
        logo.attr('src', pendels.Pendels.Shoppen[index].logo);
        //barcode.attr('src', pendels.Pendels.Shoppen[index].barcode);
        adress.html(pendels.Pendels.Horeca[index].adres);
    }
    else if (cat === 'Weetjes') {
        titel.html(pendels.Pendels.Weetjes[index].titel);
        beschrijving.html(pendels.Pendels.Weetjes[index].beschrijving);
        img.attr('src', pendels.Pendels.Weetjes[index].img);
        logo.attr('src', pendels.Pendels.Weetjes[index].barcode);
        //barcode.attr('src', pendels.Pendels.Horeca[index].barcode);
        adress.html(pendels.Pendels.Horeca[index].adres);
        
    }
}

function useKoepon() {
    if (cat === 'Horeca') {
        horecaUsed[index] = true;
    }
    else if (cat === 'Cultuur') {
        cultuurUsed[index] = true;
    }
    else if (cat === 'Entertainment') {
        entertainmentUsed[index] = true;
    }
    else if (cat === 'Shoppen') {
        shoppenUsed[index] = true;
    }
}