import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Users, QrCode, BarChart3, Smartphone, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Portefeuille Digital',
      description: 'Rechargez via Orange Money, Wave ou carte bancaire en toute sécurité',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Users,
      title: 'Parrainage Solidaire',
      description: 'Financez les soins de vos proches à distance, où qu\'ils soient',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: QrCode,
      title: 'Tickets Numériques',
      description: 'QR codes sécurisés pour accéder aux soins sans cash ni paperasse',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: BarChart3,
      title: 'Open Data',
      description: 'Transparence totale avec statistiques en temps réel',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Clock,
      title: 'Gain de Temps',
      description: 'Réduction de 50% du temps d\'attente dans les structures pilotes',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Smartphone,
      title: '100% Mobile',
      description: 'Accessible partout, sur tous vos appareils',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Une solution complète
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Digitalisation du financement des soins pour un accès plus rapide, transparent et inclusif
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;