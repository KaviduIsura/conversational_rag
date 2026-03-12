import React from 'react';
import { Box } from '@mui/material';

import { HeroSection } from './sections/HeroSection';
import { DestinationsSection } from './sections/DestinationsSection';
import { ExperiencesSection } from './sections/ExperiencesSection';
import { ToursSection } from './sections/ToursSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { GallerySection } from './sections/GallerySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { BlogSection } from './sections/BlogSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import { ChatWidget } from './chat/ChatWidget';

export const Home = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* 1. Header is managed in PublicLayout */}
      
      {/* 2. Hero Section */}
      <HeroSection />
      
      {/* 3. Destination Highlights */}
      <DestinationsSection />
      
      {/* 4. Travel Experiences */}
      <ExperiencesSection />
      
      {/* 5. Featured Tours */}
      <ToursSection />
      
      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* 7. Wanderlust Gallery */}
      <GallerySection />
      
      {/* 8. Testimonials & Reviews */}
      <TestimonialsSection />
      
      {/* 9. Travel Blog / Journal */}
      <BlogSection />
      
      {/* 10. Newsletter Subscription */}
      <NewsletterSection />
      
      {/* 11. Contact Info & Form */}
      <ContactSection />
      
      {/* 12. Global Footer */}
      <FooterSection />
      
      {/* Floating Elements (Layered over the scrollable page) */}
      <ChatWidget />
    </Box>
  );
};
