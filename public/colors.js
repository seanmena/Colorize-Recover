$(document).ready(() => {
  $("#notif").hide();
});
  
  
$(".navbar-burger").click(() => {
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
});
  
$("#notifx").click(()=> {
  $("#notif").hide();
});
  
  
$("#upload-btn").click(() => {
  $("#mainbody").hide();
});



const colorData = $.ajax({
  url: "api/colors"
})
  .done(()=> {
    colorQuery = colorData.responseJSON;
    color1 = $("#colorbox1").css("background-color", colorQuery[0]);
    color2 = $("#colorbox2").css("background-color", colorQuery[1]);
    color3 = $("#colorbox3").css("background-color", colorQuery[2]);
    color4 = $("#colorbox4").css("background-color", colorQuery[3]);
    color5 = $("#colorbox5").css("background-color", colorQuery[4]);

    $("#hexvalue1").text(colorQuery[0]);
    $("#hexvalue2").text(colorQuery[1]);
    $("#hexvalue3").text(colorQuery[2]);
    $("#hexvalue4").text(colorQuery[3]);
    $("#hexvalue5").text(colorQuery[4]);

  });



