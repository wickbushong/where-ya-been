const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", activateBusinessSelect(), activateForm(), fetchBusinesses())

function createCurrentList(visits) {
    for (const visit of visits) {
        new Visit(visit).appendVisitToCurrentList()
    }
}

function removeFromList(id) {
    const li = document.querySelector(`[data-visit-id="${id}"]`)
    li.remove()
}

function activateForm() {
    let form = document.querySelector("#check-in-form")
    form.addEventListener("submit", e => {
        e.preventDefault
        Visit.postCheckIn(e.target)
        e.target.reset()
    })
}

function activateBusinessSelect() {
    let form = document.querySelector("#business-select-form")
    form.addEventListener("submit", e => {
        e.preventDefault
        setBusiness(e)
        e.target.reset()
        // SWITCH TO LOG TAB
    })
}

function setBusiness(e) {
    let select = e.target.querySelector("select")
    let selectedOption = select.item(select.selectedIndex)
    let businessId = selectedOption.dataset.businessId
    clearCurrentList()
    Business.fetchActiveVisits(businessId)
    let list = document.querySelector("#current-list")
    list.setAttribute("data-business-id", `${businessId}`)
}

function toggleTabs() {
    let old = event.target.closest("ul").querySelector(".active")
    old.className = "nav-link"
    event.target.className += " active"
    let pageGroup = event.target.dataset.pageGroup
    let allPages = document.querySelectorAll(".container")
    for (const page of allPages) {page.style.display = "none"}
    let newPage = document.querySelector(`[data-page-group="${pageGroup}"].container`)
    newPage.style.display = "block"
}

function fetchBusinesses() {
    fetch(`http://localhost:3000/businesses`)
    .then(response => response.json())
        .then(businessList => populateBusinessSelect(businessList))
            .catch(err => console.log(err))
}

function populateBusinessSelect(businessList) {
    for (const business of businessList) {
        appendBusinessOption(business)
    }
}

function appendBusinessOption(business) {
    let select = document.querySelector("select")
    let option = document.createElement("option")
    option.setAttribute("data-business-id", `${business.id}`)
    option.innerHTML = `${business.name} - ${business.location}`
    select.appendChild(option)
}

function clearCurrentList() {
    const list = document.querySelector("#current-list")
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}