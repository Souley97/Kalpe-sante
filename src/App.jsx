import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import WalletSection from '@/components/WalletSection';
import SponsorshipSection from '@/components/SponsorshipSection';
import TicketSection from '@/components/TicketSection';
import DashboardSection from '@/components/DashboardSection';
import PublicAgentSection from '@/components/PublicAgentSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Login from '@/components/Auth/Login';
import useAuth from '@/hooks/useAuth';
import Home from '@/components/Home';

function App() {
  const { user, login, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (user) {
      // Default section based on role
      switch (user.role) {
        case 'beneficiary':
          setActiveSection('ticket');
          break;
        case 'agent':
          setActiveSection('agent');
          break;
        case 'admin':
          setActiveSection('dashboard');
          break;
        default:
          setActiveSection('home');
      }
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Connexion - SANTÉ-WALLET</title>
          <meta name="description" content="Connectez-vous à votre compte SANTÉ-WALLET." />
        </Helmet>
        <Login onLogin={login} />
        <Toaster />
      </>
    );
  }

  const sections = {
    home: <Home setActiveSection={setActiveSection} />,
    wallet: <WalletSection />,
    sponsor: <SponsorshipSection />,
    ticket: <TicketSection />,
    agent: <PublicAgentSection />,
    dashboard: <DashboardSection />,
  };

  return (
    <>
      <Helmet>
        <title>SANTÉ-WALLET - Portefeuille électronique pour l'accès aux soins</title>
        <meta name="description" content="Plateforme web/mobile permettant de financer les soins via un portefeuille électronique alimenté par Mobile Money. Accès rapide, transparent et inclusif aux soins de santé au Sénégal." />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden">
        <Header
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
          onLogout={logout}
        />
        
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {sections[activeSection]}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;