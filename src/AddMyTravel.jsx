// import React from 'react'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import Avatar from '@mui/material/Avatar';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import { useEffect, useState } from 'react';
// import Profile from './assets/profile.png';
// import { Link, useNavigate } from 'react-router-dom';
// import Travel from './assets/travel.png';


// function AddMyTravel() {

//   const [travellerFullname, setTravellerFullname] = useState('');
//     const [travellerImage, setTravellerImage] = useState('');
  
//     useEffect(() => {
//       //เอาข้อมูลใน memory มาใช้งานที่ AppBar
//       const traveller = JSON.parse(localStorage.getItem('traveller'));
      
//       setTravellerFullname(traveller.travellerFullname)
//       setTravellerImage(traveller.travellerImage)
  
//     },[])
//   return (
//     <>
//       <Box sx={{width:"100%"}}>
//       <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <FlightTakeoffIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             บันทึกการเดินทาง
//           </Typography>
//           <Button color="inherit">
//             {travellerFullname}
//           </Button>
//           <Avatar src={travellerImage ? `http://localhost:3000/images/traveller/${travellerImage}` : Profile} />

//           <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold'}}>
//             LOG OUT
//           </Link>
//         </Toolbar>
//       </AppBar>
//     </Box>


//     <Box sx={{width:"70%", boxShadow: 4, mx: 'auto', my: 4, p: 5}}>
//     <Typography variant="h4" component="div" fontWeight='bold' sx={{ textAlign: 'center' }}>
//             Travel DTI
//           </Typography>

//           {/* แสดงข้อมูลการเดินทางตรงนี้ */}
//           <Avatar 
//           alt="Travel Logo" 
//           src={Travel} 
//           sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} 
//         />
//         <Typography variant="h5" textAlign= 'center' sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
//           เพิ่มการเดินทาง
//         </Typography>


          
//     </Box>
//     </Box>
//     </>
//   )
// }

// export default AddMyTravel


// import React, { useEffect, useState } from 'react';
// import {
//   AppBar, Box, Toolbar, Typography, Button, IconButton,
//   Avatar, TextField, Stack, Container
// } from '@mui/material';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import Profile from './assets/profile.png';
// import { Link } from 'react-router-dom';
// import Travel from './assets/travel.png';

// function AddMyTravel() {
//   const [travellerFullname, setTravellerFullname] = useState('');
//   const [travellerImage, setTravellerImage] = useState('');
  
//   const [destination, setDestination] = useState('');
//   const [departureDate, setDepartureDate] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [travelCostTotal, setTravelCostTotal] = useState('');

//   useEffect(() => {
//     const traveller = JSON.parse(localStorage.getItem('traveller'));
//     if (traveller) {
//       setTravellerFullname(traveller.travellerFullname);
//       setTravellerImage(traveller.travellerImage);
//     }
//   }, []);

//   const handleSaveTravel = () => {
//     if (!destination || !departureDate || !returnDate || !travelCostTotal) {
//       alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
//       return;
//     }

//     const travelData = {
//       destination,
//       departureDate,
//       returnDate,
//       travelCostTotal
//     };

//     console.log("📌 ข้อมูลที่บันทึก:", travelData);
//     alert("บันทึกการเดินทางเรียบร้อย!");

//     // เคลียร์ฟอร์มหลังจากบันทึก
//     setDestination('');
//     setDepartureDate('');
//     setReturnDate('');
//     setTravelCostTotal('');
//   };

//   return (
//     <>
//       <Box sx={{ width: "100%" }}>
//         <AppBar position="static">
//           <Toolbar>
//             <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//               <FlightTakeoffIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               บันทึกการเดินทาง
//             </Typography>
//             <Button color="inherit">{travellerFullname}</Button>
//             <Avatar src={travellerImage ? `http://localhost:3000/images/traveller/${travellerImage}` : Profile} />

//             <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
//               LOG OUT
//             </Link>
//           </Toolbar>
//         </AppBar>
//       </Box>

//       <Container maxWidth="md">
//         <Box sx={{ width: "100%", boxShadow: 4, mx: 'auto', my: 4, p: 5, borderRadius: 3, backgroundColor: "#fff" }}>
//           <Typography variant="h4" component="div" fontWeight="bold" sx={{ textAlign: 'center', mb: 2 }}>
//             Travel DTI
//           </Typography>

//           <Avatar alt="Travel Logo" src={Travel} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
//           <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
//             เพิ่มการเดินทาง
//           </Typography>

//           {/* 🔹 ฟอร์มเพิ่มข้อมูลการเดินทาง */}
//           <Stack spacing={3}>
//             <TextField
//               label="สถานที่ที่เดินทางไป"
//               variant="outlined"
//               fullWidth
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//             />

//             <TextField
//               label="วันที่เดินทางไป"
//               type="date"
//               variant="outlined"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//             />

//             <TextField
//               label="วันที่เดินทางกลับ"
//               type="date"
//               variant="outlined"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               value={returnDate}
//               onChange={(e) => setReturnDate(e.target.value)}
//             />

//             <TextField
//               label="ค่าใช้จ่ายที่ใช้ในการเดินทาง (บาท)"
//               type="number"
//               variant="outlined"
//               fullWidth
//               value={travelCostTotal}
//               onChange={(e) => setTravelCostTotal(e.target.value)}
//             />

            

//             <Button 
//               variant="contained" 
//               sx={{ backgroundColor: '#007bff', color: 'white', py: 1.5, borderRadius: 2, fontSize: '1rem' }} 
//               onClick={handleSaveTravel}
//             >
//               บันทึกการเดินทาง
//             </Button>
//           </Stack>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default AddMyTravel;

