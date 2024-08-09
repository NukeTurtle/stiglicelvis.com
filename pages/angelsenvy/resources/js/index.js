const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  document.getElementById("desktop-version").style.display = 'none';
  document.getElementById("mobile-version-toast").style.display = 'none';
  document.getElementById("mobile-version-tutorial").style.display = 'none';
  document.getElementById("mobile-version").style.display = 'block';

} else {
  document.getElementById("mobile-version").style.display = 'none';
  document.getElementById("mobile-version-toast").style.display = 'none';
  document.getElementById("mobile-version-tutorial").style.display = 'none';
  document.getElementById("desktop-version").style.display = 'block';
}

function launchExperience() {
  registerButtonClick("btn_launch");
  window.open("./experience/index.html?utm_campaign="+utm, "_self");
}

let currentPage = 'mobile-version';

console.log("Mobile version");
const modal = document.querySelector('#mobile-version .modal');
const termsModal = document.querySelector('#mobile-version .termsModal');
const cookies = document.querySelector('#mobile-version #cookies');
const modalCloseButton = document.querySelector('#mobile-version .modal .close-button');

function showDesktopMainPage (){
  registerButtonClick("btn_home");
  $("#desktop-version").fadeIn(.2, function() {})
  var url = "index.html?utm_campaign="+utm;
  window.open(url, "_self");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  currentPage = 'desktop-version';
  console.log(currentPage)
}
function showDesktopLeaderboardPage (){
  registerButtonClick("btn_leaderboard");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  var url = "leaderboard.html?utm_campaign="+utm;
  window.open(url, "_self");
  currentPage = 'desktop-version-leaderboard';
  console.log(currentPage)
}
function showDesktopMapPage (){
  registerButtonClick("btn_map");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  var url = "map.html?utm_campaign="+utm;
  window.open(url, "_self");
  currentPage = 'desktop-version-map';
  console.log(currentPage)
}

function showMainPage (){
  registerButtonClick("btn_home");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  var url = "index.html?utm_campaign="+utm;
  window.open(url, "_self");
  $("#mobile-version").fadeIn(.2, function() {})
  currentPage = 'mobile-version';
  console.log(currentPage)
}

function showToastPage() {
  registerButtonClick("btn_whatis");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  $("#mobile-version-toast").fadeIn(.5, function() {})
  currentPage = 'mobile-version-toast';
  console.log(currentPage)
}

function showTutorialPage () {
  registerButtonClick("btn_tutorial");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  $("#mobile-version-tutorial").fadeIn(.5, function() {})
  currentPage = 'mobile-version-tutorial';
  console.log(currentPage)
}
function showLeaderboardPage () {
  registerButtonClick("btn_leaderboard");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  var url = "leaderboard.html?utm_campaign="+utm;
  window.open(url, "_self");
  currentPage = 'mobile-version-leaderboard';
  console.log(currentPage)

}
function showMapPage () {
  registerButtonClick("btn_map");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  var url = "map.html?utm_campaign="+utm;
  window.open(url, "_self");
  currentPage = 'mobile-version-map';
  console.log(currentPage)
}

function showTermsPage() {
  registerButtonClick("btn_terms");
  $(`#${currentPage}`).fadeOut(.2, function() {});
  $("#mobile-version-terms").fadeIn(.5, function() {})
  currentPage = 'mobile-version-terms';
  console.log(currentPage)
}

function showShare(){
    registerButtonClick("btn_nativeShare");

    var meta_title, meta_desc, meta_url;

    meta_title = "Angels Envy Toast The Trees";
    meta_desc = "Check out Angels Envy Toast The Trees Experience here";
    meta_url = "https://toastthetreesar.angelsenvy.com/";


    console.log("title: " + meta_title);
    console.log("description: " + meta_desc);
    console.log("url: " + meta_url);


    // We check if the browser supports Native Share
    if (typeof navigator.share === 'undefined' || !navigator.share) {
        alert('Your browser does not support Native Share, please use the share option of your browser');
    }
    else if (window.location.protocol !== 'https:') {
        alert('Native Share supported only on Https:// protocol');
    }
    else {
        // Open the Share feed with the new values and a link
        try {
            navigator.share({ title: meta_title, text: meta_desc, url: meta_url });
        }
        catch (error) {
            console.log('Error sharing: ' + error);
            return;
        }
    }
}

function tAndCs() {
  termsModal.classList.add('fade-in');
}

function closeModal() {
  modal.classList.remove('fade-in');
  termsModal.classList.remove('fade-in');
}

function goBack() {
  window.history.back();
}