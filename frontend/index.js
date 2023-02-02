const rootElement = document.getElementById("root")

const pizzaorder = {
  Address:{
    City:"",
    Street:"",
  }
}


const orderedPizzas = []

const onLoad = async _ => {
  let { pizza : pizzaList } = await getData('http://localhost:3000/api/pizza')
  const { allergens } = await getData('http://localhost:3000/api/allergens')

  pizzaList = getExtendedPizzaList(pizzaList,allergens)
  
  createInput(pizzaList)
  
  pizzaList.forEach((pizza,i)=>{
    pizzaComponent(pizza,i,pizzaList)
  })
}

window.addEventListener('load', onLoad)

const getExtendedPizzaList = (pizzaList,allergenList) =>{
  return pizzaList.map(pizza=>{
    let allergen = pizza.allergens.map(allergen=>{
      return allergenList.find(a=>a.id===allergen).name
    })
    return {...pizza, allergens:allergen}
  })
}
//Create the html elements
const pizzaComponent = (pizza,ID,array) => {
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
  createButton(container,ID,array,'order-button')
  pizzaAmountInput(container,ID,'amount-input')
}
//Get the current date
const getDate = () =>{
  const date = new Date()
  return ({
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  })
}


//Get the textbox for entering order amount
const pizzaAmountInput = (parent,ID,className) => {
  const input = document.createElement('input')
  input.setAttribute('placeholder','Amount')
  input.classList.add(className)
  input.id=`input-${ID}`
  parent.appendChild(input)
}
//Creating an order button
const createButton = (parent,ID,array,className) =>{
  const button = document.createElement('button')
  button.innerText='Order'
  button.id=ID
  button.classList.add(className)
  parent.appendChild(button)
  button.addEventListener('click', (e)=>{
    const ID = e.target.id
    const inputValue = document.getElementById(`input-${ID}`).value
    orderedPizzas.push({name:array[ID].id, amount:inputValue})

    //Add form if orders exists
    const form = document.getElementsByClassName('form-element')
    if(form.length<=0)createForm(rootElement)
  })
}
//Create an input box for filtering by allergens
const createInput = (arr) =>{
  const input = document.createElement('input')
  input.classList.add('allergen-input')
  input.id='allergens'
  document.body.insertAdjacentElement('afterbegin',input)

  input.addEventListener('input',(e)=>{
    const filteredPizzaList = [...arr].filter(pizza=>{
      return !pizza.allergens.includes(e.target.value)
    })
    removePizzaComponents()
    filteredPizzaList.forEach((pizza,i)=>{
      pizzaComponent(pizza,i,filteredPizzaList)
    })
  })
}

const removePizzaComponents = () =>{
  const elements = document.getElementsByClassName('pizza-container')

  while(elements.length>0){
    elements[0].remove()
  }
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

  buttonElement.addEventListener('click',()=>{
    fetch('http://localhost:3000/api/order',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        pizzaorder,
        orderedPizzas
      })
    })
  })


  buttonElement.innerText = 'Rendelés'
  


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

function updateAdress(event){
  let city = event.target.value.split(',')
  pizzaorder.Address.City = city[0]
  pizzaorder.Address.Street = city[1]
}



const createAllergensList = (parent, allergens, uclassName, iclassName) => {
  const unorderedElement = document.createElement('ul')
  allergens.forEach(element => {

    const Listelement = document.createElement('li')
    Listelement.textContent = element
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