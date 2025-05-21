
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const form = document.querySelector("form")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

amount.addEventListener("input", ( )=>{
    const hasCharRegex = /\D+/g
    amount.value = amount.value.replace(hasCharRegex, "")
})

form.onsubmit = () => {
    event.preventDefault()
    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "E$")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "E")
            break
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        let total = price * amount
        total = formatCurrencyBRL(total).replace('R$', '')

        if (isNaN(total)) { 
            return alert("valor errado")
        }

        result.textContent = `${total} Reais`

    } catch (error) {
        footer.classList.remove("show-result")
        console.log(error)
    }
}

function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
}