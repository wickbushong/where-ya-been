class Report {

    static activateTab() {
        document.querySelector("#report-nav").className = "nav-link nav-tab"
        document.querySelector("#report-activator").addEventListener("click", e => this.activateForm())
    }

    static activateForm() {
        User.fetchAll()
        let form = document.querySelector("#report-form form")
        form.addEventListener("submit", e => {
            e.preventDefault()
            debugger
        })
        document.querySelector("#report-activator").style = "display: none;"
        document.querySelector("#report-body").style = "display: block;"
    }

    post() {

    }
}