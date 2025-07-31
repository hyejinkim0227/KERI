/**
 * 반응형 AOS 및 fullPage.js 관리
 * 900px 기준으로 활성화/비활성화
 */

// 상태 추적 변수
var isFullpageActive = false;
var isAOSActive = false;

/**
 * debounce 유틸리티 함수
 */
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * AOS 초기화
 */
function initAOS() {
  if (typeof AOS === 'undefined' || isAOSActive) return;
  
  try {
    AOS.init({
      once: true,
      mirror: false,
      disable: function() {
        return window.innerWidth <= 900;
      }
    });
    isAOSActive = true;
    console.log('AOS initialized');
  } catch(e) {
    console.warn('AOS init error:', e);
  }
}

/**
 * AOS 비활성화
 */
function destroyAOS() {
  if (typeof AOS === 'undefined' || !isAOSActive) return;
  
  try {
    $('[data-aos]').removeClass('aos-animate').removeAttr('style');
    AOS.init({ disable: true });
    isAOSActive = false;
    console.log('AOS destroyed');
  } catch(e) {
    console.warn('AOS destroy error:', e);
  }
}

/**
 * fullPage.js 초기화
 */
function initFullpage() {
  // 이미 초기화되어 있거나 fullpage 요소가 없으면 종료
  if (isFullpageActive || !$('#fullpage').length || window.fullpage_api) {
    return;
  }
  
  try {
    $('#fullpage').fullpage({
      responsiveWidth: 0, // 반응형 모드 비활성화
      anchors: ["page1", "page2", "page3", "page4", "page5", "page6"],
      menu: '#indicator',
      startingSlide: 0,
      autoScrolling: true,
      fitToSection: true,
      scrollOverflow: false,
      afterLoad: function(anchorLink, index){
        animation_move(index);
        
        // 헤더 scrolled 클래스 관리
        var $header = $('.header');
        var isMenuOpen = $header.hasClass('active') || $('.header #gnb > ul > li.active').length > 0;
        
        if (index === 1) {
          if (!isMenuOpen) {
            $header.removeClass('scrolled');
          }
        } else {
          $header.addClass('scrolled');
        }
        
        // TOP 버튼 상태 관리
        var $topBtn = $('#topBtn');
        if (index === 1) {
          $topBtn.removeClass('show');
        } else {
          $topBtn.addClass('show');
        }
        
        // AOS 애니메이션 트리거
        const section = $('#fullpage .section').eq(index - 1)[0];
        if (section) {
          section.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
          });
        }
        
        // indicator active 상태 업데이트
        const $currentSection = $('#fullpage .section').eq(index - 1);
        const navType = $currentSection.data('mainnavi');
        if (navType) {
          $('#indicator li').removeClass('active');
          $(`#indicator li[data-mainnavi="${navType}"]`).addClass('active');
          
          if (navType === 'footer') {
            $('#indicator').css('opacity', '0');
          } else {
            $('#indicator').css('opacity', '1');
          }
        }
      },
      onLeave: function(index, nextIndex, direction){
        const $currentSection = $('#fullpage .section').eq(index - 1);
        const currentNavType = $currentSection.data('mainnavi');
        const isPromoToFooter = (currentNavType === 'promo' && nextIndex === 6);
        
        if (!isPromoToFooter) {
          const prevSection = $('#fullpage .section').eq(index - 1)[0];
          if (prevSection) {
            prevSection.querySelectorAll('[data-aos]').forEach(el => {
              el.classList.remove('aos-animate');
            });
          }
        }
        
        if (currentNavType === 'footer' && nextIndex !== 6) {
          $('#indicator').css('opacity', '1');
        }
      }
    });
    
    isFullpageActive = true;
    console.log('fullPage.js initialized');
  } catch(e) {
    console.warn('fullPage.js init error:', e);
  }
}

/**
 * fullPage.js 완전 해제
 */
function destroyFullpage() {
  if (!isFullpageActive) return;
  
  try {
    if (window.fullpage_api) {
      fullpage_api.destroy('all');
    }
    
    // 남은 클래스·스타일 제거
    $('html').removeClass('fp-enabled fp-destroyed');
    $('#fullpage, #fullpage .section, #fullpage .fp-table, #fullpage .fp-slides')
      .removeAttr('style');
    $('html, body').css({ overflow: 'auto', height: 'auto' });
    
    // bodyScroll 함수가 있다면 사용
    if (typeof bodyScroll !== 'undefined') {
      bodyScroll('on');
    }
    
    isFullpageActive = false;
    console.log('fullPage.js destroyed');
  } catch(e) {
    console.warn('fullPage.js destroy error:', e);
  }
}


/**
 * PC 모드 초기화 함수
 */
function initPcMode() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var wrapper = document.getElementById('wrapper');
  
  if (!wrapper) return;
  
  if (windowWidth >= 1080) {
    // 1080px 이상: PC 모드 활성화
    wrapper.classList.add('pc-mode');
    
    // 콘텐츠가 화면에 꽉 맞도록 scale 계산
    var minWidth = 1920; // CSS에서 설정한 min-width
    var scale = windowWidth / minWidth; // 창 크기에 따라 비율 계산
    
    // 최소 스케일 제한 (너무 작아지지 않도록)
    scale = Math.max(scale, 0.5);
    
    // CSS 변수로 scale 값 설정
    wrapper.style.setProperty('--scale', scale);
    
    console.log(`PC Mode activated - Window: ${windowWidth}x${windowHeight}px, Scale: ${scale.toFixed(3)}`);
    
  } else {
    // 1080px 미만: PC 모드 비활성화
    wrapper.classList.remove('pc-mode');
    wrapper.style.removeProperty('--scale');
    
    console.log('PC Mode deactivated');
  }
}

/**
 * 반응형 기능 초기화
 */
function initResponsiveFeatures() {
  var windowWidth = window.innerWidth;
  
  // PC 모드 임시 비활성화 (디버깅용)
  // initPcMode();
  
  if (windowWidth > 900) {
    // 900px 초과: AOS와 fullPage.js 활성화
    initAOS();
    initFullpage();
    $('#indicator').css('opacity', '1');
  } else {
    // 900px 이하: AOS와 fullPage.js 비활성화
    destroyAOS();
    destroyFullpage();
    $('#indicator').css('opacity', '0');
  }
}

// 섹션 애니메이션 함수 (기존 함수가 없을 경우)
if (typeof animation_move === 'undefined') {
  function animation_move(index) {
    $('#fullpage .section').eq(index-1).find('.inner_sp').addClass('on');
  }
}

// 초기화 및 이벤트 바인딩
$(document).ready(function() {
  initResponsiveFeatures();
  
  // 안정성을 위한 지연 초기화
  setTimeout(function() {
    initResponsiveFeatures();
  }, 500);
});

// 창 크기 변경 시 debounce 적용
$(window).on('resize', debounce(initResponsiveFeatures, 300)); 