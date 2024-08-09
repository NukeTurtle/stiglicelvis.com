/*-----GLOBALS-----*/
//DOM
let cookieHolder = document.getElementById('cookieHolder');
let prBlock = document.querySelector('.option-container');
let closeButton = document.querySelector('.close');
let cookieBlock = document.getElementById('cookies');
let btnAccept = document.querySelector('.btn-hide');
let btnDectivate = document.querySelector('.btn-deactivate');
let btnManage = document.querySelector('.btn-manage');
let btnInlineManage = document.getElementById('inlineManage');
let toggleAnalytics = document.getElementById('toggle-analytics');
let clickStopper = document.getElementById('stop-click');
let cookieButton = document.getElementById('cookie-link');
let tracking = true;


const togglePrivacy = (e) => {

    clickStopper.style.display = 'none';
    cookieBlock.classList.add('hidden');

    if(e.target.id !== 'toggle-analytics') {
        if(!prBlock.classList.contains('hide')) {
            prBlock.classList.add('hide');
            console.log("closing");
            if(!toggleAnalytics.classList.contains('active')) {
                setCookie('cookieStatus','true',7);
                activateTracking();
                console.log('cookies active');
            } else {
                setCookie('cookieStatus','false',7);
                deniedTracking();
                console.log('cookies inactive');
            }
        } else {
            prBlock.classList.remove('hide');
            registerButtonClick('manage-cookies');
        }
    }
}
const activateTracking = () => {
    tracking = true;
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'granted',
    });
}
const deniedTracking = () => {
    tracking = false;
    registerButtonClick('denied-tracking');
    gtag('consent', 'update', {
       'ad_storage': 'denied',
        'analytics_storage': 'denied',
    });
}
const toggleManage = (e) => {
    clickStopper.style.display = 'none';
    if(toggleAnalytics.classList.contains('active')) {
        toggleAnalytics.classList.remove('active');
        setCookie('cookieStatus','true',7);
        activateTracking();
        console.log('cookies active');
    } else {
        toggleAnalytics.classList.add('active');
        setCookie('cookieStatus','false',7);
        deniedTracking();
        console.log('cookies inactive');
    }
}

const closeBlock = (e) => {
    e.target.parentNode.style.display = 'none';
}

function setCookie(name,value,days) {
    console.log("cookie = "+value);
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=None; Secure";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function cookieInit(){
    detectARFeatures.GetIsDeviceARCompatiblePromise(detectARFeatures);
    if(!!detectARFeatures.isDesktop() && !detectARFeatures.isiOS()) {
        console.log('serving desktop');
    } else {
        document.getElementById('cookieHolder').className = 'mobile';
        //if(!! detectARFeatures.isARComp) {
            console.log('serving mobile compatible');
            closeButton.addEventListener('click', togglePrivacy);
        //} else {
           // document.getElementById('no-compat').style.display = 'block';
        //}
    }

    btnAccept.addEventListener('click', function(){
        clickStopper.style.display = 'none';
        cookieBlock.classList.add('hidden');
        setCookie('cookieStatus','true',7);
        activateTracking();  
    });
    
    if (btnDectivate != null){
        btnDectivate.addEventListener('click', function(){
            clickStopper.style.display = 'none';
            cookieBlock.classList.add('hidden');
            setCookie('cookieStatus','false',7);
            deniedTracking();
            console.log('cookies inactive');
        });
    }
    
    if (btnManage != null){
        btnManage.addEventListener('click', togglePrivacy);
    }

    if (btnInlineManage != null){
        btnInlineManage.addEventListener('click', togglePrivacy);
    }

    toggleAnalytics.addEventListener('click', toggleManage);
    cookieButton.addEventListener('click', togglePrivacy);
    let currentCookie = getCookie('cookieStatus');

    if (currentCookie == "true") {
        console.log ("cookies true");
        activateTracking();        
    } else if (currentCookie == "false"){
        console.log ("cookies false");
        deniedTracking();
    } else {
        console.log ("cookies not been set");
        if (!detectARFeatures.isDesktop()){
            clickStopper.style.display = 'block';
            cookieBlock.classList.remove('hidden');
        }
    }
    eraseCookie("cookieStatus");
}

window.addEventListener('load', cookieInit);