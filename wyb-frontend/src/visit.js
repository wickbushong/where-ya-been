class Visit {
    constructor(visit_obj) {
        this.id = visit_obj["id"]
        this.user_id = visit_obj["user_id"]
        this.business_id = visit_obj["business_id"]
        this.time_in = visit_obj["time_in"]
        this.time_out = visit_obj["time_out"]
        this.user = visit_obj["user"]
        this.business = visit_obj["business"]
    }

    static activateForm() {
        let form = document.querySelector("#check-in-form")
        form.addEventListener("submit", e => {
            e.preventDefault()
            this.newFromForm(e.target).postCheckIn()
            e.target.reset()
        })
    }

    static newFromForm(form) {
        const businessId = document.querySelector("#current-list").dataset.businessId
        const formData = {
            user: {
                first_name: form.querySelector("#first-name").value,
                last_name: form.querySelector("#last-name").value,
                email: form.querySelector("#input-email").value,
                phone: form.querySelector("#input-phone").value
            },
            business: {
                id: `${businessId}`
            }
        }
        const visit = new Visit(formData)
        return visit
    }

    postCheckIn() {
        fetch(`http://localhost:3000/visits`, {
                method: 'POST',
                headers:  {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this)
            })
            .then(response => response.json())
                .then(result => {
                    new Visit(result).appendVisitToCurrentList()
                })
                    .catch(err => console.log(err))
    }

    appendVisitToCurrentList() {
        let ul = document.querySelector("#current-list")
        let li = document.createElement("li")
        li.className = "list-group-item"
        li.setAttribute("data-visit-id", `${this.id}`)
        li.setAttribute("data-user-id", `${this.user.id}`)
        li.innerHTML = `${this.user.first_name} ${this.user.last_name}`
        let btn = document.createElement("button")
        btn.className = "btn btn-outline-danger btn-sm float-right"
        btn.innerHTML = "CHECK OUT"
        btn.addEventListener("click", e => {
            const visit = new Visit({id: e.target.parentElement.dataset.visitId, user_id: e.target.parentElement.dataset.userId})
            visit.postCheckOut()
        })
        li.appendChild(btn)
        ul.appendChild(li)
    }

    postCheckOut() {
        fetch(`http://localhost:3000/visits/${this.id}`, {
                method: 'PATCH',
                headers:  {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({id: `${this.id}`})
            })
            .then(response => response.json())
                .then(result => console.log(removeFromList(result["id"])))
                    .catch(err => console.log(err))
    }
}
