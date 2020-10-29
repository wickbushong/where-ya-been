class Visit {
    constructor(visit_obj) {
        this.id = visit_obj["id"]
        this.user_id = visit_obj["user_id"]
        this.business_id = visit_obj["business_id"]
        this.time_in = visit_obj["time_in"]
        this.time_out = visit_obj["time_out"]
        this.user = visit_obj["user"]
        this.business = visit_obj["user"]
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
        btn.addEventListener("click", e => postCheckOut(e))
        li.appendChild(btn)
        ul.appendChild(li)
    }
}
