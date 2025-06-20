document.addEventListener('DOMContentLoaded', function () {
  // --- 메뉴 토글 버튼 ---
  const menuBtn = document.querySelector('.menuhome');
  const mobileMenu = document.querySelector('.mobile-menu-imgs1');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function (e) {
      e.preventDefault(); // 링크 기본동작 막기
      mobileMenu.classList.toggle('active'); // active 클래스 토글
    });
  }

  // --- 스크롤 페이드 효과 ---
  const fadeElements = document.querySelectorAll('.fade-in-top > div');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // --- 썸네일 클릭 시 큰 이미지로 교체 ---
  const thumbnails = document.querySelectorAll(".let1 img");
  const largeImage = document.getElementById("largeImage");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();
      largeImage.src = thumb.src;
      largeImage.alt = thumb.alt;
    });
  });

  // --- 타자 효과 ---
  const typeTargets = document.querySelectorAll('.typewriter');

  typeTargets.forEach((el, i) => {
    const text = el.dataset.text;
    let index = 0;

    function typeChar() {
      if (index < text.length) {
        el.innerHTML += text[index] === "\n" ? "<br>" : text[index];
        index++;
        setTimeout(typeChar, 30);
      }
    }

    setTimeout(typeChar, i * 1000);
  });

  // --- 터치시 이미지 변경 ---
  for (let i = 1; i <= 7; i++) {
    const container = document.querySelector(`.del${i}`);
    if (!container) continue;

    const images = container.querySelectorAll("img");
    if (images.length === 0) continue;

    const firstImage = images[0];

    // 모바일 터치 이벤트
    firstImage.addEventListener("touchstart", () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImg = images[randomIndex];
      firstImage.src = randomImg.src;
    });

    // 데스크탑 클릭 이벤트도 추가하면 좋음
    firstImage.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImg = images[randomIndex];
      firstImage.src = randomImg.src;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const allImages = document.querySelectorAll(".fade-in-top img");

  const imagePool = [
    "./img/note1.jpg",
    "./img/note2.jpg",
    "./img/note3.jpg",
    "./img/note4.jpg",
    "./img/note5.jpg",
    "./img/note6.jpg",
    "./img/note7.jpg",
    "./img/note8.jpg",
    "./img/note9.jpg",
    "./img/note10.jpg",
    "./img/note11.jpg",
    "./img/note12.jpg",
    "./img/note13.jpg",
    "./img/note14.jpg",
    "./img/note15.jpg",
    "./img/note16.jpg",
    "./img/note17.jpg",
    "./img/note18.jpg",
    "./img/note19.jpg",
    "./img/note20.jpg"
  ];

  allImages.forEach((img) => {
    img.addEventListener("click", () => {
      const currentSrc = img.getAttribute("src");

      const filteredImages = imagePool.filter(src => src !== currentSrc);

      const randomIndex = Math.floor(Math.random() * filteredImages.length);
      const newSrc = filteredImages[randomIndex];

      img.setAttribute("src", newSrc);
    });
  });
});