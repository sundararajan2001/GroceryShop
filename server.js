const express = require('express')
const app = express()
require('dotenv').config();
const routerIndex = require('./routes/index.js')
const GenerateToken = require('./controllers/GenerateToken.js')

app.use(express.json())

app.use('/api/groceryItem', routerIndex.groceryrouter)
app.use('/api/users', routerIndex.userrouter)
app.use('/api/buy', routerIndex.Buyrouter)
app.use('/api/carts', routerIndex.cartrouter)

app.post('/login', GenerateToken.GenerateToken)
const PORT =  8080

app.get('*',(req,res)=>{
    res.send({message : "Url not used"})
})
app.post('*',(req,res)=>{
    res.send({message : "Url not used"})
})
app.put('*',(req,res)=>{
    res.send({message : "Url not used"})
})



app.listen(PORT, () => {
    console.log('SERVER IS RUNNING 8080')
})

