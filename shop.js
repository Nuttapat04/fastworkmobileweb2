
document.addEventListener('DOMContentLoaded', () => {
  const goldTextEl = document.querySelector('.gold-badge span'); // "100 GOLD"
  const buyButtons = document.querySelectorAll('.buy-pill, .buy-button');

  const parseGold = (txt) => parseInt(String(txt).replace(/\D/g, ''), 10) || 0;
  const fmtGold   = (n)   => `${Math.max(0, n)} GOLD`;

  let currentGold = parseGold(goldTextEl?.textContent || 0);

  const modal = document.getElementById('shopModal');
  const msgEl = modal?.querySelector('.modal-msg');
  const closeBtn = modal?.querySelector('.modal-close');
  const showPopup = (text) => {
    if (msgEl) msgEl.textContent = text;
    modal?.classList.add('show');
  };
  const hidePopup = () => modal?.classList.remove('show');
  closeBtn?.addEventListener('click', hidePopup);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) hidePopup();
  });

  buyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.shop-item');
      if (!card || card.classList.contains('sold')) return;

      const price = parseInt(card.querySelector('.item-price b')?.textContent || '0', 10);

      if (currentGold >= price) {
        currentGold -= price;
        if (goldTextEl) goldTextEl.textContent = fmtGold(currentGold);

        card.classList.add('sold');
        btn.classList.add('sold');
        btn.textContent = 'SOLD';
        card.style.pointerEvents = 'none';
      } else {
        showPopup('Gold ไม่พอสำหรับรายการนี้');
      }
    });
  });
});
