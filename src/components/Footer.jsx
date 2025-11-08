import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-white/50 border-t border-gray-200 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">KALPÉ-SANTÉ</span>
            </div>
            <p className="text-gray-600">
              Plateforme digitale pour un accès équitable aux soins de santé au Sénégal.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-gray-600">
              <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">À propos</span></li>
              <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">Comment ça marche</span></li>
              <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">Structures partenaires</span></li>
              <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">Contact</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-colors">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-colors">
                <Github className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">© 2025 KALPÉ-SANTÉ - Gov'athon 2025 | Open Source & Open Data</p>
        </div>
      </div>
    </footer>;
};
export default Footer;