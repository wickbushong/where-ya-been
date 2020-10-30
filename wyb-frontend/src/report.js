class Report {
    constructor(report_obj) {
        this.id = report_obj["id"]
        this.user_id = report_obj["user_id"]
        this.test_date = report_obj["test_date"]
    }

    static activateTab() {
        document.querySelector("#report-nav").className = "nav-link nav-tab"
        document.querySelector("#report-activator").addEventListener("click", e => this.activateForm())
    }

    static activateForm() {
        User.fetchAll()
        let form = document.querySelector("#report-form form")
        form.addEventListener("submit", e => {
            e.preventDefault()
            let select = e.target.querySelector("select")
            let selectedUser = select.item(select.selectedIndex)
            let userId = selectedUser.dataset.userId
            let date = e.target.querySelector("input").value
            new this({test_date: date, user_id: userId}).post()
        })
        document.querySelector("#report-activator").style = "display: none;"
        document.querySelector("#report-body").style = "display: block;"
    }

    post() {
        fetch(`http://localhost:3000/users/${this.user_id}/reports`, {
                method: 'POST',
                headers:  {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this)
            })
            .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
                    .catch(err => console.log(err))
    }
}