var headHen;
function pcChk(width) {
    //창크기 768px보다 크면 true 반환
    if ($(window).width() > width) {
        return true;
    } else {
        return false;
    }
}
function gnb3Open(target) {
    if (pcChk(1283)) {
        var dep2H = $(target).next().outerHeight();
        $('.header_en')
            .stop()
            .animate({ height: dep2H + headH + 'px' }, 150, function () {
                $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
            });
    }
}
function gnb3Close() {
    if (pcChk(1283)) {
        $('.header_en')
            .stop()
            .animate({ height: headH + 'px' }, 150, function () {
                $('.gnb > ul > li').removeClass('active');
                $('.header_en').removeAttr('style');
            });
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

function mSchOnOff(target) {
    $(event.target).toggleClass('active').parent().parent().prev().find('.search').fadeToggle(300);
}
function imgResizeEm() {
    //이미지 사이즈 조절
    function imgResizeH() {
        $('.auto_img').each(function () {
            var imgBoxH, imgH, img;
            imgBoxH = $(this).height();
            img = $(this).children('img');
            imgH = img.height();
            if (imgBoxH > imgH) {
                img.width('auto').height('100%');
            }
        });
    }
    $('.auto_img').each(function () {
        var imgBoxW, imgW, img;
        imgBoxW = $(this).width();
        img = $(this).children('img');
        imgW = img.width();
        if (imgBoxW > imgW) {
            //이미지box가 클경우
            img.width('100%').height('auto');
            imgResizeH();
        } else {
            imgResizeH();
        }
    });
}

function mMenuActive1(){// 모바일 메뉴 dep1 on/off
    $('.sitemap .dep1 > li > a').click(function(){
      if(!pcChk(720)){
        $('.sitemap .dep1 > li').removeClass('active');
        $(this).closest('li').addClass('active');
        return false;
      }
    });  
  }
  function mMenuActive2En(){// 모바일에서 link클래스가 없는 a태그 클릭시 하위메뉴 열고 닫힘
    if(!pcChk(720)){ 
      $('.sitemap .dep2_wrap ul > li > a').click(function(){
        if($(this).parent().hasClass('active')){
          $('.sitemap .dep2_wrap ul > li').removeClass('active');
        }else{
          $(this).parent().addClass('active').siblings('li').removeClass('active');
        }
        if($(this).hasClass('menu_btn')){
          return false;
        }
      });
    } 
  }
  function mMenuActive3(){// 모바일 메뉴 dep3 on/off
    $('.sitemap .dep2_wrap ol > li > a').click(function(){
      if(!pcChk(720)){
        $('.sitemap .dep2_wrap ol > li').removeClass('active');
        $(this).closest('li').addClass('active');
      }
    });  
  }
// function snsPositon(){
//     if(!pcChk(720)){
//       $('.sitemap .sns').insertAfter($('.sitemap .dep1'));
//     }
//   }
  function mGnbInit(){//모바일내비게이션 초기화
    $('.dep2_wrap ul > li').each(function(){
      if($(this).children('ol').length){
        $(this).children('a').addClass('menu_btn');
      }
    });
  } 
$(function () {
    headHen = $('.header_en').outerHeight();
    $('.header_en .sitemap_open').on('click',function(){
        openSitemapEn(); //사이트맵 열기
        saveFocus();//포커스 요소 저장
        // snsPositon(); //sns 위치 조정
        mGnbInit();
        bodyScroll('off');//body 스크롤 없애기
        if(!pcChk(720)){ //모바일의 경우 실행
          $('.header_en,.sitemap').addClass('active');
        }
        mMenuActive1();
        mMenuActive2();
        mMenuActive3();
      });
    $('.header_en .gnb >ul > li>a').on({
        mouseenter: function () {
            gnb3Open(this);
        },
        focusin: function () {
            gnb3Open(this);
        },
    });
    $('.gnb').on({
        mouseleave: function () {
            gnb3Close();
        },
    });
    $('.sitemap .sns button').on('click',function(){
        var sns = $(this).closest('.sns');
        if(sns.hasClass('active')){
            sns.removeClass('active');
        }else{
            sns.addClass('active');
        }
    });
    $(document).on('click',function(event){
        if(!$(event.target).closest('.sns').length){
            $('.sitemap .sns').removeClass('active');
        }
    });

    //gnb3유형에 관련된 스크립트

    //탭 기능
    $('.gnb .dep2 a').on('focusout', function () {
        if (pcChk()) {
            gnb3Close();
        }
    });

    

     // 사이트맵 닫기
  $('.btn_sitemap_close').on({
    click:function(){
      if(!pcChk(720)){//모바일의 경우 사이트맵
        $('.sitemap').removeClass('active');
        var delUtil = setTimeout(function(){
          $('.header_en').removeClass('active');
          clearTimeout(delUtil);
        },300);       
      }
      closeSitemapEn(); //사이트맵닫기
      returnFocus();//이전 포커스 요소로 되돌리기
      bodyScroll('on');//body 스크롤 보이기
      
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
            autoplaySpeed: 4000,
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

    //맨 밑 하단 공통 배너슬라이드
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
        $(this).next().stop().slideToggle(300).parent().siblings().children('ol').stop().slideUp();
        return false;
    });
    // $('.btn_sch').on('click', function () {
    //     mSchOnOff();
    //     return false;
    // });

    $(document).on('click', function (e) {
        $('.guideLine .menu > li > ol').stop().slideUp();
    });

    $(window).on('resize load', function () {
        headHen = $('.header_en').outerHeight();
        $('.header_en').removeAttr('style');
        $('.header_en').removeClass('active');
    });

    // imgResize();
});
