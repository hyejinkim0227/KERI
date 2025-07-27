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
// 사이트맵 함수는 common.js에서 통합 관리됨

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
      if(!pcChk(1080)){
        $('.sitemap .dep1 > li').removeClass('active');
        $(this).closest('li').addClass('active');
        return false;
      }
    });  
  }
  function mMenuActive2En(){// 모바일에서 link클래스가 없는 a태그 클릭시 하위메뉴 열고 닫힘
    if(!pcChk(1080)){ 
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
      if(!pcChk(1080)){
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
        if(!pcChk(1080)){ //모바일의 경우 실행
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
      if(!pcChk(1080)){//모바일의 경우 사이트맵
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

	//Fullpage - 주석 처리됨 (common.js에서 자체 구현 사용)
	/*
	$('#wrapper').fullpage({
		//Navigation
		//menu: '#menu',
		//lockAnchors: false,
		// anchors: ['firstPage', 'secondPage','thirdPage', 'fourthPage', 'lastPage'],
		// navigation: true,
		// navigationPosition: 'right',
		// navigationTooltips: ['firstSlide', 'secondSlide'],
		// showActiveTooltip: false,
		// slidesNavigation: true,
		// slidesNavPosition: 'bottom',

		//Scrolling
		css3: true,
		scrollingSpeed: 700,
		autoScrolling: true,
		fitToSection: true,
		fitToSectionDelay: 1000,
		scrollBar: false,
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: true,
		continuousVertical: false,
		continuousHorizontal: false,
		scrollHorizontally: false,
		interlockedSlides: false,
		dragAndMove: false,
		offsetSections: false,
		resetSliders: false,
		fadingEffect: false,
		//normalScrollElements: '#element1, .element2',
		scrollOverflow: false,
		scrollOverflowReset: false,
		scrollOverflowOptions: null,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,
		bigSectionsDestination: null,

		//Accessibility
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: false,
		//sectionsColor : ['#ccc', '#fff'],
		// paddingTop: '3em',
		// paddingBottom: '10px',
		//fixedElements: '#header, .footer',
		responsiveWidth: 0,
		responsiveHeight: 0,
		responsiveSlides: false,
		parallax: false,
		parallaxOptions: {
			type: 'reveal',
			percentage: 62,
			property: 'translate'
		},
		cards: false,
		cardsOptions: {
			perspective: 100,
			fade: true,
			scale: true
		},

		//Custom selectors
		sectionSelector: 'section',
		slideSelector: '.slide',

		lazyLoading: true,

		//events
		onLeave: function (origin, destination, direction) {
			//let leavingSection = this;
			//console.log(destination.anchor);
			$("#indicator li").removeClass("active");
			$("#indicator li").eq(destination.index).addClass("active");
		},
		afterLoad: function(origin, destination, direction){
			//let loadedSection = this;
			if(destination.anchor == 'certification'){
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
		},
		afterRender: function () {},
		afterResize: function (width, height) {},
		afterResponsive: function (isResponsive) {},
		afterSlideLoad: function (section, origin, destination, direction) {},
		onSlideLeave: function (section, origin, destination, direction) {}
	});
	*/

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

	// tab
	$(".tab_box > li").on("click", function () {
		let idx = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parent().siblings().children().eq(idx).show().siblings().hide();
	});

	//
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

	//기술지원
});
//gnb메뉴
// $(document).ready(function(){
// 	let gnb = '#gnb';

// 	// gnb
// 	$(gnb).find('.dep1 > li').on('mouseenter focusin', function() {
// 		let highestBox = 0;
// 		$('.dep2_wrap', this).each(function(){
// 			if($(this).height() > highestBox){
// 			highestBox = $(this).height();
// 			}
// 		});
// 		$(this).addClass('active').siblings('li').removeClass('active');
// 		$(gnb).find('.dep2_wrap').show().css('height', highestBox + 20);
// 		$('.header').addClass('on');
// 	});

// 	$(gnb).on('mouseleave', function() {
// 		$(this).find('.dep1 > li').removeClass('active');
// 		$(this).find('.dep2_wrap').hide().css('height', 'auto');
// 		$('.header').removeClass('on');
// 	});

// 	// top_button
// 	let topBtn = $('.btn_top');
// 	topBtn.hide();
// 	$(window).scroll(function() {
// 		if ($(this).scrollTop() > 100) {
// 		topBtn.fadeIn();
// 		} else {
// 		topBtn.fadeOut();
// 		}
// 	});

// 	topBtn.click(function() {
// 		$('html, body').animate({ scrollTop: 0 }, 400);
// 		return false;
// 	});
// });
//imgLiquid
// function imgResize() {
//   $(".imgLiquid").imgLiquid();
// }
// $(window).on('resize', function () {
//   imgResize();
// });
// $(function () {
//   imgResize();
// });
