import React from 'react';
import { Box, Typography, Container, Grid, TextField, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

export const ContactSection = () => {
  return (
    <Box id="contact" sx={{ bgcolor: 'background.paper', py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          Have a question or need help planning your perfect trip? Our experts are here to help.
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Details - Left Side */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant="h3" gutterBottom fontSize={24}>
                  Contact Information
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                  Reach out to us directly through any of the channels below or fill out the form, and we'll get back to you within 24 hours.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48, mr: 3, color: 'white' }}>
                    <LocationOnIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontSize={16} fontWeight={600}>Headquarters</Typography>
                    <Typography variant="body2" color="text.secondary">123 Wanderlust Way, Suite 400<br />San Francisco, CA 94107</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'secondary.light', width: 48, height: 48, mr: 3, color: 'white' }}>
                    <PhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontSize={16} fontWeight={600}>Phone</Typography>
                    <Typography variant="body2" color="text.secondary">+1 (800) 123-4567<br />Mon-Fri 9am-6pm PST</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: 'success.light', width: 48, height: 48, mr: 3, color: 'white' }}>
                    <EmailIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontSize={16} fontWeight={600}>Email</Typography>
                    <Typography variant="body2" color="text.secondary">hello@luminatravel.com<br />support@luminatravel.com</Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form - Right Side */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Box sx={{ 
                bgcolor: 'background.default', 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4,
                boxShadow: '0 10px 40px rgba(18,50,67,0.06)',
                border: '1px solid rgba(18,50,67,0.03)'
              }}>
                <Typography variant="h4" gutterBottom fontSize={22} sx={{ mb: 4 }}>
                  Send us a Message
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" variant="outlined" sx={{ bgcolor: 'white', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" variant="outlined" sx={{ bgcolor: 'white', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" type="email" variant="outlined" sx={{ bgcolor: 'white', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your Message" multiline rows={5} variant="outlined" sx={{ bgcolor: 'white', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large" 
                      fullWidth 
                      endIcon={<SendIcon />}
                      sx={{ py: 1.5, fontSize: 16 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};