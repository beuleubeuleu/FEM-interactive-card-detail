const listOfInputs = document.querySelectorAll(".right form ul li .form-input")

const cardCategories = {
    "name": document.querySelector(".show-name"),
    "card-number": document.querySelector(".show-number"),
    "month": document.querySelector(".show-month"),
    "year": document.querySelector(".show-year"),
    "cvc": document.querySelector(".show-cvc")
}

//Interactive Card Details

for (let category of listOfInputs) {
    category.addEventListener("keyup", category => {
        let cardCategory = category.target.id
        cardCategories[cardCategory].textContent = category.target.value
    })
}

//Reset card details if input is empty
const IS_EMPTY = ""

for (let category of listOfInputs) {
    category.addEventListener("focusout", category => {
        let cardCategory = category.target.id
        if (cardCategories[cardCategory].textContent === IS_EMPTY) {
            if (cardCategory === "name") {
                cardCategories[cardCategory].textContent = "Barrack Obama"
            }
            if (cardCategory === "card-number") {
                cardCategories[cardCategory].textContent = "XXXX XXXX XXXX XXXX"
            }
            if (cardCategory === "cvc") {
                cardCategories[cardCategory].textContent = "XXX"
            }
            if (cardCategory=== "month") {
                cardCategories[cardCategory].textContent = "01"
            }
            if (cardCategory === "year") {
                cardCategories[cardCategory].textContent = "01"
            }
        }
    })
}

//on submit check

const submitBtn = document.querySelector(".form-submit")
const cardInformationForm = document.querySelector(".right form")
const completeMsg = document.querySelector(".complete")

submitBtn.addEventListener("click", e => {
    e.preventDefault()

    const ONLY_WORDS = new RegExp("^[a-zA-Z\\s]+$")
    const ONLY_NUMBERS = new RegExp("^[0-9\\s]+$")
    const isValid = category => {

        const CVC_LESS_THAN_3 = category.id === "cvc" && category.value.length < 3;
        const YEAR_OR_MONTH_LESS_THAN_2 = category.id === "year" && category.value.length < 2 || category.id === "month" && category.value.length < 2
        const CARD_NUMBER_NOT_IN_RANGE = category.id === "card-number" && (category.value.length !== 19);
        const MONTH_IS_NOT_VALID = category.id === "month" && category.value > 12

        if (category.id === "name") {
            return ONLY_WORDS.test(category.value)
        } else if (CVC_LESS_THAN_3 || YEAR_OR_MONTH_LESS_THAN_2 || CARD_NUMBER_NOT_IN_RANGE || MONTH_IS_NOT_VALID) {
            return false
        } else {
            return ONLY_NUMBERS.test(category.value)
        }
    }

    const displayErrorMessage = category => {
        const CARD_NUMBER_NOT_IN_RANGE = category.id === "card-number" && (category.value.length !== 19);
        const MONTH_IS_NOT_VALID = category.id === "month" && category.value > 12
        const CVC_LESS_THAN_3 = category.id === "cvc" && category.value.length < 3;
        const YEAR_OR_MONTH_LESS_THAN_2 = category.id === "year" && category.value.length < 2 || category.id === "month" && category.value.length < 2


        let errorMsgElement = category.nextSibling.nextSibling;

        category.classList.add("error")
        if (CARD_NUMBER_NOT_IN_RANGE) {
            errorMsgElement.textContent = "Card Number invalid, check your card again"
        }
        if (YEAR_OR_MONTH_LESS_THAN_2) {
            errorMsgElement.textContent = "must be 2 digits"
        }
        if (MONTH_IS_NOT_VALID) {
            errorMsgElement.textContent = "not a valid month"
        }
        if (CVC_LESS_THAN_3) {
            errorMsgElement.textContent = "CVC must but 3 numbers"
        }
        if (category.id === "name" && !ONLY_WORDS.test(category.value)) {
            errorMsgElement.textContent = "Wrong format, letters only"
        }
        if ((category.id === "card-number" || category.id === "cvc" || category.id === "month"|| category.id === "year") && !ONLY_NUMBERS.test(category.value)) {
            errorMsgElement.textContent = "Wrong format, numbers only"
        }
        if (category.value === IS_EMPTY) {
            console.log(errorMsgElement)
            errorMsgElement.textContent = "Can't be blank"
        }
    }

    const checkCategories = []

    for (let category of listOfInputs) {
        checkCategories.push(isValid((category)))
        if (!isValid(category)) {
            displayErrorMessage(category)

        } else {
            let errorMsgElement = category.nextSibling.nextSibling;

            category.classList.remove("error")
            errorMsgElement.textContent= ""
        }
    }

    if (!checkCategories.includes(false)) {
        cardInformationForm.classList.toggle("none")
        completeMsg.classList.toggle("none")
        completeMsg.classList.add("flex")
    }
})