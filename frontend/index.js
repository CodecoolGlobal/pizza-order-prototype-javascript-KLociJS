

const root = document.getElementById("root")

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
 