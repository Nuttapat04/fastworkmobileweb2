document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Swipe buttons active");

  const btnLike = document.querySelector(".btn-like");
  const btnClose = document.querySelector(".btn-close");
  const popupHeart = document.getElementById("popup-heart-container");
  const popupX = document.getElementById("popup-x-container");

  let startX = 0;
  let diffX = 0;
  let isSwiping = false;

  const showPopup = (popup) => popup.classList.add("show");
  const hidePopup = (popup) => popup.classList.remove("show");

  const resetButtons = () => {
    btnLike.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    btnClose.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    btnLike.style.transform = "translateX(0)";
    btnClose.style.transform = "translateX(0)";
    btnLike.style.opacity = 1;
    btnClose.style.opacity = 1;
  };

  document.body.addEventListener("touchstart", (e) => {
    if (e.target.closest(".popup-overlay")) {
        isSwiping = false; 
        return; 
    }

    startX = e.touches[0].clientX;
    isSwiping = true;
    btnLike.style.transition = "none";
    btnClose.style.transition = "none";
  });

  document.body.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    diffX = currentX - startX;

    if (diffX < 0) {
      const maxMove = window.innerWidth * 0.65; 
      const move = Math.max(diffX, -maxMove);
      btnLike.style.transform = `translateX(${move}px)`;
      btnClose.style.opacity = 1 - Math.min(Math.abs(move) / maxMove, 1);
    }

    else if (diffX > 0) {
      const maxMove = window.innerWidth * 0.65;
      const move = Math.min(diffX, maxMove);
      btnClose.style.transform = `translateX(${move}px)`;
      btnLike.style.opacity = 1 - Math.min(move / maxMove, 1);
    }
  });

  document.body.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;

    const triggerDistance = window.innerWidth * 0.35; 

    if (diffX > triggerDistance) {
      btnClose.style.transition = "transform 0.3s ease";
      btnClose.style.transform = `translateX(${window.innerWidth * 0.5}px)`;
      btnLike.style.opacity = 0;
      setTimeout(() => {
        showPopup(popupX);
        resetButtons();
      }, 300);
    }

    else if (diffX < -triggerDistance) {
      btnLike.style.transition = "transform 0.3s ease";
      btnLike.style.transform = `translateX(-${window.innerWidth * 0.5}px)`;
      btnClose.style.opacity = 0;
      setTimeout(() => {
        showPopup(popupHeart);
        resetButtons();
      }, 300);
    }

    else {
      resetButtons();
    }
  });

  document.querySelectorAll(".popup-close-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const popup = e.target.closest(".popup-overlay");
      popup.classList.remove("show");
      resetButtons(); 
    });
  });

});
