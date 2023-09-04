import React from 'react'
import MetaData from '../../metaData'

import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './404page.css'
export default function PageNotFound() {
  return (
    <>
    <MetaData title='404'/>
    <div className="pageNotFoun" >

    
    
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '3rem',paddingBottom:'30px' }} >
      <ErrorOutlineIcon sx={{ fontSize: '6rem', color: 'red' }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
    </div>
    </>
  );
}