import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton,
  Avatar, TextField, Stack, Container, InputAdornment
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Profile from './assets/profile.png';
import { Link } from 'react-router-dom';
import Travel from './assets/travel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import TravelPic from './assets/travelpic.png';
import { useNavigate } from 'react-router-dom';

// Hidden file input styling
const SelectFileInput = styled('input')({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddMyTravel() {
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerImage, setTravellerImage] = useState('');
 //travelStartDate  travelEndDate travelCostTotalTotal travellerId
  const [travelPlace, setTravelPlace] = useState('');
  
 
  const [travelStartDate, setTravelStartDate] = useState('');

  const [travelEndDate, setTravelEndDate] = useState('');
  const [travelCostTotal, setTravelCostTotal] = useState('');
  const [travellerId, setTravellerId] = useState('');
  const [travelImage, setTravelImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem('traveller'));
    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      setTravellerImage(traveller.travellerImage);
      setTravellerId(traveller.travellerId);
    }
  }, []);

  // ✅ ฟังก์ชันอัปโหลดรูปภาพ
  const handleSelectFileClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTravelImage(file); // บันทึกไฟล์ลง state
    }
  };



  const handleRegisterClick = async (e) =>{
    e.preventDefault();

    //Validate UI แล้วค่อยส่งข้อมูล API ไปที่ฝั่ง BackEnd
    if(travelPlace.trim().length == 0){
      alert('กรุณากรอกสถานที่ท่องเที่ยว');
    }else if(travelStartDate.trim().length == 0){
      alert('กรุณากรอกวันที่เริ่มท่องเที่ยว');
    }else if(travelEndDate.trim().length == 0){
      alert('กรุณากรอกวันที่สิ้นสุดการท่องเที่ยว');
    }else if(travelCostTotal.trim().length == 0){
      alert('กรุณากรอกค่าใช้จ่าย');
    }else if(travelImage == null){
      alert('กรุณาอัพโหลดรูปโปรไฟล์');
    }else{



      const formData = new FormData();
    formData.append("travelPlace", travelPlace);
    formData.append("travelStartDate", travelStartDate);
    formData.append("travelEndDate", travelEndDate);
    formData.append("travelCostTotal", travelCostTotal);
    formData.append("travellerId", travellerId);
      
      if(travelImage){
        formData.append('travelImage', travelImage);
        console.log('Image : ',travelImage);
      }
   
      //ส่งข้อมูลให้ API http://localhost:3000/traveller แบบ post

      try{

        const response = await fetch('http://localhost:3000/travel/', {
          method: 'POST',
          body: formData,
          })

          if(response.status == 201){
            alert('ลงทะเบียนสำเร็จแล้ว')
            navigate('/mytravel')
            //window.location.href('/')
          }else{
            alert('ลงทะเบียนไม่สําเร็จ กรุณาลองใหม่อีกครั้ง')
          }


      }catch (err){

        alert('เกิดข้อผิดพลาดในการลงทะเบียน', err);
      }
      
    }

   
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <FlightTakeoffIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              บันทึกการเดินทาง
            </Typography>
            <Link to={'/editprofile'} style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
            <Button color="inherit">{travellerFullname}</Button>
            </Link>
            <Avatar src={travellerImage ? `http://localhost:3000/images/traveller/${travellerImage}` : Profile} />

            <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
              LOG OUT
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="md">
        <Box sx={{ width: "100%", boxShadow: 4, mx: 'auto', my: 4, p: 5, borderRadius: 3, backgroundColor: "#fff" }}>
          <Typography variant="h4" component="div" fontWeight="bold" sx={{ textAlign: 'center', mb: 2 }}>
            Travel DTI
          </Typography>

          <Avatar alt="Travel Logo" src={Travel} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
          <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
            เพิ่มการเดินทาง
          </Typography>

          <Stack spacing={3}>
            <TextField label="สถานที่ที่เดินทางไป" variant="outlined" fullWidth value={travelPlace} onChange={(e) => setTravelPlace(e.target.value)} />
            <TextField label="วันที่เดินทางไป" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
            <TextField label="วันที่เดินทางกลับ" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
            <TextField label="ค่าใช้จ่ายที่ใช้ในการเดินทาง (บาท)" type="number" variant="outlined" fullWidth value={travelCostTotal} onChange={(e) => setTravelCostTotal(e.target.value)} />

            {/* ✅ อัปโหลดรูปภาพ */}
            <Stack alignItems="center" spacing={1} sx={{ mt: 2 }}>
              <Avatar
                variant='rounded'
                alt="Travel Image"
                src={travelImage ? URL.createObjectURL(travelImage) : TravelPic}  
                sx={{ width: 100, height: 100, mb: 1 }}
              />

              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                onClick={() => fileInputRef.current.click()}
                sx={{ textTransform: 'none' }}
              >
                เลือกรูป
              </Button>

              <SelectFileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Stack>

            <Button variant="contained" sx={{ backgroundColor: '#007bff', color: 'white', py: 1.5, borderRadius: 2, fontSize: '1rem' }} onClick={handleRegisterClick}>
              บันทึกการเดินทาง
            </Button>

            {/* 🔹 Typography คลิกเพื่อกลับไปหน้าการเดินทางของฉัน */}
{/* Back to Login */}
        <Typography variant="body2" textAlign="center" sx={{ mt: 2, color: 'gray' }}>
          <Link to="/mytravel" style={{ textDecoration: 'none', color: '#007bff' }}>
            กลับสู่หน้าการเดินทางของฉัน
          </Link>
        </Typography>

          </Stack>

           
                   
        </Box>
      </Container>
    </>
  );
}

export default AddMyTravel;
