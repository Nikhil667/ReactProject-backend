const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
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
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
      
    res.json(user)  
  } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
  }

      
      
      
      
      
      //.then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: "Please enter unique value for email", message: err.message})})



      
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   }).then(user => res.json(user))
    //   .catch(err => {console.log(err)
    //   res.json({error: "Please enter unique value for email", message: err.message})})

})

// router.post('/', (req, res) => {

//     console.log(req.body);
//     //res.send("hh")

//     const user = User(req.body);
//     user.save();
//     res.send(req.body)

// })

// router.get('/', (req, res) => {
//     const obj = {
//       name: "shanks"
//     }
    
//       res.json(obj)
//   })



module.exports = router;