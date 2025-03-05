import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Avatar, TextField, Button, Card, Stack, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [travellerImage, setTravellerImage] = useState(null);
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerEmail, setTravellerEmail] = useState('');
  const [travellerPassword, setTravellerPassword] = useState('');
  const [travellerId, setTravellerId] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem('traveller'));
    console.log("📥 โหลดข้อมูลจาก LocalStorage:", traveller);
    
    if (traveller) {
      setTravellerFullname(traveller.travellerFullname || '');
      setTravellerEmail(traveller.travellerEmail || '');
      setTravellerPassword(traveller.travellerPassword || '');
      setTravellerId(traveller.travellerId || '');
  
      if (traveller.travellerImage) {
        console.log("✅ รูปที่โหลดมาหลังอัปเดต:", traveller.travellerImage);
        setTravellerImage(traveller.travellerImage);  // ✅ โหลดรูปจาก LocalStorage
      } else {
        setTravellerImage(null);
      }
    }
  }, []);
  
  // Handle file selection
  // const handleSelectFileClick = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setTravellerImage(file);
  //   }
  // };

  const handleSelectFileClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("📷 ไฟล์ที่เลือก:", file);
      setTravellerImage(file); // ✅ อัปเดตค่า state ชั่วคราว
    }
  };
  

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  
    if (!travellerFullname.trim() || !travellerEmail.trim() || !travellerPassword.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
  
    const formData = new FormData();
    formData.append("travellerId", travellerId);
    formData.append("travellerFullname", travellerFullname);
    formData.append("travellerEmail", travellerEmail);
    formData.append("travellerPassword", travellerPassword);
  
    if (travellerImage instanceof File) {
      formData.append("travellerImage", travellerImage);
    }
  
    try {
      const response = await fetch(`http://localhost:3000/traveller/${travellerId}`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("📸 ค่าที่ API ส่งกลับมา:", data);
  
        // ✅ ตรวจสอบค่ารูปภาพที่อัปเดตจาก API
        const updatedImageUrl = data.travellerImage || "";
        console.log("✅ updatedImageUrl:", updatedImageUrl);
  
        if (!updatedImageUrl) {
          alert("API ไม่ส่งค่ารูปภาพกลับมา! ใช้ค่าจาก localStorage แทน");
          return;
        }
  
        // ✅ อัปเดต LocalStorage
        const updatedTraveller = {
          travellerId,
          travellerFullname,
          travellerEmail,
          travellerPassword,
          travellerImage: updatedImageUrl, // ✅ ใช้ URL รูปจาก API
        };
        localStorage.setItem("traveller", JSON.stringify(updatedTraveller));
  
        // ✅ อัปเดต State ให้หน้าแสดงผลใหม่
        setTravellerImage(updatedImageUrl);
        navigate("/mytravel", { state: { updatedImageUrl }, replace: true });

  
        // ✅ ไม่ต้อง `navigate()` เพื่อดูผลลัพธ์ทันที
      } else {
        alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่");
      }
    } catch (err) {ห
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", err);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };
  
  
  
  
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
        {/* Profile Picture */}
        <Avatar
  alt="Profile Picture"
  src={
    travellerImage instanceof File
      ? URL.createObjectURL(travellerImage)  // ✅ แสดงรูปที่เลือกใหม่ทันที
      : travellerImage
        ? `http://localhost:3000/images/traveller/${travellerImage}`  // ✅ ใช้ URL จาก API
        : Profile  // ✅ ใช้รูปโปรไฟล์เริ่มต้น ถ้าไม่มีรูป
  }
  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
/>







        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          แก้ไขโปรไฟล์
        </Typography>

        {/* Profile Form */}
        <Stack spacing={2}>
          <TextField fullWidth label="ชื่อ - นามสกุล" value={travellerFullname} onChange={(e) => setTravellerFullname(e.target.value)} variant="outlined" size="small" />
          <TextField fullWidth label="อีเมล" value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} type="email" variant="outlined" size="small" />

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

        {/* Upload Profile Picture */}
        <Stack alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FileUploadIcon />}
            onClick={() => fileInputRef.current.click()}
            sx={{ textTransform: 'none' }}
          >
            เปลี่ยนรูปโปรไฟล์
          </Button>

          <SelectFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectFileClick}
          />
        </Stack>

        {/* Save Profile Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSaveProfile}
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
          บันทึกการเปลี่ยนแปลง
        </Button>

        {/* Back to Profile Page */}
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mt: 3,
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigate('/mytravel')}
        >
          กลับไปหน้าโปรไฟล์ของฉัน
        </Typography>
      </Card>
    </Box>
  );
}

