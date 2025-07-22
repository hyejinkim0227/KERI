
var elFocus, headH; //포커스요소 저장하는 전역변수
var page = 0;

function resizeContentHeight() {
  var conH = $('#contents').outerHeight();
  var lnbH = $('.lnb').outerHeight();
  if (conH < lnbH) {
    $('#contents').outerHeight(lnbH);
  } else {
    $('#contents').removeAttr('style');
  }
}

//bo_filter 슬라이드
function slideScroll() {
  var bo_filterW = $('.bo_filter').width();
  var bo_filter = $('.bo_filter .slide');
  var bo_i = 0;
  var bo_length = bo_filter.find('a').length;
  bo_filter.children('a').each(function () {
    bo_i += $(this).outerWidth(true);
  });
  if (bo_filterW < bo_i) {
    bo_filter.not('.slick-initialized').slick({
      variableWidth: true,
      autoplay: false,
      cssEase: 'ease-in',
      infinite: false,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      swipeToSlide: true,
    });
  } else {
    bo_filter.slick('unslick');
  }
}

function openSitemapEn() {
  //사이트맵 gnb복사 후 열기
  $('.gnb > .dep1').clone().appendTo('.sitemap > .container');
  $('.sitemap .dep2').removeAttr('style');
  $('.sitemap').stop().fadeIn().attr('tabindex', '0').focus();
}

function closeSitemapEn() {
  //사이트맵 닫고 복사한 nav 지우기
  $('.sitemap')
    .stop()
    .fadeOut(function () {
      $(this).find('.dep1').remove();
    })
    .removeAttr('tabindex');
}
function mSchOnOff(target) {
  $(event.target).toggleClass('active').parent().parent().prev().find('.search').fadeToggle(300);
}

//영문 외 공통 스크립트
function tableChange() {
  if ($('.tableB.type3').length) {
    $('.tableB.type3 tbody > tr > td').each(function () {
      var tableIndex = $(this).index();
      var tableT2 = $(this).parents('tbody').prev().children().children().eq(tableIndex).text();
      $(this).attr('data-before', tableT2);
    });
  }
}

function snsToggle() {
  //sns 공유 박스 컨트롤
  $('.sub_top .share button').on('click', function () {
    var btn = $(this).parent();
    if (btn.hasClass('active')) {
      btn.removeClass('active');
      $(this).attr('title', 'sns목록 닫힘').next().stop().fadeOut();
    } else {
      btn.addClass('active');
      $(this).attr('title', 'sns목록 열림').next().stop().fadeIn();
    }
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.share button').length) {
      $('.sub_top .share').removeClass('active').children('button').attr('title', 'sns목록 닫힘');
      $('.sub_top .share div').stop().fadeOut();
    }
  });
}

function mGnbInit() {
  //모바일내비게이션 초기화
  $('.dep2_wrap ul > li').each(function () {
    if ($(this).children('ol').length) {
      $(this).children('a').addClass('menu_btn');
    }
  });
}

function lnbInit() {
  //로컬내비게이션 초기화
  $('.lnb > li').each(function () {
    if ($(this).children('ol').length) {
      $(this).children('a').attr('title', '하위메뉴 닫힘').addClass('menu_btn');
      if ($(this).hasClass('active')) {
        $(this).children('a').attr('title', '하위메뉴 열림');
      }
    }
    if ($(this).find('.selected').length) {
      $(this).children('a').attr('title', '하위메뉴 열림');
      $(this).children('ol').show();
      $(this).find('.selected').children('a').attr('title', '현재 페이지');
    } else if ($(this).hasClass('selected')) {
      $(this).children('a').attr('title', '현재 페이지');
    }
  });
}

function closeLnb() {
  //lnb dep3 닫힘
  $('.lnb > li.active ol').stop().slideUp().prev().attr('title', '하위메뉴 닫힘');
  $('.lnb > li.active').removeClass('active');
}
function resetLnb() {
  //선택페이지 제거
  $('.lnb > li.selected ol').stop().slideUp();
  $('.lnb li.selected').removeClass('selected').children('a').removeAttr('title');
}

function pcChk(width) {
  //창크기 width보다 크면 true 반환
  if ($(window).width() > width) {
    return true;
  } else {
    return false;
  }
}

function imgResize() {
  //이미지 사이즈 조절
  if (pcChk(720) && $('.img').length > 0) {
    function imgResizeH() {
      $('.img').each(function () {
        var imgBoxH, imgH, img;
        imgBoxH = $(this).height();
        img = $(this).find('img');
        imgH = img.height();
        if (imgBoxH > imgH) {
          img.width('auto').height('100%');
        }
      });
    }
    $('.img').each(function () {
      var imgBoxW, imgW, img;
      imgBoxW = $(this).width();
      img = $(this).find('img');
      imgW = img.width();
      if (imgBoxW > imgW) {
        //이미지box가 클경우
        img.width('100%').height('auto');
        imgResizeH();
      } else {
        imgResizeH();
      }
    });
  } else {
    $('.img img').removeAttr('style');
  }
}

function openSitemap() {
  //사이트맵 gnb복사 후 열기
  $('#gnb .dep1').clone().appendTo('.sitemap .container');
  $('.sitemap .dep2_wrap').removeAttr('style');
  $('.sitemap').stop().fadeIn().attr('tabindex', '0').focus();
}

function closeSitemap() {
  //사이트맵 닫고 복사한 nav 지우기
  $('.sitemap')
    .stop()
    .fadeOut(function () {
      $(this).find('.dep1').remove();
    })
    .removeAttr('tabindex');
}

function focusLoop() {
  //이벤트가 발생한 요소의 상위 tabindex="0"을 찾아 포커스이동
  $(event.target).closest('[tabindex="0"]').focus();
}

function saveFocus() {
  //이벤트 발생한 요소 elFocus변수에 저장
  return (elFocus = $(event.target));
}
function returnFocus() {
  //저장된 요소로 포커스 이동
  if (elFocus === undefined) {
    return false;
  }
  elFocus.focus();
}

function bodyScroll(arg) {
  //인자값에 따른 body 스크롤 on/off
  if (arg == 'off') {
    $('body').css('overflow', 'hidden');
  } else if (arg == 'on') {
    $('body').removeAttr('style');
  }
}

