
const header = document.querySelector ('.header')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    }),
    {
     
    };
})

const observer2 = new IntersectionObserver(function (items) {
    items.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('color-image-anm');

        }else {
            item.target.classList.remove('color-image-anm');
        }
    })
})


const animateElements = document.querySelectorAll('.content');
const animateHeroImg = document.getElementById('animate')

animateElements.forEach((el) => observer.observe(el));

observer2.observe((animateHeroImg));

