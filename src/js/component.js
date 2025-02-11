!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";var g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},n="undefined"!=typeof document&&document.documentMode,l={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=document.createElement("img");n&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),t.appendChild(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var r=t.children,o=void 0,a=0;a<=r.length-1;a++)(o=r[a].getAttribute("data-src"))&&(r[a].src=o);t.load()}t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset")),t.getAttribute("data-background-image")&&(t.style.backgroundImage="url('"+t.getAttribute("data-background-image")+"')"),t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};
// Detect IE browser
function f(t){t.setAttribute("data-loaded",!0)}var b=function(t){return"true"===t.getAttribute("data-loaded")};return function(){var r,o,a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=g({},l,t),n=e.root,i=e.rootMargin,d=e.threshold,c=e.load,u=e.loaded,s=void 0;return window.IntersectionObserver&&(s=new IntersectionObserver((r=c,o=u,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),b(t.target)||(r(t.target),f(t.target),o(t.target)))})}),{root:n,rootMargin:i,threshold:d})),{observe:function(){for(var t=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)}(a,n),e=0;e<t.length;e++)b(t[e])||(s?s.observe(t[e]):(c(t[e]),f(t[e]),u(t[e])))},triggerLoad:function(t){b(t)||(c(t),f(t),u(t))},observer:s}}});

var observer = lozad();
observer.observe();


$( document ).ready(function() {
  function isMobile() {
    // Перевірка ширини екрана
    var windowWidth = $(window).width();
  
    // Інші можливі умови для визначення мобільного телефона
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    var isSmallScreen = windowWidth < 768; // Наприклад, визначити маленький екран як ширину менше 768 пікселів
  
    // Повернути true, якщо виконується хоча б одна умова
    return isTouchDevice || isSmallScreen;
  }

  function toggleBlockMore() {
    $('.block-more').each(function(){
      const blockMore = $(this);
      const li = blockMore.find('li'); 
      let showItem = 8;
  
      if(isMobile()) {
        showItem = 4;
      }

      if (li.length > showItem) {
        li.each(function(index){
          if(index > (showItem - 1)) {
            $(this).addClass('d-none')
          }
        })
      }
    })
  }

  $('.show-more').click(function(e){
    e.preventDefault()
    if($(this).hasClass('active')) {
      $(this).removeClass('active')
      toggleBlockMore();
    }else{
      $(this).parents('section').find('.d-none').removeClass('d-none');
      $(this).addClass('active')
    }
  })

  toggleBlockMore();

  $('.scroll').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 50
    }, 500);

  });
  
  $(window).scroll(function () {
    return $('.nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  $('.mobile-btn').click(function(){
    $(this).toggleClass('active');
    $('#menu').toggleClass('show');
  })


  /* form valid*/
  let alertImage = '<svg class="absolute right-6 bottom-5 w-5 h-5 text-rose-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="currentColor"/></svg>';
  let error;
  $('.submit').click(function (e) {
    e.preventDefault();
    let ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      let thisFiled = $(this);

      if ($(this).val().trim() === '') {
          thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
          return false;
      } else {
        if (thisFiled.attr("type") === 'email') {
          let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!pattern.test(thisFiled.val())) {
            $("input[name=email]").val('');
            thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }else{
            error = 0;
            thisFiled.removeClass('error').parent('.label').find('.allert').remove();
          }
        } else if (thisFiled.attr("type") === 'tel') {
          let patterntel = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          if (!patterntel.test(thisFiled.val())) {
            $("input[name=phone]").val('');
            thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }else{
            error = 0;
            thisFiled.removeClass('error').parent('.label').find('.allert').remove();
          }

        }  else {
          error = 0;
          thisFiled.removeClass('error').parent('.label').find('.allert').remove();
        }
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);


    setTimeout(function () {
      alert('Success');
      
      $form.find('.submit').removeClass('inactive');
      $form.find('.submit').prop('disabled', false);
      $form[0].reset();

      $('#check-success').prop('disabled', true)
      
    }, 1000);

  });


  $('input[name="phone"]').inputmask("+9{1,15}");
  
  $('.check').change(function(){
    if($(this).is(':checked')) {
      $(this).parents('form').find('.check-success').removeAttr('disabled')
    }else{
      $(this).parents('form').find('.check-success').attr('disabled', 'disabled')
    }
  })

  $('.check').each(function(){
    if($(this).is(':checked')) {
      $(this).parents('form').find('.check-success').removeAttr('disabled')
    }else{
      $(this).parents('form').find('.check-success').attr('disabled', 'disabled')
    }
  })


  function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setCookie(name, value, hours) {
    let date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; path=/; expires=" + date.toUTCString();
}

function startCountdown() {
    let endTime = getCookie("countdownEnd");
    if (!endTime) {
        endTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 години
        setCookie("countdownEnd", endTime, 3);
    }

    function updateTimer() {
        let now = new Date().getTime();
        let distance = endTime - now;
        if (distance <= 0) {
            endTime = new Date().getTime() + 3 * 60 * 60 * 1000;
            setCookie("countdownEnd", endTime, 3);
            distance = endTime - now;
        }

        let hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((distance / (1000 * 60)) % 60);
        let seconds = Math.floor((distance / 1000) % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#timer").html(`
          <div class="hours">${hours} <span>час</span></div> 
          <div>:</div>
          <div class="number">${minutes} <span>мин</span></div>
          <div>:</div>
          <div class="number">${seconds} <span>сек</span></div>
        `);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

startCountdown();

}) 


