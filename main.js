const listOfInputs = document.querySelectorAll(".right form ul li input")

const categories = {
    "name": document.querySelector(".show-name"),
    "card-number": document.querySelector(".show-number"),
    "month": document.querySelector(".show-month"),
    "year": document.querySelector(".show-year"),
    "cvc": document.querySelector(".show-cvc")
}

for (let category of listOfInputs) {
    category.addEventListener("keyup", category => {
        let cardCategory = category.target.id
        categories[cardCategory].textContent = category.target.value
    })
}
for (let category of listOfInputs) {
    category.addEventListener("focusout", category => {
        let cardCategory = category.target.id
        if (categories[cardCategory].textContent === "") {
            if (cardCategory === "name") {
                categories[cardCategory].textContent = "Barrack Obama"
            }
            if (cardCategory === "card-number") {
                categories[cardCategory].textContent = "XXXX XXXX XXXX XXXX"
            }
        }
    })
}