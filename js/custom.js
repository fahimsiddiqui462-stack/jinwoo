/* ===================================================================
   JINWOO — Interactions & Motion
=================================================================== */

$(document).ready(function () {

  /* ---------------- Mobile Sidebar Navigation ---------------- */
  var $sidebar = $('#nav-sidebar');
  var $overlay = $('#overlay');
  var $hamburger = $('#mobile-icon');
  var $closeBtn = $('#mobile-sidebar-icon');

  function openNav() {
    $sidebar.addClass('open');
    $overlay.addClass('show');
    $hamburger.addClass('active');
    $('body').addClass('nav-open');
  }

  function closeNav() {
    $sidebar.removeClass('open');
    $overlay.removeClass('show');
    $hamburger.removeClass('active');
    $('body').removeClass('nav-open');
  }

  $hamburger.on('click', function () {
    if ($sidebar.hasClass('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  $closeBtn.on('click', closeNav);
  $overlay.on('click', closeNav);

  $sidebar.on('click', 'a', closeNav);

  /* ---------------- Active page navigation ---------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.head-2 a, .nav-sidebar a').each(function () {
    if ($(this).attr('href') === currentPage) {
      $(this).addClass('is-active');
    }
  });

  /* ---------------- Scroll Reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');

  function revealAll() {
    revealEls.forEach(function (el) {
      el.classList.add('active');
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealAll();
  }

  /* ---------------- Number Counters ---------------- */
  $('.counter').each(function () {
    var $el = $(this);
    var end = parseInt($el.attr('data-count'), 10) || 0;

    function run() {
      var startTime = null;
      var duration = 1800;

      function step(ts) {
        if (!startTime) {
          startTime = ts;
        }
        var progress = Math.min((ts - startTime) / duration, 1);
        $el.text(Math.floor(progress * end).toLocaleString());
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      obs.observe($el[0]);
    } else {
      run();
    }
  });

  /* ---------------- Contact Form ---------------- */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var name = $('#cf-name').val().trim();
    var email = $('#cf-email').val().trim();
    var subject = $('#cf-subject').val().trim();
    var message = $('#cf-message').val().trim();

    if (!name || !email || !message) {
      alert('Please fill in all the required fields.');
      return;
    }

    $('#form-success').addClass('show').text('Thanks, ' + name + '! Your message has been sent. We will get back to you soon.');
    this.reset();
  });

});
