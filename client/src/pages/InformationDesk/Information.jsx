import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../Utility/urlInstance';
import logo from "../../mediaFiles/labEquipment.png";
import Grid from '@mui/material/Grid';  // Import Grid

export default function Information() {
  const [Equipments, setEquipments] = React.useState([]);

  const getEquipmentList = async () => {
    try {
      const res = await axiosInstance.get(`/equipments/getAllEquipmentDetails`);
      if (res?.data.data.length > 0) {
        setEquipments(res?.data.data);
      } else {
        setEquipments([]);
      }
    } catch (error) {
      console.log(error);
      setEquipments([]); 
    }
  };

  useEffect(() => {
    getEquipmentList();
  }, []);

  return (
    <div className='mx-5 my-5'>
      {Equipments?.length > 0 ? (
        <Grid container spacing={2}> {/* Use Grid container to wrap the cards */}
          {Equipments?.map((equipment) => (
            <Grid item xs={12} sm={4} md={4} lg={4} key={equipment.equipmentId}> {/* Use Grid item for each card */}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Lab Equipment"
                  height="140"
                  image={logo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {equipment.equipmentName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Guidelines:</strong> {equipment.guidelines}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
                    <strong>Operator Name:</strong> {equipment.operatorName || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Operator Email:</strong> {equipment.operatorEmail || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Operator Phone:</strong> {equipment.operatorPhoneNumber || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>No Equipment Found</Typography>
      )}
    </div>
  );
}
