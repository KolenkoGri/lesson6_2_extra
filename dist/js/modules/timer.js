const timeOfDiscount=document.querySelector(".gallery__text--timer");timeOfDiscount.setAttribute("data-deadline","2023/07/30 14:56");const timeOutDiscount=timeOfDiscount.getAttribute("data-deadline"),timeDescription=document.querySelector(".gallery__text--descrip"),timer=e=>{const t=document.querySelector(".gallery__big-figure--days"),s=document.querySelector(".gallery__big-figure--hours"),n=document.querySelector(".gallery__big-figure--minutes"),i=document.querySelector(".gallery__big-figure--seconds");i.style.display="none";const r=()=>{const o=(()=>{const t=new Date(e).toLocaleString("ja",{timeZone:"Europe/Moscow"}),s=new Date(t).getTime()-Date.now();return{timeRemaining:s,seconds:Math.floor(s/1e3%60),minutes:Math.floor(s/1e3/60%60),hours:Math.floor(s/1e3/60/60%24),days:Math.floor(s/1e3/60/60/24%30)}})();let a=" дней ",l=" часов ",u=" минут ",c=" секунд ";o.seconds%10==1&&11!==o.seconds?c=" секунда ":o.seconds%10>=2&&o.seconds%10<=4&&(c=" секунды "),o.days%10==1&&11!==o.days?a=" день ":o.days%10>=2&&o.days%10<=4&&(a=" дня "),o.hours%10==1&&11!==o.hours?l=" час ":o.hours%10>=2&&o.hours%10<=4&&(l=" часа "),o.minutes%10==1&&11!==o.minutes?u=" минута ":o.minutes%10>=2&&o.minutes%10<=4&&(u=" минуты "),t.textContent=o.days<10?"0"+o.days+a:o.days+a,s.textContent=o.hours<10?"0"+o.hours+l:o.hours+l,n.textContent=o.minutes<10?"0"+o.minutes+u:o.minutes+u,i.textContent=o.seconds<10?"0"+o.seconds+c:o.seconds+c;let d=setInterval(r,6e4);0===o.days&&(i.style.display="inline-block",t.style.display="none",d=setInterval(r,1e3)),o.timeRemaining<=0&&(clearTimeout(d),timeOfDiscount.style.display="none",timeDescription.style.display="none");return{timerDays:o.days,timerHours:o.hours,timerMinutes:o.minutes,timerSeconds:o.seconds,day:a,hour:l,minutes:u,seconds:c}};r();setInterval((()=>{const{timerDays:e,timerHours:t,timerMinutes:s,timerSeconds:n,day:i,hour:o,minutes:a,seconds:l}=r();document.querySelectorAll("[data-timer-deadline]").forEach((r=>{r.replaceChildren(),r.insertAdjacentHTML("afterbegin",`\n            <p class="gallery__text gallery__text--descrip"> До конца акции:</p>\n            <p class="gallery__text gallery__text--timer"> \n                <span class="gallery__big-figure gallery__big-figure--days">${e<10?"0"+e+i:e+i}</span>\n                <span class="gallery__big-figure gallery__big-figure--hours">${t<10?"0"+t+o:t+o}</span>\n                <span class="gallery__big-figure gallery__big-figure--minutes">${s<10?"0"+s+a:s+a}</span>\n                <span class="gallery__big-figure gallery__big-figure--seconds">${n<10?"0"+n+l:n+l}</span> \n            </p>\n            `)}))}),1e3)};timer(timeOutDiscount);
//# sourceMappingURL=../../maps/modules/timer.js.map