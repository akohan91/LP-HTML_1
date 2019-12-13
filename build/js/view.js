window.onload = function () {
    let portfolioItem = $('.portfolio__item');

    let portfolioItemHeight = 0;
    portfolioItem.forEach((element) => {
        portfolioItemHeight = element.offsetHeight > portfolioItemHeight ? element.offsetHeight : portfolioItemHeight;
    })

    portfolioItem.forEach((element) => element.style.minHeight = portfolioItemHeight + 'px');
}