function mMenuActive1() {
  // 모바일 메뉴 dep1 on/off
  $('.sitemap .dep1 > li > a').click(function () {
    if (!pcChk(720)) {
      $('.sitemap .dep1 > li').removeClass('active');
      $(this).closest('li').addClass('active');
      return false;
    }
  });
}
function mMenuActive2() {
  // 모바일에서 link클래스가 없는 a태그 클릭시 하위메뉴 열고 닫힘
  if (!pcChk(720)) {
    $('.sitemap .dep2_wrap ul > li > a').click(function () {
      if ($(this).parent().hasClass('active')) {
        $('.sitemap .dep2_wrap ul > li').removeClass('active');
      } else {
        $(this).parent().addClass('active').siblings('li').removeClass('active');
      }
      if ($(this).hasClass('menu_btn')) {
        return false;
      }
    });
  }
}
function mMenuActive3() {
  // 모바일 메뉴 dep3 on/off
  $('.sitemap .dep2_wrap ol > li > a').click(function () {
    if (!pcChk(720)) {
      $('.sitemap .dep2_wrap ol > li').removeClass('active');
      $(this).closest('li').addClass('active');
    }
  });
}
function snsPositon() {
  if (!pcChk(720)) {
    $('.sitemap .sns').insertAfter($('.sitemap .dep1'));
  }
}

function resizeHeadHeight(target) {

  //pc화면에서 gnb모션
  if (pcChk(1080)) {
    var dep2H = $(target).next('.dep2_wrap').outerHeight();
    $('.header')
      .stop()
      .animate({ height: headH + dep2H + 'px' }, 200, function () {

      });
    $('.header').addClass('active');
    $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
  }
}

function gnbReset() {
  //gnb 초기화
  if (pcChk(1080)) {
    $('.header')
      .stop()
      .animate({ height: headH + 'px' }, 200, function () {


      });
    $('.header').removeClass('active');
  }
}

function tabBoxSizing() {
  if ($('.tab_box').length) {
    //active li의 높이를 구하고 tab_box 높이 설정
    var tabConH = $('.tab_box').find('.active > div').outerHeight();
    var tabH = $('.tab_box').find('li').outerHeight();
    $('.tab_box').height(tabConH + tabH);
  }
}

function gnbFloatClear() {
  // dep2Wrap의 너비보다 li의 너비가 클경우 해당 번째요소에 clearfix
  var dep2W = $('.header .dep2_wrap > ul').width(),
    dep2Li = $('.header .dep2_wrap > ul > li');
  dep2Li.removeClass('clear');
  dep2Li.each(function () {
    var i = 0;
    var li = $(this).closest('ul').children('li');
    var dep2LiWidth = 0;
    while (i < li.length) {
      dep2LiWidth += li.eq(i).outerWidth(true);
      if (dep2W < dep2LiWidth) {
        li.eq(i).addClass('clear');
        dep2LiWidth = 0;
        continue;
      }
      i++;
    }
  });
}

function openSearch() {
  $('.header .util > .search_box,.search_open').addClass('active');
  $('.search_open').attr('title', '검색창 닫기');
  var schBoxH = $('.search_box').outerHeight();
  $('.header').addClass('active').stop().animate({ height: headH + schBoxH + 'px' }, 200);
  return false;
}

function resetSearch() {
  $('.header').stop().animate({ height: headH + 'px' }, 200, function () {
    $('.header').removeClass('active');
    $('.util > .search_box,.search_open').removeClass('active');
    $('.search_open').attr('title', '검색창 열기');
  });
}


function openPopup() {
  saveFocus(); //이벤트 발생한 요소 기억
  $('.modal_wrap').fadeIn().find('.modal_pop').attr('tabindex', '0').focus().find('.pop_bg').attr('tabindex', 0);;
}
function closePopup() {
  $('.modal_wrap').fadeOut().find('.modal_pop').removeAttr('tabindex', '0');
  returnFocus();
}

function openPopup2(arg) { //복수 팝업
  saveFocus(); //이벤트 발생한 요소 기억
  $('.modal_wrap .modal_pop').hide();
  $('.modal_wrap').fadeIn().find('.modal_pop[data-pop="' + arg + '"]').show().attr('tabindex', '0').focus().find('.pop_bg').attr('tabindex', 0);
}


function tabResizing1() {
  //탭 높이 조정
  var tabH = 0;
  $('.tab_list > li > a').removeAttr('style');
  $('.tab_list > li').each(function () {
    if (tabH < $(this).children('a').height()) {
      tabH = $(this).children('a').height();
    }
  });
  $('.tab_list > li > a').height(tabH);
}
function tabResizing2() {
  //탭 높이 조정
  var tab2H = 0;
  if (pcChk(720)) {
    $('.tab_list2 > ul > li > a').removeAttr('style');
    $('.tab_list2 > ul > li').each(function () {
      if (tab2H < $(this).children('a').height()) {
        tab2H = $(this).children('a').height();
      }
    });
    $('.tab_list2 > ul > li > a').height(tab2H);
  } else {
    $('.tab_list2 > ul > li > a').removeAttr('style');
  }
}
function tabResizing3() {
  //탭 높이 조정
  var tab3H = 0;
  $('.tab_list3 > ul > li > a').removeAttr('style');
  $('.tab_list3 > ul > li').each(function () {
    if (tab3H < $(this).children('a').height()) {
      tab3H = $(this).children('a').height();
    }
  });
  $('.tab_list3 > ul > li > a').height(tab3H);
}
function tabContent() {
  var i = $('.tab_list3 > ul > li.active').index();
  $('.tab_list3 > ol > li').removeClass('active');
  $('.tab_list3 > ol > li').eq(i).addClass('active');
}

function introScroll() {
  if ($('#intro').length && pcChk(720)) {
    var sec2T = $('.sec2').offset().top;
    bodyScroll('off');
    $(window).on("wheel", function (e) {
      if ($('html').is(":animated")) {
        return false;
      };
      if (e.originalEvent.deltaY > 0 && page == 0) {
        $('html,body').animate({ scrollTop: sec2T }, 1000, 'swing', function () {
          bodyScroll('on');
        });
        page = 1;
      }
    });
    if ($(window).scrollTop() > 0) {
      bodyScroll('on');
      page = 1;
    }
    $(window).on('scroll', function () {
      if ($(window).scrollTop() == 0) {
        bodyScroll('off');
        page = 0;
      }
    });
  } else {
    bodyScroll('on');
  }
}

function stopIframe(target) {
  if ($(target).length) {
    var src = $(target).find('iframe').attr('src');
    $(target).find('iframe').attr('src', src);
  }
}
// $(document).click(function () {
//   stopIframe('.banner .slide');
//   stopIframe('.main_banner .slide');
// });

