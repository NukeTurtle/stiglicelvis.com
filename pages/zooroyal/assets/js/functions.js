let modal = document.querySelector("#myModal");
let btn = document.querySelector("#modal");
let closeButton = document.querySelector(".close");
let shareButton = document.querySelector(".share");
let center = document.querySelector(".center");

// Open modal window
btn.onclick = function() {
  modal.style.display = "flex";
  closeButton.style.display = "block";
  center.style.display = "none";
}

// When the user clicks on .share button
shareButton.onclick = function() {
  console.log("Share button clicked!");
  // window.open("https://www.google.com"); //replace URL as needed
}

// When the user clicks on .close button
function closeWindow() {
  center.style.display = "flex";
  modal.style.display = "none";
  closeButton.style.display = "none";
}