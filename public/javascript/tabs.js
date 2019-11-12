$(document).ready(function() {
  if (window.location.href.indexOf("/weather") > -1) {
    switchToWeather()
  } else if (window.location.href.indexOf("/profile") > -1)  {
    switchToProfile()
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

function switchToProfile() {
  removeActive();
  $("#profiletab").addClass("is-active");
}

function removeActive() {
  $("li").each(function() {
    $(this).removeClass("is-active");
  });
}
