// 공통 함수들은 common-shared.js에서 로드됨
var headH; // 헤더 높이 저장하는 전역변수  
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

function mMenuActive2() {
  // 모바일에서 link클래스가 없는 a태그 클릭시 하위메뉴 열고 닫힘 (한국어 사이트 전용)
  if (!pcChk(1080)) {
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

function snsPositon() {
  if (!pcChk(1080)) {
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
  // GNB 메뉴 모든 active 상태 제거
  $('.header #gnb > ul > li').removeClass('active');
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

/**
 * `.tab_list` 내 탭 버튼의 높이를 가장 높은 버튼의 높이에 맞춰 통일합니다.
 */
function tabResizing1() {
  var tabH = 0;
  // 모든 탭 버튼의 style 속성을 제거하여 초기화합니다.
  $('.tab_list > li > a').removeAttr('style');
  // 각 탭 버튼의 높이를 비교하여 최대 높이를 찾습니다.
  $('.tab_list > li').each(function () {
    if (tabH < $(this).children('a').height()) {
      tabH = $(this).children('a').height();
    }
  });
  // 모든 탭 버튼의 높이를 찾은 최대 높이로 설정합니다.
  $('.tab_list > li > a').height(tabH);
}

/**
 * 인트로 섹션(#intro)의 스크롤 동작을 제어합니다. (PC 환경 720px 이상)
 * 마우스 휠 또는 특정 버튼 클릭 시 다음 섹션(.sec2)으로 부드럽게 스크롤하며 바디 스크롤을 제어합니다.
 */
function introScroll() {
  // #intro 요소가 존재하고 PC 환경(720px 이상)일 경우에만 실행합니다.
  if ($('#intro').length && pcChk(720)) {
    // .sec2 요소의 문서 상단으로부터의 오프셋 위치를 가져옵니다.
    var sec2T = $('.sec2').offset().top;
    // body 스크롤을 비활성화합니다.
    bodyScroll('off');
    
    // 윈도우에 마우스 휠 이벤트 리스너를 추가합니다.
    $(window).on("wheel", function (e) {
      // HTML 요소가 애니메이션 중이면 중복 실행을 방지합니다.
      if ($('html').is(":animated")) {
        return false;
      };
      // 마우스 휠을 아래로 스크롤하고 현재 페이지가 0일 경우 (첫 섹션)
      if (e.originalEvent.deltaY > 0 && page == 0) {
        // HTML, body를 .sec2의 위치로 부드럽게 스크롤합니다.
        $('html,body').animate({ scrollTop: sec2T }, 1000, 'swing', function () {
          bodyScroll('on'); // 스크롤 완료 후 body 스크롤을 다시 활성화합니다.
        });
        page = 1; // 페이지 번호를 1로 업데이트합니다.
      }
    });
    
    // 페이지 로드 시 스크롤 위치가 0보다 크면 (첫 섹션이 아니면)
    if ($(window).scrollTop() > 0) {
      bodyScroll('on'); // body 스크롤을 활성화합니다.
      page = 1; // 페이지 번호를 1로 업데이트합니다.
    }
    
    // 윈도우에 스크롤 이벤트 리스너를 추가합니다.
    $(window).on('scroll', function () {
      // 스크롤 위치가 0일 경우 (첫 섹션으로 돌아왔을 때)
      if ($(window).scrollTop() == 0) {
        bodyScroll('off'); // body 스크롤을 비활성화합니다.
        page = 0; // 페이지 번호를 0으로 초기화합니다.
      }
    });
  } else {
    // #intro 요소가 없거나 모바일 환경인 경우 body 스크롤을 항상 활성화합니다.
    bodyScroll('on');
  }
}

/**
 * 특정 타겟 요소 내의 iframe을 정지합니다.
 * iframe의 `src` 속성을 다시 설정하여 비디오 재생 등을 중지시키는 효과를 냅니다.
 * @param {string} target - iframe을 포함하는 요소를 선택하는 jQuery 셀렉터.
 */
function stopIframe(target) {
  // 타겟 요소가 존재할 경우에만 실행합니다.
  if ($(target).length) {
    // 타겟 요소 내의 iframe의 현재 `src` 속성 값을 가져옵니다.
    var src = $(target).find('iframe').attr('src');
    // iframe의 `src` 속성을 다시 원래 값으로 설정하여 재생을 멈춥니다.
    $(target).find('iframe').attr('src', src);
  }
}

$(function () {
  // GNB(Global Navigation Bar) 초기화: 페이지 로드 시 모든 메뉴를 닫힌 상태로 설정
  $('.header #gnb > ul > li').removeClass('active');
  $('.header').removeClass('active');

  lnbInit(); // LNB 초기화 함수 호출

  // 데이트피커(날짜 선택기) 플러그인 실행
  if ($('.date_inp input').length > 0) {
    $('.date_inp input').datepicker();
  }

  // 스크롤 테이블 레이어(`.scroll_layer`) 감추기: 터치 또는 클릭 시 페이드아웃됩니다.
  $('.scroll_layer').on('touchstart click', function () {
    $(this).fadeOut(200);
  });

  // 모달/팝업 열기 버튼(`.modal_open`, `.pop_open`) 클릭 이벤트
  $('.modal_open,.pop_open').on('click', function () {
    bodyScroll('off'); // 본문 스크롤 비활성화
    openPopup(); // 단일 팝업 열기 함수 호출
    popSlide.slick('setPosition'); // 슬라이드 위치 리셋 (slick slider)
  });

  // 다중 팝업 열기 버튼(`.pop_open2`) 클릭 이벤트
  $('.pop_open2').on('click', function () {
    var popName = $(this).data('pop'); // 클릭된 버튼의 `data-pop` 속성 값 가져오기
    bodyScroll('off'); // 본문 스크롤 비활성화
    openPopup2(popName); // 다중 팝업 열기 함수 호출 (지정된 팝업 열기)
    popSlide.slick('setPosition'); // 슬라이드 위치 리셋 (slick slider)
    return false; // 기본 이벤트 동작 방지
  });

  // 모달/팝업 닫기 버튼(`.modal_close button`, `.loop`) 클릭 이벤트
  $('.modal_close button, .loop').on('click', function () {
    closePopup(); // 팝업 닫기 함수 호출
    bodyScroll('on'); // 본문 스크롤 활성화
  });

  // 검색 열기 버튼(`.search_open`) 클릭 이벤트: 검색창을 열거나 닫습니다.
  $('.search_open').on('click', function () {
    if (!$(this).hasClass('active')) {
      openSearch(); // 검색창 열기
    } else {
      resetSearch(); // 검색창 닫기
    }
    return false; // 기본 이벤트 동작 방지
  });

  // 검색창 내부 버튼(`.search_box button`)의 focusout 이벤트: 검색창을 닫습니다.
  $('.search_box button').on({
    focusout: function () {
      resetSearch();
    }
  });

  // 문서 전체 클릭 이벤트: 검색창 외부 클릭 시 검색창을 닫습니다.
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.search_box').length) {
      resetSearch();
    }
  });

  // GNB 1단계 메뉴 링크(`.header #gnb > ul > li > a`)의 mouseenter 및 focusin 이벤트
  $('.header #gnb > ul > li > a').on({
    // 마우스 진입 시 헤더 높이 조절 및 검색창 비활성화
    mouseenter: function () {
      $('.util > .search_box').removeClass('active');
      resizeHeadHeight(this);
    },
    // 포커스 진입 시 헤더 높이 조절
    focusin: function () {
      resizeHeadHeight(this);
    },
  });

  // GNB(`.header #gnb`)의 mouseleave 이벤트: 마우스가 GNB 영역을 벗어났을 때 헤더 초기화
  $('.header #gnb').on({
    mouseleave: function () {
      // 검색창이 활성화된 상태라면 검색창을 다시 열고 유지
      if ($('.search_open').hasClass('active')) {
        $('.util > .search_box').addClass('active');
        openSearch();
      } else {
        // 그렇지 않다면 GNB 메뉴에서 active 클래스 제거 및 헤더 높이 초기화
        $('.header #gnb > ul > li').removeClass('active');
        gnbReset(); // 헤더 높이 초기화
      }
    },
  });

  // GNB 2단계 메뉴의 마지막 링크(`.header #gnb .dep2_wrap a:last`)의 focusout 이벤트: 포커스가 벗어나면 헤더 초기화
  $('.header #gnb .dep2_wrap a')
    .last()
    .on({
      focusout: function () {
        gnbReset(); // 헤더 높이 초기화
        $('.header #gnb > ul > li').removeClass('active');
      },
    });

  // 모바일 GNB 메뉴 클릭 이벤트
  $('.header #gnb a').on('click', function () {
    var innerMenu = $(this).next('ul'); // 다음 형제 `ul` (3단계 메뉴)
    var innerMenu2 = $(this).next('.dep2_wrap'); // 다음 형제 `.dep2_wrap` (2단계 메뉴)
    // 3단계 메뉴가 있고 모바일 환경(1080px 이하)일 경우
    if (innerMenu.length > 0 && !pcChk(1080)) {
      // 다른 형제 항목의 하위 메뉴를 닫고 현재 항목의 하위 메뉴를 토글합니다.
      $(this).closest('li').siblings('li').find('ul').stop().slideUp(200);
      innerMenu.stop().slideToggle(200);
      return false; // 기본 이벤트 동작 방지
    // 2단계 메뉴가 있고 모바일 환경(1080px 이하)일 경우
    } else if (innerMenu2.length > 0 && !pcChk(1080)) {
      // 다른 형제 항목의 2단계 메뉴를 닫고 현재 항목의 2단계 메뉴를 토글합니다.
      $(this).closest('li').siblings('li').find('.dep2_wrap').stop().slideUp(200);
      innerMenu2.stop().slideToggle(200);
    }
  });

  // 사이트맵 열기 버튼(`.header .sitemap_open`) 클릭 이벤트
  $('.header .sitemap_open').on('click', function () {
    openSitemap(); // 사이트맵 열기 함수 호출
    saveFocus(); // 현재 포커스 요소 저장
    snsPositon(); // SNS 위치 조정
    mGnbInit(); // 모바일 GNB 초기화 (common-shared.js에 정의됨)
    // 모바일 환경(1080px 이하)일 경우 `.header .util`과 `.sitemap`에 'active' 클래스 추가
    if (!pcChk(1080)) {
      $('.header .util,.sitemap').addClass('active');
    }
    mMenuActive1(); // 모바일 메뉴 활성화 함수 호출 (common-shared.js에 정의됨)
    mMenuActive2(); // 모바일 메뉴 활성화 함수 호출 (현재 파일 상단에 정의됨)
    mMenuActive3(); // 모바일 메뉴 활성화 함수 호출 (common-shared.js에 정의됨)
  });

  // 사이트맵 닫기 버튼(`.header .btn_sitemap_close`) 클릭 이벤트
  $('.header .btn_sitemap_close').on({
    click: function () {
      // 모바일 환경(1080px 이하)일 경우 사이트맵 닫기 애니메이션 처리
      if (!pcChk(1080)) {
        $('.sitemap').removeClass('active');
        // 일정 시간 후 `.util` 클래스 제거 (애니메이션 완료 후 처리)
        var delUtil = setTimeout(function () {
          $('.util').removeClass('active');
          clearTimeout(delUtil);
        }, 300);
      }
      closeSitemap(); // 사이트맵 닫기 함수 호출
      returnFocus(); // 이전 포커스 요소로 되돌리기
    },
  });

  // 사이트맵 닫기 버튼(`.btn_sitemap_close`)에서 키보드 이벤트(탭 키) 처리: 포커스 루프
  $(document).on('keydown', '.btn_sitemap_close', function (e) {
    var isShift = window.event.shiftKey ? true : false;
    if (isShift && e.keyCode == 9) { // Shift + Tab
      return; // 역방향 탭 이동 허용
    } else if (event.keyCode == 9) { // Tab
      focusLoop(); // 포커스 루프 함수 호출
      return false; // 기본 탭 이동 방지
    }
  });

  // 메인배너 슬라이드 초기화 (.main_banner .slide)
  var mbSlide = $('.main_banner .slide');
  mbSlide.slick({
    centerMode: true, // 중앙 모드 활성화
    variableWidth: true, // 가변 너비 활성화
    autoplay: true, // 자동 재생 활성화
    cssEase: 'ease-in', // CSS 이징 효과
    dots: false, // 페이지네이션 점 비활성화
    adaptiveHeight: true, // 슬라이드 높이에 따라 동적으로 높이 조절
    prevArrow: $('.main_banner .prev'), // 이전 버튼 사용자 정의
    nextArrow: $('.main_banner .next'), // 다음 버튼 사용자 정의
    autoplaySpeed: 12000, // 자동 재생 간격 (밀리초)
    responsive: [ // 반응형 설정
      {
        breakpoint: 1300, // 1300px 이하 화면 크기에서
        settings: { // 다음 설정 적용
          variableWidth: false, // 가변 너비 비활성화
          centerMode: false, // 중앙 모드 비활성화
          slidesToShow: 1, // 한 번에 하나의 슬라이드만 표시
        },
      },
    ],
  });

  // 메인배너 슬라이드 정지/재생 버튼 클릭 이벤트
  $('.main_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      $('.main_banner .slide').slick('slickPlay'); // 슬라이드 재생
    } else {
      $(this).addClass('play').text('자동재생 시작');
      $('.main_banner .slide').slick('slickPause'); // 슬라이드 정지
    }
  });

  // 사이드 배너 슬라이드 초기화 (.side_banner .slide)
  var sideBanner = $('.side_banner .slide');
  sideBanner.slick({
    autoplay: true, // 자동 재생 활성화
    cssEase: 'ease-in', // CSS 이징 효과
    dots: true, // 페이지네이션 점 활성화
    fade: true, // 페이드 효과 활성화
    appendDots: $('.side_banner .pagination_dot'), // 페이지네이션 점을 추가할 요소 지정
    customPaging: function (slide, i) { // 사용자 정의 페이지네이션 점 HTML
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    arrows: false, // 화살표 버튼 비활성화
  });

  // 사이드 배너 슬라이드 정지/재생 버튼 클릭 이벤트
  $('.side_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      sideBanner.slick('slickPlay'); // 슬라이드 재생
    } else {
      $(this).addClass('play').text('자동재생 시작');
      sideBanner.slick('slickPause'); // 슬라이드 정지
    }
  });

  // 홍보영상 슬라이드 초기화 (.promotion .slide)
  var proSlide = $('.promotion .slide');
  proSlide.slick({
    autoplay: true, // 자동 재생 활성화
    cssEase: 'ease-in', // CSS 이징 효과
    dots: true, // 페이지네이션 점 활성화
    appendDots: $('.promotion .pagination_dot'), // 페이지네이션 점을 추가할 요소 지정
    customPaging: function (slide, i) { // 사용자 정의 페이지네이션 점 HTML
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    arrows: false, // 화살표 버튼 비활성화
  });

  // 홍보영상 슬라이드 정지/재생 버튼 클릭 이벤트
  $('.promotion .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      proSlide.slick('slickPlay'); // 슬라이드 재생
    } else {
      $(this).addClass('play').text('자동재생 시작');
      proSlide.slick('slickPause'); // 슬라이드 정지
    }
  });

  // 푸터 배너 슬라이드 초기화 (.f_banner .slide)
  var f_banner = $('.f_banner .slide');
  // 슬라이드 초기화, 재초기화, 슬라이드 변경 후 이벤트 시 페이지네이션 번호 업데이트
  f_banner.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.f_banner .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  });
  f_banner.slick({
    variableWidth: true, // 가변 너비 활성화
    autoplay: true, // 자동 재생 활성화
    cssEase: 'ease-in', // CSS 이징 효과
    arrows: false, // 화살표 버튼 비활성화
    slidesToShow: 8, // 한 번에 8개의 슬라이드 표시
    infinite: true, // 무한 루프 활성화
    dots: true, // 페이지네이션 점 활성화
    appendDots: $('.f_banner .pagination_dot'), // 페이지네이션 점을 추가할 요소 지정
    customPaging: function (slide, i) { // 사용자 정의 페이지네이션 점 HTML
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
    },
    accessibility: true, // 접근성 기능 활성화
    autoplaySpeed: 2000, // 자동 재생 간격 (밀리초)
    responsive: [ // 반응형 설정
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

  // 푸터 배너 슬라이드 정지/재생 버튼 클릭 이벤트
  $('.f_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      f_banner.slick('slickPlay'); // 슬라이드 재생
    } else {
      $(this).addClass('play').text('자동재생 시작');
      f_banner.slick('slickPause'); // 슬라이드 정지
    }
  });

  // 팝업 슬라이드 초기화 (.pop_banner .slide)
  var popSlide = $('.pop_banner .slide');
  // 슬라이드 초기화, 재초기화, 슬라이드 변경 후 이벤트 시 페이지네이션 번호 업데이트
  popSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.pop_banner .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  });

  popSlide.slick({
    autoplay: true, // 자동 재생 활성화
    cssEase: 'ease-in', // CSS 이징 효과
    dots: false, // 페이지네이션 점 비활성화
    variableWidth: true, // 가변 너비 활성화
    infinite: true, // 무한 루프 활성화
    slidesToShow: 3, // 한 번에 3개의 슬라이드 표시
    prevArrow: $('.pop_banner .prev'), // 이전 버튼 사용자 정의
    nextArrow: $('.pop_banner .next'), // 다음 버튼 사용자 정의
    responsive: [ // 반응형 설정
      {
        breakpoint: 1080, // 1080px 이하 화면 크기에서
        settings: { // 다음 설정 적용
          centerMode: true, // 중앙 모드 활성화
        }
      },
    ]
  });

  // 팝업 슬라이드 정지/재생 버튼 클릭 이벤트
  $('.pop_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      popSlide.slick('slickPlay'); // 슬라이드 재생
    } else {
      $(this).addClass('play').text('자동재생 시작');
      popSlide.slick('slickPause'); // 슬라이드 정지
    }
  });

  // 일반 배너 슬라이드 초기화 (.banner .slide)
  var Slider = $('.banner .slide');
  // 슬라이드 초기화, 재초기화, 슬라이드 변경 후 이벤트 시 페이지네이션 번호 업데이트
  Slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner .pagination_num').html('<span class="current">' + i + '</span>/' + slick.slideCount);
  });
  // 슬라이더 요소가 존재할 경우 초기화
  if (Slider.length > 0) {
    Slider.slick({
      centerPadding: 0, // 중앙 모드에서 좌우 패딩
      fade: true, // 페이드 효과 활성화
      dots: false, // 페이지네이션 점 비활성화
      speed: 800, // 애니메이션 속도
      autoplay: true, // 자동 재생 활성화
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', // CSS 이징 효과
      infinite: true, // 무한 루프 활성화
      autoplaySpeed: 12000, // 자동 재생 간격
      prevArrow: $('.banner .prev'), // 이전 버튼 사용자 정의
      nextArrow: $('.banner .next'), // 다음 버튼 사용자 정의
    });
  }

  // 일반 배너 슬라이드 2 초기화 (.banner2 .slide)
  var Slider2 = $('.banner2 .slide');
  // 슬라이드 초기화, 재초기화, 슬라이드 변경 후 이벤트 시 페이지네이션 번호 업데이트 (01/0N 형식)
  Slider2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner2 .pagination_num').html('<span class="current">0' + i + '</span>/0' + slick.slideCount);
  });
  // 슬라이더 요소가 존재할 경우 초기화
  if (Slider2.length > 0) {
    Slider2.slick({
      centerPadding: 0, // 중앙 모드에서 좌우 패딩
      dots: false, // 페이지네이션 점 비활성화
      speed: 800, // 애니메이션 속도
      autoplay: true, // 자동 재생 활성화
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', // CSS 이징 효과
      infinite: true, // 무한 루프 활성화
      autoplaySpeed: 4000, // 자동 재생 간격
      prevArrow: $('.banner2 .prev'), // 이전 버튼 사용자 정의
      nextArrow: $('.banner2 .next'), // 다음 버튼 사용자 정의
    });
  }

  // 일반 슬라이더 제어 버튼(`.btn.pause`) 클릭 이벤트
  $('.btn.pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').children('.hide').text('일시정지');
      $(this).parent().prev().slick('slickPlay'); // 이전 형제 슬라이더 재생
    } else {
      $(this).addClass('play').children('.hide').text('자동시작');
      $(this).parent().prev().slick('slickPause'); // 이전 형제 슬라이더 정지
    }
  });
  // 슬라이더 내 iframe에 마우스 진입 시 슬라이더 정지
  Slider.find('iframe').on('mouseenter', function () {
    $('.btn.pause').addClass('play').children('.hide').text('자동시작');
    $('.btn.pause').parent().prev().slick('slickPause');
  });

 

  // LNB(로컬 내비게이션 바) 1단계 메뉴 링크 클릭 이벤트
  $('.lnb > li > a').click(function (e) {
    // 현재 LNB 항목이 'active' 상태일 경우 (열려있는 상태)
    if ($(this).parent().hasClass('active')) {
      closeLnb(); // LNB 닫기 함수 호출
      e.preventDefault(); // 기본 링크 동작 방지
    // 현재 LNB 항목이 'selected' 상태일 경우
    } else if ($(this).parent().hasClass('selected')) {
      e.preventDefault(); // 기본 링크 동작 방지
    // 현재 LNB 항목이 'menu_btn' 클래스를 가지고 있을 경우 (하위 메뉴가 있는 경우)
    } else if ($(this).hasClass('menu_btn')) {
      closeLnb(); // 다른 LNB 항목 닫기
      // 현재 링크의 타이틀을 '하위메뉴 열림'으로 변경하고 하위 메뉴를 슬라이드 다운하여 엽니다.
      $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(
        function () {
          resizeContentHeight(); // 콘텐츠 높이 조절 함수 호출
        }
      );
      $(this).parent().addClass('active'); // 현재 항목에 'active' 클래스 추가
      e.preventDefault(); // 기본 링크 동작 방지
    } else {
      // 그 외의 경우 (하위 메뉴가 없는 일반 링크)
      closeLnb(); // 다른 LNB 항목 닫기
      resetLnb(); // 선택된 LNB 상태 초기화
      $(this).parent().addClass('active'); // 현재 항목에 'active' 클래스 추가
    }
  });

  // LNB 2단계 메뉴 링크 클릭 이벤트
  $('.lnb ol > li > a').click(function () {
    resetLnb(); // 선택된 LNB 상태 초기화
    $(this).parent().addClass('active').siblings('li').removeClass('active'); // 클릭된 항목 활성화, 형제 항목 비활성화
  });

  // 아코디언(`.acodian2`) 외부 클릭 이벤트: 아코디언 닫기
  $(document).on('click', function (event) {
    // 클릭된 요소가 `.acodian2 button`의 자손이 아닐 경우
    if (!$(event.target).closest('.acodian2 button').length) {
      // 모든 `.acodian2 ul`을 슬라이드 업하여 닫고, 부모 'li'에서 'active' 클래스를 제거합니다.
      // 버튼의 타이틀과 숨김 텍스트를 '열기'로 변경합니다.
      $('.acodian2 ul').stop().slideUp().parents('li').removeClass('active').find('button').attr('title', '열기').find('.hide').text('열기');
    }
  });

  // 공통 아코디언(`.acodian2 > li > button`) 클릭 이벤트
  $('.acodian2 > li > button').click(function () {
    var parents = $(this).closest('li'); // 클릭된 버튼의 부모 `li` 요소
    if (parents.hasClass('active')) {
      // 현재 항목이 활성화된 상태일 경우 비활성화
      parents.removeClass('active');
      $(this).attr('title', '열기').find('.hide').text('열기');
    } else {
      // 현재 항목이 비활성화된 상태일 경우 활성화
      parents.addClass('active');
      $(this).attr('title', '닫기').find('.hide').text('닫기');
    }
    // 현재 항목의 다음 형제(콘텐츠)를 슬라이드 토글하고,
    // 다른 형제 항목들의 콘텐츠는 슬라이드 업하여 닫습니다.
    $(this).next().stop().slideToggle(300).closest('li').siblings('li').children('button').next().stop().slideUp(300);
  });

  //공통 - 탭컨텐츠
  $('.tab_box > li > button').on('click', function () {
    $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    tabBoxSizing();
    $(this).attr('title', '탭 선택됨').closest('li').siblings().find('button').attr('title', '탭');
  });


  // 초기 슬라이더 설정
  initNewsSlider();

  // 창 크기 변경 시 다시 초기화
  $(window).on('resize', function() {
    initNewsSlider();
  });

  // 초기 뉴스 슬라이더 설정 및 창 크기 변경 시 재초기화
  initNewsSlider();
  $(window).on('resize', function() {
    initNewsSlider();
  });

  $('.modal_open_close').on('click', function () {//팝업 닫기 버튼 닫기
    $(this).hide();
    $('.btn_quick .pop').css('visibility', 'hidden');
  });

  //모바일의 경우 테이블 스타일 변환
  if (!pcChk(720)) {
    tableChange();
  }


});

