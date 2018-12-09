function loadHtmlIntoIframe(id, location) {
		$('#'+id).attr('src',location);
	}
	
	function checkSiteWidth () {
		if(window.innerWidth < 700) {
			$('.content-left').hide();
			$('.content-right').hide();
			$('.content-center').width('100%');
		} else {
			$('.content-left').show();
			$('.content-right').show();
			$('.content-center').width(document.body.offsetWidth - 300);
		}
	}
	
	var tablicaKolorowAnimacji = ['#990000','#9a0000','#aa0000','#ab0000','#bb0000','#bc0000'];
	
	function doSetActive(id,i){
		setTimeout(function(){
			id.style.fontSize = i+17+'px';
			id.style.backgroundColor = tablicaKolorowAnimacji[i];
		}, i*25);
	}
	
	function setActive(id) {
		for(var i = 0; i <= 5; i++){ doSetActive(id,i); }
	}
	
	function doSetDisactive(id,i){
		setTimeout(function(){
			id.style.fontSize = 22-i+'px';
			id.style.backgroundColor = tablicaKolorowAnimacji[5-i];
		}, i*25);
	}
	
	function setDisactive(id) {
		for(var i = 0; i <= 5; i++ ){ doSetDisactive(id,i); }
	}
	
	function setActiveSubButton(id){
		var otherIdsTab = document.getElementsByClassName('subMenuButton');
		for(var i = 0; i < otherIdsTab.length; i++){
			otherIdsTab[i].style.backgroundColor = "#990000";
		}
		id.style.backgroundColor = "#bc0000";
	}
	
  	function runFunctionAfterPageLoad(functionReference) {
  		if (window.addEventListener)
  			window.addEventListener("load", functionReference, false);
  		else if (window.attachEvent)
  			window.attachEvent("onload", functionReference);
  		else window.onload = functionReference;
  	}
  	
  	function setActiveMenuButton(numerPrzycisku){
  			var przyciskiMenu = document.getElementsByClassName('menuButton');
  	  		przyciskiMenu[numerPrzycisku].onmouseover = '';
  	  		przyciskiMenu[numerPrzycisku].onmouseout = '';
			przyciskiMenu[numerPrzycisku].style.fontSize = '22px';
			przyciskiMenu[numerPrzycisku].style.backgroundColor = tablicaKolorowAnimacji[5];
  	}
  	
  	var nazwaPrzycisku;
  	function zaladujMenuIPodswietlPrzycisk(menuId, nazwaPrzycisku) {
  		this.nazwaPrzycisku = nazwaPrzycisku;
  		$(document).ready(function(){$('#' + menuId).load("../menu/menu.html");});
  	}
  	  	
    function getBrowserHeight() {
        var intH = 0;
        var intW = 0;
       

        if(typeof window.innerWidth  == 'number' ) {
           intH = window.innerHeight;
           intW = window.innerWidth;
        }
        else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            intH = document.documentElement.clientHeight;
            intW = document.documentElement.clientWidth;
        }
        else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
            intH = document.body.clientHeight;
            intW = document.body.clientWidth;
        }


        return { width: parseInt(intW), height: parseInt(intH) };
    }
    
    function dopasujObrazek(img) {
    	var bws = getBrowserHeight();
        img.style.position = "fixed";
        if(bws.width <= img.naturalWidth) {
        	img.style.width = "100%";
        	img.style.height = "auto";
        	img.style.left = "0px";
        	img.style.top = parseInt((bws.height - img.height) / 2) + "px";
        	if(bws.height <= img.height) {
            	var wspProporcji = parseFloat(bws.height / img.naturalHeight);
                img.style.left = parseFloat((bws.width - (img.naturalWidth * wspProporcji)) / 2) + "px";
                img.style.top = "0px";
            	img.style.height = bws.height + "px";
            	img.style.width = parseInt(img.naturalWidth * wspProporcji) + "px";
        	}
        } else if(bws.height <= img.naturalHeight){
        	var wspProporcji = parseFloat(bws.height / img.naturalHeight);
            img.style.left = parseFloat((bws.width - (img.naturalWidth * wspProporcji)) / 2) + "px";
            img.style.top = "0px";
        	img.style.height = bws.height + "px";
        	img.style.width = parseInt(img.naturalWidth * wspProporcji) + "px";
        } else {
            img.style.left = parseInt((bws.width - img.naturalWidth) / 2) + "px";
            img.style.top = parseInt((bws.height - img.naturalHeight) / 2) + "px";
        }    	
    }
    
    function setLayerPosition() {

        
        if(imgZoomImage != null) {
        	dopasujObrazek(imgZoomImage);
            var shadow = document.getElementById("shadow");
            var bws = getBrowserHeight();
            shadow.style.width = bws.width + "px";
            shadow.style.height = bws.height + "px";
        }

        shadow = null;
    }
    
    var przelacznikZoomImage = false;
    var imgZoomImage = null;
    
    function powiekszZdjecie(img) {
    	var pojemnikNaZdjecie = document.getElementById('imgZoomDiv');
    	var shadow = document.getElementById("shadow");
    	var bws = getBrowserHeight();
    	
    	if(!przelacznikZoomImage) {
        	pojemnikNaZdjecie.appendChild(img.cloneNode(true));
        	dopasujObrazek(pojemnikNaZdjecie.childNodes[0]);
    		imgZoomImage = pojemnikNaZdjecie.childNodes[0];
    		
            shadow.style.width = bws.width + "px";
            shadow.style.height = bws.height + "px";
            
            shadow.style.display = "block";
            
            dopasujObrazek(pojemnikNaZdjecie.childNodes[0]);
            przelacznikZoomImage = true;

    	} else {
    		shadow.style.display = "none";
    		imgZoomImage.remove();
    		przelacznikZoomImage = false;
    		imgZoomImage = null;
    	}
    	
    }
    
    function showLayer() {
        setLayerPosition();


        var shadow = document.getElementById("shadow");
        var question = document.getElementById("question");


        shadow.style.display = "block";
        question.style.display = "block";


        shadow = null;
        question = null;
    }
    
    function hideLayer() {
        var shadow = document.getElementById("shadow");
        var question = document.getElementById("question");


        shadow.style.display = "none";
        question.style.display = "none";


        shadow = null;
        question = null;
    }
    
    function onResizeWindow(){
    	setLayerPosition(); // Skalowanie przybliżonych obrazków
    	skalujMenuGlowne(); // Skalowanie menu głównego
    }
    
    var ukrytePrzyciskiMenuArray = new Array();
    
    function skalujMenuGlowne() {
    	var menuDivInsideMenuDiv = document.getElementById('menuDivInsideMenuDiv');
    	if(menuDivInsideMenuDiv != null) {
        	var menuButtonDiv = document.getElementsByClassName('menuButtonDiv');
        	var menuButton = document.getElementsByClassName('menuButton');
        	
        	var contentElement = document.getElementsByClassName('content')[0];
        	var iloscMozliwychDoWyswietleniaPrzyciskowMenu = parseInt((window.innerWidth - 50) /102);
        	var iloscAktualnieWyswietlanychPrzyciskowMenu = 0;
        	
        	for(var i = 0; i < menuDivInsideMenuDiv.children.length; i++) {
        		if((menuDivInsideMenuDiv.children[i].style.display == "" || menuDivInsideMenuDiv.children[i].style.display == "inline-block") && 
        				menuDivInsideMenuDiv.children[i].className == "menuButtonDiv") {
        			iloscAktualnieWyswietlanychPrzyciskowMenu++;
        		}
        	}
        	// Tutaj mnożenie razy 105 a nie 102 dlatebo, bo przy zoomie w oknie przeglądarki wymiary się nieco rozjeżdżają
        	menuDivInsideMenuDiv.style.width = iloscMozliwychDoWyswietleniaPrzyciskowMenu > menuButtonDiv.length ? (menuButtonDiv.length * 105) + 'px' : (iloscMozliwychDoWyswietleniaPrzyciskowMenu * 105) + 'px';
        	menuDivInsideMenuDiv.style.margin = '0 auto;'

        	// Wyświetlamy potrzebne przyciski
        	for(var i = 0; i < (iloscMozliwychDoWyswietleniaPrzyciskowMenu > (menuDivInsideMenuDiv.children.length - 1) ? (menuDivInsideMenuDiv.children.length - 1) : iloscMozliwychDoWyswietleniaPrzyciskowMenu - 1) ; i++) {
        		if(menuDivInsideMenuDiv.children[i].className == "menuButtonDiv") {
        			menuDivInsideMenuDiv.children[i].style.display = 'inline-block';
        			ukrytePrzyciskiMenuArray[i] = true;
        		}
        	}
        	
        	// Chowamy zbędne przyciski
        	for(var i = iloscMozliwychDoWyswietleniaPrzyciskowMenu - 1; i < menuDivInsideMenuDiv.children.length - 1; i++) {
        		menuButtonDiv[i].style.display = 'none';
        		ukrytePrzyciskiMenuArray[i] = false;
        		// document.getElementById('extendedMenuDiv').appendChild(menuButtonDiv[i].cloneNode(true));
        	}
        	
        	// Wyświetlamy lub chowamy przycisk dodatkowy "..."
        	var przyciskDodatkowyMenu = document.getElementsByClassName('extendedMenuButtonDiv')[0];
        	if((iloscMozliwychDoWyswietleniaPrzyciskowMenu - 1) < (menuDivInsideMenuDiv.children.length - 1)) {
        		przyciskDodatkowyMenu.style.display = 'inline-block';
        	} else {
        		przyciskDodatkowyMenu.style.display = 'none';
        	}
        	
        	// Usuniecie poprzednio skopiowanych elementow do kontenera o id = 'extendedMenuDiv'
        	var lvExtendedMenuDiv = document.getElementById('extendedMenuDiv');
        	while(lvExtendedMenuDiv.children.length > 1) {
        		lvExtendedMenuDiv.children[lvExtendedMenuDiv.children.length - 1].remove();
        	}
        	
        	ukrytePrzyciskiMenuArray.forEach(function(element,pos){
        		if(!element){
        			document.getElementById('extendedMenuDiv').appendChild(menuButtonDiv[pos].cloneNode(true));
        		}
        		});
         		
    	}   	
    }
    
    function pokazNiewidocznePrzyciski() {
    	var kontener = document.getElementById('extendedMenuDiv');
    	var wysokosc = (kontener.children.length) * 40;
    	kontener.style.height = wysokosc + 'px';
    	for(var i = 1; i < kontener.children.length; i++) {
    		kontener.children[i].style.display = 'inline-block';
    		kontener.children[i].style.width = '98px';
    	}
    	kontener.onmouseleave = ukryjNiewidocznePrzyciski;
    	kontener.zIndex = 1001;
    }
    
	function ukryjNiewidocznePrzyciski() {
		var kontener = document.getElementById('extendedMenuDiv');
		kontener.style.height = '40px';
    	for(var i = 1; i < kontener.children.length; i++) {
    		kontener.children[i].style.display = 'none';
    	}
	}
