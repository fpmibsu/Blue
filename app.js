const express = require('express');

const MenuUtils = require('./server/utils/MenuUtils');
const OrderUtils = require('./server/utils/OrderUtils');

const mongoose = require('mongoose');
let methods = require('./server/utils/methods');
const bodyParser = require("body-parser");

const app = express();
app.use('/static', express.static('public'));
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017`);

app.post('/', (req, res)=>{
    OrderUtils.uploadOrder(new Date(2018, 4, 12, 0,0,0), 'RomPavel', {}).then((answer)=>{
        console.log(answer)
    })
})
app.post('/', (req, res)=>{
    OrderUtils.uploadOrder(new Date(2018, 4, 12, 0,0,0)).then((answer)=>{
        console.log(answer)
    })
})

app.post('/login',(req,res) =>{
    let user = methods.login(req.body.login,req.body.password);
    user ? res.send(user): res.send(404,"Incorrect login or password");
});


app.post('/downloadMenu', (req, res) => {
    MenuUtils.addMenu()
        .then(answer => { 
            console.log(answer);
            res.send(answer) })
        .catch(err => console.log(err));

})

app.get('/getMenu', (req, res) => {
    MenuUtils.findMenu(new Date("2018-04-22T21:00:00Z"))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
})

app.listen(3000, () => {
    console.log(`Server is running...`);
})