$(window).on('resize', function () {
  $('.header,.search_open').removeAttr('style').removeClass('active scrolled');
  // GNB 메뉴도 초기화
  $('.header #gnb > ul > li').removeClass('active');
  headH = $('.header').outerHeight(); //기본 헤더 높이 전역변수
  if (pcChk(1080)) {
    gnbFloatClear();
  }
  $('.util,.sitemap').removeClass('active');
  closeSitemap(); //사이트맵닫기
  if (!pcChk(1080)) {
    tableChange();
  }
  $('.header').removeClass('active scrolled').removeAttr('style');
  imgResize(); //.img 이미지 사이즈 조절
  
  // 도메인 슬라이더 리사이즈 시 재초기화 (디바운싱 적용)
  if ($('.domain').length) {
    clearTimeout(window.domainSliderTimer);
    window.domainSliderTimer = setTimeout(function() {
      initDomainSlider();
    }, 300);
  }
});

$(window).on('load', function () {
  //lnb 컨텐츠 높이 통일
  resizeContentHeight();
  imgResize();
  
  // GNB 최종 초기화 - 모든 리소스 로드 완료 후 확실히 닫힌 상태로 설정
  $('.header #gnb > ul > li').removeClass('active');
  $('.header').removeClass('active');
  gnbReset(); // GNB 리셋 함수도 실행
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

// 도메인 슬라이더 초기화 (slick.js 사용)
function initDomainSlider() {
  if ($('.domain').length) {
    
    // 기존 이벤트 핸들러 제거
    $('.domain-controls .prev, .domain-controls .next, .domain-controls .pause').off('click');
    
    // 기존 슬라이더가 있다면 제거
    if ($('.domain-content.slider-for').hasClass('slick-initialized')) {
      $('.domain-content.slider-for').slick('unslick');
    }
    if ($('.domain-nav.slider-nav').hasClass('slick-initialized')) {
      $('.domain-nav.slider-nav').slick('unslick');
    }
    
    // 1080px 이하에서는 모바일 슬라이더
    if ($(window).width() <= 1080) {
      
      // 모바일 세로 카드 슬라이더
      $('.domain-content.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '20px',
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        infinite: true,
        variableWidth: false
      });
      
      // 모바일 슬라이더 이벤트 처리
      $('.domain-content.slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // 페이지네이션 업데이트
        $('.domain-controls .pagination .current').text(nextSlide + 1);
      });
      
      // 모바일 컨트롤 버튼 연결
      $('.domain-controls .prev').on('click', function() {
        $('.domain-content.slider-for').slick('slickPrev');
      });
      
      $('.domain-controls .next').on('click', function() {
        $('.domain-content.slider-for').slick('slickNext');
      });
      
      $('.domain-controls .pause').on('click', function() {
        var slider = $('.domain-content.slider-for');
        if ($(this).hasClass('paused')) {
          slider.slick('slickPlay');
          $(this).removeClass('paused');
        } else {
          slider.slick('slickPause');
          $(this).addClass('paused');
        }
      });
      
      // 컨트롤 버튼 표시
      $('.domain-controls').show();
      
      return;
    }
    
    // PC에서만 기존 슬라이더 초기화
    // 콘텐츠 슬라이더 (메인)
    $('.domain-content.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.domain-nav.slider-nav',
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true
    });
    
    // 네비게이션 슬라이더 (세로 방향)
    $('.domain-nav.slider-nav').slick({
      slidesToShow: 9,
      slidesToScroll: 1,
      asNavFor: '.domain-content.slider-for',
      vertical: true,
      verticalSwiping: true,
      centerMode: true,
      centerPadding: '0px',
      focusOnSelect: true,
      infinite: true,
      arrows: false
    });
    
    // PC 슬라이더 이벤트 처리
    $('.domain-nav.slider-nav').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      // 페이지네이션 업데이트
      $('.domain-controls .pagination .current').text(nextSlide + 1);
      
      // 짝수번째 슬라이드(data-index가 1,3,5,7,9)일 때 클래스 추가
      if (nextSlide === 1 || nextSlide === 3 || nextSlide === 5 || nextSlide === 7 || nextSlide === 9) {
        $('.domain').addClass('even-slide');
      } else {
        $('.domain').removeClass('even-slide');
      }
    });
    
    // PC 컨트롤 버튼 연결
    $('.domain-controls .prev').on('click', function() {
      $('.domain-nav.slider-nav').slick('slickPrev');
    });
    
    $('.domain-controls .next').on('click', function() {
      $('.domain-nav.slider-nav').slick('slickNext');
    });
    
    $('.domain-controls .pause').on('click', function() {
      var slider = $('.domain-content.slider-for');
      if ($(this).hasClass('paused')) {
        slider.slick('slickPlay');
        $(this).removeClass('paused');
      } else {
        slider.slick('slickPause');
        $(this).addClass('paused');
      }
    });
    
    // 컨트롤 버튼 표시
    $('.domain-controls').show();
    
    // 초기 상태 설정 (첫 번째 슬라이드는 index 0이므로 홀수번째)
    $('.domain').removeClass('even-slide');
  }
}

