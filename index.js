const express = require("express")
const app = express()


require("./config/database")

const auth_route = require("./route/auth")
const product_route = require("./route/product")



app.use(express.json())

require('dotenv').config()

app.use("/api", auth_route)
app.use("/api", product_route)




app.use((req,res)=>{
    res.status(404).send({msg:"resource not found"})
})

app.use((err,req,res,next)=>{
    let status = 500
    let message = "SERVER ERROR"

    let errors = null
    


    if (err.name == "ValidationError") {
        status = 400;
        message = "Bad Request"

        let errors_arr = Object.entries(err.errors)
        
        let temp = []

        errors_arr.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message
            temp.push(obj)
        })

        errors = temp

    }

    res.status(status).send({ msg: message, errors })
})

app.listen(8000, () => {
    console.log("Server Started");
})