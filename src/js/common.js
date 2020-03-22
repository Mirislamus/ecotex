$(document).ready(function(){
  var hamburger = $('.hamburger');
  var navbarList = $('.nav-menu');
  var overlay = $('.overlay-js');
  var body = $('body');
  var phones = $('.phones-column');
  var phonesMove = $('.phones-move');
  var address = $('.page-address');
  var addressMove = $('.address-move');


  var openMenu = function() {
    if($('.hamburger img').attr('src') == './img/hamburger.svg') {
      $('.hamburger img').attr('src', './img/close.svg')
    } else {
      $('.hamburger img').attr('src', './img/hamburger.svg');
    }
    
    navbarList.toggleClass('active');
    overlay.toggleClass('active');
    body.toggleClass('overflow');
  }

  var closeMenu = function() {
    $('.hamburger img').attr('src', './img/hamburger.svg');
    navbarList.removeClass('active');
    overlay.removeClass('active');
    body.removeClass('overflow');
  }

  var resizePage = function () {
    if($(window).width() >= 768 && $(window).width() < 991) {
      phonesMove.append(phones);
      addressMove.append(address);
    } 
  }

  hamburger.on('click', openMenu);
  
  $(".jsSelectMenu").on('click', closeMenu);

  $(window).resize(resizePage);

  if($(window).width() >= 768 && $(window).width() < 991) {
    phonesMove.append(phones);
    addressMove.append(address);
  }

    
  var modal = $('.modal');
  var modalButtonOpen = $('.jsModal');
  var modalButtonClose = $('.jsModalClose');

  var openModal = function(e) {
    e.preventDefault();
    modal.addClass('active');
    body.addClass('overflow');
  }
  var closeModal = function(event) {
    event.stopPropagation();
    modal.removeClass('active');
    body.removeClass('overflow');
  }

  $(".jsAutoClose").on("click", function () {
    setTimeout(function() {
      $('.modal').removeClass('active');
      $('body').removeClass('overflow');
    }, 3000);
  });

  modalButtonOpen.on('click', openModal);
  modalButtonClose.on('click', closeModal);
  // modal.on('click', closeModal);

  var inputValue = $('.form__input')
  
  inputValue.on('change', function() {
    $(this).addClass('addfile');
  });

    
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 75
          }, 1000, function() {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex','-1');
              $target.focus(); 
            };
          });
        }
      }
    });
    
    $(window).scroll(function() {
      var height = $(window).scrollTop();
        if(height > 25){
          $('.fixed-nav').addClass('fixed');
        } else{
          $('.fixed-nav').removeClass('fixed');
        }
    });





    $.fn.serializeObject = function()
    {
       var o = {};
       var a = this.serializeArray();
       $.each(a, function() {
           if (o[this.name]) {
               if (!o[this.name].push) {
                   o[this.name] = [o[this.name]];
               }
               o[this.name].push(this.value || '');
           } else {
               o[this.name] = this.value || '';
           }
       });
       return o;
    };

    $('#jsForm').submit(function(e) {
      e.preventDefault();
      // let data = $(this).serializeArray();
      let data = $(this).serializeObject();
      let $form = $(this);

      console.log(data);

      $.ajax({
        url: "/php/send.php",
        type: "POST",
        data: data,
        error:function() {
          $('.jsResultSuccess').hide();   
          $('.jsResultError').fadeIn();   
        }, 
        beforeSend: function() {                     
          console.log('Отправка')              
        },                 
        success: function() {

          $form.trigger("reset");
          chosenWaste = []
          renderChosen(chosenWaste);
          $('.jsResultError').hide(); 
          $('.jsResultSuccess').fadeIn();                                          
        }
      });
    });

    $('#jsFeedback').submit(function(e) {
      e.preventDefault();
      let data = $(this).serializeObject();
      let $form = $(this);

      $.ajax({
        url: "/php/feedback.php",
        type: "POST",
        data: data,
        error:function() {
          $('.jsFeedbackState').removeClass('success');
          $('.jsFeedbackState').addClass('error');

          setTimeout(function() {
            $('.jsFeedbackState').removelass('error');
          }, 4000);
        },             
        success: function() {
          $form.trigger("reset");
          $('.jsFeedbackState').addClass('success');
          $('.jsFeedbackState').removeClass('error');  
          $form.trigger("reset"); 
          
          setTimeout(function() {
            $('.jsFeedbackState').removeClass('success');
          }, 4000);
        }
      });
    });
  });



  $(".jsSoon").on("click", function(e) {
    e.preventDefault();
    alert('Скоро');
  });