// DOM 로드 완료 후 도메인 슬라이더 초기화 
$(document).ready(function() {
  // 모든 라이브러리와 이미지 로딩 후 도메인 슬라이더 초기화
  $(window).on('load', function() {
    setTimeout(function() {
      if ($('.domain').length && typeof $.fn.slick !== 'undefined') {
        initDomainSlider();
      }
    }, 200);
  });
  
  // DOM 준비 즉시 초기화 (백업)
  setTimeout(function() {
    if ($('.domain').length && typeof $.fn.slick !== 'undefined') {
      initDomainSlider();
    }
  }, 100);
});

// indicator 제어
$(document).ready(function() {
  const $indicator = $('#indicator');
  const $contents = $('#contents');
  const $sections = $('[data-mainnavi]');
  const $footer = $('.footer'); // 클래스 선택자로 수정
  
  // 스크롤 이벤트 핸들러
  $(window).on('scroll', function() {
    // 요소 존재 체크
    if ($contents.length === 0 || $footer.length === 0) {
      return;
    }
    
    const scrollTop = $(window).scrollTop();
    const contentsTop = $contents.offset().top;
    const footerTop = $footer.offset().top;
    const windowHeight = $(window).height();
    
    // contents 영역과 footer 영역 사이에서만 indicator 표시
    if (scrollTop >= contentsTop && scrollTop + windowHeight <= footerTop) {
      $indicator.css('opacity', '1');
      
      // 현재 보이는 섹션에 따라 active 클래스 변경
      let currentActiveSection = null;
      
      $sections.each(function() {
        const $section = $(this);
        if ($section.length === 0) return;
        
        const sectionTop = $section.offset().top;
        const sectionBottom = sectionTop + $section.height();
        
        // 반응형에 따른 오프셋 조정
        const navType = $section.data('mainnavi');
        let offset = $(window).width() <= 1080 ? 100 : 100;
        
        if (scrollTop >= sectionTop - offset && scrollTop < sectionBottom) {
          $indicator.find('li').removeClass('active');
          $indicator.find(`li[data-mainnavi="${navType}"]`).addClass('active');
          currentActiveSection = navType;
        }
      });
      
      // news 섹션 활성화 시 marginTop 추가/제거 (1080px 이하에서만)
      if ($(window).width() <= 1080) {
        const $newsSection = $('[data-mainnavi="news"]');
        
        if (currentActiveSection === 'news') {
          // news 섹션이 활성화되면 marginTop 추가
          if (!$newsSection.hasClass('news-margin-active')) {
            $newsSection.addClass('news-margin-active').css('padding-top', '100px');
          }
        } else {
          // 다른 섹션이 활성화되면 marginTop 제거
          if ($newsSection.hasClass('news-margin-active')) {
            $newsSection.removeClass('news-margin-active').css('margin-top', '');
          }
        }
      } else {
        // 1080px 초과일 때는 항상 marginTop 제거
        const $newsSection = $('[data-mainnavi="news"]');
        if ($newsSection.hasClass('news-margin-active')) {
          $newsSection.removeClass('news-margin-active').css('margin-top', '');
        }
      }
    } else {
      $indicator.css('opacity', '0');
    }
  });
  
  // indicator 클릭 이벤트
  $indicator.find('li').on('click', function() {
    const navType = $(this).data('mainnavi');
    const $targetSection = $(`[data-mainnavi="${navType}"]`).first();
    
    if ($targetSection.length) {
      let clickOffset = 110;
      
      // news 섹션의 경우 1080px 이하에서 h2 타이틀이 보이도록 조정
      if (navType === 'news' && $(window).width() <= 1080) {
        clickOffset = 40;
      }
      
      $('html, body').animate({
        scrollTop: $targetSection.offset().top - clickOffset
      }, 500);
    }
  });
  
  // 초기 실행
  $(window).trigger('scroll');
  
  // 창 크기 변경 시 news 섹션 marginTop 처리
  $(window).on('resize', function() {
    const $newsSection = $('[data-mainnavi="news"]');
    
    if ($(window).width() > 1080) {
      // 1080px 초과일 때는 marginTop 제거
      if ($newsSection.hasClass('news-margin-active')) {
        $newsSection.removeClass('news-margin-active').css('margin-top', '');
      }
    }
    // 1080px 이하일 때는 스크롤 이벤트에서 처리
  });
});

