const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create Token:
const createToken = (payload) =>{
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30s' })
}

const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //destructuring
  try {
    //1.check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists! Login Instead" });
    }

    //2.if user doesnt exist encrypt pwd
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //3.Add the new user to the database with encryptedpwd:
    const newUser = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    // 4. Generate a JWT token and return it to the user
    const payload = { id: newUser._id, user: newUser.username };
    const token = createToken(payload);
    res.status(200).json({ token,message:"successfully registered"});
  } catch (e) {
    console.log(e);
    res.status(400).json({error:error.message})
  }
};
////////////////////////
const login = async(req,res)=>{
    const {email,password} = req.body
    try{
   //1. Check if the user exists
   const existingUser = await User.findOne({email:email})
   if(!existingUser){
    return res.status(404).json({error:'No such user Exits. Signup Please!'})
}

//2.Check if the password provided by the user matches db pwd"
const validPass = await bcrypt.compare(password,existingUser.password)//returns boolean
if(!validPass){
    return res.status(403).json(({error:'Invalid Credentials'}))
}
//3. Generate a token and return it to the user
const payload = {id:existingUser._id, user:existingUser.username}
const token = createToken(payload)

//add Cookie- parameters: cookiename(userid),value(token),options{}
res.cookie(String(existingUser._id),token,{path:'/',expires:new Date(Date.now()+1000*30),httpOnly:true,sameSite:'lax'})

res.status(200).json({token,message:"Logged in Successfully",user:existingUser})
}catch(err){
console.log(err)
res.status(400).json({error:err.message})
    }
}



module.exports = {
    signup,
    login
}
