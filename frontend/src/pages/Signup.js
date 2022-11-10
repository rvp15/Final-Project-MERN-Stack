import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

 
const Signup = () => {
  const navigate = useNavigate() 
   const [inputs,setInputs]= useState({
    username:'',
    email:'',
    password:''
   })
//////////////////////
   const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]: e.target.value})
   }
//////////////////////////
const sendRequest = async()=>{
  const response = await axios.post('http://localhost:5000/auth/signup',inputs)
  const data = await response.data
  return data
  console.log(data)
}
//////////////////////////////////
   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    //send http request with axios to backend
sendRequest().then(()=>navigate('/login'))
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box className="signup-box">
          <Typography variant="h3">Signup</Typography>
          <TextField variant="outlined" placeholder="Username" margin="normal"value={inputs.username} name='username' onChange={handleChange}/>
          <TextField variant="outlined" placeholder="E-mail" margin="normal" value={inputs.email} type='email' name='email' onChange={handleChange}/>
          <TextField variant="outlined" placeholder="Password" margin="normal" value={inputs.password} type='password' name='password' onChange={handleChange}/>
          <Button variant="contained" type="submit">SignUp</Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