// TOP 버튼 기능
$(document).ready(function() {
  const $topBtn = $('#topBtn');
  
  // 스크롤 이벤트 - top 버튼 show/hide
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      $topBtn.addClass('show');
    } else {
      $topBtn.removeClass('show');
    }
  });
  
  // top 버튼 클릭 이벤트 - 페이지 상단으로 부드럽게 이동
  $topBtn.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 600, 'swing');
  });
});

// 모달 공통 - 배경 스크롤 방지 함수
function preventBodyScroll() {
  const scrollY = window.scrollY;
  $('body').addClass('modal-open').css('top', `-${scrollY}px`);
}

function allowBodyScroll() {
  const scrollY = $('body').css('top');
  $('body').removeClass('modal-open').css('top', '');
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}

// 관련사이트/관련기관 모달 기능
$(document).ready(function() {
  // 모달 열기
  $('.btn_modal_open').on('click', function() {
    const modalType = $(this).data('modal');
    const $modal = $(`#modal-${modalType}`);
    
    if ($modal.length) {
      preventBodyScroll();
      $modal.addClass('show');
    }
  });
  
  // 모달 닫기 (X 버튼)
  $('.btn_modal_close').on('click', function() {
    $(this).closest('.modal_overlay').removeClass('show');
    allowBodyScroll();
  });
  
  // 모달 닫기 (배경 클릭)
  $('.modal_overlay').on('click', function(e) {
    if (e.target === this) {
      $(this).removeClass('show');
      allowBodyScroll();
    }
  });
  
  // 모달 닫기 (ESC 키)
  $(document).on('keydown', function(e) {
    if (e.keyCode === 27) { // ESC 키
      $('.modal_overlay.show').removeClass('show');
      allowBodyScroll();
    }
  });
});

