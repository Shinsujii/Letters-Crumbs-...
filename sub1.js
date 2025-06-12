document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menuhome');
    const mobileMenu = document.querySelector('.mobile-menu-imgs1');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function (e) {
            e.preventDefault(); // 링크 기본동작 막기
            mobileMenu.classList.toggle('active'); // active 클래스 토글
        });
    }
});

// --- 스크롤 페이드 효과 코드 시작 ---

    // 페이드 효과를 적용할 요소들 선택
    // .scroll-fade-item 클래스 대신 .fade-in-top > div 선택!
    const fadeElements = document.querySelectorAll('.fade-in-top > div');

    // Intersection Observer 설정 (이 부분은 그대로!)
    const observerOptions = {
        root: null, // 뷰포트를 기준으로 관찰
        rootMargin: '0px', // 뷰포트 여백 없이 정확히 요소가 들어올 때
        threshold: 0.1 // 요소의 10%가 보일 때 콜백 함수 실행
    };

    // Intersection Observer 생성 (이 부분도 그대로!)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 요소가 뷰포트에 들어왔다면
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // is-visible 클래스 추가
                observer.unobserve(entry.target); // 애니메이션이 끝난 요소는 더 이상 관찰하지 않음
            }
        });
    }, observerOptions);

    // 각 페이드 요소를 관찰 시작 (이 부분도 그대로!)
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- 스크롤 페이드 효과 코드 끝 ---

     // 드래그할 이미지들 선택
    const movableImages = document.querySelectorAll('.fade-in-top img');

    movableImages.forEach(image => {
        // 각 이미지에 mousedown 이벤트 리스너 추가
        image.addEventListener('mousedown', function(e) {
            // 드래그 시작 시 기본 동작 방지 (브라우저의 기본 이미지 드래그 방지)
            e.preventDefault();

            // 현재 드래그 중인 이미지
            let currentImage = e.target;

            // 드래그 시작 시 마우스 포인터 위치 저장
            const startX = e.clientX;
            const startY = e.clientY;

            // 이미지의 현재 transform 값 가져오기
            // 이미 이전에 드래그해서 transform 값이 적용되어 있을 수 있으니 그 값을 가져와서 시작점으로 삼아야 해.
            const transformValue = window.getComputedStyle(currentImage).getPropertyValue('transform');
            let initialTranslateX = 0;
            let initialTranslateY = 0;

            // transform: matrix(...) 형태로 값이 나오는데, 여기서 translateX, translateY 값을 파싱해야 함.
            // matrix(scaleX, skewY, skewX, scaleY, translateX, translateY) 순서임.
            if (transformValue && transformValue !== 'none') {
                const matrix = transformValue.match(/^matrix\((.+)\)$/);
                if (matrix) {
                    const values = matrix[1].split(', ');
                    initialTranslateX = parseFloat(values[4]); // translateX 값
                    initialTranslateY = parseFloat(values[5]); // translateY 값
                }
            }


            // 드래그 시작 시 이미지 스타일 변경
            currentImage.style.zIndex = 1000; // 맨 위로 올림
            currentImage.classList.add('is-dragging'); // 드래그 중 클래스 추가

            // 마우스가 움직일 때마다 이미지 위치 업데이트
            function onMouseMove(e) {
                // 마우스 시작 위치로부터 현재 위치까지의 이동 거리 계산
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                // 이미지의 원래 위치 + 마우스 이동 거리 + 이전에 적용된 transform 값
                // transform: translate()는 원래 위치에서 얼마나 이동했는지를 나타내므로,
                // 이전에 적용된 transform 값에 현재 드래그로 인한 이동 거리를 더해줘야 해.
                const newTranslateX = initialTranslateX + deltaX;
                const newTranslateY = initialTranslateY + deltaY;

                // transform 스타일 적용
                currentImage.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
            }

            // document 전체에 mousemove 이벤트 리스너 추가
            document.addEventListener('mousemove', onMouseMove);

            // 마우스를 어냈을 때 드래그 종료
            document.addEventListener('mouseup', function onMouseUp() {
                // mousemove, mouseup 이벤트 리스너 제거
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                // 드래그 종료 후 스타일 초기화
                currentImage.classList.remove('is-dragging'); // 드래그 중 클래스 제거
                currentImage.style.zIndex = 1; // z-index를 원래대로 돌림

                // 현재 드래그 이미지 변수 초기화
                currentImage = null;
            });
        });

        // 브라우저의 기본 이미지 드래그 기능을 막는 코드
        image.ondragstart = function() {
            return false;
        };
    });

    // --- 이미지 드래그 기능 끝 ---
  const thumbnails = document.querySelectorAll(".let1 img");
  const largeImage = document.getElementById("largeImage");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();
      largeImage.src = thumb.src;
      largeImage.alt = thumb.alt;
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const typeTargets = document.querySelectorAll('.typewriter');

  typeTargets.forEach((el, i) => {
    const text = el.dataset.text;
    let index = 0;

    function typeChar() {
      if (index < text.length) {
        el.innerHTML += text[index] === "\n" ? "<br>" : text[index];
        index++;
        setTimeout(typeChar, 30); // 속도 조정 (ms)
      }
    }

    // 각 텍스트별 딜레이 (순차적 실행)
    setTimeout(typeChar, i * 1000); // 1초 간격으로 다음 문단 시작
  });
});