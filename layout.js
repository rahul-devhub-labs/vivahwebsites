$(function () {
  $.when(
    $("#header").load("header.html", function () {
      const $headerContent = $("#header").children();
      $("#header").replaceWith($headerContent);
    }),
    $("#footer").load("footer.html")
  ).done(function () {
    $("#loader").hide();
  });
});
