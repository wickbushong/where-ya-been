class Report {

    static activateTab() {
        document.querySelector("#report-nav").className = "nav-link nav-tab"
        document.querySelector("#report-activator").addEventListener("click", e => this.activateForm())
    }

    static activateForm() {
        
        document.querySelector("#report-activator").style = "display: none;"
        document.querySelector("#report-body").style = "display: block;"
        
        
    }

    
}