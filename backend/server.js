const express = require("express")
const path = require("path");
const { readFileSync, writeFileSync } = require("fs")
const filePath1 = path.join(`${__dirname}/pizza.json`);
const filePath2 = path.join(`${__dirname}/allergens.json`);
const filePath3 = path.join(`${__dirname}/order.json`)
const app = express()


app.use(express.json())
app.use("/pizza/list",express.static(path.join(`${__dirname}/../frontend`)))

app.get('/',(req,res)=>{
    res.redirect('/pizza/list')
})

app.get('/pizza/list', (req,res)=>{
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.get("/api/pizza",(req,res)=>{
    let data = JSON.parse(readFileSync(filePath1))
    res.json(data)
})

app.get("/api/allergens",(req,res)=>{
    let data = JSON.parse(readFileSync(filePath2))
    res.json(data)
})

app.get("/api/order", (req,res)=>{
    let data = JSON.parse(readFileSync(filePath3))
    res.json(data)
})
app.post("/api/order", (req,res)=>{
   let orders = JSON.parse(readFileSync(filePath3))
    let adat = req.body
    let ID = orders.rendelesek[orders.rendelesek.length-1]?.id+1 || 1
    let order = {
        id: ID,
        pizzas: [
            ...adat.orderedPizzas
        ],
        date: getDate(),
        customer: adat.pizzaorder
    }
    orders.rendelesek.push(order)
    writeFileSync(filePath3, JSON.stringify(orders))
    res.status(200).send("DONE")
})


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


app.listen(3000, ()=> console.log("http://localhost:3000/"))