$(document).on('click', '#intro .intro_btn .sm', function () {
  var sec2T = $('#intro .sec2').offset().top;
  $('html,body').animate({ scrollTop: sec2T }, 600, 'swing');
  return false;
});

$(document).on('click', '.tab_list > li > a,.tab_list2 > ul > li > a,.tab_list3 > ul > li > a', function () {
  //탭 클릭시 active
  var tab = $(this).parent('li');
  var tabAll = $(this).parent('li').siblings('li');
  tabAll.removeClass('active').children('a').removeAttr('title');
  tab.addClass('active').children('a').attr('title', '선택됨');
});

$(function () {
  // wow = new WOW(
  //   {
  //     boxClass: 'wow',      // default
  //     animateClass: 'animated', // default
  //     offset: 50,          // default
  //     mobile: true,       // default
  //     live: true        // default
  //   }
  // )
  // wow.init();
  
  // AOS 초기화
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  
  lnbInit(); //lnb 초기화
  snsToggle(); // sns박스 열고 닫힘
  introScroll();
  // indicator 스크롤 업데이트 제어 변수
  var isIndicatorScrolling = false;
  
  // indicator
  $('#indicator li a').on('click.indicator', function () {
    // 풀페이지 스크롤이 활성화된 경우 기본 이벤트 무시
    if ($('.main.fullpage-scroll').length) {
      return false;
    }
    
    var $parent = $(this).parent();
    var mainNavi = $parent.attr('data-mainnavi');
    
    // 스크롤 애니메이션 중임을 표시
    isIndicatorScrolling = true;
    
    // 모든 indicator에서 active 클래스 제거
    $('#indicator li').removeClass('active');
    // 클릭한 항목에 active 클래스 추가
    $parent.addClass('active');
    
    // 해당 섹션 찾기
    var $targetSection = $('[data-mainnavi="' + mainNavi + '"]').not('#indicator li');
    
    // news는 data-mainnavi 속성이 없으므로 별도 처리
    if (mainNavi === 'news') {
      $targetSection = $('.news');
    }
    
    if ($targetSection.length > 0) {
      var targetTop = $targetSection.offset().top;
      // 헤더 높이만큼 빼기 (헤더가 고정되어 있는 경우)
      var headerHeight = $('.header').outerHeight() || 0;
      
      $('html,body').stop().animate({ 
        scrollTop: targetTop - headerHeight 
      }, 700, function() {
        // 애니메이션 완료 후 스크롤 업데이트 재활성화
        setTimeout(function() {
          isIndicatorScrolling = false;
        }, 100);
      });
    }
    
    return false;
  });
  slideScroll();

  headH = $('.header').outerHeight(); //기본 헤더 높이 전역변수
  tabResizing1(); //탭컨텐츠 높이 조절
  tabResizing2(); //탭컨텐츠 높이 조절
  tabResizing3(); //탭컨텐츠 높이 조절
  tabBoxSizing(); //탭컨텐츠 높이 조절
  tabContent(); //선택탭 컨텐츠 노출
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
      $('.btn_quick .scroll_top').fadeIn();
    } else {
      $('.btn_quick .scroll_top').fadeOut();
    }
    
    // 풀페이지 스크롤이 활성화된 경우 indicator 업데이트 무시
    if ($('.main.fullpage-scroll').length) {
      return;
    }
    
    // indicator 활성화 처리
    updateIndicatorOnScroll();
  });
  
  // 스크롤에 따른 indicator 활성화 함수
  function updateIndicatorOnScroll() {
    // 스크롤 애니메이션 중이면 업데이트 하지 않음
    if (isIndicatorScrolling) {
      return;
    }
    
    var scrollTop = $(window).scrollTop();
    var headerHeight = $('.header').outerHeight() || 0;
    var currentSection = '';
    
    // 각 섹션의 위치 확인
    var sections = [
      { name: 'search', element: $('.main_banner[data-mainnavi="search"]') },
      { name: 'domain', element: $('.domain[data-mainnavi="domain"]') },
      { name: 'news', element: $('.news') },
      { name: 'certification', element: $('.certification[data-mainnavi="certification"]') },
      { name: 'promo', element: $('.promo[data-mainnavi="promo"]') }
    ];
    
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (section.element.length > 0) {
        var sectionTop = section.element.offset().top - headerHeight - 50; // 50px 여유
        var sectionBottom = sectionTop + section.element.outerHeight();
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          currentSection = section.name;
          break;
        }
      }
    }
    
    // 첫 번째 섹션이 기본값
    if (!currentSection && scrollTop < 200) {
      currentSection = 'search';
    }
    
    // indicator 활성화
    if (currentSection) {
      $('#indicator li').removeClass('active');
      $('#indicator li[data-mainnavi="' + currentSection + '"]').addClass('active');
    }
  }
  $('.btn_quick .scroll_top').on('click', function () {
    $('html,body').stop().animate({ scrollTop: 0 }, 600);
  });

  //데이트피커 실행
  if ($('.date_inp input').length > 0) {
    $('.date_inp input').datepicker();
  }

  $('.bo_filter .slide a').on('click', function () {
    $(this).addClass('active').attr('title', '선택됨').siblings('a').removeClass('active').removeAttr('title');
  })

  //스크롤테이블 레이어 감추기
  $('.scroll_layer').on('touchstart click', function () {
    $(this).fadeOut(200);
  });

  //함수실행
  $('.modal_open,.pop_open').on('click', function () {//팝업 열기
    //모달팝업 오픈
    bodyScroll('off');
    openPopup();
    popSlide.slick('setPosition'); //슬라이드 리셋
  });
  $('.pop_open2').on('click', function () {//다중팝업 열기
    var popName = $(this).data('pop');
    bodyScroll('off');
    openPopup2(popName);
    popSlide.slick('setPosition'); //슬라이드 리셋
    return false;
  });

  $('.modal_close button, .loop').on('click', function () {
    //모달팝업 닫기
    closePopup();
    bodyScroll('on');
  });
  $(document).on('keydown', '.loop', function (e) {
    //팝업닫기 버튼에서 탭클릭시 팝업으로 초점이동
    var isShift = window.event.shiftKey ? true : false;
    if (isShift && e.keyCode == 9) {
      return;
    } else if (event.keyCode == 9) {
      focusLoop();
      return false;
    }
  });

  $('.search_open').on('click', function () {
    if (!$(this).hasClass('active')) {
      openSearch();
    } else {
      resetSearch();
    }
    return false;
  });
  $('.header_en .btn_sch').on('click', function () {
    if (!$(this).hasClass('active')) {
      openSearchEn();
    } else {
      resetSearchEn();
    }
    return false;
  });
  $(document).click(function (e) {
    if (!$(e.target).closest('.search_box').length) {
      resetSearchEn();
    }
  });
  $('.search_box button').on({
    focusout: function () {
      resetSearch();
    }
  });
  // $('.header .util').on({
  //   mouseleave: function () {
  //     resetSearch();
  //   }
  // });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.search_box').length) {
      resetSearch();
    }
  });

  $('.header #gnb > ul > li > a').on({
    //헤더 높이조절
    mouseenter: function () {
      $('.util > .search_box').removeClass('active');
      resizeHeadHeight(this);
    },
    focusin: function () {
      resizeHeadHeight(this);
    },
  });
  $('.header #gnb').on({
    mouseleave: function () {
      if ($('.search_open').hasClass('active')) {
        $('.util > .search_box').addClass('active');
        openSearch();
      } else {
        $('.header #gnb > ul > li').removeClass('active');
        gnbReset(); //헤더 높이 초기화
      }

    },
  });
  $('.header #gnb .dep2_wrap a')
    .last()
    .on({
      focusout: function () {
        gnbReset(); //헤더 높이 초기화
        $('.header #gnb > ul > li').removeClass('active');
      },
    });

  $('.header_en .gnb >ul > li>a').on({
    mouseenter: function () {
      gnb3Open(this);
    },
    focusin: function () {
      gnb3Open(this);
    },
  });
  $('.header_en .gnb').on({
    mouseleave: function () {
      gnb3Close();
    },
  });
  $('.header_en .sitemap .sns button').on('click', function () {
    var sns = $(this).closest('.sns');
    if (sns.hasClass('active')) {
      sns.removeClass('active');
    } else {
      sns.addClass('active');
    }
  });
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.sns').length) {
      $('.header_en .sitemap .sns').removeClass('active');
    }
  });
  //탭 기능
  $('.header_en .gnb .dep2 a').on('focusout', function () {
    if (pcChk()) {
      gnb3Close();
    }
  });

  //모바일 GNB
  $('.header #gnb a').on('click', function () {
    var innerMenu = $(this).next('ul');
    var innerMenu2 = $(this).next('.dep2_wrap');
    if (innerMenu.length > 0 && !pcChk(1080)) {
      $(this).closest('li').siblings('li').find('ul').stop().slideUp(200);
      innerMenu.stop().slideToggle(200);
      return false;
    } else if (innerMenu2.length > 0 && !pcChk(1080)) {
      $(this).closest('li').siblings('li').find('.dep2_wrap').stop().slideUp(200);
      innerMenu2.stop().slideToggle(200);
    }
  });

  // 사이트맵 열기
  $('.header .sitemap_open').on('click', function () {
    openSitemap(); //사이트맵 열기
    saveFocus(); //포커스 요소 저장
    snsPositon(); //sns 위치 조정
    mGnbInit();
    bodyScroll('off'); //body 스크롤 없애기
    if (!pcChk(720)) {
      //모바일의 경우 실행
      $('.header .util,.sitemap').addClass('active');
    }
    mMenuActive1();
    mMenuActive2();
    mMenuActive3();
  });
  $('.header_en .sitemap_open').on('click', function () {
    openSitemapEn(); //사이트맵 열기
    saveFocus(); //포커스 요소 저장
    // snsPositon(); //sns 위치 조정
    mGnbInit();
    bodyScroll('off'); //body 스크롤 없애기
    if (!pcChk(720)) {
      //모바일의 경우 실행
      $('.header_en,.sitemap').addClass('active');
    }
    mMenuActive1();
    mMenuActive2();
    mMenuActive3();
  });

  // 사이트맵 닫기
  $('.header .btn_sitemap_close').on({
    click: function () {
      if (!pcChk(720)) {
        //모바일의 경우 사이트맵
        $('.sitemap').removeClass('active');
        var delUtil = setTimeout(function () {
          $('.util').removeClass('active');
          clearTimeout(delUtil);
        }, 300);
      }
      closeSitemap(); //사이트맵닫기
      returnFocus(); //이전 포커스 요소로 되돌리기
      bodyScroll('on'); //body 스크롤 보이기
    },
  });
  // 사이트맵 닫기
  $('.header_en .btn_sitemap_close').on({
    click: function () {
      if (!pcChk(720)) {
        //모바일의 경우 사이트맵
        $('.sitemap').removeClass('active');
        var delUtil = setTimeout(function () {
          $('.header_en').removeClass('active');
          clearTimeout(delUtil);
        }, 300);
      }
      closeSitemapEn(); //사이트맵닫기
      returnFocus(); //이전 포커스 요소로 되돌리기
      bodyScroll('on'); //body 스크롤 보이기
    },
  });

  $(document).on('keydown', '.btn_sitemap_close', function (e) {
    //닫기 버튼에서 탭클릭시 상단으로 초점이동
    var isShift = window.event.shiftKey ? true : false;
    if (isShift && e.keyCode == 9) {
      return;
    } else if (event.keyCode == 9) {
      focusLoop();
      return false;
    }
  });

  //메인배너 슬라이드
  var mbSlide = $('.main_banner .slide');
  mbSlide.slick({
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    cssEase: 'ease-in',
    dots: false,
    adaptiveHeight: true,
    prevArrow: $('.main_banner .prev'), //arrow 설정
    nextArrow: $('.main_banner .next'), //arrow 설정
    autoplaySpeed: 12000,
    responsive: [
      {
        //반응형
        breakpoint: 1300,
        settings: {
          variableWidth: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],

  });
  $('.main_banner .pause').click(function () {

    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      $('.main_banner .slide').slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      $('.main_banner .slide').slick('slickPause');
    }
  });
  // mbSlide.find('iframe').on('mouseenter', function () {
  //   $('.main_banner .pause').addClass('play').text('자동재생 시작');
  //   $('.main_banner .slide').slick('slickPause');
  // });



  //자주찾는 서비스 슬라이드
  var infoSlide = $('.info_slide .slide');
  var setInfoSlide = {
    variableWidth: true,
    slidesToShow: 3,
    autoplay: false,
    cssEase: 'ease-in',
    infinite: true,
    dots: false,
    touchThreshold: 100,
    swipeToSlide: true,
    prevArrow: $('.info_slide .prev'), //arrow 설정
    nextArrow: $('.info_slide .next'), //arrow 설정
    responsive: [
      {
        //반응형
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      }
    ],
  }
  slick_on_pc(infoSlide, setInfoSlide);
  // infoSlide.slick({
  //   variableWidth: true,
  //   slidesToShow: 3,
  //   autoplay: false,
  //   cssEase: 'ease-in',
  //   infinite: true,
  //   dots: false,
  //   touchThreshold: 100,
  //   swipeToSlide: true,
  //   prevArrow: $('.info_slide .prev'), //arrow 설정
  //   nextArrow: $('.info_slide .next'), //arrow 설정
  //   responsive: [     
  //     {
  //       //반응형
  //       breakpoint: 1400,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       //반응형
  //       breakpoint: 738,
  //       settings: "unslick"
  //     },
  //   ],
  // });

  //자주찾는 서비스 설정
  $('.set_favorite li > a').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').removeAttr('title');
    } else {
      if ($('.set_favorite a.active').length > 7) {
        return false;
      }
      $(this).addClass('active').attr('title', '선택됨');
    }
  });
  $('.set_favorite .reset').on('click', function () {
    $('.set_favorite li > a').removeClass('active').removeAttr('title');
  });

  //알림판1 슬라이드
  var boardSlide = $('.notice_banner .slide');
  boardSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.notice_banner .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  });
  boardSlide.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: false,
    fade: true,
    prevArrow: $('.notice_banner .prev'), //arrow 설정
    nextArrow: $('.notice_banner .next'), //arrow 설정
  });
  $('.notice_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      boardSlide.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      boardSlide.slick('slickPause');
    }
  });
  //사이드 배너
  var sideBanner = $('.side_banner .slide');
  sideBanner.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: true,
    fade: true,
    appendDots: $('.side_banner .pagination_dot'), //dot 설정
    customPaging: function (slide, i) {
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    arrows: false,
  });
  $('.side_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      sideBanner.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      sideBanner.slick('slickPause');
    }
  });
  //홍보영상 슬라이드
  var proSlide = $('.promotion .slide');
  proSlide.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: true,
    appendDots: $('.promotion .pagination_dot'), //dot 설정
    customPaging: function (slide, i) {
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    arrows: false,
  });
  $('.promotion .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      proSlide.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      proSlide.slick('slickPause');
    }
  });

  //footer 배너슬라이드
  var f_banner = $('.f_banner .slide');
  f_banner.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.f_banner .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  });
  f_banner.slick({
    variableWidth: true,
    autoplay: true,
    cssEase: 'ease-in',
    arrows: false,
    slidesToShow: 8,
    infinite: true,
    dots: true,
    appendDots: $('.f_banner .pagination_dot'), //dot 설정
    customPaging: function (slide, i) {
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    accessibility: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        }
      },
    ]

  });
  $('.f_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      f_banner.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      f_banner.slick('slickPause');
    }
  });

  //팝업 슬라이드
  var popSlide = $('.pop_banner .slide');
  popSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.pop_banner .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  });

  popSlide.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: false,
    variableWidth: true,
    infinite: true,
    slidesToShow: 3,
    // centerMode: true,
    prevArrow: $('.pop_banner .prev'), //arrow 설정
    nextArrow: $('.pop_banner .next'), //arrow 설정    
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          centerMode: true,
        }
      },
    ]
  });

  $('.pop_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      popSlide.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      popSlide.slick('slickPause');
    }
  });

  var Slider = $('.banner .slide');
  Slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner .pagination_num').html('<span class="current">' + i + '</span>/' + slick.slideCount);
  });
  if (Slider.length > 0) {
    Slider.slick({
      centerPadding: 0,
      fade: true,
      dots: false,
      speed: 800,
      autoplay: true,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      infinite: true,
      autoplaySpeed: 12000,
      dots: false,
      prevArrow: $('.banner .prev'),
      nextArrow: $('.banner .next'),
    });
    // mainSlider.slick('refresh');
  }

  var Slider2 = $('.banner2 .slide');
  Slider2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner2 .pagination_num').html('<span class="current">0' + i + '</span>/0' + slick.slideCount);
  });
  if (Slider2.length > 0) {
    Slider2.slick({
      centerPadding: 0,
      dots: false,
      speed: 800,
      autoplay: true,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      infinite: true,
      autoplaySpeed: 4000,
      dots: false,
      prevArrow: $('.banner2 .prev'),
      nextArrow: $('.banner2 .next'),
    });
    // mainSlider.slick('refresh');
  }


  $('.btn.pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').children('.hide').text('일시정지');
      $(this).parent().prev().slick('slickPlay');
    } else {
      $(this).addClass('play').children('.hide').text('자동시작');
      $(this).parent().prev().slick('slickPause');
    }
  });
  Slider.find('iframe').on('mouseenter', function () {
    $('.btn.pause').addClass('play').children('.hide').text('자동시작');
    $('.btn.pause').parent().prev().slick('slickPause');
  });

  //영문 맨 밑 하단 공통 배너슬라이드
  var $bannerPrev = $('.button_prev'),
    $bannerNext = $('.button_next');

  $('.banner_list').slick({
    swipe: true,
    draggable: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    //speed: 1000,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    dots: false,
    arrows: true,
    playText: '재생',
    pauseText: '정지',
    prevArrow: $bannerPrev,
    nextArrow: $bannerNext,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          draggable: true,
        },
      },
    ],
  });

  //메인배너 슬라이드
  var mbSlide = $('.tv_alert .slide');
  mbSlide.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: false,
    speed: 300,
    vertical: true,
    prevArrow: $('.tv_alert .prev'), //arrow 설정
    nextArrow: $('.tv_alert .next'), //arrow 설정
    responsive: [
      {
        breakpoint: 720,
        settings: {
          vertical: false,
          fade: true,
          adaptiveHeight: true,
        },
      },
    ],
  });
  $('.tv_alert .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      mbSlide.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      mbSlide.slick('slickPause');
    }
  });

  $('.banner_box .button_ctrl').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').children('.hide').text('일시정지');
      $(this).parent().next().children().slick('slickPlay');
    } else {
      $(this).addClass('play').children('.hide').text('자동시작');
      $(this).parent().next().children().slick('slickPause');
    }
  });

  $('.guideLine .menu > li > a').click(function () {
    $(this).parent().toggleClass('active').siblings().removeClass('active');
    $(this).attr('title', '메뉴 ')
    $(this).next().stop().slideToggle(300).parent().siblings().children('ol').stop().slideUp();
    return false;
  });

  $(document).on('click', function (e) {
    $('.guideLine .menu > li > ol').stop().slideUp();
  });

  //lnb
  $('.lnb > li > a').click(function (e) {
    if ($(this).parent().hasClass('active')) {
      closeLnb();
      e.preventDefault();
    } else if ($(this).parent().hasClass('selected')) {
      e.preventDefault();
    } else if ($(this).hasClass('menu_btn')) {
      closeLnb();
      $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(
        function () {
          resizeContentHeight();
        }
      );
      $(this).parent().addClass('active');
      e.preventDefault();
    } else {
      closeLnb();
      resetLnb();
      $(this).parent().addClass('active');
    }
  });

  $('.lnb ol > li > a').click(function () {
    resetLnb();
    $(this).parent().addClass('active').siblings('li').removeClass('active');
  });
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.acodian2 button').length) {
      $('.acodian2 ul').stop().slideUp().parents('li').removeClass('active').find('button').attr('title', '열기').find('.hide').text('열기');
    }
  });
  //공통 - 아코디언
  $('.acodian2 > li > button').click(function () {
    var parents = $(this).closest('li');
    if (parents.hasClass('active')) {
      parents.removeClass('active');
      $(this).attr('title', '열기').find('.hide').text('열기');
    } else {
      parents.addClass('active');
      $(this).attr('title', '닫기').find('.hide').text('닫기');
    }
    $(this).next().stop().slideToggle(300).closest('li').siblings('li').children('button').next().stop().slideUp(300);
  });

  //메인 재외공관 셀렉트
  $('.embassy .acodian2 a').on('click', function () {
    var txt = $(this).text();
    $(this).closest('ul').stop().slideUp().siblings('button').children('span').text(txt);
    $(this).closest('ul').closest('li').removeClass('active');
    return false;
  });

  //탭 셀렉트
  $('.tab_select ul > li > a').on('click', function () {
    $(this)
      .addClass('active')
      .attr('title', '선택됨')
      .parent('li')
      .siblings('li')
      .children('a')
      .removeClass('active')
      .removeAttr('title');
    $(this).closest('ul').stop().slideUp().parents('li').removeClass('active');
  });
  //아코디언 - 콤보박스
  $('.combo_box button').on('click', function () {
    if ($(this).parent().hasClass('active')) {
      $(this).attr('title', '하위메뉴 닫힘').next().stop().slideUp(200).parent().removeClass('active');
    } else {
      $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(200).parent().addClass('active');
    }
  });
  // 자주묻는질문 드롭다운메뉴
  var faqBtn = $('.list_dropdown dt a');
  faqBtn.on('click', function () {
    if ($(this).closest('dt').hasClass('active')) {
      $(this).closest('dt').removeClass('active');
      $('.list_dropdown dd').slideUp();
    } else {
      $('.list_dropdown dt').removeClass('active');
      $('.list_dropdown dd').slideUp();
      $(this).closest('dt').addClass('active').next().slideDown();
    }
    return false;
  });
  // 컨텐츠 드롭다운메뉴
  var dropBtn = $('.list_dropdown2 dt a');
  dropBtn.on('click', function () {
    if ($(this).closest('dt').hasClass('active')) {
      $(this).closest('dt').removeClass('active').children('a').attr('title', '내용 닫힘');
      $('.list_dropdown2 dd').slideUp();
    } else {
      $('.list_dropdown2 dt').removeClass('active').children('a').attr('title', '내용 닫힘');
      $('.list_dropdown2 dd').slideUp();
      $(this).closest('dt').addClass('active').next().slideDown();
      $(this).closest('dt').children('a').attr('title', '내용 열림');
    }
    return false;
  });

  $('.tab_list2 > button').on('click', function () {
    if (!pcChk(720)) {
      if ($(this).parent().hasClass('active')) {
        $(this)
          .attr('title', '하위메뉴 닫힘')
          .next()
          .stop()
          .slideUp(200, function () {
            $('.tab_list2 > ul').removeAttr('style');
          })
          .parent()
          .removeClass('active');
      } else {
        $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(200).parent().addClass('active');
      }
    }
  });

  if ($('.tab_list3 > ol').length) {
    $('.tab_list3 > ul > li > a').on('click', function (e) {
      var i = $(this).parent('li').index();
      $(this).closest('ul').siblings('ol').children('li').removeClass('active');
      $(this).closest('ul').siblings('ol').children('li').eq(i).addClass('active');
      resizeContentHeight();
      e.preventDefault();
    });
  }

  $(document).on('click', function (event) {
    if (!$(event.target).closest('.combo_box').length) {
      $('.combo_box button').attr('title', '하위메뉴 닫힘').next().stop().slideUp(200).parent().removeClass('active');
    }
    if (!$(event.target).closest('.tab_list2 > button').length && !pcChk(720)) {
      $('.tab_list2 > button')
        .attr('title', '하위메뉴 닫힘')
        .next()
        .stop()
        .slideUp(200, function () {
          $('.tab_list2 > ul').removeAttr('style');
        })
        .parent()
        .removeClass('active');
    }
  });
  //공통 - 탭컨텐츠
  $('.tab_box > li > button').on('click', function () {
    $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    tabBoxSizing();
    $(this).attr('title', '탭 선택됨').closest('li').siblings().find('button').attr('title', '탭');
  });

  $('.news_tab_menu li').on('click', function(){
    if( $(this).find('a').length ) return;
    var idx = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.news_tab_content .tab_panel').eq(idx).addClass('active').siblings().removeClass('active');
    setupPagination();
  });

  function setupPagination() {
    $('.tab_panel').each(function() {
      var $panel = $(this);
      var $items = $panel.find('ul li');
      var numItems = $items.length;
      var perPage = 6;
      var $controls = $panel.closest('.news_tab_content').find('.controls');
      
      if (numItems <= perPage) {
        $controls.hide();
        return;
      }
      
      $controls.show();
      var numPages = Math.ceil(numItems / perPage);
      var currentPage = 1;

      $items.hide();
      $items.slice(0, perPage).show();

      $controls.find('.prev').off('click').on('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          var start = (currentPage - 1) * perPage;
          var end = start + perPage;
          $items.hide().slice(start, end).show();
        }
      });

      $controls.find('.next').off('click').on('click', function(e) {
        e.preventDefault();
        if (currentPage < numPages) {
          currentPage++;
          var start = (currentPage - 1) * perPage;
          var end = start + perPage;
          $items.hide().slice(start, end).show();
        }
      });
    });
  }

  setupPagination();

  //게시판 상세 글자크기 조절
  $('.fs_up').on('click', function () {
    $('.fs_btn strong').text('글자확대').addClass('active');
    var text = $('.board_detail :nth-child(n)');
    text.each(function () {
      var fontSize = $(this).css('fontSize');
      var num = parseFloat(fontSize);
      num += 1;
      $(this).css('fontSize', num + 'px');
    });
  });
  $('.fs_down').on('click', function () {
    $('.fs_btn strong').text('글자축소').addClass('active');
    var text = $('.board_detail :nth-child(n)');
    text.each(function () {
      var fontSize = $(this).css('fontSize');
      var num = parseFloat(fontSize);
      num -= 1;
      $(this).css('fontSize', num + 'px');
    });
  });

  // 버튼 클릭 active
  $('.date_btn button').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active').siblings('button').removeClass('active');
    }
  });

  //통합검색 상세 온오프
  $('.btn_open_detail').on('click', function () {
    if ($(this).hasClass('active')) {
      $('.total_sch_detail').stop().slideUp();
      $(this).removeClass('active').attr('title', '상세검색 열기');
    } else {
      $('.total_sch_detail').stop().slideDown();
      $(this).addClass('active').attr('title', '상세검색 닫기');
    }
  });

  //통합검색 정렬 버튼
  $('.sch_result .sort button').on('click', function () {
    $(this).addClass('active').attr('title', '선택됨').siblings('button').removeClass('active').removeAttr('title');
  });

  //input 자동완성 보이기
  $(document).on('click', function (event) {
    if ($(event.target).closest('.auto').length) {
      $(event.target).closest('.inp').find('.auto').hide();
      return false;
    }
    if (!$(event.target).closest('.inp').length) {
      $('.inp .auto').hide();
    }
  });
  if ($('.inp .auto').length) {
    $('.inp input').on('focusin', function () {
      $(this).siblings('.auto').show();
    });
    $('.inp .auto li')
      .last()
      .on('focusout', function () {
        $('.inp .auto').hide();
      });
  }

  //국가검색
  $('.map_box area').on('mouseenter click focusin', function () {
    var ths = $(this);
    var alt = ths.attr('alt');
    var thsIdx = ths.index() + 1;
    var thsIdx2 = ths.index();
    $('.map').attr({
      src: '../common/images/sub/bg_0' + thsIdx++ + '.png',
      alt: alt + '지도',
    });
    $('.map_box .txt_box a').removeAttr('title');
    $(this)
      .parent()
      .next()
      .children()
      .eq(thsIdx2)
      .addClass('active')
      .attr('title', '선택됨')
      .siblings()
      .removeClass('active');
  });
  if ($('.map_box').length) {
    $('.map_box .map[usemap]').rwdImageMaps();
  }

  //인트로 스크롤


  //인트로 재외공관
  $('#intro .nation button').on('click', function () {
    if (pcChk(1080)) {
      var chk = $(this).parents().hasClass('row1');
      var chk2 = $(this).parents().hasClass('row2');
      if (chk || chk2) {
        $('#intro .nation li > div').stop().slideUp();
        $('.row1 > div,.row2 > div').stop().slideDown();
      } else {
        $('#intro .nation li > div').stop().slideUp();
        $('.row3 > div,.row4 > div').stop().slideDown();
      }

    } else if (pcChk(720)) {
      var chk = $(this).parents().hasClass('row1');
      var chk2 = $(this).parents().hasClass('row2');
      var chk3 = $(this).parents().hasClass('row3');
      var chk4 = $(this).parents().hasClass('row4');
      if (chk) {
        $('#intro .nation li > div').stop().slideUp();
        $('.row1 > div').stop().slideDown();
      } else if (chk2) {
        $('#intro .nation li > div').stop().slideUp();
        $('.row2 > div').stop().slideDown();
      } else if (chk3) {
        $('#intro .nation li > div').stop().slideUp();
        $('.row3 > div').stop().slideDown();
      } else if (chk4) {
        $('#intro .nation li > div').stop().slideUp();
        $('.row4 > div').stop().slideDown();
      }
    } else {
      $('#intro .nation li > div').stop().slideUp();
      $(this).next().stop().slideToggle();
    }
    $('#intro .nation > li').removeClass('active').children('button').attr('title', '');
    $(this).attr('title', '선택됨').parents().addClass('active');

  });


  /*메인페이지 카운터 */
  // var $countNum = $('.embassy h2 b');
  // jQuery({ Counter: 0 }).animate(
  //   { Counter: $countNum.text() },
  //   {
  //     duration: 1000,
  //     easing: 'swing',
  //     step: function () {
  //       $countNum.text(Math.ceil(this.Counter));
  //     },
  //   }
  // );

  $('.modal_open_close').on('click', function () {//팝업 닫기 버튼 닫기
    $(this).hide();
    $('.btn_quick .pop').css('visibility', 'hidden');
  });

  //모바일의 경우 테이블 스타일 변환
  if (!pcChk(720)) {
    tableChange();
  }


  //사전공표목록 탭 클릭 효과
  $('.tab_anc > li > a').click(function () {
    $(this).attr('title', '선택됨').closest('li').addClass('active').siblings('li').removeClass('active').find('a').removeAttr('title');
  });


  // $('body').css('height', window.innerHeight);
});
$(window).on('resize', function () {
  $('.header_en,.header,.search_open').removeAttr('style').removeClass('active');
  headH = $('.header').outerHeight(); //기본 헤더 높이 전역변수
  if (pcChk(1080)) {
    gnbFloatClear();
  }
  $('.util,.sitemap').removeClass('active');
  closeSitemap(); //사이트맵닫기
  bodyScroll('on'); //body 스크롤 보이기
  introScroll();
  if (!pcChk(720)) {
    tableChange();
  }
  $('.header').removeClass('active').removeAttr('style');
  imgResize(); //.img 이미지 사이즈 조절
  tabBoxSizing(); //탭컨텐츠 높이 조절
  tabResizing1(); //탭버튼 높이 조절
  tabResizing2(); //탭버튼 높이 조절
  tabResizing3(); //탭버튼 높이 조절
  tabContent(); //선택탭 컨텐츠 노출
  slideScroll();
  $('.nation > li').removeClass('active');
  $('.nation > li > div').removeAttr('style');
});
$(window).on('load', function () {
  //lnb 컨텐츠 높이 통일
  resizeContentHeight();
  imgResize();

});

