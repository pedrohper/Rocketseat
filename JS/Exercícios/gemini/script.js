const mdiv = document.getElementById("mdiv")
const bu = document.getElementById("bu")
const ima = document.getElementById("ima")
const mlist = document.getElementById('mlist');

const li = document.createElement('li'); // cria o elemento <li>
li.textContent = 'teste'; // define o conteúdo de texto

mlist.appendChild(li); // adiciona ao elemento com id 'mlist'


ima.setAttribute("src", "https://store-images.s-microsoft.com/image/apps.53095.13850085746326678.06e2dc5c-7997-46e9-a8e6-0e48b57cb13b.419e3c9d-9dd3-4a28-a9f3-a12350215871?q=90&w=177&h=265");

bu.addEventListener("click", e =>
    mdiv.classList.toggle("destaque").classList.contains('ativo')
)

console.log(mdiv)

/*itens.forEach(item => {
  item.textContent += " - Item Modificado";
});
*/

const pa = document.getElementById("divOriginal")

const clon = pa.cloneNode(true)
document.body.appendChild(clon)
