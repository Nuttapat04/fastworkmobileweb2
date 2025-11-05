
document.addEventListener("DOMContentLoaded", () => {
  const monthNames = [
    "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
    "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
  ];
  const content = document.getElementById("content");

  function getParamDate(){
    const p = new URLSearchParams(location.search);
    if(p.get("date")){
      const d = new Date(p.get("date"));
      if(!isNaN(d)) return d;
    }
    if(p.get("day")){
      const now = new Date();
      const d = parseInt(p.get("day"),10)||now.getDate();
      return new Date(now.getFullYear(), now.getMonth(), d);
    }
    return new Date();
  }

  function buildMonth(container, year, month, active){
    const wrap = document.createElement("section");
    wrap.className = "month";

    const title = document.createElement("h2");
    title.className = "month-title";
    title.textContent = `${monthNames[month]} ${String(year).slice(-2)}`;
    wrap.appendChild(title);

    const dividerTop = document.createElement("div");
    dividerTop.className = "divider";
    wrap.appendChild(dividerTop);

    const weekHead = document.createElement("div");
    weekHead.className = "week-header";
    "S M T W T F S".split(" ").forEach(ch=>{
      const el = document.createElement("div");
      el.textContent = ch;
      weekHead.appendChild(el);
    });
    wrap.appendChild(weekHead);

    const grid = document.createElement("div");
    grid.className = "grid";

    const first = new Date(year,month,1);
    const startDay = first.getDay();
    const daysInMonth = new Date(year,month+1,0).getDate();
    const prevDays = new Date(year,month,0).getDate();

    for(let i=0;i<startDay;i++){
      const d = document.createElement("div");
      d.className = "day muted";
      d.textContent = prevDays - startDay + 1 + i;
      grid.appendChild(d);
    }

    for(let d=1; d<=daysInMonth; d++){
      const cell = document.createElement("div");
      cell.className = "day";
      cell.textContent = d;
      if(active &&
         active.getFullYear()===year &&
         active.getMonth()===month &&
         active.getDate()===d){
        cell.classList.add("active");
      }
      grid.appendChild(cell);
    }

    const used = startDay + daysInMonth;
    const remain = (Math.ceil(used/7)*7) - used;
    for(let i=1;i<=remain;i++){
      const d = document.createElement("div");
      d.className = "day muted";
      d.textContent = i;
      grid.appendChild(d);
    }

    wrap.appendChild(grid);
    const dividerBottom = document.createElement("div");
    dividerBottom.className = "divider";
    dividerBottom.style.marginTop = "14px";
    wrap.appendChild(dividerBottom);
    container.appendChild(wrap);
  }

  const activeDate = getParamDate();
  const y = activeDate.getFullYear();
  const m = activeDate.getMonth();
  buildMonth(content, y, m, activeDate);
  const next = new Date(y, m+1, 1);
  buildMonth(content, next.getFullYear(), next.getMonth(), activeDate);
});
