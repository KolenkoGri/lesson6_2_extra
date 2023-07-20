if(location.pathname === '/basket.html'){
    const basketCheckbox = document.querySelector('.basket__checkbox');
    const basketCheckboxItem = document.querySelectorAll('.basket__checkbox-item');
    basketCheckbox.addEventListener('click', () => {
        basketCheckboxItem.forEach((el) => {
            el.setAttribute('checked', "");
        });
    });

    basketCheckboxItem.forEach((el) => {
        el.addEventListener('click', () => {
            basketCheckbox.setAttribute("checked","false");
        });
    })
        

    const startData = () => {
        const remove = document.querySelectorAll('.basket__garbage-image');
        const basketCount = document.querySelector('.basket__count');
        basketCount.textContent = remove.length;
        const headerCountBasket = document.querySelector('.header__count-basket');
        headerCountBasket.textContent = remove.length;
        
        remove.forEach((el) => {
            el.addEventListener('click', () => {
                console.log(el.closest('.basket__block'));
                el.closest('.basket__block').remove();
                startData();  
            })
        });
    }
    startData();
}


