import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import { Grid, Typography, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function BasicCard() {

  const forms = useSelector((state) => state.forms.form);

  return forms?.map((form, index) => (
                    <><Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={12} sx={{height: "100%"}}>
                            <CardActionArea key={index} onClick={() => window.location = '/form/edit-form/' + form._id}>
                                <CardContent>
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
