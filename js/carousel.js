const root = document.querySelector(':root');
const slide = document.querySelector('.slide');
const sliderWrapper = document.querySelector('.slider__wrapper');
const headings = document.querySelector('.slider__headings');
const links = document.querySelector('.slider__links');
const sliderProgress = document.querySelector('.slider__progress');
let slideIndex = 1;
const nextButton = document.querySelector('.slider__btn--right');
const prevButton = document.querySelector('.slider__btn--left');
let isMoving = false;
var intervalID;
const element = document.getElementById("scroll-detect");
const hammertime = new Hammer(element);

function moveSlides() {


    slide.style.transform = 'translateX(-' + slideIndex * 100 + '%)'
    headings.style.transform = 'translateX(-' + slideIndex * 100 + '%)'
    links.style.transform = 'translateX(-' + slideIndex * 100 + '%)'
    const slidesArray = Array.from(slide.children);
    const headingsArray = Array.from(headings.children);

    root.style.setProperty('--slide-progress', (100 / (slidesArray.length - 3)) * (slideIndex - 1) + '%');

};



function processImages(item) {
    return '<img src=' + item.url + ' alt=' + item.alt + '>';
}
function processHeadings(item) {
    return '<a href=' + item.link + '>' + '<h2 class="center">' + item.title + '</h2>' + '</a>';
}
function processLinks(item) {
    return '<a href=' + item.link + ' ' + 'target=_blank' + '>' + item.title + '</a>';
}
//fetch images
async function fetchImages() {
    await fetch('images.json')
        .then((Response) => {
            if (!Response.ok) {
                throw new Error('network error');
            }
            return Response.json();
        })

        .then((data) => {

            //cloned first and the last images with reverse order
            data.push(data[0]);
            data.unshift(data[data.length - 2]);
            //show on slider
            slide.innerHTML = data.map(processImages).join('');


        })

        .catch((error) => {
            console.error('There has been a problem fetching images', error);
        })
};
//fetch headings
async function fetchHeadings() {
    await fetch('headings.json')
        .then((ResponseHeadings) => {
            if (!ResponseHeadings.ok) {
                throw new Error('network error headings');
            }
            return ResponseHeadings.json();
        })

        .then((data) => {

            //cloned first and the last headings with reverse order
            data.push(data[0]);
            data.unshift(data[data.length - 2]);
            //show on slider
            headings.innerHTML = data.map(processHeadings).join('');
            moveSlides();

        })

        .catch((error) => {
            console.error('There has been a problem fetching headings', error);
        })
};
//fetch Links
async function fetchLinks() {
    await fetch('links.json')
        .then((ResponseLinks) => {
            if (!ResponseLinks.ok) {
                throw new Error('network error Links');
            }
            return ResponseLinks.json();
        })

        .then((data) => {

            //cloned first and the last links with reverse order
            data.push(data[0]);
            data.unshift(data[data.length - 2]);
            //show on slider
            links.innerHTML = data.map(processLinks).join('');
            moveSlides();

        })

        .catch((error) => {
            console.error('There has been a problem fetching links', error);
        })
};
fetchImages();
fetchHeadings();
fetchLinks();


function moveHandler(direction) {

    slide.style.transition = 'transform 450ms ease-in-out';
    direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1);
    moveSlides();

}

//swipe
hammertime.on("swiperight", function (event) {
    
    apstop();
    if (isMoving) {
        return;
    }
    moveHandler('left')
});
hammertime.on("swipeleft", function (event) {
    
    apstop();
    if (isMoving) {
        return;
    }
    moveHandler('right')
});

//keyboard arrow

window.addEventListener('keyup', e => {
    apstop();
    if (isMoving) {
        return;
    }
    switch (e.key) {
        case 'ArrowLeft':
            moveHandler('left')
            break;
        case 'ArrowRight':
            moveHandler('right')
            break;
        default:
            break;
    }

});

//next

nextButton.addEventListener('click', () => {
    apstop();
    if (isMoving) {
        return;
    }
    moveHandler('right');
    isMoving = true;


})

//prev
prevButton.addEventListener('click', () => {
    apstop();
    if (isMoving) {
        return;
    }
    moveHandler('left');
    isMoving = true;


})


slide.addEventListener('transitionend', () => {
    isMoving = false;
    apstart();

    const slidesArray = Array.from(slide.children);
    root.style.setProperty('--slide-progress--transition', slideIndex === slidesArray.length - 1 ? 'none' : 'all 200ms cubic bezier(0.82, 0.02, 0.39, 1.01)');
    if (slideIndex === 0) {
        slide.style.transition = 'none';
        slideIndex = slidesArray.length - 2;
        moveSlides();
    }
    if (slideIndex === slidesArray.length - 1) {
        slide.style.transition = 'none';
        slideIndex = 1;
        moveSlides();
    }

});

const observer3 = new IntersectionObserver(function (items) {
    items.forEach(item => {
        if (item.isIntersecting) {
            apstart();
          

        } else {
            apstop();
            
        }
    })
})

observer3.observe(sliderWrapper);
function apstart() {
    /* alert('ap started') */
    intervalID = setTimeout(
        function () {
            moveHandler('right');
        }, 5000)
}

function apstop() {
    /* alert('ap stoped') */
    clearTimeout(intervalID);
}