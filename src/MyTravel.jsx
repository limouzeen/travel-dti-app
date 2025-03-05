import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Place from './assets/place.png';

import Profile from './assets/profile.png';

function MyTravel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerImage, setTravellerImage] = useState('');
  const [travellerId, setTravellerId] = useState('');
  const [travelList, setTravelList] = useState([]); //เก็บรายการการเดินทาง

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem('traveller'));

    console.log("📥 ค่า location.state ที่ได้รับ:", location.state);
    console.log("📥 ค่า localStorage ที่ได้รับ:", traveller);




    // ดึงข้อมูล travel จาก traveller
    const getAllTravel = async () => {
        const response = await fetch(`http://localhost:3000/travel/${traveller.travellerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.status ==200) {
          const data = await response.json();
          setTravelList(data["data"]);
        }}

        getAllTravel()
  

    if (location.state?.updatedImageUrl) {
      console.log("✅ อัปเดตรูปจาก location.state:", location.state.updatedImageUrl);
      setTravellerImage(location.state.updatedImageUrl);
    } else if (traveller?.travellerImage) {
      console.log("✅ อัปเดตรูปจาก localStorage:", traveller.travellerImage);
      setTravellerImage(traveller.travellerImage);
    }

    if (traveller?.travellerFullname) {
      setTravellerFullname(traveller.travellerFullname);
    }
  }, [location.state]);



  //ฟังก์ชันลบการเดินทาง
  const handleDeleteTravel = async (travelId) => {
    if (window.confirm("คุณต้องการลบการเดินทางนี้หรือไม่?")) {
      try {
        const response = await fetch(`http://localhost:3000/travel/${travelId}`, { method: "DELETE" });
        if (response.ok) {
          alert("ลบข้อมูลการเดินทางสำเร็จ!");
          setTravelList(travelList.filter(travel => travel.travelId !== travelId)); // อัปเดตรายการหลังลบ
        } else {
          alert("ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่");
        }
      } catch (err) {
        console.error("❌ เกิดข้อผิดพลาดในการลบ:", err);
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
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
              <Avatar 
                alt="Profile Picture"
                src={travellerImage && travellerImage.startsWith("http") 
                      ? travellerImage 
                      : `http://localhost:3000/images/traveller/${travellerImage}`}
              />
              <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ width: "70%", boxShadow: 4, mx: 'auto', my: 4, p: 5}}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' , mb:2}}>
            การเดินทางของฉัน
          </Typography>

                  {/* แสดงตารางข้อมูลการเดินทางของ Traveller */}
{/* <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{backgroundColor: '#aaaaaa'}}>
        <TableCell align="center">สถานที่ไป</TableCell>
        <TableCell align="center">รูป</TableCell>
        <TableCell align="center">วันที่ไป</TableCell>
        <TableCell align="center">วันที่กลับ</TableCell>
        <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
        <TableCell align="center">#</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
          {travelList.map((row) => (
            <TableRow
              key={row.travelId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" >{row.travelPlace}</TableCell>
              <TableCell align="left">{row.travelImage}</TableCell>
              <TableCell align="left">{row.travelStartDate}</TableCell>
              <TableCell align="left">{row.travelEndDate}</TableCell>
              <TableCell align="left">{row.travelCostTotal}</TableCell>
              <TableCell align="left">
                <Button>แก้ไข</Button>
                <Button>ลบ</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
  </Table>
</TableContainer> */}

<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ backgroundColor: '#aaaaaa' }}>
        <TableCell align="center">ลำดับ</TableCell>
        <TableCell align="center">สถานที่ไป</TableCell>
        <TableCell align="center">รูป</TableCell>
        <TableCell align="center">วันที่ไป</TableCell>
        <TableCell align="center">วันที่กลับ</TableCell>
        <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
        <TableCell align="center">#</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {travelList.map((row, index) => (
        <TableRow
          key={row.travelId}
          sx={{
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff', // สลับสีแถว
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell align="left">{row.travelPlace}</TableCell>
          
          {/* ✅ แสดงรูปภาพของสถานที่เดินทาง */}
          <TableCell align="center">
            <Avatar 
              src={row.travelImage ? `http://localhost:3000/images/travel/${row.travelImage}` : Place}
              sx={{ width: 60, height: 60, boxShadow: 3 }}
              variant="rounded"
            />
          </TableCell>

          <TableCell align="left">{row.travelStartDate}</TableCell>
          <TableCell align="left">{row.travelEndDate}</TableCell>
          <TableCell align="right">{row.travelCostTotal} บาท</TableCell>
          
          {/* ✅ ปุ่มแก้ไขและลบ */}
          <TableCell align="center">
            <Button
  variant="contained"
  color="primary"
  onClick={() =>
    navigate(`/editmytravel/${row.travelId}`, {
      state: {
        travelPlace: row.travelPlace,
        travelStartDate: row.travelStartDate,
        travelEndDate: row.travelEndDate,
        travelCostTotal: row.travelCostTotal,
        travelImage: row.travelImage,
      },
    })
  }
>
  แก้ไข
</Button>

            <Button variant="contained" color="error" onClick={() => handleDeleteTravel(row.travelId)} sx={{ ml: 1 }}>
              ลบ
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>



          <Link to={'/addmytravel'} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            <Button fullWidth variant="contained" sx={{ py: 2, mt:4}}>
              เพิ่มการเดินทาง
            </Button>
          </Link>
          
           {/* ✅ แสดงข้อมูลการเดินทาง */}
           {/* <Grid container spacing={3}>
            {travelList.length > 0 ? (
              travelList.map((travel) => (
                <Grid item xs={12}  sm={6} md={4} key={travel.travelId}>
                  <Card sx={{ boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:3000/images/travel/${travel.travelImage}`}
                      alt={travel.travelPlace}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {travel.travelPlace}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📅 {travel.travelStartDate} - {travel.travelEndDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        💰 ค่าใช้จ่าย: {travel.travelCostTotal} บาท
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="outlined" color="primary" onClick={() => navigate(`/editmytravel/${travel.travelId}`)}>
                          แก้ไข
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDeleteTravel(travel.travelId)}>
                          ลบ
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ width: '100%', mt: 3 }}>
                ❌ ยังไม่มีข้อมูลการเดินทาง
              </Typography>
            )}
          </Grid> */}

         

        </Box>
        
      </Box>
    </>
  );
}

export default MyTravel;


