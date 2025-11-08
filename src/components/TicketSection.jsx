import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Share2, MapPin, CheckCircle, XCircle } from 'lucide-react';
import QRCode from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const TicketSection = () => {
  const [tickets, setTickets] = useState([]);
  const qrCodeRefs = useRef({});

  useEffect(() => {
    const savedSponsorships = localStorage.getItem('sponsorships');
    if (savedSponsorships) {
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

  const handleDownload = (ticket) => {
    const canvas = qrCodeRefs.current[ticket.id];
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${ticket.ticketCode}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
       toast({
        title: "✅ Téléchargement réussi",
        description: "Le QR code de votre ticket a été téléchargé.",
      });
    } else {
       toast({
        title: "❌ Erreur de téléchargement",
        description: "Impossible de télécharger le QR code pour le moment.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (ticket) => {
    const shareData = {
      title: `Ticket Santé-Wallet: ${ticket.ticketCode}`,
      text: `Voici votre ticket Santé-Wallet pour ${ticket.beneficiaryName}. Montant restant: ${ticket.remainingAmount} FCFA.`,
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "✅ Partage réussi",
          description: "Le ticket a été partagé avec succès.",
        });
      } catch (error) {
        toast({
          title: "❌ Erreur de partage",
          description: "Le partage a été annulé ou a échoué.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "🚧 Partage non supporté",
        description: "Votre navigateur ne supporte pas la fonction de partage. Essayez de télécharger le ticket.",
      });
    }
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
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Mes Tickets Santé
            </span>
          </h1>
          <p className="text-xl text-gray-600">Consultez vos tickets actifs et leur montant restant</p>
        </motion.div>

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
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-90">Ticket N°</p>
                        <p className="text-xl font-bold">{ticket.ticketCode}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${ticket.status === 'active' ? 'bg-white/20' : 'bg-black/20'}`}>
                        {ticket.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{ticket.status === 'active' ? 'Actif' : 'Épuisé'}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 mb-4">
                      <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center">
                         <QRCode
                            ref={(canvas) => {
                              if (canvas) qrCodeRefs.current[ticket.id] = canvas;
                            }}
                            value={ticket.qrData}
                            size={200}
                            level={"H"}
                            includeMargin={true}
                          />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-90">Bénéficiaire:</span>
                        <span className="font-semibold">{ticket.beneficiaryName}</span>
                      </div>
                      <div className="flex justify-between">
                      
                        <span className="font-semibold">{ticket.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Montant Initial:</span>
                        <span className="font-semibold">{(ticket.amount || 0).toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/20">
                        <span className="opacity-90 text-base">Montant Restant:</span>
                        <span className="font-bold text-2xl">{(ticket.remainingAmount || 0).toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleDownload(ticket)}
                      variant="outline"
                      className="w-full border-2 border-cyan-500 text-cyan-700 hover:bg-cyan-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button
                      onClick={() => handleShare(ticket)}
                      variant="outline"
                      className="w-full border-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Valable dans toutes les structures publiques</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TicketSection;