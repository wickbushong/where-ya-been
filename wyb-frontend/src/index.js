const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", Business.fetchAll(), Business.activateSelect(), activateTabs(), Visit.activateForm(), Report.activateTab())

function activateTabs() {
    let tabs = document.querySelectorAll(".nav-tab")
    for (const tab of tabs) {
        tab.addEventListener("click", e => {
            toggleTabs(e.target)
        })
    }
}

function createCurrentList(visits) {
    for (const visit of visits) {
        new Visit(visit).appendVisitToCurrentList()
    }
}

function toggleTabs(clickedTab) {
    let old = clickedTab.closest("ul").querySelector(".active")
    old.className = "nav-link nav-tab"
    clickedTab.classList + "active"
    let pageGroup = clickedTab.dataset.pageGroup
    let allPages = document.querySelectorAll(".container")
    for (const page of allPages) {page.style.display = "none"}
    let newPage = document.querySelector(`[data-page-group="${pageGroup}"].container`)
    newPage.style.display = "block"
}

function clearCurrentList() {
    const list = document.querySelector("#current-list")
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
