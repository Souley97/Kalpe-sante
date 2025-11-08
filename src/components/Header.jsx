import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Users, QrCode, BarChart3, Menu, X, Heart, UserCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = ({
  activeSection,
  setActiveSection,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const allNavItems = [{
    id: 'home',
    label: 'Accueil',
    icon: Heart,
    roles: ['citizen']
  }, {
    id: 'wallet',
    label: 'Portefeuille',
    icon: Wallet,
    roles: ['citizen']
  }, {
    id: 'sponsor',
    label: 'Parrainer',
    icon: Users,
    roles: ['citizen']
  }, {
    id: 'ticket',
    label: 'Mes Tickets',
    icon: QrCode,
    roles: ['citizen', 'beneficiary']
  }, {
    id: 'agent',
    label: 'Agent Public',
    icon: UserCheck,
    roles: ['agent']
  }, {
    id: 'dashboard',
    label: 'Open Data',
    icon: BarChart3,
    roles: ['citizen', 'admin', 'agent']
  }];
  const navItems = allNavItems.filter(item => item.roles.includes(user.role));
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{
          scale: 1.05
        }} className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection(navItems[0]?.id || 'home')}>
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">KALPÉ-SANTÉ</h1>
              <p className="text-xs text-gray-600">Accès aux soins pour tous</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
            const Icon = item.icon;
            return <Button key={item.id} variant={activeSection === item.id ? 'default' : 'ghost'} onClick={() => setActiveSection(item.id)} className={`gap-2 ${activeSection === item.id ? 'gradient-primary text-white shadow-lg' : 'hover:bg-emerald-50'}`}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>;
          })}
             <Button variant="ghost" onClick={onLogout} className="gap-2 hover:bg-red-50 text-red-600">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden mt-4 space-y-2">
            {navItems.map(item => {
          const Icon = item.icon;
          return <Button key={item.id} variant={activeSection === item.id ? 'default' : 'ghost'} onClick={() => {
            setActiveSection(item.id);
            setMobileMenuOpen(false);
          }} className={`w-full justify-start gap-2 ${activeSection === item.id ? 'gradient-primary text-white' : ''}`}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>;
        })}
            <Button variant="ghost" onClick={() => {
          onLogout();
          setMobileMenuOpen(false);
        }} className="w-full justify-start gap-2 text-red-600">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </motion.div>}
      </nav>
    </motion.header>;
};
export default Header;