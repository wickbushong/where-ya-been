class Report {
    constructor(report_obj) {
        this.id = report_obj["id"]
        this.user_id = report_obj["user_id"]
        this.test_date = report_obj["test_date"]
        this.flag_visits = report_obj["flag_visits"]
        this.users_to_notify = report_obj["users_to_notify"]
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
            let date = e.target.querySelector("input")
            let button = e.target.querySelector("button")
            button.innerHTML = "REPORT SUBMITTED"
            button.classList + "disabled"
            button.disabled = true
            select.disabled = true
            date.disabled = true
            new this({test_date: date.value, user_id: userId}).post()
            
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
                    let report = new Report(result)
                    
                    report.createContactList()
                    document.querySelector("#overlap-list").style = "display: block;"
                })
                    .catch(err => console.log(err))
    }

    createContactList() {
        let list = document.querySelector("#overlap-list ul")
        // iterate through users_to_notify
        for (const user of this.users_to_notify) {
            new User(user).appendContactTo(list)
        }
        // append their name and contact info to list

        // THEN iterate through overlap_visits within flag_visits

        // add dates to users_to_notify that indicate date of visit

    }


}