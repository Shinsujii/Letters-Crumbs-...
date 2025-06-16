
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');

image1.addEventListener('click', () => {
    image1.style.display = 'none';   // 첫 이미지 숨기기
    image2.style.display = 'block';  // 두 번째 이미지 보이기
});

document.querySelector('.word5-link').addEventListener('click', function(event) {
  event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menuhome');
    const mobileMenu = document.querySelector('.mobile-menu-imgs1');

    menuBtn.addEventListener('click', function (e) {
        e.preventDefault(); // <a> 링크 막기
        mobileMenu.classList.toggle('active'); // 메뉴 열고 닫기
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menuhome');
    const mobileMenu = document.querySelector('.mobile-menu-imgs1');

    menuBtn.addEventListener('click', function (e) {
        e.preventDefault(); // 링크 기본동작 막기
        mobileMenu.classList.toggle('active'); // active 클래스 토글
    });
});