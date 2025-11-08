import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, ArrowUpRight, CreditCard, Smartphone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const WalletSection = ({ setActiveSection }) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('orange');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    const savedTransactions = localStorage.getItem('wallet_transactions');
    
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  const handleRecharge = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    const newBalance = balance + parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      type: 'recharge',
      amount: parseFloat(amount),
      method: paymentMethod,
      date: new Date().toISOString(),
    };

    const updatedTransactions = [newTransaction, ...transactions].slice(0, 10);

    setBalance(newBalance);
    setTransactions(updatedTransactions);
    localStorage.setItem('wallet_balance', newBalance.toString());
    localStorage.setItem('wallet_transactions', JSON.stringify(updatedTransactions));

    toast({
      title: "✅ Recharge réussie !",
      description: `${amount} FCFA ajoutés à votre portefeuille`,
    });

    setAmount('');
  };

  const paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: Smartphone, color: 'from-orange-500 to-orange-600' },
    { id: 'wave', name: 'Wave', icon: Smartphone, color: 'from-blue-500 to-blue-600' },
    { id: 'card', name: 'Carte Bancaire', icon: CreditCard, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Mon Portefeuille
            </span>
          </h1>
          <p className="text-xl text-gray-600">Gérez votre solde et rechargez facilement</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <Wallet className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Solde disponible</p>
                    <h2 className="text-4xl font-bold text-gray-800">{balance.toLocaleString()} FCFA</h2>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recharger mon portefeuille</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Méthode de paiement</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === method.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-2`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-xs font-medium text-center">{method.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="amount" className="text-base font-semibold mb-2 block">Montant (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Ex: 10000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg h-14"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[5000, 10000, 20000].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      onClick={() => setAmount(preset.toString())}
                      className="border-2 hover:border-emerald-500 hover:bg-emerald-50"
                    >
                      {preset.toLocaleString()}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleRecharge}
                  className="w-full gradient-primary text-white text-lg h-14 shadow-xl hover:shadow-2xl transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Recharger maintenant
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
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Historique des transactions</h3>
              
              
              
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <ArrowUpRight className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Aucune transaction pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                variant="default" 
                className="w-full gradient-primary text-white text-lg h-14 shadow-xl hover:shadow-2xl transition-all gap-2"
                onClick={() => setActiveSection('sponsor')}
              >
                <Users className="w-5 h-5" />
                Parrainer
              </Button>
                  {transactions.map((transaction) => (

                    
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-gray-200"
                    >
                      {/* bouton vers au parrainer */}
              
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <ArrowUpRight className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Recharge</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-emerald-600">
                        +{transaction.amount.toLocaleString()} FCFA
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

export default WalletSection;