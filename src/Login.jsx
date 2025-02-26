import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Card, Stack, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Travel from './assets/travel.png';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [travellerEmail, setTravellerEmail] = useState('');
  const [travellerPassword, setTravellerPassword] = useState('');

  const navigator = useNavigate()
const handleLoginClick = async (e) =>{
  
  e.preventDefault();

  //VALIDATE 
  if(travellerEmail.trim().length == 0){
    alert('กรุณาป้อนชื่อผู้ใช้ (อีเมล)ด้วย')
    return;
  }else if(travellerPassword.trim().length == 0){
    alert('กรุณาป้อนรหัสผ่านด้วย')
    return;
  }

  //ส่งข้อมูลไปยัง API เพื่อตรวขสอบและยังไปหน้า MyTravel (/mytravel)
  try{
      const response = await fetch(`http://localhost:3000/traveller/${travellerEmail}/${travellerPassword}`, {
      method: 'GET',
      })

      if(response.status == 200){
        //เอาข้อมูลของ Traveller ที่ Login ผ่านเก็บใส่ memory

        const data = await response.json();
        localStorage.setItem('traveller', JSON.stringify(data["data"]));
        navigator('/mytravel')

      }else if(response.status == 404){
        alert('ชื่อรหัสผ่านไม่ถูกต้อง')
      }else{
        alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ', response);
      }

  }catch (err){
    alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ', err);
  }

}

  return (
    <Box 
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8', // ✅ สีพื้นหลังให้ดูนุ่มนวล
        px: 2
      }}
    > 
      <Card 
        sx={{
          width: '100%',
          maxWidth: 360,  // ✅ ปรับขนาดให้กะทัดรัด
          boxShadow: 5,
          borderRadius: 3, 
          textAlign: 'center',
          p: 4,
          backgroundColor: 'white',
        }}
      >
        

        {/* ชื่อแอป */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          Travel DTI
        </Typography>

        {/* โลโก้ */}
        <Avatar 
          alt="travel logo" 
          src={Travel} 
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} 
        />

        {/* คำอธิบาย */}
        <Typography variant="body1" sx={{ color: 'gray', mb: 3 }}>
          เข้าสู่ระบบเพื่อใช้งานแพลตฟอร์มของเรา
        </Typography>

        {/* แบบฟอร์ม */}
        <Stack spacing={2}>
          <TextField 
            fullWidth 
            label="ชื่อผู้ใช้" 
            variant="outlined" 
            size="small"
            value={travellerEmail}
            onChange={(e)=>setTravellerEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="รหัสผ่าน"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="small"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
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

        {/* ปุ่มเข้าสู่ระบบ */}
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleLoginClick}
          sx={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            mt: 3,
            py: 1.3, 
            fontSize: '1rem',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#0056b3', transform: 'scale(1.05)' }, // ✅ Hover Effect
          }}
        >
          เข้าสู่ระบบ
        </Button>

        {/* ลงทะเบียน */}
        <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
          ยังไม่มีบัญชี? {' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
            ลงทะเบียนที่นี่
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;
