import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import { Grid, Typography, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import photo from "../../Assets/BackgroundProfile/form.jpg"

export default function BasicCard() {

  const forms = useSelector((state) => state.forms.form);

  return forms?.map((form, index) => (
                    <><Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={12} sx={{height: "100%", borderRadius: "24px"}}>
                            <CardActionArea key={index} onClick={() => window.location = '/form/response/' + form._id}>
                            <Paper elevation={0} sx={{p:"24px"}}>
                                <CardMedia
                                    sx={{backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "120px", borderRadius: "12px"}}
                                    style={{backgroundImage: `url(${photo})`}}
                                    alt={form.name} />
                                    </Paper>
                                <CardContent  sx={{pt:0, pb:0}}>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                    }} gutterBottom variant="body1" component="div">
                                        {form.name}
                                    </Typography>
                                    <Typography sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }} variant="body2" color="text.secondary" height={60}>
                                        {form.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    </>
                ))
}