function slick_on_pc(slider, settings) {
  $(window).on('load resize', function () {
    if ($(window).width() < 738) {
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
      return
    }
    if (!slider.hasClass('slick-initialized')) {
      return slider.slick(settings);
    }
  });
};

// 도메인 연구분야 슬라이더
function initDomainSlider() {
  if ($('.domain .slider-for').length && $('.domain .slider-nav').length) {
    
    // 네비게이션 슬라이더 초기화 (먼저 초기화)
    $('.domain .slider-nav').not('.slick-initialized').slick({
      slidesToShow: 10,
      slidesToScroll: 1,
      asNavFor: '.domain .slider-for',
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
      vertical: true,
      verticalSwiping: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 5,
            variableWidth: true,
            adaptiveHeight: true
          }
        },
        {
          breakpoint: 720,
          settings: {
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 3,
            variableWidth: true,
            adaptiveHeight: true
          }
        }
      ]
    });

    // 메인 콘텐츠 슬라이더 초기화 (나중에 초기화)
    $('.domain .slider-for').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: '.domain .slider-nav',
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      speed: 800,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      adaptiveHeight: true
    });

    // 슬라이더 이벤트 바인딩
    $('.domain .slider-nav').on('afterChange', function(event, slick, currentSlide) {
      updateActiveState(currentSlide);
    });

    $('.domain .slider-for').on('afterChange', function(event, slick, currentSlide) {
      updateActiveState(currentSlide);
    });

    // 초기 active 상태 설정
    setTimeout(function() {
      updateActiveState(0);
    }, 100);
  }
}