// certification 섹션 슬라이더 초기화 (스크롤 이벤트로 처리)
$(window).on('scroll', function() {
  var certificationOffset = $('.certification').offset();
  if (certificationOffset && $(window).scrollTop() >= certificationOffset.top - $(window).height() / 2) {
    if(!$('.support_list').hasClass('slick-initialized')){
      $('.support_list').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        dots: false,
        arrows: true,
        prevArrow: $('.support_banner .support_btn_prev'),
        nextArrow: $('.support_banner .support_btn_next'),
        pauseOnHover: false,
        pauseOnFocus: false,
        swipe: true,
        draggable: true,
        responsive: [
          {
          breakpoint: 1080,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
          },
          {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
          }
        ]
      });
    }
  }
});

// 탭 박스 기능
$(".tab_box > li").on("click", function () {
  let idx = $(this).index();
  $(this).addClass("active").siblings().removeClass("active");
  $(this).parent().siblings().children().eq(idx).show().siblings().hide();
});

// 팝업 슬라이드
$('.slide_pop').slick({
  dots: true,
  appendDots: $('.modal_pop[data-pop="pop1"] .pagination_num'),
  customPaging: function (slider, i) {
    return '<button>' + (i + 1) + '/' + slider.slideCount + '</button>';
  },
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: $('.modal_pop[data-pop="pop1"] .prev'),
  nextArrow: $('.modal_pop[data-pop="pop1"] .next')
});

