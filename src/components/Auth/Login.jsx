import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Key, LogIn, UserCheck, Shield, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Login = ({
  onLogin
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const roles = [{
    value: 'citizen',
    label: 'Citoyen-Parrain',
    icon: UserCircle
  }, {
    value: 'beneficiary',
    label: 'Bénéficiaire',
    icon: User
  }, {
    value: 'agent',
    label: 'Agent Public',
    icon: UserCheck
  }, {
    value: 'admin',
    label: 'Admin DPM',
    icon: Shield
  }];
  const handleLogin = () => {
    if (!name || !role) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez entrer votre nom et sélectionner un rôle.",
        variant: "destructive"
      });
      return;
    }
    onLogin({
      name,
      role
    });
    toast({
      title: `✅ Bienvenue, ${name} !`,
      description: `Vous êtes connecté en tant que ${roles.find(r => r.value === role).label}.`
    });
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#c9f7e5,transparent)]"></div>
      </div>
      
      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5,
      type: 'spring'
    }}>
        <Card className="w-full max-w-md glass-effect p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">KALPÉ SANTÉ</h1>
            <p className="text-gray-600">Connectez-vous pour accéder à votre espace</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                Votre Nom
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="name" placeholder="Ex: Moussa Fall" value={name} onChange={e => setName(e.target.value)} className="text-lg h-12 pl-10" />
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="text-base font-semibold mb-2 block">
                Je suis un(e)
              </Label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger className="text-lg h-12">
                  <SelectValue placeholder="Sélectionner votre rôle..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(r => {
                  const Icon = r.icon;
                  return <SelectItem key={r.value} value={r.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{r.label}</span>
                        </div>
                      </SelectItem>;
                })}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleLogin} className="w-full gradient-primary text-white text-lg h-14 shadow-xl hover:shadow-2xl transition-all">
              <LogIn className="w-5 h-5 mr-2" />
              Se Connecter
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-6">
            Ceci est une simulation. Aucune donnée personnelle n'est requise.
          </p>
        </Card>
      </motion.div>
    </div>;
};
export default Login;