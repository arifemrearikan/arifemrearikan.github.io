const form = document.getElementById('contact-form');
const egg = document.querySelector('.egg');
const contactButton = document.querySelector('.btn-cont')


contactButton.addEventListener('click',() =>{
    var nameValue = form.elements[0].value;
    if (nameValue.toLowerCase() ==='ali türköz'){
        egg.classList.remove("is-hidden");
        console.log(nameValue)
    }
})

egg.addEventListener('click', () => {
    egg.classList.add("is-hidden");
    return;
})
