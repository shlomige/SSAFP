var express = require('express');
var router = express.Router();
const User=require('../models/Users');
const Expense= require('../models/Expense');
const {response} = require("express");

/* GET users listing. */
router.get('/:userID', async function(req, res, next) {
    try{
        console.log(typeof (parseInt(req.params.userID)));
        //const user = await User.findOne({id:parseInt(req.params.userID)})
        const user = await User.findOne({id:123123});
        if (!user) {
            return res.status(404).send('User not found');
        }
        const first_name = user.first_name;
        const last_name = user.last_name;
        const id = user.id;
        const expenses = await Expense.find({userid:req.params.userID});
        let total = 0;
        for (const expense of expenses) {
            total += expense.sum;
        }
        res.json({"first name":first_name, "last name":last_name,"id":id,"total":total});
    }
    catch(err){
        return res.status(500).json({'Internal Server Error':err});
    }
});

module.exports = router;