import {renderPage} from "./page.js";
import { loadArticles } from "./api.js";

const main = document.querySelector('main');

const renderArticles = async () => {
    const data = await loadArticles();
    main.replaceChildren();
    main.insertAdjacentHTML('afterbegin', `
    <section class="article">
        <div class="container article__container">
            <div class="page__path">
                <a class="page__name" href="index.html">Главная</a>
                <div class="page__arrow"></div>
                <div class="page__name">Блог</div>
            </div>
            <ul class="article__list"></ul>

            <div class="pagination">
                    <a class="pagination__arrow pagination__arrow-left" href=""></a>
                    <div class="pagination__pages">

                    </div>
                    <a class="pagination__arrow pagination__arrow-right" href=""></a>
                </div>
            </div>
        </section>
    `)

    const articleList = document.querySelector('.article__list');
    const paginationArrowLeft = document.querySelector('.pagination__arrow-left');
    const paginationArrowRight = document.querySelector('.pagination__arrow-right');
    const pagination = document.querySelector('.pagination__pages');

    data.data.map((item) => {
        articleList.insertAdjacentHTML('beforeend', `
        <li class="article__item">
            <div class="article__image--main"></div>
            <div class="article__info">
                <a class="article__title" href="page.html?id=${item.id}" >${item.title}</a>
                <div class="article__date">22 октября 2021, 12:45</div>
                <div class="article__metrics">
                    <div class="article__views">
                        <div class="article__image--eye"></div>
                        <div class="article__count--eye">1.9K</div>
                    </div>
                    <div class="article__comments">
                        <div class="article__image--message"></div>
                        <div class="article__count--message">0</div>
                    </div>
                </div>
            </div>
        </li> 
        `);
    });

    for (let i = 1; i <= data.meta.pagination.pages; i ++ ){
        pagination.insertAdjacentHTML('beforeend', `
        <a class="pagination__number">${i}</a>
    `)
    }
    paginationArrowLeft.addEventListener('click', () => {
        if(data.meta.pagination.page !== 1) {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${data.meta.pagination.page - 1}`);
            renderArticles();
        }
    });

    paginationArrowRight.addEventListener('click', () => {
        if(data.meta.pagination.page !== data.meta.pagination.pages) {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${data.meta.pagination.page + 1}`);
            renderArticles();
        }
    });
}

const loadPagination = async () => {
    const paginationNumber = document.querySelectorAll('.pagination__number');
    paginationNumber.forEach((p) => {
        p.addEventListener('click', () => {
            articleList.replaceChildren();
            pagination.replaceChildren();
            loadArticles(`https://gorest.co.in/public-api/posts?page=${p.textContent}`);
            renderArticles();
        });
    });
};

const footerItemBlog = document.querySelector('.footer__item-blog');
footerItemBlog.addEventListener('click', async (e) => {
    e.preventDefault();
    await renderArticles();
    await loadPagination();
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu-open');

    // const articleTitle = document.querySelectorAll('.article__title');
    // // console.log(articleTitle);
    // articleTitle.forEach((el) => {
    //     el.addEventListener('click', (e) => {
    //         // console.log(e.target);
    //         // e.preventDefault();
    //         renderPage();
    //     });
    // });
});




