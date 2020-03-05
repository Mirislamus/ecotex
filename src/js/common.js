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
  overlay.on('click', closeMenu);
  $(window).resize(resizePage);

  if($(window).width() >= 768 && $(window).width() < 991) {
    phonesMove.append(phones);
    addressMove.append(address);
  }

    
  var modal = $('.modal');
  var modalButtonOpen = $('.btn-open');
  var modalButtonClose = $('.modal__close');

  var openModal = function(e) {
    e.preventDefault();
    modal.addClass('active');
    body.addClass('overflow');
  }
  var closeModal = function(event) {
    event.stopPropagation();
    var target = $(event.target);
    if(target.is(modal) && !target.is('.modal__body')) {
      modal.removeClass('active');
      body.removeClass('overflow');
    } else if(target.is(modalButtonClose)) {
      modal.removeClass('active');
      body.removeClass('overflow');
    }
  }
  modalButtonOpen.on('click', openModal);
  modalButtonClose.on('click', closeModal);
  modal.on('click', closeModal);

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
            scrollTop: target.offset().top
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

    let waste = [
      {"name": "навоз крупного рогатого скота свежий", "code": "1 12 110 01 33 4"},
      {"name": "навоз конский свежий", "code": "1 12 210 01 33 4"},
      {"name": "навоз мелкого рогатого скота свежий", "code": "1 12 410 01 29 4"},
      {"name": "навоз свиней свежий", "code": "1 12 510 01 33 3"},
      {"name": "навоз свиней перепревший", "code": "1 12 510 02 29 4"},
      {"name": "помет куриный свежий", "code": "1 12 711 01 33 3"},
      {"name": "помет куриный перепревший", "code": "1 12 711 02 29 4"},
      {"name": "помет утиный, гусиный свежий", "code": "1 12 712 01 33 3"},
      {"name": "помет утиный, гусиный перепревший", "code": "1 12 712 02 29 4"},
      {"name": "помет прочих птиц свежий", "code": "1 12 713 01 33 3"},
      {"name": "помет прочих птиц перепревший", "code": "1 12 713 02 29 4"},
      {"name": "растворы буровые при бурении нефтяных скважин отработанные малоопасные", "code": "2 91 110 01 39 4"},
      {"name": "шламы буровые при бурении, связанном с добычей сырой нефти, малоопасные", "code": "2 91 120 01 39 4"},
      {"name": "асфальтосмолопарафиновые отложения при зачистке нефтепромыслового оборудования", "code": "2 91 220 01 29 3"},
      {"name": "песок при очистке нефтяных скважин, содержащий нефтепродукты (содержание нефтепродуктов менее 15%)", "code": "2 91 220 11 39 4"},
      {"name": "масла растительные отработанные при жарке овощей", "code": "301 132 1231 3"},
      {"name": "отходы зачистки оборудования производства растительных масел", "code": "3 01 141 82 39 4"},
      {"name": "отходы из жироотделителей, содержащие растительные жировые продукты", "code": "3 01 148 01 39 4"},
      {"name": "смазочно-охлаждающие масла отработанные при металлообработке", "code": "3 61 211 01 31 3"},
      {"name": "стружка стальная, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "3 61 215 02 22 4"},
      {"name": "эмульсии и эмульсионные смеси для шлифовки металлов отработанные, содержащие масла или нефтепродукты в количестве 15 % и более", "code": "3 61 222 01 31 3"},
      {"name": "эмульсии и эмульсионные смеси для шлифовки металлов отработанные, содержащие масла или нефтепродукты в количестве менее 15 %", "code": "3 61 222 02 31 4"},
      {"name": "шлам шлифовальный маслосодержащий", "code": "3 61 222 03 39 3"},
      {"name": "шлам шлифовальный при использовании водосмешиваемых смазочно-охлаждающих жидкостей", "code": "3 61 222 04 39 4"},
      {"name": "шлам гидрофильтров окрасочных камер с водяной завесой", "code": "3 63 512 21 39 3"},
      {"name": "спецодежда из хлопчатобумажного и смешанных волокон, утратившая потребительские свойства, незагрязненная", "code": "4 02 110 01 62 4"},
      {"name": "спецодежда из синтетических и искусственных волокон, утратившая потребительские свойства, незагрязненная", "code": "4 02 140 01 62 4"},
      {"name": "спецодежда из натуральных, синтетических, искусственных и шерстяных волокон, загрязненная нефтепродуктами (содержание нефтепродуктов 15 % и более)", "code": "4 02 311 01 62 3"},
      {"name": "спецодежда из натуральных, синтетических, искусственных и шерстяных волокон, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 02 312 01 62 4"},
      {"name": "обувь кожаная рабочая, утратившая потребительские свойства", "code": "4 03 101 00 52 4"},
      {"name": "отходы бумаги с клеевым слоем", "code": "4 05 290 02 29 4"},
      {"name": "отходы бумаги и картона, содержащие отходы фотобумаги", "code": "4 05 810 01 29 4"},
      {"name": "отходы упаковочных материалов из бумаги и картона, загрязненные неметаллическими нерастворимыми или малорастворимыми минеральными продуктами", "code": "4 05 911 31 60 4"},
      {"name": "отходы упаковочных материалов из бумаги, загрязненные нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 05 912 01 60 3"},
      {"name": "отходы упаковочных материалов из бумаги, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 05 912 02 60 4"},
      {"name": "отходы упаковочных материалов из бумаги и картона, загрязненные средствами моющими, чистящими и полирующими", "code": "4 05 919 01 60 4"},
      {"name": "отходы минеральных масел моторных", "code": "4 06 110 01 31 3"},
      {"name": "отходы минеральных масел гидравлических, не содержащих галогены", "code": "4 06 120 01 31 3"},
      {"name": "отходы минеральных масел индустриальных", "code": "4 06 130 01 31 3"},
      {"name": "отходы минеральных масел трансформаторных, не содержащих галогены", "code": "4 06 140 01 31 3"},
      {"name": "отходы минеральных масел трансмиссионных", "code": "4 06 150 01 31 3"},
      {"name": "отходы минеральных масел компрессорных", "code": "4 06 166 01 31 3"},
      {"name": "отходы минеральных масел турбинных", "code": "4 06 170 01 31 3"},
      {"name": "отходы минеральных масел технологических", "code": "4 06 180 01 31 3"},
      {"name": "отходы прочих минеральных масел", "code": "4 06 190 01 31 3"},
      {"name": "нефтяные промывочные жидкости, утратившие потребительские свойства, не загрязненные веществами 1-2 классов опасности", "code": "4 06 310 01 31 3"},
      {"name": "смесь масел минеральных отработанных (трансмиссионных, осевых, обкаточных, цилиндровых) от термической обработки металлов", "code": "4 06 320 01 31 3"},
      {"name": "всплывшие нефтепродукты из нефтеловушек и аналогичных сооружений", "code": "4 06 350 01 31 3"},
      {"name": "смеси нефтепродуктов прочие, извлекаемые из очистных сооружений нефтесодержащих вод, содержащие нефтепродукты более 70%", "code": "4 06 350 1132 3"},
      {"name": "смеси нефтепродуктов, собранные при зачистке средств хранения и транспортирования нефти и нефтепродуктов", "code": "4 06 390 01 31 3"},
      {"name": "отходы смазок на основе нефтяных масел", "code": "4 06 410 01 39 3"},
      {"name": "отходы синтетических и полусинтетических масел моторных", "code": "4 13 100 01 31 3"},
      {"name": "отходы синтетических и полусинтетических масел индустриальных", "code": "4 13 200 01 31 3"},
      {"name": "отходы синтетических и полусинтетических масел электроизоляционных", "code": "4 13 300 01 31 3"},
      {"name": "отходы синтетических масел компрессорных", "code": "4 13 400 01 31 3"},
      {"name": "отходы прочих синтетических масел", "code": "4 13 500 01 31 3"},
      {"name": "отходы синтетических гидравлических жидкостей", "code": "4 13 600 01 31 3"},
      {"name": "отходы растворителей на основе трихлорэтилена, загрязненные минеральными маслами", "code": "4 14 111 11 103"},
      {"name": "отходы растворителей на основе бензина, загрязненные оксидами железа и/или кремния", "code": "4 14 121 11313"},
      {"name": "отходы растворителей на основе керосина, загрязненные оксидами железа и/или кремния", "code": "4 14 121 21 31 3"},
      {"name": "отходы растворителей на основе толуола", "code": "4 14 122 21 10 3"},
      {"name": "отходы растворителей на основе ксилола, загрязненные оксидами железа и кремния", "code": "4 14 122 31 31 3"},
      {"name": "отходы негалогенированных органических растворителей в смеси, загрязненные лакокрасочными материалами", "code": "4 14 129 1231 3"},
      {"name": "отходы материалов лакокрасочных на основе акриловых полимеров в водной среде", "code": "4 14 410 11 39 3"},
      {"name": "отходы материалов лакокрасочных на основе алкидных смол в среде негалогенированных органических растворителей", "code": "4 14 420 11 39 3"},
      {"name": "отходы фотобумаги", "code": "4 17 140 01 29 4"},
      {"name": "отходы фото- и кинопленки", "code": "4 17 150 01 29 4"},
      {"name": "силиконовые масла, утратившие потребительские свойства", "code": "4 19 501 01 10 3"},
      {"name": "изделия текстильные прорезиненные, утратившие потребительские свойства, незагрязненные", "code": "4 31 130 01 52 4"},
      {"name": "отходы резинотехнических изделий, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 33 202 02 51 4"},
      {"name": "тара из разнородных полимерных материалов, не содержащих галогены, незагрязненная", "code": "4 34 19971 524"},
      {"name": "лом и отходы изделий из текстолита незагрязненные", "code": "4 34 231 11 20 4"},
      {"name": "лом и отходы изделий из стеклотекстолита незагрязненные", "code": "4 34 231 21 20 4"},
      {"name": "лом изделий из негалогенированных полимерных материалов в смеси", "code": "4 34 991 11 20 4"},
      {"name": "отходы продукции из разнородных пластмасс, содержащие фторполимеры", "code": "4 35 991 21 20 4"},
      {"name": "тара полиэтиленовая, загрязненная лакокрасочными материалами (содержание 5 % и более)", "code": "4 38 111 01 51 3"},
      {"name": "тара полиэтиленовая, загрязненная лакокрасочными материалами (содержание менее 5 %)", "code": "4 38 111 02 51 4"},
      {"name": "тара полиэтиленовая, загрязненная нефтепродуктами (содержание менее 15%)", "code": "4 38 11301 51 4"},
      {"name": "тара полиэтиленовая, загрязненная негалогенированными органическими растворителями (содержание менее 15%)", "code": "4 38 113 02 51 4"},
      {"name": "тара полиэтиленовая, загрязненная средствами моющими, чистящими и полирующими", "code": "4 38 119 11 51 4"},
      {"name": "тара полипропиленовая, загрязненная резиновой крошкой", "code": "4 38 123 11 51 4"},
      {"name": "тара полипропиленовая, загрязненная фенолформальдегидной смолой в виде порошка, крошки и кусков", "code": "4 38 123 21 51 4"},
      {"name": "тара полипропиленовая, загрязненная средствами моющими, чистящими и полирующими", "code": "4 38 129 11 51 4"},
      {"name": "тара из прочих полимерных материалов, загрязненная лакокрасочными материалами (содержание 5 % и более)", "code": "4 38 191 01 51 3"},
      {"name": "тара из прочих полимерных материалов, загрязненная лакокрасочными материалами (содержание менее 5 %)", "code": "4 38 191 02 51 4"},
      {"name": "тара из прочих полимерных материалов, загрязненная йодом", "code": "4 38 192 01 51 3"},
      {"name": "цеолит отработанный, загрязненный нефтью и нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 42 501 01 29 3"},
      {"name": "цеолит отработанный, загрязненный нефтью и нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 42 501 02 29 4"},
      {"name": "силикагель отработанный, загрязненный нефтью и нефтепродуктами (содержание масла 15% и более)", "code": "4 42 503 11 29 3"},
      {"name": "силикагель отработанный, загрязненный нефтью и нефтепродуктами (содержание масла менее 15%)", "code": "4 42 503 12 29 4"},
      {"name": "уголь активированный отработанный, загрязненный нефтепродуктами (содержание нефтепродуктов 15 % и более)", "code": "4 42 504 01 20 3"},
      {"name": "уголь активированный отработанный, загрязненный нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 42 504 02 20 4"},
      {"name": "сорбенты на основе торфа и/или сфагнового мха, загрязненные нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 42 507 11 49 3"},
      {"name": "сорбенты на основе торфа и/или сфагнового мха, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15% )", "code": "4 42 507 12 49 4"},
      {"name": "угольные фильтры отработанные, загрязненные нефтепродуктами (содержание нефтепродуктов 15 % и более)", "code": "4 43 101 01 52 3"},
      {"name": "угольные фильтры отработанные, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 43 101 02 52 4"},
      {"name": "фильтры окрасочных камер стекловолоконные отработанные, загрязненные лакокрасочными", "code": "4 43 103 01 61 3"},
      {"name": "фильтры окрасочных камер картонные отработанные, загрязненные лакокрасочными материалами", "code": "4 43 103 11 61 3"},
      {"name": "фильтры окрасочных камер из химических волокон отработанные. загрязненные лакокрасочными материалами", "code": "4 43 103 21 61 3"},
      {"name": "фильтры тонкой очистки бумажные отработанные, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 43 114 01 20 4"},
      {"name": "ткань фильтровальная шерстяная, загрязненная оксидами магния и кальция в количестве не более 5 %", "code": "4 43 211 02 62 4"},
      {"name": "ткань фильтровальная из полимерных волокон при очистке воздуха отработанная", "code": "4 43 221 01 62 4"},
      {"name": "сетка лавсановая, загрязненная в основном хлоридами калия и натрия", "code": "4 43 221 02 61 4"},
      {"name": "ткань фильтровальная из разнородных материалов, загрязненная минеральными удобрениями (не более 15 %), содержащими азот, фосфор и калий", "code": "4 43 290 01 62 4"},
      {"name": "бумага фильтровальная, загрязненная нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 43 310 11 61 3"},
      {"name": "нетканые фильтровальные материалы синтетические, загрязненные нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 43 501 01 61 3"},
      {"name": "песок кварцевый, загрязненный нефтепродуктами (содержание нефтепродуктов 15 % и более)", "code": "4 43 701 11 39 3"},
      {"name": "керамзит, загрязненный нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 43 751 02 49 4"},
      {"name": "фильтрующая загрузка из песка и пенополиуретана, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 43 761 01 49 4"},
      {"name": "фильтрующая загрузка из песка и гравия, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 43 761 02 49 4"},
      {"name": "минеральная вата, отработанная при очистке дождевых сточных вод", "code": "4 43 911 11 61 4"},
      {"name": "фильтровальные материалы из торфа, отработанные при очистке дождевых сточных вод", "code": "4 43 911 21 61 4"},
      {"name": "фильтрующая загрузка из угольной крошки и опилок древесных, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15 % )", "code": "4 439 12 11 71 4"},
      {"name": "отходы абразивных материалов в виде пыли", "code": "4 56 200 51 42 4"},
      {"name": "отходы абразивных материалов в виде порошка", "code": "4 56 200 52 41 4"},
      {"name": "отходы шлаковаты незагрязненные", "code": "4 57 111 01 20 4"},
      {"name": "отходы шлаковаты незагрязненные", "code": "4 57 111 01 20 4"},
      {"name": "отходы базальтового волокна и материалов на его основе", "code": "4 57 112 01 20 4"},
      {"name": "отходы прочих теплоизоляционных материалов на основе минерального волокна незагрязненные", "code": "4 57 119 01 20 4"},
      {"name": "отходы шлаковаты, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 57 121 11 61 4"},
      {"name": "лом и отходы черных металлов, загрязненные нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 68 101 02 20 4"},
      {"name": "тара из черных металлов, загрязненная нефтепродуктами (содержание нефтепродуктов 15% и более)", "code": "4 68 111 01 51 3"},
      {"name": "тара из черных металлов, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "4 68 111 02 51 4"},
      {"name": "тара из черных металлов, загрязненная лакокрасочными материалами (содержание 5 % и более)", "code": "4 68 112 01 51 3"},
      {"name": "тара из черных металлов, загрязненная лакокрасочными материалами (содержание менее 5 %)", "code": "4 68 112 02 51 4"},
      {"name": "тара из черных металлов, загрязненная клеем органическим синтетическим", "code": "4 68 113 23 51 4"},
      {"name": "тара и упаковка алюминиевая, загрязненная нефтепродуктами (содержание нефтепродуктов не более 15 %)", "code": "4 68 211 01 51 4"},
      {"name": "лом изделий из алюминия и его сплавов, загрязненный нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "4 68 212 11 20 4"},
      {"name": "лампы ртутные, ртутно-кварцевые, люминесцентные, утратившие потребительские свойства", "code": "4 71 101 01 52 1"},
      {"name": "отходы вентилей ртутных", "code": "4 71 910 00 52 1"},
      {"name": "отходы термометров ртутных", "code": "4 71 920 00 52 1"},
      {"name": "системный блок компьютера, утративший потребительские свойства", "code": "4 81 201 01 52 4"},
      {"name": "принтеры, сканеры, многофункциональные устройства (МФУ), утратившие потребительские свойства", "code": "4 81 202 01 52 4"},
      {"name": "картриджи печатающих устройств с содержанием тонера 7 % и более отработанные", "code": "4 81 203 01 52 3"},
      {"name": "картриджи печатающих устройств с содержанием тонера менее 7 % отработанные", "code": "4 81 203 02 52 4"},
      {"name": "клавиатура, манипулятор «мышь» с соединительными проводами, утратившие потребительские свойства", "code": "4 81 204 01 52 4"},
      {"name": "мониторы компьютерные жидкокристаллические, утратившие потребительские свойства, в сборе", "code": "4 81 205 02 52 4"},
      {"name": "химические источники тока литиевые тионилхлоридные неповрежденные отработанные", "code": "4 82 201 01 53 2"},
      {"name": "химические источники тока марганцово-цинковые щелочные неповрежденные отработанные", "code": "4 82 201 1153 2"},
      {"name": "аккумуляторы компьютерные кислотные неповрежденные отработанные", "code": "4 82 211 02 53 2"},
      {"name": "провод медный, покрытый никелем, утративший потребительские свойства", "code": "4 82 304 01 52 3"},
      {"name": "провод медный в изоляции из поливинилхлорида, утративший потребительские свойства", "code": "4 82 304 02 52 3"},
      {"name": "кабель медно-жильный освинцованный, утративший потребительские свойства", "code": "4 82 305 01 52 2"},
      {"name": "светильник шахтный головной в комплекте", "code": "4 82 421 01 52 3"},
      {"name": "огнетушители самосрабатываюшие порошковые, утратившие потребительские свойства", "code": "4 89 221 11 52 4"},
      {"name": "коробки фильтрующе-поглощающие противогазов, утратившие потребительские свойства", "code": "4 91 102 01 52 4"},
      {"name": "уголь активированный отработанный из фильтрующе-поглощающих коробок противогазов", "code": "4 91 102 02 49 4"},
      {"name": "самоспасатели шахтные, утратившие потребительские свойства", "code": "4 91 191 01 52 3"},
      {"name": "гравийная засыпка маслоприемных устройств маслонаполненного электрооборудования, загрязненная нефтепродуктами (содержание нефтепродуктов менее 15%)", "code": "6 91 322 01 21 4"},
      {"name": "осадок механической очистки смеси ливневых и производственных сточных вод, не содержащих специфические загрязнители, малоопасный", "code": "7 29 010 11 39 4"},
      {"name": "мусор с защитных решеток хозяйственно-бытовой и смешанной канализации малоопасный", "code": "7 22 101 01 71 4"},
      {"name": "осадок с песколовок при очистке хозяйственно-бытовых и смешанных сточных вод малоопасный", "code": "7 22 102 01 39 4"},
      {"name": "осадки с песколовок и отстойников при механической очистке хозяйственно-бытовых и смешанных сточных вод малоопасные", "code": "7 22 109 01 39 4"},
      {"name": "ил избыточный биологических очистных сооружений в смеси с осадком механической очитски хозяйственно-бытовых и смешанных сточных вод", "code": "7 22 201 11 39 4"},
      {"name": "отходы (шлам) при очистке сетей, колодцев хозяйственно-бытовой и смешанной канализации", "code": "7 22 800 01 39 4"},
      {"name": "осадок (шлам) механической очистки нефтесодержащих сточных вод, содержащий нефтепродукты в количестве менее 15 %, обводненный", "code": "7 23 101 01 39 4"},
      {"name": "осадок механической очистки нефтесодержащих сточных вод, содержащий нефтепродукты в количестве 15 % и более", "code": "7 23 102 01 39 3"},
      {"name": "осадок механической очистки нефтесодержащих сточных вод, содержащий нефтепродукты в количестве менее 15 %", "code": "7 23 102 02 39 4"},
      {"name": "мусор от офисных и бытовых помещений организаций несортированный (исключая крупногабаритный)", "code": "7 33 100 01 72 4"},
      {"name": "отходы кухонь и организаций общественного питания несортированные прочие", "code": "7 36 100 02 72 4"},
      {"name": "отходы жиров при разгрузке жироуловителей", "code": "7 36 101 01 39 4"},
      {"name": "масла растительные отработанные при приготовлении пищи", "code": "7 36 110 01 31 4"},
      {"name": "отходы (мусор) от уборки помещений гостиниц, отелей и других мест временного проживания несортированные", "code": "7 36 210 01 72 4"},
      {"name": "отходы (мусор) от уборки помещений парикмахерских, салонов красоты, соляриев", "code": "7 39 410 01 72 4"},
      {"name": "отходы рубероида", "code": "8 26 210 01 51 4"},
      {"name": "отходы толи", "code": "8 26 220 01 51 4"},
      {"name": "шпалы железнодорожные деревянные, пропитанные антисептическими средствами, отработанные", "code": "8 41 000 01 51 3"},
      {"name": "балласт из щебня, загрязненный нефтепродуктами (содержание нефтепродуктов 15 % и более)", "code": "8 42 101 01 21 3"},
      {"name": "балласт из щебня, загрязненный нефтепродуктами (содержание нефтепродуктов менее 15 %)", "code": "8 42 101 02 21 4"},
      {"name": "отходы грунта, снятого при ремонте железнодорожного полотна, загрязненного нефтепродуктами, умеренно опасные", "code": "8 42 201 01 49 3"},
      {"name": "отходы грунта, снятого при ремонте железнодорожного полотна, загрязненного нефтепродуктами, малоопасные", "code": "8 42 201 02 49 4"},
      {"name": "инструменты лакокрасочные (кисти, валики), загрязненные лакокрасочными материалами (в количестве 5 % и более)", "code": "8 91 110 01 52 3"},
      {"name": "инструменты лакокрасочные (кисти, валики), загрязненные лакокрасочными материалами (в количестве менее 5 %)", "code": "8 91 110 02 52 4"},
      {"name": "шпатели отработанные, загрязненные штукатурными материалами", "code": "8 91 120 01 52 4"},
      {"name": "обтирочный материал, загрязненный лакокрасочными материалами (в количестве 5% и более)", "code": "8 92 110 01 60 3"},
      {"name": "обтирочный материал, загрязненный лакокрасочными материалами (в количестве менее 5%)", "code": "8 92 110 02 60 4"},
      {"name": "обтирочный материал, загрязненный лакокрасочными материалами на основе алкидных смол", "code": "8 92 011 01 60 4"},
      {"name": "воды подсланевые с содержанием нефти и нефтепродуктов более 15%", "code": "9 11 100 01 31 3"},
      {"name": "шлам очистки танков нефтеналивных судов", "code": "9 11 200 01 39 3"},
      {"name": "шлам очистки емкостей и трубопроводов от нефти и нефтепродуктов", "code": "9 11 200 02 39 3"},
      {"name": "смесь нефтепродуктов обводненная при зачистке маслосборника системы распределения масла", "code": "9 11 21001 31 3"},
      {"name": "эмульсия маслоловушек компрессорных установок", "code": "9 18 302 02 31 4"},
      {"name": "песок, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов 15 % и более)", "code": "9 19 201 01 39 3"},
      {"name": "песок, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов менее 15 %)", "code": "9 19 201 02 39 4"},
      {"name": "сальниковая набивка асбесто-графитовая промасленная (содержание масла 15 % и более)", "code": "9 19 202 01 60 3"},
      {"name": "сальниковая набивка асбесто-графитовая промасленная (содержание масла менее 15 %)", "code": "9 19 202 02 60 4"},
      {"name": "пенька промасленная (содержание масла 15 % и более)", "code": "9 19 203 01 60 3"},
      {"name": "пенька промасленная (содержание масла менее 15 %)", "code": "9 19 203 02 60 4"},
      {"name": "обтирочный материал, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов 15 % и более)", "code": "9 19 204 01 60 3"},
      {"name": "обтирочный материал, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов менее 15 %)", "code": "9 19 204 02 60 4"},
      {"name": "опилки и стружка древесные, загрязненные нефтью или нефтепродуктами (содержание нефти или нефтепродуктов 15% и более)", "code": "9 19 205 01 39 3"},
      {"name": "опилки и стружка древесные, загрязненные нефтью или нефтепродуктами (содержание нефти или нефтепродуктов менее 15%)", "code": "9 19 205 02 39 4"},
      {"name": "опилки древесные, загрязненные связующими смолами", "code": "9 19 206 11 43 4"},
      {"name": "аккумуляторы свинцовые отработанные неповрежденные, с электролитом", "code": "9 20 110 01 53 2"},
      {"name": "аккумуляторы свинцовые отработанные в сборе, без электролита", "code": "9 20 110 02 52 3"},
      {"name": "тормозные колодки отработанные с остатками накладок асбестовых", "code": "9 20 310 02 52 4"},
      {"name": "шины пневматические автомобильные отработанные", "code": "9 21 110 01 50 4"},
      {"name": "камеры пневматических шин автомобильных отработанные", "code": "9 21 120 01 50 4"},
      {"name": "покрышки пневматических шин с тканевым кордом отработанные", "code": "9 21 130 01 50 4"},
      {"name": "покрышки пневматических шин с металлическим кордом отработанные", "code": "9 21 130 02 50 4"},
      {"name": "отходы антифризов на основе этиленгликоля", "code": "9 21 210 01 31 3"},
      {"name": "фильтры воздушные автотранспортных средств отработанные", "code": "9 21 301 01 52 4"},
      {"name": "фильтры очистки масла автотранспортных средств отработанные", "code": "9 21 302 01 52 3"},
      {"name": "фильтры очистки топлива автотранспортных средств отработанные", "code": "9 21 303 01 52 3"},
      {"name": "грунт, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов 15 % и более)", "code": "9 31 100 01 39 3"},
      {"name": "грунт, загрязненный нефтью или нефтепродуктами (содержание нефти или нефтепродуктов менее 15 %)", "code": "9 31 100 03 39 4"},
      {"name": "отходы демеркуризации боя ртутьсодержащих изделий мыльно-содовым раствором", "code": "9 32 101 11 39 1"},
      {"name": "отходы государственных стандартных образцов нефтепродуктов", "code": "9 41 851 01 53 4"},
      {"name": "отходы смесей нефтепродуктов при технических испытаниях и измерениях", "code": "9 42 501 01 31 3"}
    ];

    let limit = 5;

    $('.jsSearch').on("input", function() {
      let q = $(this).val().toLowerCase();
      let res = findWaste(q);
      let html = getDropdownCode(res);

      if (q.length > 0) {
        $(this).siblings('.jsDropdown').fadeIn();
      } else {
        $(this).siblings('.jsDropdown').fadeOut();
      }

      if (html.length < 1) {
        html = 'Ничего не найдено';
      }

      $('.jsDropdown').html(html);
    });

    // $('.jsSearch').on("blur", function() {
    //   $(this).siblings('.jsDropdown').fadeOut();
    // });

    let chosenWaste = [];

    $(".jsDropdown").on("click", ".jsChooseWaste", function(e) {
      e.preventDefault();

      if (e.target !== this)
        return;

      if ($(e.target).attr('data-text')) {
        chosenWaste.push( $(e.target).attr('data-text') );
        renderChosen(chosenWaste);
      }
    });

    function findWaste(q) {
      let arr = [];
      let k = 0;
      waste.forEach(function(val) {
        if(k <= 5 && (val.name.indexOf(q) >= 0 || val.code.indexOf(q) >= 0 || val.code.split(" ").join("").indexOf(q) >= 0)) {
          arr.push(val);
          k++
        }
      });

      return arr;
    }

    function getDropdownCode(res) {
      let html = '';

      res.forEach(function(item) {
        html += '<a href="#" class="modal__file modal__file--drop jsChooseWaste" data-text="(' + item.code + ') ' + item.name +'">'+
        '<span class="modal__file-add"></span>'+
        '<p class="modal__file-name">(' + item.code + ') ' + item.name + '</p>'+
        '</a>';
      });

      return html;
    }

    function renderChosen(res) {
      let html = getChosenCode(res);
      $('.jsChosenWaste').html(html);
      $('.jsSearch').val('');
      $('.jsDropdown').fadeOut();

      $(".jsWasteInput").val( res.join(";") );
      // res.forEach(function(item, index) {
      //   $(".jsWasteInput").val( item + ', ' + $(".jsWasteInput").val() );
      // });
    }

    function getChosenCode(res) {
      let html = '';

      res.forEach(function(item, index) {
        html += '<div class="modal__file">' +
          '<p class="modal__file-name">' + item + '</p>' +
          '<a class="modal__file-add jsRemoveChosen" data-index="' + index + '"></a>' +
          '</div>';
      });

      return html;
    }

    $('.jsFileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
          let resp = data.result.files[0];
          if (resp.error) {
            $(e.target).siblings('.jsProgress').css(
                'background', 'red'
            );
            $(e.target).siblings('.jsFileName').val('');
          } else {
            $(e.target).siblings('.jsProgress').css('width', 0);
            $(e.target).siblings('.jsFileName').val(resp.url);
          }
        },
        progressall: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $(e.target).siblings('.jsProgress').css('background', 'green').css(
              'width',
              progress + '%'
          );
      }
    });

    $('.jsChosenWaste').on("click", ".jsRemoveChosen", function(e) {
      e.preventDefault();

      let index = $(this).attr("data-index");
      chosenWaste.splice(index, 1);
      renderChosen(chosenWaste);
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

