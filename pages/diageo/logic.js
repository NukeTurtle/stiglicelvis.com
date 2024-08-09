const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {

    document.getElementById('comingsoon-mobile-version').style.display = 'none';
    document.getElementById('mobile-version').style.display = 'block';
    document.getElementById('comingsoon-desktop-version').style.display = 'none';

    screen.orientation.addEventListener("change", function(e) {
        if (window.orientation !== 0) {
            document.getElementById('comingsoon-mobile-version').style.display = 'none';
            document.getElementById('mobile-portrait-version').style.display = 'none';
            document.getElementById('mobile-landscape-version').style.display = 'block';
            document.getElementById('notice-page').style.display = 'none';
          }
          else {
            document.getElementById('comingsoon-mobile-version').style.display = 'none';
            document.getElementById('mobile-portrait-version').style.display = 'block'
            document.getElementById('mobile-landscape-version').style.display = 'none';
          }
    });
}
else{
    document.getElementById('comingsoon-mobile-version').style.display = 'none';
    document.getElementById('mobile-version').style.display = 'none';
    document.getElementById('desktop-version').style.display = 'block';
}

const launchExperience = () => {
   alert('Launch experience ...')
}

var currentPage = 'main';

const showMainPage = () => {

    sharp();

    if (currentPage === 'tutorial' || currentPage === 'streaming' || currentPage === 'saving') {
        $(document.getElementById('tutorial-page')).fadeOut('fast', function() {})
        $(document.getElementById('streaming-page')).fadeOut('fast', function() {})
        $(document.getElementById('save-page')).fadeOut('fast', function() {})
        $(document.querySelectorAll('#mobile-portrait-version > .hills')).addClass("slide-up")
        $(document.getElementById('main-page')).fadeIn('slow', function() {})
    }
    else if (currentPage === 'cookies') {
        $(document.getElementById('main-page')).fadeIn('slow', function() {})
        $(document.getElementById('cookies-page')).fadeOut('slow', function() {})
    }

    currentPage = 'main';
}

const showStream = () => {

    blur();

    $(document.getElementById('streaming-page')).animate({height: "toggle"},0, function() {})
    $(document.getElementById('main-page')).fadeOut('fast', function() {})
    $(document.querySelectorAll('.hills')).fadeOut('fast', function() {})
    
    currentPage = 'streaming';
}

function myTest() {
    blur();
}
const showSave = () => {

    blur();

    $(document.getElementById('save-page')).animate({height: "toggle"},0, function() {})
    $(document.getElementById('main-page')).fadeOut('fast', function() {})
    $(document.querySelectorAll('.hills')).fadeOut('fast', function() {})
    
    currentPage = 'saving';
}

const showTutorial = () => {

    blur();

    $(document.getElementById('tutorial-page')).animate({height: "toggle"},0, function() {})
    $(document.getElementById('main-page')).fadeOut('fast', function() {})
    $(document.querySelectorAll('#mobile-portrait-version > .hills')).fadeOut('fast', function() {})
    $(document.querySelectorAll('#mobile-portrait-version > .hills')).removeClass("slide-up")    // $(document.querySelectorAll('.main-page > .hills')).animate({opacity: "toggle", transform: "toggle"},200, function() {})
    
    currentPage = 'tutorial';
}

const showCookies = () => {

    blur();

    if (currentPage === 'main') {
        $(document.getElementById('cookies-page')).fadeIn('slow', function() {})
        $(document.getElementById('main-page')).fadeOut('slow', function() {})
    }
    else if (currentPage === 'tutorial') {
        $(document.getElementById('cookies-page')).fadeIn('slow', function() {})
        $(document.getElementById('tutorial-page')).fadeOut('slow', function() {})
    }

    currentPage = 'cookies';
}

const share = () => {

    if (typeof navigator.share ==='undefined' || !navigator.share) {
        alert('Your browser does not support Android Native Share, please use the share option of your browser');      
    } 
    else if (window.location.protocol !== 'https:') {
        alert('Android Native Share supported only on Https:// protocol');
    } 
    else {

        this.url = 'https://www.example.com/';
        this.title = 'Diageo Camp Coctails (Title)';       
        this.description = 'Diageo Camp Coctails (Description)';

        try {
            navigator.share( {url: this.url, title: this.title, text: this.description} );
        }        
        catch (error) {
            alert('Error sharing: ' + error);
            return;
        }
    }
}

const canblur = document.getElementsByClassName('canblur');

const blur = () => {

    for (var i = 0; i < canblur.length; ++i) {
        let item = canblur[i];  
        item.classList.add('blur');
        item.classList.remove('sharp');
    }
}

const sharp = () => {

    for (var i = 0; i < canblur.length; ++i) {
        let item = canblur[i];  
        item.classList.add('sharp');
        item.classList.remove('blur');
    }
}