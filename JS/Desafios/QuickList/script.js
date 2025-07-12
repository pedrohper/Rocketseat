const form = document.getElementById("formu");
const deleteItem = document.getElementsByClassName('delete')

form.addEventListener('submit', e => {
    e.preventDefault()
    const list = document.getElementsByClassName("list")
    const input = document.getElementById("inputa")
    if(input.value.length <= 3){
        alert("Input vazio!")
        return
    } 
    console.log(input)
    const newitem = document.createElement("div")
    newitem.className = "item"

    const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.name = 'itemCheckbox';
        inputCheckbox.className = 'checkbox';

    const paragraph = document.createElement('p');
        paragraph.textContent = input.value

    const warning = document.createElement('img')
        warning.src = 'assets/warning.svg'
     
    const close = document.createElement('img')
        close.src = 'assets/delete.svg'
        close.className = 'delete'
        close.id = input.value
        close.onclick = ( ) => {
            newitem.remove()

            const alert = document.getElementsByClassName("alert")[0]
            alert.classList.remove("hidden")
            setTimeout(() => {
                alert.classList.add("hidden")
            }, 3000)
        }
    
    newitem.appendChild(inputCheckbox)
    newitem.appendChild(paragraph)
    newitem.appendChild(close)

    list[0].appendChild(newitem)
    input.value = ""
})
