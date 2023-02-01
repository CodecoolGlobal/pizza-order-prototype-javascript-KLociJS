const rootElement = document.getElementById("root")
const allergenslist = ['glutén', 'hús', 'laktóz']
const pizzaorder = {
                    Address:{
                      City:"",
                      Street:"",
                    }
                    }


const onLoad = async _ => {
  const { pizza : pizzaList } = await getData('http://localhost:3000/api/pizza')
  pizzaList.forEach(pizza=>{
    pizzaComponent(pizza)
  })
  createForm(rootElement)
}

window.addEventListener('load', onLoad)

const pizzaComponent = (pizza) => {
  const container = document.createElement('div')
  container.classList.add('pizza-container')
  rootElement.appendChild(container)
  createImg(container)
  createText(container, 'h2', pizza.name, 'pizza-header')
  createList(container, pizza.ingredients, 'pizza-list', 'piza-element')
  createText(container, 'h2', "Ár:  ", 'pizza-price-name')
  createText(container, 'h3', pizza.price, 'pizza-price')
  createText(container, 'h2', "Allergének: ", 'pizza-allergens')
  createAllergensList(container, pizza.allergens, 'pizza-allergens-ul', 'pizza-allergens-li')
}

const getData = async (url) => {
  const data = await fetch(url)
  return await data.json()
}
const createImg = (parent) =>{
  const img = document.createElement('img')
  img.src='./pizza.png'
  parent.appendChild(img)
}
const createList = (parent, ingredients, ulclassName, liclassName) => {
  const unorderedElement = document.createElement('ul')
  ingredients.forEach(element => {
    const Listelement = document.createElement('li')
    Listelement.textContent = element
    unorderedElement.appendChild(Listelement)
    Listelement.classList.add(liclassName)
  });
  parent.appendChild(unorderedElement)
  unorderedElement.classList.add(ulclassName)
}

const createForm = (parent)=>{
  const formElement = document.createElement('form')
  const nameElement = document.createElement('input')
  const emailElement = document.createElement('input')
  const adressElement = document.createElement('input')
  const buttonElement = document.createElement('button')

  buttonElement.innerText = 'ORDER'
  

  nameElement.placeholder = "Your full name:"
  emailElement.placeholder = "Email Adress:"
  adressElement.placeholder = "Adress:"
  
  buttonElement.classList.add("order-button")
  formElement.classList.add("form-element")
  nameElement.classList.add("name-element")
  emailElement.classList.add("email-element")
  adressElement.classList.add("adress-element")

  parent.appendChild(formElement)

  formElement.appendChild(buttonElement)
  formElement.appendChild(nameElement)
  formElement.appendChild(emailElement)
  formElement.appendChild(adressElement)
  
  


    nameElement.addEventListener("input", (event)=>updateOrders(event, "Name:"))
    emailElement.addEventListener("input", (event)=>updateOrders(event, "Email:"))
    adressElement.addEventListener("input", (event)=>updateAdress(event, "Adress:"))
    buttonElement.addEventListener("click", buttonclick, false)
  
function buttonclick(event){
  event.preventDefault();
  console.log(pizzaorder)
 clearInput()
}
function clearInput (){
  nameElement.value = ""
  emailElement.value = ""
  adressElement.value = ""
}
}

function updateOrders(event, key){
  pizzaorder[key] = event.target.value
}

function updateAdress(event, key){
  let city = event.target.value.split(',')
  pizzaorder.Address.City = city[0]
  pizzaorder.Address.Street = city[1]
}



const createAllergensList = (parent, allergens, uclassName, iclassName) => {
  const unorderedElement = document.createElement('ul')
  allergens.forEach(element => {

    const Listelement = document.createElement('li')
    Listelement.textContent = allergenslist[element - 1]
    unorderedElement.appendChild(Listelement)
    Listelement.classList.add(iclassName)
  })
  parent.appendChild(unorderedElement)
  unorderedElement.classList.add(uclassName)
}

const createText = (parent, element, text, className) => {
  const textElement = document.createElement(element)
  textElement.textContent = text
  textElement.classList.add(className)
  parent.appendChild(textElement)
}

// function fetchAllergens() {
//   fetch("http://localhost:3000/api/allergens")
// .then(res=>res.json())
// .then(data=>{

// })
// }


function validateForm() {
  let name
  name = document.forms["orderForm"]["name"].value; // ez szar, undefinedet ad vissza errorral
  let email = document.forms["orderForm"]["email"].value;
  let address = document.forms["orderForm"]["address"].value;

  if (name == "") {
    alert("Name must be filled out");
    return false;
  }
  if (email == "") {
    alert("Email must be filled out");
    return false;
  }
  if (address == "") {
    alert("Address must be filled out");
    return false;
  }


  return true;
}

/******************* 
 * HTML SCRIPTS
********************/
let slideIndex = 0;
//showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}