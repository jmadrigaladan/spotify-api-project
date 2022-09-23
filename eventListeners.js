const navSlide = () => {
  const phoneNavBar = document.querySelector(".phone__navbar");
  const phoneMenu = document.querySelector(".phone__menu");
  const bentoMenu = document.querySelector(".bento-menu");
  const closeBtnMenu = document.querySelector(".close__btn-menu");

  phoneNavBar.addEventListener("click", () => {
    phoneMenu.classList.toggle("phone__menu--active");
    bentoMenu.classList.toggle("bento-menu--active");
    closeBtnMenu.classList.toggle("close__btn-menu--active");
  });
};

navSlide();
