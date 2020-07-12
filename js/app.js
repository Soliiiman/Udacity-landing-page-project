/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

//navigation global variables
const navList = document.getElementById('navbar__list');
//section global variables
const sections = document.querySelectorAll('section');
//header global variable
const headerNav = document.querySelector('.page__header');
//to top button global variable
const topButton = document.getElementById("top");



// build the nav
const navBuilder = () => {
    //looping over all sections
    for (const section of sections) {
        const navListElement = `<li  class='menu__link' data-link=${section.id} id=${section.id}li><a href="#${section.id}">${section.dataset.nav}</li>`;
        //append elements to the navigation
        navList.insertAdjacentHTML('beforeend', navListElement);
    };
};
navBuilder();

// Add class 'active' to section when near top of viewport
// Set sections as active
//set navigation bar list as active

// getting the position of section
const sectionPosition = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// remove the active class
const removeActiveSection = (section, listElement) => {
    section.classList.remove('your-active-class');
    listElement.classList.remove('active');

};
// adding the active class
const addActiveSection = (conditional, section, listElement) => {
    if (conditional) {
        section.classList.add('your-active-class');
        listElement.classList.add('active');

    };
};

//activation function
const activation = () => {
    for (const section of sections) {
        const position = sectionPosition(section);
        let listElement = document.getElementById(`${section.id}li`);

        isVisable = () => position >= -200 && position < 200;

        removeActiveSection(section, listElement);
        addActiveSection(isVisable(), section, listElement);
    };
};

//to hide navigation bar "hiden when scroll to down"
function hideNav() {

    if (this.oldScroll > this.scrollY) {
        headerNav.style.top = "0px";
    } else {
        headerNav.style.top = "-55px";
    };
    this.oldScroll = this.scrollY;
};


// Scroll to section on link click
navList.addEventListener('click', li => {
    li.preventDefault()
    const parent = li.target.hasAttribute('data-link') ?
        li.target :
        li.target.parentElement
    const elementToScrollTo = document.getElementById(parent.dataset.link)
    elementToScrollTo.scrollIntoView({ block: 'end', behavior: 'smooth' })

})

//to top button function
function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); // For Chrome, Firefox, IE and Opera
}

topButton.addEventListener("click", topFunction);


//to be dynamicaly check the state of page while scrolling
window.onscroll = function() {
    activation();
    hideNav();
    scrollFunction();
};