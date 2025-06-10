document.addEventListener('DOMContentLoaded', () => {
    // 1. 헤더 스크롤 시 배경색 변경
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // 50px 스크롤 시
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. 히어로 섹션 콘텐츠 로드 시 애니메이션
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // 페이지 로드 후 잠시 뒤 애니메이션 시작
        setTimeout(() => {
            heroSection.classList.add('loaded');
        }, 300); // 0.3초 지연 후 시작
    }

    // 3. 스크롤 시 섹션 콘텐츠 나타나는 애니메이션 (Intersection Observer 사용)
    const observerOptions = {
        root: null, // 뷰포트를 기준으로 관찰
        rootMargin: '0px',
        threshold: 0.1 // 요소의 10%가 보이면 콜백 실행
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 섹션이 뷰포트에 들어오면 'in-view' 클래스 추가
                entry.target.classList.add('in-view');

                // 섹션 내부의 아이템들에 지연 애니메이션 적용
                const items = entry.target.querySelectorAll('.film-item, .product-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 100); // 각 아이템마다 0.1초씩 지연
                });

                // 한 번 애니메이션을 보여줬으면 더 이상 관찰하지 않음
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 관찰할 섹션들 선택
    const sectionsToAnimate = document.querySelectorAll('.films-section, .shop-section, .newsletter-section');
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. 카테고리 버튼 활성화 효과 (클릭 시)
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 클래스 제거
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');
            // TODO: 실제 웹사이트에서는 여기에 해당 카테고리에 맞는 영화/상품을 필터링하는 로직 추가
        });
    });
});
