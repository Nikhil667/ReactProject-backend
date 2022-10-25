const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "maatujhesalaam";

var jwt = require('jsonwebtoken');


// create a user using post endpoint api/auth/createuser
// /no login required
router.post('/createuser',[
    body('email', "Enter Valid Email").isEmail(),
    body('name', "Enter Valid Name").isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
] , async (req, res) => {
    //if there are erros return req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with same email exists already
    try {
    let user = await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({error : "Sorry a user with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    
    //create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    //console.log(authToken)
    res.json(authToken) 
    
    
  } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
  }


})


module.exports = router;