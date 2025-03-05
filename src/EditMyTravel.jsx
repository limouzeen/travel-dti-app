import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar, TextField, Button, Card, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import PlaceHolder from './assets/place.png';

const SelectFileInput = styled('input')({
  display: 'none',
});

function EditMyTravel() {
  const { travelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ✅ ดึงข้อมูลผู้ใช้จาก LocalStorage
  const traveller = JSON.parse(localStorage.getItem('traveller')) || {};
  const travellerFullname = traveller.travellerFullname || 'ผู้ใช้';

  // ✅ กำหนดค่าเริ่มต้นจาก state ที่ถูกส่งมา
  const [travelPlace, setTravelPlace] = useState(location.state?.travelPlace || '');
  const [travelStartDate, setTravelStartDate] = useState(location.state?.travelStartDate || '');
  const [travelEndDate, setTravelEndDate] = useState(location.state?.travelEndDate || '');
  const [travelCostTotal, setTravelCostTotal] = useState(location.state?.travelCostTotal || '');
  const [travelImage, setTravelImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(location.state?.travelImage || '');

  // ✅ โหลดข้อมูลจาก API เฉพาะเมื่อไม่มีค่าใน location.state
  useEffect(() => {
    if (!location.state) {
      const fetchTravelData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/travel/one/${travelId}`);
          const data = await response.json();

          if (response.ok && data.data) {
            setTravelPlace(data.data.travelPlace ?? '');
            setTravelStartDate(data.data.travelStartDate ?? '');
            setTravelEndDate(data.data.travelEndDate ?? '');
            setTravelCostTotal(data.data.travelCostTotal ?? '');
            setOriginalImage(data.data.travelImage ?? '');
          } else {
            alert('โหลดข้อมูลล้มเหลว');
            navigate('/mytravel');
          }
        } catch (error) {
          console.error('เกิดข้อผิดพลาด:', error);
        }
      };
      fetchTravelData();
    }
  }, [travelId, navigate, location.state]);

  // ✅ อัพโหลดรูปภาพ
  const handleSelectFileClick = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setTravelImage(file);
    } else {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง');
    }
  };

  // ✅ บันทึกข้อมูล
  const handleSaveTravel = async (e) => {
    e.preventDefault();
    if (!travelPlace.trim() || !travelStartDate || !travelEndDate || !travelCostTotal) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('travelPlace', travelPlace);
    formData.append('travelStartDate', travelStartDate);
    formData.append('travelEndDate', travelEndDate);
    formData.append('travelCostTotal', travelCostTotal);

    if (travelImage instanceof File) {
      formData.append('travelImage', travelImage);
    }

    try {
      const response = await fetch(`http://localhost:3000/travel/${travelId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('บันทึกข้อมูลสำเร็จ!');
        navigate('/mytravel');
      } else {
        alert('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่');
      }
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* ✅ AppBar (ส่วนหัวของแอป) */}
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <FlightTakeoffIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            แก้ไขข้อมูลการเดินทาง
          </Typography>
          <Link to={'/editprofile'} style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
            <Button color="inherit">{travellerFullname}</Button>
          </Link>
          <Avatar
            alt="Profile Picture"
            src={traveller.travellerImage ? `http://localhost:3000/images/traveller/${traveller.travellerImage}` : PlaceHolder}
            sx={{ ml: 2 }}
          />
          <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
            LOG OUT
          </Link>
        </Toolbar>
      </AppBar>

      {/* ✅ กล่องหลักสำหรับแก้ไขข้อมูล */}
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f4f6f8',
          px: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            boxShadow: 5,
            borderRadius: 3,
            textAlign: 'center',
            p: 4,
            backgroundColor: 'white',
          }}
        >
          {/* ✅ รูปภาพ */}
          <Avatar
            alt="Travel Image"
            src={travelImage ? URL.createObjectURL(travelImage) : originalImage ? `http://localhost:3000/images/travel/${originalImage}` : PlaceHolder}
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2, borderRadius: 2 }}
          />

          <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={() => fileInputRef.current.click()} sx={{ textTransform: 'none', mb: 2 }}>
            เปลี่ยนรูปภาพ
          </Button>
          <SelectFileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleSelectFileClick} />

          {/* ✅ ฟอร์มแก้ไขข้อมูล */}
          <Stack spacing={2}>
            <TextField fullWidth label="สถานที่ไป" value={travelPlace} onChange={(e) => setTravelPlace(e.target.value)} />
            <TextField fullWidth label="วันที่ไป" type="date" value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
            <TextField fullWidth label="วันที่กลับ" type="date" value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
            <TextField fullWidth label="ค่าใช้จ่ายทั้งหมด (บาท)" value={travelCostTotal} onChange={(e) => setTravelCostTotal(e.target.value)} type="number" />
          </Stack>

          <Button fullWidth variant="contained" onClick={handleSaveTravel} sx={{ mt: 3 }}>
            บันทึกการเปลี่ยนแปลง
          </Button>

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
    </Box>
  );
}

export default EditMyTravel;