$('.modal_pop[data-pop="pop1"] .pause').on('click', function () {
  if ($(this).hasClass('play')) {
    $('.slide_pop').slick('slickPlay');
    $(this).removeClass('play');
    $(this).text('자동재생 정지');
  } else {
    $('.slide_pop').slick('slickPause');
    $(this).addClass('play');
    $(this).text('자동재생 시작');
  }
});

// 연구인터뷰 슬라이더 초기화 함수
function initInterviewSlider() {
  if ($('.interview_slider').length) {
    const windowWidth = $(window).width();
    
    // 모바일(1080px 이하)에서만 슬라이더 활성화
    if (windowWidth <= 1080) {
      // 기존 슬라이더가 없을 때만 초기화
      if (!$('.interview_slider').hasClass('slick-initialized')) {
        $('.interview_slider').slick({
          dots: false,
          infinite: true,
          speed: 600,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 4000,
          arrows: false,
          draggable: true,
          swipe: true,
          touchMove: true,
          centerMode: true,
          centerPadding: '50px',
          responsive: [
            {
              breakpoint: 768,
              settings: {
                centerPadding: '0px'
              }
            }
          ]
        });

        // 커스텀 화살표 버튼 이벤트
        $('.interview_prev').off('click').on('click', function() {
          $('.interview_slider').slick('slickPrev');
        });

        $('.interview_next').off('click').on('click', function() {
          $('.interview_slider').slick('slickNext');
        });
      }
    } else {
      // 데스크톱에서는 슬라이더 비활성화
      if ($('.interview_slider').hasClass('slick-initialized')) {
        $('.interview_slider').slick('unslick');
      }
    }
  }
}

