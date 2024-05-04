const navbarBtn = document.querySelector(".nav-btn")
const navbarMenu = document.querySelector(".nav-menu")
const header = document.querySelector(".header")
const thisYear = document.getElementById("this_year")
const skillsContainer = document.querySelectorAll(".skills-text")
const menuLinks = document.querySelectorAll(".nav-menu__link")
const sections = document.querySelectorAll("main > section")
const scrollContainer = document.querySelector(".scroll")
const scrollBtn = document.querySelector(".scrool__link")
const mainTitle = document.querySelector(".home-body__info-caption")
const mainSubTitle = document.querySelector(".home-body__info-subcaption")

window.addEventListener("load", () => {
    let landingText = "سلام ... نیما هستم "
    let subText = "توسعه دهنده وب"
    let typeIndex = 0
    typeWriter(mainTitle, landingText, typeIndex)
    setTimeout(() => typeWriter(mainSubTitle, subText, typeIndex), 3000)
})

function typeWriter(container, text, index) {

    if (index < text.length) {
        container.innerHTML += text[index]
        index++
    }

    setTimeout(() => {
        typeWriter(container, text, index)
    }, 120)
}

navbarBtn.addEventListener("click", () => {
    navbarBtn.classList.toggle("nav-btn--open")
    navbarMenu.classList.toggle("active")
})

window.addEventListener("scroll", () => {

    if (scrollY > 50) {
        header.classList.add("header-bg")
    } else {
        header.classList.remove("header-bg")
    }

    scrollY > 600 ? scrollContainer.style.bottom = "3rem" : scrollContainer.style.bottom = "-3rem"
})

let year = new Date
thisYear.innerHTML = year.getFullYear()

skillsContainer.forEach(item => {
    let value = +item.innerHTML.slice(0, 2)
    item.style.left = `${value}%`
    item.previousElementSibling.style.width = `${value}%`
})

const observer = new IntersectionObserver(observerHandler, {
    threshold: 0.3
})

function observerHandler(allSections) {
    allSections.map(section => {

        let sectionName = section.target.className

        if (section.isIntersecting === true) {
            document.querySelector(`.nav-menu__link[data-section=${sectionName}]`).classList.add("link__active")
        } else {
            document.querySelector(`.nav-menu__link[data-section=${sectionName}]`).classList.remove("link__active")
        }
    })
}

sections.forEach(section => observer.observe(section))


menuLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault()

        navbarBtn.classList.toggle("nav-btn--open")
        navbarMenu.classList.toggle("active")

        let sectionClass = link.dataset.section
        let position = document.querySelector(`.${sectionClass}`).offsetTop

        window.scrollTo({
            top: position - 80,
            behavior: "smooth"
        })
    })

})

scrollBtn.addEventListener("click", event => {
    event.preventDefault()

    window.scrollTo({
        top: 0
    })
})