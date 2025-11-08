import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Wallet, Activity, MapPin, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const DashboardSection = () => {
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalSponsorships: 0,
    totalTickets: 0,
    activeUsers: 0,
  });
  const [structures, setStructures] = useState([
    { name: 'CHU de Fann', tickets: 0, amount: 0 },
    { name: 'Hôpital Principal', tickets: 0, amount: 0 },
    { name: 'Centre de Santé Gaspard Kamara', tickets: 0, amount: 0 },
    { name: 'Poste de Santé Médina', tickets: 0, amount: 0 },
  ]);

  useEffect(() => {
    const savedSponsorships = localStorage.getItem('sponsorships');

    let totalAmount = 0;
    let totalSponsorships = 0;
    let totalTickets = 0;
    let activeUsers = 0;
    
    const newStructures = [...structures].map(s => ({...s, tickets: 0, amount: 0}));

    if (savedSponsorships) {
      const sponsorships = JSON.parse(savedSponsorships);
      totalSponsorships = sponsorships.length;
      totalAmount = sponsorships.reduce((sum, s) => sum + s.amount, 0);
      totalTickets = sponsorships.filter(s => s.status !== 'active').length;
      
      const uniqueUsers = new Set(sponsorships.map(s => s.beneficiaryPhone));
      activeUsers = uniqueUsers.size + 1; // +1 for the sponsor

      sponsorships.forEach(s => {
        if (s.establishment !== 'Non utilisé') {
          const structure = newStructures.find(st => st.name === s.establishment);
          if (structure) {
            structure.tickets += 1;
            structure.amount += (s.amount - s.remainingAmount);
          }
        }
      });
      
      setStructures(newStructures.sort((a, b) => b.tickets - a.tickets));
    }

    setStats({
      totalAmount,
      totalSponsorships,
      totalTickets,
      activeUsers: activeUsers > 0 ? activeUsers : 1,
    });
  }, []);

  const handleExport = () => {
    const headers = ["Établissement", "Tickets Consommés", "Montant Total (FCFA)"];
    const rows = structures.map(s => [s.name, s.tickets, s.amount]);
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export_sante_wallet.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "✅ Exportation réussie",
      description: "Le fichier CSV a été téléchargé.",
    });
  };

  const statCards = [
    {
      title: 'Montant Total Collecté',
      value: `${stats.totalAmount.toLocaleString()} FCFA`,
      icon: Wallet,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Parrainages Effectués',
      value: stats.totalSponsorships,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Tickets Consommés',
      value: stats.totalTickets,
      icon: Activity,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Solidarité Nationale',
      value: stats.activeUsers,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      subtext: 'personnes impliquées'
    },
  ];

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tableau de Bord Open Data
            </span>
          </h1>
          <p className="text-xl text-gray-600">La solidarité nationale en toute transparence</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="glass-effect p-6 hover:shadow-2xl transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  {stat.subtext && <p className="text-sm text-gray-500">{stat.subtext}</p>}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="glass-effect p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Structures les plus sollicitées</h3>
                </div>
                <Button onClick={handleExport} className="gradient-primary text-white shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter (CSV)
                </Button>
              </div>

              <div className="space-y-4">
                {structures.map((structure, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/50 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{structure.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>Dakar, Sénégal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Tickets consommés</p>
                        <p className="text-xl font-bold text-blue-600">{structure.tickets}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Montant total</p>
                        <p className="text-xl font-bold text-emerald-600">
                          {structure.amount.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect p-8 mb-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Impact en temps réel</h3>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <p className="text-sm opacity-90 mb-2">Réduction du temps d'attente</p>
                  <p className="text-5xl font-bold mb-2">-50%</p>
                  <p className="text-sm opacity-90">Dans les structures pilotes</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <p className="text-sm opacity-90 mb-2">Taux de satisfaction</p>
                  <p className="text-5xl font-bold mb-2">94%</p>
                  <p className="text-sm opacity-90">Des utilisateurs recommandent</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                  <p className="text-sm opacity-90 mb-2">Accès facilité</p>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-sm opacity-90">Sans argent liquide</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;