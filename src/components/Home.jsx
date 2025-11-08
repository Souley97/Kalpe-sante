import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

const Home = ({ setActiveSection }) => {
  return (
    <>
      <Hero setActiveSection={setActiveSection} />
      <Features />
    </>
  );
};

export default Home;