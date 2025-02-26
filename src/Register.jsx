import React, { useState, useRef } from 'react';
import { Box, Typography, Avatar, TextField, Button, Card, Stack, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Travel from './assets/travel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import Profile from './assets/profile.png';

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

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [travellerImage, setTravellerImage] = useState(null);
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerEmail, setTravellerEmail] = useState('');
  const [travellerPassword, setTravellerPassword] = useState('');
  const fileInputRef = useRef(null);


  const navigator = useNavigate()

  // Handle file selection
  const handleSelectFileClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTravellerImage(file);  // ใช้ไฟล์จริงแทน URL
    }
  };

  const handleRegisterClick = async (e) =>{
    e.preventDefault();

    //Validate UI แล้วค่อยส่งข้อมูล API ไปที่ฝั่ง BackEnd
    if(travellerFullname.trim().length == 0){
      alert('กรุณากรอกชื่อ-นามสกุล');
    }else if(travellerEmail.trim().length == 0){
      alert('กรุณากรอกอีเมล');
    }else if(travellerPassword.trim().length == 0){
      alert('กรุณากรอกรหัสผ่าน');
    }else if(travellerImage == null){
      alert('กรุณาอัพโหลดรูปโปรไฟล์');
    }else{

      const formData = new FormData();

      formData.append('travellerFullname', travellerFullname);
      formData.append('travellerEmail', travellerEmail);
      formData.append('travellerPassword', travellerPassword);
      
      if(travellerImage){
        formData.append('travellerImage', travellerImage);
        console.log('Image : ',travellerImage);
      }
   
      //ส่งข้อมูลให้ API http://localhost:3000/traveller แบบ post

      try{

        const response = await fetch('http://localhost:3000/traveller/', {
          method: 'POST',
          body: formData,
          })

          if(response.status == 201){
            alert('ลงทะเบียนสำเร็จแล้ว')
            navigator('/')
            //window.location.href('/')
          }else{
            alert('ลงทะเบียนไม่สําเร็จ กรุณาลองใหม่อีกครั้ง')
          }


      }catch (err){

        alert('เกิดข้อผิดพลาดในการลงทะเบียน', err);
      }
      
    }

    console.log(travellerFullname);
    console.log(travellerEmail);
    console.log(travellerPassword);
  }

  return (
    <Box 
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        px: 2
      }}
    > 
      <Card 
        sx={{
          width: '100%',
          maxWidth: 380,
          boxShadow: 5,
          borderRadius: 3,
          textAlign: 'center',
          p: 4,
          backgroundColor: 'white',
        }}
      >
        {/* Logo */}
        <Avatar 
          alt="Travel Logo" 
          src={Travel} 
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} 
        />

        {/* App Name */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          ลงทะเบียน
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ color: 'gray', mb: 3 }}>
          สมัครสมาชิกเพื่อเข้าใช้งานแพลตฟอร์มของเรา
        </Typography>


        {/* Registration Form */}
        <Stack spacing={2}>
          <TextField fullWidth label="ชื่อ - นามสกุล" value={travellerFullname} onChange={(e) => setTravellerFullname(e.target.value)} variant="outlined" size="small" />
          <TextField fullWidth label="ชื่อผู้ใช้ (อีเมล)" value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} type="email" variant="outlined" size="small" />

          {/* Password Input */}
          <TextField
            fullWidth
            label="รหัสผ่าน"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>

        {/* Profile Picture Upload Section */}
        <Stack alignItems="center" spacing={1} sx={{ mt:2 }}>
          <Avatar 
            variant='rounded'
            alt="Profile Picture" 
            src={travellerImage || Profile}  
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

          {/* Hidden Input for File Upload */}
          <SelectFileInput 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectFileClick}
          />
        </Stack>


        {/* Register Button */}
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleRegisterClick}
          sx={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            mt: 3,
            py: 1.3, 
            fontSize: '1rem',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#0056b3', transform: 'scale(1.05)' },
          }}
        >
          ลงทะเบียน
        </Button>

        {/* Back to Login */}
        <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            เข้าสู่ระบบที่นี่
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Register;