// 활성 상태 업데이트
function updateActiveState(currentSlide) {
  $('.domain .slider-nav .slick-slide').removeClass('slick-current');
  $('.domain .slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]').addClass('slick-current');
  
  // 페이지네이션 업데이트
  $('.domain-controls .pagination .current').text(currentSlide + 1);
}

// 도메인 슬라이더 제어 버튼
function initDomainControls() {
  // 이전/다음 버튼 클릭 이벤트
  $(document).on('click', '.domain-controls .prev', function() {
    $('.domain .slider-for').slick('slickPrev');
  });
  
  $(document).on('click', '.domain-controls .next', function() {
    $('.domain .slider-for').slick('slickNext');
  });

  // 일시정지/재생 버튼
  $(document).on('click', '.domain-controls .pause', function() {
    $('.domain .slider-for').slick('slickPause');
    $('.domain .slider-nav').slick('slickPause');
    $(this).removeClass('pause').addClass('play');
  });

  $(document).on('click', '.domain-controls .play', function() {
    $('.domain .slider-for').slick('slickPlay');
    $('.domain .slider-nav').slick('slickPlay');
    $(this).removeClass('play').addClass('pause');
  });
}

// 도메인 슬라이더 반응형 처리
function resizeDomainSlider() {
  if ($('.domain .slider-for').hasClass('slick-initialized')) {
    $('.domain .slider-for').slick('resize');
  }
  if ($('.domain .slider-nav').hasClass('slick-initialized')) {
    $('.domain .slider-nav').slick('resize');
  }
}

