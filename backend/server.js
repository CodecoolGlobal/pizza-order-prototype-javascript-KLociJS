const express = require("express")
const path = require("path");
const { readFileSync, writeFileSync } = require("fs")
const filePath1 = path.join(`${__dirname}/pizza.json`);
const filePath2 = path.join(`${__dirname}/allergens.json`);
const filePath3 = path.join(`${__dirname}/order.json`)
const app = express()


app.use(express.json())
app.use("/api/pizzalist",express.static(path.join(`${__dirname} +/../frontend`)))


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
   let order = JSON.parse(readFileSync(filePath3))
    let adat = req.body
    console.log(req.body)
    order.rendelesek.push(adat)
    writeFileSync(filePath3, JSON.stringify(order))
    res.status(200).send("DONE")
})




app.listen(3000, ()=> console.log("http://localhost:3000/"))
