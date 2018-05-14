let router = require('express').Router();
const menu = require('../utils/MenuUtils');
let users = require('../utils/UsersUtils');
let orders = require('../utils/OrderUtils');


router.get('/getMenu', (req, res) => {
    menu.findMenu(new Date(2018, 6, 20))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.put('/upBalance', (req, res) => {
    users.upBalance(req.body.username, req.body.amount)
        .then((user) => user ? res.status(200).send(user) : res.status(404).send('Invalid username!!!'));
});

router.get('/getUsers', (req, res) => {
    users.getUsers()
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.get('/getDayOrders', (req, res) => {
    let date = req.query.date || new Date;
    orders.getDayOrders(date)
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.post('/uploadMenu', (req, res) => {
    const buffer = [];
    
    req.on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', () => {
        console.log(buffer);
        const file = Buffer.concat(buffer);
        console.log(file);
        menu.addMenu(file)
            .then(answer => {
                console.log(answer);
                res.send(answer)
            })
            .catch(err => console.log(err));
    });

});

module.exports = router;