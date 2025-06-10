document.addEventListener('DOMContentLoaded', () => {
    // 1. 헤더 스크롤 시 배경색 변경 (기존 코드 유지)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. 히어로 슬라이더 초기화 (Swiper.js)
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true, // 무한 루프
        autoplay: { // 자동 재생 설정
            delay: 5000, // 5초마다 슬라이드 전환
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade', // 부드러운 페이드 효과
        fadeEffect: {
            crossFade: true,
        },
        speed: 800, // 전환 속도 (0.8초)
    });

    // 3. 스크롤 시 섹션 콘텐츠 나타나는 애니메이션 (Intersection Observer 사용 - 기존 코드 유지)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                const items = entry.target.querySelectorAll('.film-item, .product-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionsToAnimate = document.querySelectorAll('.films-section, .shop-section, .newsletter-section');
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuButton = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    menuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 허용
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 5. 영화 카테고리 필터링 기능 (초간단 버전)
    const categoryButtons = document.querySelectorAll('.category-button');
    const filmItems = document.querySelectorAll('.film-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 클래스 제거
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');

            const selectedCategory = button.dataset.category;

            filmItems.forEach(item => {
                if (selectedCategory === 'in-theaters' || selectedCategory === 'all') { // 'all' 카테고리가 있다면
                    item.classList.remove('hidden');
                } else if (item.classList.contains(selectedCategory)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // 필터링 후 애니메이션 다시 적용 (선택 사항, 필요 시 활성화)
            // filmItems.forEach(item => {
            //     item.classList.remove('animated');
            //     item.style.transitionDelay = '0s'; // 지연 초기화
            // });
            // const visibleItems = document.querySelectorAll('.film-item:not(.hidden)');
            // visibleItems.forEach((item, index) => {
            //     item.style.transitionDelay = `${index * 0.1}s`;
            //     item.classList.add('animated');
            // });
        });
    });
});