// 페이지 로드 시 인터뷰 슬라이더 초기화
$(document).ready(function() {
  initInterviewSlider();
});

// 윈도우 리사이즈 시 인터뷰 슬라이더 재초기화
$(window).on('resize', function() {
  clearTimeout(window.interviewResizeTimer);
  window.interviewResizeTimer = setTimeout(function() {
    initInterviewSlider();
  }, 250);
});


// 탭 셀렉트(`.tab_select ul > li > a`) 클릭 이벤트
$('.tab_select ul > li > a').on('click', function () {
  $(this)
    .addClass('active') // 클릭된 항목 활성화
    .attr('title', '선택됨') // 타이틀 '선택됨'으로 설정
    .parent('li') // 부모 `li` 선택
    .siblings('li') // 모든 형제 `li` 선택
    .children('a') // 형제 `li`의 자식 `a` 태그 선택
    .removeClass('active') // 형제 `a` 태그 비활성화
    .removeAttr('title'); // 형제 `a` 태그 타이틀 제거
  $(this).closest('ul').stop().slideUp().parents('li').removeClass('active'); // 부모 `ul` 닫고 부모 `li` 비활성화
});

// 아코디언 - 콤보박스(`.combo_box button`) 클릭 이벤트
$('.combo_box button').on('click', function () {
  if ($(this).parent().hasClass('active')) {
    // 활성화된 상태일 경우 하위 메뉴 닫기
    $(this).attr('title', '하위메뉴 닫힘').next().stop().slideUp(200).parent().removeClass('active');
  } else {
    // 비활성화된 상태일 경우 하위 메뉴 열기
    $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(200).parent().addClass('active');
  }
});

// 자주묻는질문 드롭다운 메뉴(`.list_dropdown dt a`) 클릭 이벤트
var faqBtn = $('.list_dropdown dt a');
faqBtn.on('click', function () {
  if ($(this).closest('dt').hasClass('active')) {
    // 활성화된 질문을 클릭하면 닫기
    $(this).closest('dt').removeClass('active');
    $('.list_dropdown dd').slideUp();
  } else {
    // 다른 질문을 클릭하면 기존 질문 닫고 현재 질문 열기
    $('.list_dropdown dt').removeClass('active');
    $('.list_dropdown dd').slideUp();
    $(this).closest('dt').addClass('active').next().slideDown();
  }
  return false; // 기본 이벤트 동작 방지
});

// 컨텐츠 드롭다운 메뉴(`.list_dropdown2 dt a`) 클릭 이벤트
var dropBtn = $('.list_dropdown2 dt a');
dropBtn.on('click', function () {
  if ($(this).closest('dt').hasClass('active')) {
    // 활성화된 콘텐츠를 클릭하면 닫기
    $(this).closest('dt').removeClass('active').children('a').attr('title', '내용 닫힘');
    $('.list_dropdown2 dd').slideUp();
  } else {
    // 다른 콘텐츠를 클릭하면 기존 콘텐츠 닫고 현재 콘텐츠 열기
    $('.list_dropdown2 dt').removeClass('active').children('a').attr('title', '내용 닫힘');
    $('.list_dropdown2 dd').slideUp();
    $(this).closest('dt').addClass('active').next().slideDown();
    $(this).closest('dt').children('a').attr('title', '내용 열림');
  }
  return false; // 기본 이벤트 동작 방지
});

// 탭 리스트2(`.tab_list2 > button`) 버튼 클릭 이벤트 (모바일용)
$('.tab_list2 > button').on('click', function () {
  // PC 환경(720px 이상)이 아닐 경우 (모바일 환경)
  if (!pcChk(720)) {
    if ($(this).parent().hasClass('active')) {
      // 활성화된 상태일 경우 하위 메뉴 닫기
      $(this)
        .attr('title', '하위메뉴 닫힘')
        .next()
        .stop()
        .slideUp(200, function () {
          $('.tab_list2 > ul').removeAttr('style'); // 슬라이드 업 완료 후 style 속성 제거
        })
        .parent()
        .removeClass('active');
    } else {
      // 비활성화된 상태일 경우 하위 메뉴 열기
      $(this).attr('title', '하위메뉴 열림').next().stop().slideDown(200).parent().addClass('active');
    }
  }
});

