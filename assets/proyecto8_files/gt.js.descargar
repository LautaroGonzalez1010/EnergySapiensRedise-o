var isMobile = window.matchMedia("only screen and (max-width: 39.9375em)").matches;
  if (isMobile) {
  } else {
    // Scroll top only desktop and tablet
    $("#go-top").hide();
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('#go-top').fadeIn();
        } else {
          $('#go-top').fadeOut();
        }
      });

      $('#go-top').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    });
  }