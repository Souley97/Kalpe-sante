import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const SponsorshipSection = () => {
  const [balance, setBalance] = useState(0);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [sponsorships, setSponsorships] = useState([]);

  useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    const savedSponsorships = localStorage.getItem('sponsorships');
    
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedSponsorships) setSponsorships(JSON.parse(savedSponsorships));
  }, []);

  const handleSponsor = () => {
    if (!beneficiaryName || !beneficiaryPhone || !amount) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const sponsorAmount = parseFloat(amount);
    
    if (sponsorAmount <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    if (sponsorAmount > balance) {
      toast({
        title: "Solde insuffisant",
        description: "Veuillez recharger votre portefeuille",
        variant: "destructive",
      });
      return;
    }

    const newBalance = balance - sponsorAmount;
    const newSponsorship = {
      id: Date.now(),
      beneficiaryName,
      beneficiaryPhone,
      amount: sponsorAmount,
      remainingAmount: sponsorAmount,
      date: new Date().toISOString(),
      status: 'active',
      establishment: 'Non utilisé',
    };

    const updatedSponsorships = [newSponsorship, ...sponsorships];

    setBalance(newBalance);
    setSponsorships(updatedSponsorships);
    localStorage.setItem('wallet_balance', newBalance.toString());
    localStorage.setItem('sponsorships', JSON.stringify(updatedSponsorships));

    toast({
      title: "✅ Parrainage réussi !",
      description: `${sponsorAmount} FCFA envoyés à ${beneficiaryName}`,
    });

    setBeneficiaryName('');
    setBeneficiaryPhone('');
    setAmount('');
  };

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Parrainage Solidaire
            </span>
          </h1>
          <p className="text-xl text-gray-600">Financez les soins de vos proches à distance</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Solde disponible</p>
                  <h2 className="text-3xl font-bold text-gray-800">{balance.toLocaleString()} FCFA</h2>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recharger le wallet d'un bénéficiaire</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="beneficiaryName" className="text-base font-semibold mb-2 block">
                    Nom du bénéficiaire
                  </Label>
                  <Input
                    id="beneficiaryName"
                    placeholder="Ex: Fatou Diop"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="beneficiaryPhone" className="text-base font-semibold mb-2 block">
                    Téléphone du bénéficiaire
                  </Label>
                  <Input
                    id="beneficiaryPhone"
                    placeholder="Ex: +221 77 123 45 67"
                    value={beneficiaryPhone}
                    onChange={(e) => setBeneficiaryPhone(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="sponsorAmount" className="text-base font-semibold mb-2 block">
                    Montant à envoyer (FCFA)
                  </Label>
                  <Input
                    id="sponsorAmount"
                    type="number"
                    placeholder="Ex: 15000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <Button
                  onClick={handleSponsor}
                  className="w-full gradient-secondary text-white text-lg h-14 shadow-xl hover:shadow-2xl transition-all"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer maintenant
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Mes parrainages</h3>
              
              {sponsorships.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Aucun parrainage pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sponsorships.map((sponsorship) => (
                    <motion.div
                      key={sponsorship.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-xl bg-white/50 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{sponsorship.beneficiaryName}</p>
                            <p className="text-sm text-gray-600">{sponsorship.beneficiaryPhone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-purple-600">
                            {sponsorship.amount.toLocaleString()} FCFA
                          </p>
                          <div className={`flex items-center gap-1 text-sm mt-1 ${sponsorship.status === 'active' ? 'text-emerald-600' : 'text-gray-500'}`}>
                            <CheckCircle className="w-4 h-4" />
                            <span>{sponsorship.status === 'active' ? 'Actif' : 'Épuisé'}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(sponsorship.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipSection;