import React, { useState} from "react";
import { Link } from "react-router-dom";
import { AppBar,Box, Tab, Tabs, Toolbar,  Typography} from "@mui/material";

const NavBar = () => {
    const [value,setValue]= useState('login');

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MERN</Typography>
        <Box sx={{marginLeft:'auto'}}>
          <Tabs indicatorColor="secondary" onChange={(e,value)=>setValue(value)} value={value} textColor="inherit">
           <Tab value='login' to='/login' LinkComponent={Link} label='login'/>
            <Tab value='signup' to='/signup' LinkComponent={Link}  label='signup'/>
          </Tabs>
        </Box> 
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

//Typography-used to add text
// variant-specify what tag to use
// Box-similar to div
// Tabs-Tabs make it easy to explore and switch between different views.
