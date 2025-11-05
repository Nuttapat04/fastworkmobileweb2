document.addEventListener('DOMContentLoaded', () => {
  const dayBtn     = document.getElementById('dayButton');
  const fracEl     = document.getElementById('dayFraction');
  const percentEl  = document.getElementById('dayPercent');
  const barInner   = document.getElementById('progressBarInner');
  const calendarImg = document.querySelector('.nav-icon-calendar img');

  let current = parseInt(dayBtn?.dataset.current ?? '0', 10);
  let total   = parseInt(dayBtn?.dataset.total   ?? '1', 10);

  const params = new URLSearchParams(location.search);
  if (params.has('current')) current = parseInt(params.get('current'), 10) || current;
  if (params.has('total'))   total   = parseInt(params.get('total'), 10)   || total;

  function render() {
    const pct = total > 0 ? (current / total) * 100 : 0;
    fracEl.textContent    = `${current}/${total}`;
    percentEl.textContent = `${pct.toFixed(1)}% COMPLETED`;
    barInner.style.width  = `${Math.max(0, Math.min(100, pct))}%`;
  }

  dayBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    dayBtn.classList.add('pressed');
    setTimeout(() => dayBtn.classList.remove('pressed'), 120);
  });

  calendarImg?.addEventListener('click', (e) => {
    e.stopPropagation();
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2,'0');
    const d = String(current).padStart(2,'0');
    window.location.href = `calendar.html?date=${y}-${m}-${d}`;
  });

  render();
});
