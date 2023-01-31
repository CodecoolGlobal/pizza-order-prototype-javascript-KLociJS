

const rootElement = document.getElementById("root")
const allergenslist = ['glutén','hús','laktóz']

const onLoad = _=>{
  



console.log("loaded...")
fetch("http://localhost:3000/api/pizza")
.then(res=>res.json())
.then(data=>{
  pizzaComponent(data.pizza[0])

})



}
window.addEventListener('load',onLoad)



const pizzaComponent = (pizza) =>{
  const container = document.createElement('div')
  container.classList.add('pizza-container')
  rootElement.appendChild(container)
  createText(container,'h2',pizza.name,'pizza-header')
  createList(container, pizza.ingredients,'pizza-list', 'piza-element')
  createText(container,'h2', "Ár:  ", 'pizza-price-name')
  createText(container,'h3',pizza.price,'pizza-price')
  createText(container,'h2', "Allergének: ", 'pizza-allergens')
  createAllergensList(container, pizza.allergens,'pizza-allergens-ul','pizza-allergens-li')
}

const createList = (parent, ingredients, ulclassName, liclassName)=>{
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

const createAllergensList = (parent, allergens, uclassName, iclassName)=>{
  const unorderedElement = document.createElement('ul')
  allergens.forEach(element =>{

    const Listelement = document.createElement('li')
    Listelement.textContent = allergenslist[element-1]
    unorderedElement.appendChild(Listelement)
    Listelement.classList.add(iclassName)
  })
  parent.appendChild(unorderedElement)
  unorderedElement.classList.add(uclassName)
}

const createText = (parent, element, text, className) =>{
  const textElement = document.createElement(element)
  textElement.textContent = text
  textElement.classList.add(className)
  parent.appendChild(textElement)
}

function fetchAllergens() {
  fetch("http://localhost:3000/api/allergens")
.then(res=>res.json())
.then(data=>{

})
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
  showSlides();
  
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
  }