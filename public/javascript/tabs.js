$(document).ready(function() {
  if (window.location.href.indexOf("weather") > -1) {
    switchToWeather()
  }
  else{
    switchToHome()
  }
});


function switchToHome() {
  removeActive();
  $("#hometab").addClass("is-active");
}

function switchToWeather() {
  removeActive();
  $("#weathertab").addClass("is-active");
}

function removeActive() {
  $("li").each(function() {
    $(this).removeClass("is-active");
  });
}
