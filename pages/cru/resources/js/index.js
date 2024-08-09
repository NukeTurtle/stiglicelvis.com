const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let currentPage = 'main-page';
let previousPage = 'main-page';

if (isMobile) {
  document.getElementById("desktop-version").style.display = 'none';
  document.getElementById("mobile-version").style.display = 'block';
  document.getElementById("tutorial-page").style.display = 'none';
  document.getElementById("cookies-page").style.display = 'none';
  currentPage = 'main-page';
  console.log(currentPage);
} else {
  document.getElementById("mobile-version").style.display = 'none';
  document.getElementById("desktop-version").style.display = 'block';
  currentPage = 'desktop-version';
  console.log(currentPage);
}
function launchExperience() {
  registerButtonClick("btn_launch");
  window.open("./experience/index.html?utm_content="+utm, "_self");
  
}

const cookies = document.querySelector('#cookies-page');
const modalCloseButton = document.querySelector('#main-page .modal .close-button');
function showDesktopMainPage() {
  $("#desktop-version").fadeIn(.2, function () { })
  $(`#${currentPage}`).fadeOut(.2, function () { });
  currentPage = 'desktop-version';
  console.log(currentPage)
}
function hidePage(pageId, animationEndSelectors) {
  return new Promise(resolve => {
    const $page = $(`#${pageId}`);
    const $animatedElements = $(animationEndSelectors.join(', '), $page);

    $animatedElements.on('animationend', function() {
      $(this).off('animationend');  // Remove the event handler
      if (!$animatedElements.is(':animated')) {  // If no more animations
        $page.hide();  // Hide the page
        resolve();
      }
    });
  });
}
function showMainPage() {
  $("#rectangle1").addClass('slide-down-out');
  $("#rectangle2").addClass('slide-up-out');

  $(`#${currentPage}`).animate({ opacity: 0 }, 400, function() {
      $(this).css('display', 'none');
      $("#main-page").css('display', 'block');
      $("#main-page").animate({ opacity: 1 }, 400);
      currentPage = 'main-page';
      console.log(currentPage);
  });
}
function showTutorialPage() {
  registerButtonClick("btn_tutorial");
  $("#rectangle1").removeClass('slide-down-out');
  $("#rectangle2").removeClass('slide-up-out');
  $("#rectangle1").addClass('slide-down');
  $("#rectangle2").addClass('slide-up');

  $(`#${currentPage}`).animate({ opacity: 0 }, 400, function() {
      $(this).css('display', 'none');
      $("#tutorial-page").css('display', 'block');
      $("#tutorial-page").animate({ opacity: 1 }, 400);
      currentPage = 'tutorial-page';
      console.log(currentPage);
  });
}
function showTermsPage() {
  $("#rectangle1").removeClass('slide-down-out');
  $("#rectangle2").removeClass('slide-up-out');
  $("#rectangle1").addClass('slide-down');
  $("#rectangle2").addClass('slide-up');

  $(`#${currentPage}`).animate({ opacity: 0 }, 400, function() {
      $(this).css('display', 'none');
      $("#cookies-page").css('display', 'block');
      $("#cookies-page").animate({ opacity: 1 }, 400);
      currentPage = 'cookies-page';
      console.log(currentPage);
  });
}
function showShare() {

  registerButtonClick("btn_nativeShare");
  
  let meta_title, meta_desc, meta_url;

  meta_title = "Bombay Sapphire Premier CRU";
  meta_desc = "Check out Bombay Sapphire Premier CRU Experience here";
  meta_url = "https://test.com/";

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