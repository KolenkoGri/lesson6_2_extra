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
        const totalSum = document.querySelector('.basket__total-sum--info');
        const basketPrice = document.querySelectorAll('.basket__price-new--info');
        const basketTotalCount = document.querySelector('.basket__total-count');
        basketTotalCount.textContent = remove.length;
        const basketPriceOldInfo = document.querySelectorAll('.basket__price-old--info');
        const basketTotalWithoutDiscountInfo = document.querySelector('.basket__total-without-discount--info');
        let oldPrice = 0;
        basketPriceOldInfo.forEach((el) => {
            oldPrice += +el.textContent.replaceAll(' ', '');
        })       
        basketTotalWithoutDiscountInfo.textContent = oldPrice;
        if(remove.length === 0) {
            totalSum.textContent = 0;
        }
        let sum = 0;
        basketPrice.forEach((el) => {
            sum += Number(el.textContent.replaceAll(' ', ''));
            totalSum.textContent = String(sum);
        });
        
        const basketTotalDiscountIinfo = document.querySelector('.basket__total-discount-info');
        basketTotalDiscountIinfo.textContent = oldPrice - sum;

        const basketDeliveryImage = document.querySelector('.basket__delivery-image');

        remove.forEach((el) => {
            el.addEventListener('click', () => {
                el.closest('.basket__block').remove();
                basketDeliveryImage.firstChild.remove();
                startData();  
            })
        });
    }
    startData();
}