// 탭 리스트3(`.tab_list3 > ul > li > a`) 링크 클릭 이벤트
if ($('.tab_list3 > ol').length) { // `.tab_list3`에 콘텐츠 영역이 있을 경우에만 실행
  $('.tab_list3 > ul > li > a').on('click', function (e) {
    var i = $(this).parent('li').index(); // 클릭된 탭의 인덱스 가져오기
    // 모든 탭 콘텐츠에서 'active' 클래스 제거
    $(this).closest('ul').siblings('ol').children('li').removeClass('active');
    // 클릭된 탭의 인덱스에 해당하는 콘텐츠에 'active' 클래스 추가
    $(this).closest('ul').siblings('ol').children('li').eq(i).addClass('active');
    resizeContentHeight(); // 콘텐츠 높이 조절 함수 호출
    e.preventDefault(); // 기본 이벤트 동작 방지
  });
}

// 문서 전체 클릭 이벤트: `.combo_box`와 `.tab_list2`의 하위 메뉴를 닫습니다.
$(document).on('click', function (event) {
  // 클릭된 요소가 `.combo_box`의 자손이 아닐 경우 콤보 박스 하위 메뉴를 닫습니다.
  if (!$(event.target).closest('.combo_box').length) {
    $('.combo_box button').attr('title', '하위메뉴 닫힘').next().stop().slideUp(200).parent().removeClass('active');
  }
  // 클릭된 요소가 `.tab_list2 > button`의 자손이 아니고 PC 환경이 아닐 경우 탭 리스트2 하위 메뉴를 닫습니다.
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

// 공통 - 탭컨텐츠(`.tab_box > li > button`) 클릭 이벤트
$('.tab_box > li > button').on('click', function () {
  // 클릭된 탭 항목에 'active' 클래스를 추가하고 형제 항목에서는 제거합니다.
  $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
  tabBoxSizing(); // 탭 박스 높이 조절 함수 호출
  // 클릭된 버튼의 타이틀을 '탭 선택됨'으로 변경하고 다른 탭 버튼의 타이틀은 '탭'으로 변경합니다.
  $(this).attr('title', '탭 선택됨').closest('li').siblings().find('button').attr('title', '탭');
});

// 뉴스 탭 메뉴(`.news_tab_menu li`) 클릭 이벤트
$('.news_tab_menu li').on('click', function(){
  // 만약 `li` 내에 `a` 태그가 있다면 (링크 기능이 있다면) 함수 실행을 중단합니다.
  if( $(this).find('a').length ) return;
  var idx = $(this).index(); // 클릭된 탭의 인덱스 가져오기
  $(this).addClass('active').siblings().removeClass('active'); // 클릭된 탭 활성화, 형제 탭 비활성화
  $('.news_tab_content .tab_panel').eq(idx).addClass('active').siblings().removeClass('active'); // 해당 콘텐츠 활성화
  initNewsSlider(); // 뉴스 슬라이더 초기화 함수 호출
});

/**
 * 뉴스 슬라이더를 초기화하고 반응형에 따라 아이템 수를 조절합니다.
 * slick 슬라이더 대신 간단한 페이징 방식을 사용합니다.
 */
function initNewsSlider() {
  // 활성화된 탭 패널 내의 뉴스 슬라이더에 대해 반복합니다.
  $('.tab_panel.active .news_slider').each(function() {
    var $slider = $(this);
    var $items = $slider.find('li'); // 슬라이드 아이템들
    var numItems = $items.length; // 총 아이템 개수
    
    // 반응형에 따른 itemsPerPage (한 페이지에 보여줄 아이템 수) 설정
    var itemsPerPage;
    if (window.innerWidth <= 1080) {
      itemsPerPage = 3;
    } else {
      itemsPerPage = 6;
    }
    
    var $controls = $('.news_controls'); // 슬라이더 컨트롤 요소
    
    // 기존 slick 슬라이더가 초기화되어 있다면 해제합니다.
    if ($slider.hasClass('slick-initialized')) {
      $slider.slick('unslick');
    }
    
    // 컨트롤 버튼(이전/다음)은 항상 보이도록 설정합니다.
    $controls.find('.news_prev, .news_next').show();
    
    // 총 아이템 개수가 itemsPerPage 이하면 슬라이더를 비활성화하고 버튼만 비활성화합니다.
    if (numItems <= itemsPerPage) {
      $controls.find('.news_prev, .news_next').addClass('disabled');
      $slider.removeClass('news-slider-active');
      return;
    }
    
    // 총 아이템 개수가 itemsPerPage 초과이면 슬라이더를 활성화합니다.
    $slider.addClass('news-slider-active');
    
    // 간단한 페이징 방식 구현을 위한 변수
    var currentPage = 0; // 현재 페이지
    var totalPages = Math.ceil(numItems / itemsPerPage); // 전체 페이지 수 계산
    
    /**
     * 지정된 페이지의 아이템들을 보여주고 버튼 상태를 업데이트합니다.
     * @param {number} pageIndex - 보여줄 페이지의 인덱스 (0부터 시작).
     */
    function showPage(pageIndex) {
      $items.hide(); // 모든 아이템 숨기기
      var start = pageIndex * itemsPerPage; // 현재 페이지의 시작 인덱스
      var end = start + itemsPerPage; // 현재 페이지의 끝 인덱스
      $items.slice(start, end).show(); // 해당 범위의 아이템만 보여주기
      
      // 이전/다음 버튼의 활성화/비활성화 상태 업데이트
      $('.news_controls .news_prev').toggleClass('disabled', pageIndex === 0); // 첫 페이지면 이전 버튼 비활성화
      $('.news_controls .news_next').toggleClass('disabled', pageIndex >= totalPages - 1); // 마지막 페이지면 다음 버튼 비활성화
    }
    
    // 초기 페이지 표시
    showPage(0);
    
    // 이전/다음 버튼 이벤트 (기존 이벤트 제거 후 새로 바인딩하여 중복 방지)
    $('.news_controls .news_prev').off('click.newsSlider').on('click.newsSlider', function(e) {
      e.preventDefault(); // 기본 이벤트 동작 방지
      if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    });
    
    $('.news_controls .news_next').off('click.newsSlider').on('click.newsSlider', function(e) {
      e.preventDefault(); // 기본 이벤트 동작 방지
      if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
      }
    });
  });
}

// 모바일에서 테이블 스타일 변환 함수
function tableChange() {
  // 테이블 반응형 처리가 필요한 경우 여기에 구현
}