export default EditProfile;


// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Typography, Avatar, TextField, Button, Card, Stack, IconButton, InputAdornment } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import { styled } from '@mui/material/styles';
// import Profile from './assets/profile.png';

// // Hidden file input styling
// const SelectFileInput = styled('input')({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// function EditProfile() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [travellerImage, setTravellerImage] = useState(null);
//   const [travellerFullname, setTravellerFullname] = useState('');
//   const [travellerEmail, setTravellerEmail] = useState('');
//   const [travellerPassword, setTravellerPassword] = useState('');
//   const [travellerId, setTravellerId] = useState('');
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const traveller = JSON.parse(localStorage.getItem('traveller'));
//     if (traveller) {
//       setTravellerFullname(traveller.travellerFullname);
//       setTravellerEmail(traveller.travellerEmail);
//       setTravellerPassword(traveller.travellerPassword);
//       setTravellerImage(traveller.travellerImage);
//       setTravellerId(traveller.travellerId);
//     }
//   }, []);

//   // Handle file selection
//   const handleSelectFileClick = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setTravellerImage(file);
//     }
//   };

//   const handleSaveProfile = async (e) => {
//     e.preventDefault();

//     if (travellerFullname.trim().length === 0) {
//       alert('กรุณากรอกชื่อ-นามสกุล');
//       return;
//     }
//     if (travellerEmail.trim().length === 0) {
//       alert('กรุณากรอกอีเมล');
//       return;
//     }
//     if (travellerPassword.trim().length === 0) {
//       alert('กรุณากรอกรหัสผ่าน');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('travellerId', travellerId);
//     formData.append('travellerFullname', travellerFullname);
//     formData.append('travellerEmail', travellerEmail);
//     formData.append('travellerPassword', travellerPassword);

//     if (travellerImage instanceof File) {
//       formData.append('travellerImage', travellerImage);
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/traveller/${travellerId}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.status === 200) {
//         alert('บันทึกข้อมูลโปรไฟล์สำเร็จ!');

//         const data = await response.json();
//         const updatedImageUrl = data.travellerImage;

//         const updatedTraveller = {
//           travellerId,
//           travellerFullname,
//           travellerEmail,
//           travellerPassword,
//           travellerImage: updatedImageUrl
//         };

//         localStorage.setItem('traveller', JSON.stringify(updatedTraveller));
//         setTravellerImage(updatedImageUrl);

//         navigate('/mytravel', { state: { updatedImageUrl } });
//       } else {
//         alert('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่');
//       }
//     } catch (err) {
//       alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล', err);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8', px: 2 }}>
//       <Card sx={{ width: '100%', maxWidth: 380, boxShadow: 5, borderRadius: 3, textAlign: 'center', p: 4, backgroundColor: 'white' }}>
//         <Avatar
//           alt="Profile Picture"
//           src={travellerImage instanceof File ? URL.createObjectURL(travellerImage) : `http://localhost:3000/images/traveller/${travellerImage}`}
//           sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
//         />
//         <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>แก้ไขโปรไฟล์</Typography>
//         <Stack spacing={2}>
//           <TextField fullWidth label="ชื่อ - นามสกุล" value={travellerFullname} onChange={(e) => setTravellerFullname(e.target.value)} />
//           <TextField fullWidth label="อีเมล" value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} type="email" />
//           <TextField fullWidth label="รหัสผ่าน" value={travellerPassword} onChange={(e) => setTravellerPassword(e.target.value)} type={showPassword ? "text" : "password"} />
//         </Stack>
//         <Stack alignItems="center" spacing={1} sx={{ mt: 2 }}>
//           <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={() => fileInputRef.current.click()}>เปลี่ยนรูปโปรไฟล์</Button>
//           <SelectFileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleSelectFileClick} />
//         </Stack>
//         <Button fullWidth variant="contained" onClick={handleSaveProfile} sx={{ mt: 3 }}>บันทึกการเปลี่ยนแปลง</Button>
//       </Card>
//     </Box>
//   );
// }

// export default EditProfile;
