if("/basket.html"===location.pathname){const e=document.querySelector(".basket__checkbox"),t=document.querySelectorAll(".basket__checkbox-item");e.addEventListener("click",(()=>{t.forEach((e=>{e.setAttribute("checked","")}))})),t.forEach((t=>{t.addEventListener("click",(()=>{e.setAttribute("checked","false")}))}));const c=()=>{const e=document.querySelectorAll(".basket__garbage-image");document.querySelector(".basket__count").textContent=e.length;document.querySelector(".header__count-basket").textContent=e.length,e.forEach((e=>{e.addEventListener("click",(()=>{console.log(e.closest(".basket__block")),e.closest(".basket__block").remove(),c()}))}))};c()}
//# sourceMappingURL=../../maps/modules/basket.js.map
