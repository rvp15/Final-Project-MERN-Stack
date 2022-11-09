const User = require('../models/User')
const bcrypt = require('bcrypt')

const signup = async(req,res,next)=>{

    const {username,email,password} = req.body//destructuring
    try{
        //1.check for existing user
        const existingUser = await User.findOne({email:email})
    if(existingUser){
        return res.status(400).json({ message: 'User already exists! Login Instead' })
    }
    //2.if user doesnt exist encrypt pwd
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(req.body.password, salt)

 }catch(e){
      console.log(e)
    }

   


    const user = new User({username,email,password})
    try{
        await user.save()
    }catch(e){
        console.log(e);
    }
    return res.status(200).json({message:user})
}


exports.signup = signup