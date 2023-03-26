const hamburgerButton = document.querySelector('.hamburger__button');
const hamburgerMenu = document.querySelector('.hamburger-nav');
const contentArray = document.querySelectorAll('.content')
const hamburgerUl = document.querySelector('.hamburger-nav__list')
const hamburgerItems = Array.from(hamburgerUl.children);


function openMenu() {
    hamburgerButton.setAttribute('aria-expanded', 'true');
    hamburgerButton.setAttribute("data-state", "opened");
    root.style.setProperty('--hamburger-width', 35 + '%');
    root.style.setProperty('--hamburger-fs', '--fs-200');
    
}

function closeMenu() {
    hamburgerButton.setAttribute('aria-expanded', 'false');
    hamburgerButton.setAttribute("data-state", "closed");
    root.style.setProperty('--hamburger-width', '0');
    root.style.setProperty('--hamburger-fs', '0');
}

contentArray.forEach(function (cont) {
    cont.addEventListener('click', () => {
        
        closeMenu();
    })
})
hamburgerItems.forEach(function (items) {
    items.addEventListener('click', () => {

        closeMenu();
    })
})


hamburgerButton.addEventListener('click', () => {
    const isOpened = hamburgerButton.getAttribute('aria-expanded');
    const currentState = hamburgerButton.getAttribute("data-state");

    if (!currentState || currentState === "closed") {

        openMenu();

    } else {

        closeMenu();

    }

})


   function checkWidth(){
    if (window.innerWidth > 904) {
        closeMenu();
    }
   }


window.addEventListener('resize',checkWidth);