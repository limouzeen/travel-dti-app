import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useEffect, useState } from 'react';
import Profile from './assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';

function MyTravel() {

  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerImage, setTravellerImage] = useState('');

  useEffect(() => {
    //เอาข้อมูลใน memory มาใช้งานที่ AppBar
    const traveller = JSON.parse(localStorage.getItem('traveller'));
    
    setTravellerFullname(traveller.travellerFullname)
    setTravellerImage(traveller.travellerImage)

  },[])


  return (
    <>
    <Box sx={{width:"100%"}}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FlightTakeoffIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            บันทึกการเดินทาง
          </Typography>
          <Link to={'/editprofile'} style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
            <Button color="inherit">{travellerFullname}</Button>
            </Link>
          <Avatar src={travellerImage ? `http://localhost:3000/images/traveller/${travellerImage}` : Profile} />

          <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold'}}>
            LOG OUT
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{width:"70%", boxShadow: 4, mx: 'auto', my: 4, p: 5}}>
    <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            การเดินทางของฉัน
          </Typography>

          {/* แสดงข้อมูลการเดินทางตรงนี้ */}


        
            <Link to={'/addmytravel'} style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold'}}>
            <Button fullWidth variant="contained" sx={{py: 2}}>
              เพิ่มการเดินทาง
              </Button>
            </Link>
         

          
    </Box>
    </Box>
    </>
  )
}

export default MyTravel