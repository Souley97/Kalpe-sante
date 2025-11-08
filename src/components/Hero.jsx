import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = ({ setActiveSection }) => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Innovation Gov'athon 2025
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Accès aux soins
              </span>
              <br />
              <span className="text-gray-800">pour tous les Sénégalais</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Financez les soins de vos proches à distance via Mobile Money. 
              Simple, rapide, transparent et 100% digital.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => setActiveSection('wallet')}
                className="gradient-primary text-white shadow-xl hover:shadow-2xl transition-all gap-2 text-lg px-8"
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveSection('dashboard')}
                className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-lg px-8"
              >
                Voir les statistiques
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">100% Sécurisé</p>
                  <p className="text-sm text-gray-600">Données cryptées</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Instantané</p>
                  <p className="text-sm text-gray-600">Temps réel</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                className="rounded-3xl shadow-2xl w-full" 
                alt="Plateforme SANTÉ-WALLET sur mobile et desktop"
               src="https://images.unsplash.com/photo-1607697987724-fc9f8b225223" />
            </div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;