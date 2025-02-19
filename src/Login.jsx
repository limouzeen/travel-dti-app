import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Card, Stack, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Travel from './assets/travel.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
          />

          <TextField
            fullWidth
            label="รหัสผ่าน"
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

        {/* ปุ่มเข้าสู่ระบบ */}
        <Button 
          fullWidth 
          variant="contained" 
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
