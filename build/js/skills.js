window.onload = function () {
    let portfolioItem = document.querySelectorAll('.portfolio__item');

    let portfolioItemHeight = 0;
    portfolioItem.forEach((element) => {
        portfolioItemHeight = element.offsetHeight > portfolioItemHeight ? element.offsetHeight : portfolioItemHeight;

    })

    portfolioItem.forEach((element) => element.style.minHeight = portfolioItemHeight + 'px');

}