// DOM 로드 완료 후 초기화
$(document).ready(function() {
  // 기존 초기화 코드들...
  
  // 도메인 슬라이더 초기화
  initDomainSlider();
  initDomainControls();
});

// 윈도우 리사이즈 이벤트
$(window).on('resize', function() {
  // 기존 리사이즈 코드들...
  
  // 도메인 슬라이더 리사이즈
  resizeDomainSlider();
});

// 섹션별 풀페이지 스크롤 기능
function initFullPageScroll() {
  const $html = $('html, body');
  let page = 1;
  const lastPage = 5; // 총 섹션 수
  
  // 기존 indicator 이벤트 제거
  $('#indicator li a').off('click.indicator');
  
  // 초기 페이지 설정
  updateFullPageIndicator(page);
  
  // 마우스 휠 이벤트
  $(window).on("wheel", function(e){
    if($html.is(":animated")) return;
    
    if(e.originalEvent.deltaY > 0){
      if(page == lastPage) return;
      page++;
    } else if(e.originalEvent.deltaY < 0){
      if(page == 1) return;
      page--;
    }
    
    var posTop = (page-1) * $(window).height();
    $html.animate({scrollTop : posTop}, 800);
    
    updateFullPageIndicator(page);
  });
  
  // 인디케이터 클릭 이벤트 (새로 바인딩)
  $('#indicator li a').on('click.fullpage', function(e) {
    e.preventDefault();
    if($html.is(":animated")) return;
    
    const index = $(this).parent().index() + 1;
    page = index;
    
    var posTop = (page-1) * $(window).height();
    $html.animate({scrollTop : posTop}, 800);
    
    updateFullPageIndicator(page);
    return false;
  });
  
  // 인디케이터 업데이트
  function updateFullPageIndicator(currentPage) {
    $('#indicator li').removeClass('active');
    $('#indicator li').eq(currentPage - 1).addClass('active');
  }
  
  // 키보드 네비게이션
  $(document).on('keydown', function(e) {
    if($html.is(":animated")) return;
    
    if (e.keyCode === 40 || e.keyCode === 34) { // 아래 화살표 또는 Page Down
      e.preventDefault();
      if(page == lastPage) return;
      page++;
      var posTop = (page-1) * $(window).height();
      $html.animate({scrollTop : posTop}, 800);
      updateFullPageIndicator(page);
    } else if (e.keyCode === 38 || e.keyCode === 33) { // 위 화살표 또는 Page Up
      e.preventDefault();
      if(page == 1) return;
      page--;
      var posTop = (page-1) * $(window).height();
      $html.animate({scrollTop : posTop}, 800);
      updateFullPageIndicator(page);
    }
  });
  
  // 터치 이벤트 (모바일 지원)
  let touchStartY = 0;
  let touchEndY = 0;
  
  $(document).on('touchstart', function(e) {
    touchStartY = e.originalEvent.touches[0].clientY;
  });
  
  $(document).on('touchend', function(e) {
    if($html.is(":animated")) return;
    
    touchEndY = e.originalEvent.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;
    
    // 최소 터치 거리 (50px)
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        if(page == lastPage) return;
        page++;
      } else {
        if(page == 1) return;
        page--;
      }
      
      var posTop = (page-1) * $(window).height();
      $html.animate({scrollTop : posTop}, 800);
      updateFullPageIndicator(page);
    }
  });
}

// 페이지 로드 시 풀페이지 스크롤 초기화
$(document).ready(function() {
  // 메인 페이지인 경우에만 풀페이지 스크롤 활성화
  if ($('.main').length && $('#indicator').length) {
    // 풀페이지 스크롤 클래스가 있는 경우에만 실행
    if ($('.main.fullpage-scroll').length) {
      initFullPageScroll();
    }
  }
});
