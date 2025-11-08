import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, UserCheck, CheckCircle, AlertCircle, XCircle, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PublicAgentSection = () => {
  const [qrInput, setQrInput] = useState('');
  const [scannedTicket, setScannedTicket] = useState(null);
  const [debitAmount, setDebitAmount] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [sponsorships, setSponsorships] = useState([]);
  const [tickets, setTickets] = useState([]);

  const establishments = [
    'CHU de Fann',
    'Hôpital Principal',
    'Centre de Santé Gaspard Kamara',
    'Poste de Santé Médina',
  ];

   useEffect(() => {
      const savedSponsorships = localStorage.getItem('sponsorships');
      if (savedSponsorships) {
        setSponsorships(JSON.parse(savedSponsorships));

        const sponsorships = JSON.parse(savedSponsorships);
        const generatedTickets = sponsorships.map((s) => ({
          ...s,
          ticketCode: `SWT-${s.id}`,
          qrData: `KALPÉ-SANTÉ;${s.id};${s.beneficiaryName};${s.remainingAmount}`,
          code: `KALPÉ-SANTÉ;${s.id};${s.beneficiaryName}`,
        }));
        setTickets(generatedTickets);
      }
    }, []);



  const handleScan = () => {
    if (!qrInput) {
      toast({ title: "Champ vide", description: "Veuillez entrer les données du QR code.", variant: "destructive" });
      return;
    }

    try {
      const [prefix, ticketId, beneficiaryName] = qrInput.split(';');
      if (prefix !== 'KALPÉ-SANTÉ' || !ticketId || !beneficiaryName) {
        throw new Error("Format de QR code invalide.");
      }

      const foundTicket = sponsorships.find(s => s.id.toString() === ticketId);

      if (foundTicket) {
        if (foundTicket.status === 'exhausted') {
          toast({ title: "Ticket épuisé", description: "Ce ticket n'a plus de solde disponible.", variant: "destructive" });
          setScannedTicket(null);
        } else {
          setScannedTicket(foundTicket);
          toast({ title: "Ticket trouvé", description: `Ticket pour ${foundTicket.beneficiaryName} chargé.` });
        }
      } else {
        toast({ title: "Ticket non trouvé", description: "Aucun ticket correspondant n'a été trouvé.", variant: "destructive" });
        setScannedTicket(null);
      }
    } catch (error) {
      toast({ title: "Erreur de scan", description: "Le format des données du QR code est invalide.", variant: "destructive" });
      setScannedTicket(null);
    }
  };

  const handleDebit = () => {
    if (!scannedTicket || !debitAmount || !establishment) {
      toast({ title: "Informations manquantes", description: "Veuillez vérifier les informations du ticket, le montant et l'établissement.", variant: "destructive" });
      return;
    }

    const amountToDebit = parseFloat(debitAmount);
    if (amountToDebit <= 0) {
      toast({ title: "Montant invalide", description: "Le montant à débiter doit être positif.", variant: "destructive" });
      return;
    }

    if (amountToDebit > scannedTicket.remainingAmount) {
      toast({ title: "Solde insuffisant", description: `Le montant demandé dépasse le solde restant de ${scannedTicket.remainingAmount.toLocaleString()} FCFA.`, variant: "destructive" });
      return;
    }

    const updatedSponsorships = sponsorships.map(s => {
      if (s.id === scannedTicket.id) {
        const newRemainingAmount = s.remainingAmount - amountToDebit;
        return {
          ...s,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount > 0 ? 'active' : 'exhausted',
          establishment: establishment,
        };
      }
      return s;
    });

    setSponsorships(updatedSponsorships);
    localStorage.setItem('sponsorships', JSON.stringify(updatedSponsorships));

    toast({
      title: "✅ Débit effectué !",
      description: `${amountToDebit.toLocaleString()} FCFA ont été débités du ticket.`,
    });

    setScannedTicket(null);
    setDebitAmount('');
    setQrInput('');
  };

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Espace Agent Public
            </span>
          </h1>
          <p className="text-xl text-gray-600">Scannez et validez les tickets santé en un clin d'œil</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><ScanLine /> Simulation de Scan</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="qrInput">Données du QR Code</Label>
                  <Input
                    id="qrInput"
                    placeholder="KALPÉ-SANTÉ;167..."
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                  />
                </div>
                <Button onClick={handleScan} className="w-full gradient-primary text-white">
                  Scanner le Ticket
                </Button>
              </div>
              {tickets.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mx-auto mb-6">
                    <QrCode className="w-16 h-16 text-cyan-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun ticket disponible</h3>
                  <p className="text-gray-600 mb-6">Les tickets que vous recevez en tant que bénéficiaire apparaissent ici.</p>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="glass-effect p-6 hover:shadow-2xl transition-all">
                        <div className={`bg-gradient-to-br ${ticket.status === 'active' ? 'from-cyan-500 to-blue-500' : 'from-gray-400 to-gray-500'} rounded-2xl p-6 mb-4 text-white`}>
                          

                          

                          <div className="space-y-2 text-sm">
                          
                            <div className="flex justify-between">

                              <span className="font-semibold">{ticket.code}</span>
                            </div>
                           
                          </div>
                        </div>

                        

                        
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><UserCheck /> Validation de la Prestation</h3>
              {scannedTicket ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="font-bold text-lg text-emerald-800">{scannedTicket.beneficiaryName}</p>
                    <p className="text-sm text-emerald-700">Solde restant: <span className="font-bold">{scannedTicket.remainingAmount.toLocaleString()} FCFA</span></p>
                  </div>
                  <div>
                    <Label htmlFor="establishment">Établissement de santé</Label>
                    <Select onValueChange={setEstablishment} value={establishment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'établissement" />
                      </SelectTrigger>
                      <SelectContent>
                        {establishments.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="debitAmount">Montant à débiter (FCFA)</Label>
                    <Input
                      id="debitAmount"
                      type="number"
                      placeholder="Ex: 5000"
                      value={debitAmount}
                      onChange={(e) => setDebitAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleDebit} className="w-full gradient-secondary text-white">
                    Valider et Débiter
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p>En attente de scan d'un ticket valide...</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PublicAgentSection;