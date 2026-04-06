import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Custom Marker Icon
const customIcon = L.divIcon({
  className: 'bg-transparent border-none',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); width: 120px;">
      <div style="background-color: #E31E24; color: white; padding: 6px 12px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-weight: bold; font-size: 12px; margin-bottom: 4px; white-space: nowrap; text-align: center;">
        LIA Academy
      </div>
      <div style="width: 32px; height: 32px; background-color: #E31E24; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(227, 30, 36, 0.4); border: 3px solid white;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -60]
});

const position: [number, number] = [-8.828556, 13.250556];

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="bg-[#003366] py-24 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24] opacity-10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">{t('contact_page.header_title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('contact_page.header_desc')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold text-[#E31E24] uppercase tracking-widest mb-4">{t('contact_page.info_title')}</h2>
              <h3 className="text-4xl font-extrabold text-[#003366] mb-10 tracking-tight">{t('contact_page.info_subtitle')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-[#003366] mb-2 tracking-tight">{t('contact_page.location')}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{t('contact_page.address')}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-[#003366] mb-2 tracking-tight">{t('contact_page.phone')}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">+244 951 110 110<br/>+244 993 777 777</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-[#003366] mb-2 tracking-tight">{t('contact_page.email_title')}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{t('contact_page.email_val')}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all">
                    <Clock size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-[#003366] mb-2 tracking-tight">{t('contact_page.hours')}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{t('contact_page.hours_val')}</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">{t('contact_page.social')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/luandainternationalacademy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm border border-gray-100" 
                  aria-label="Instagram da LIA"
                >
                  <Instagram size={24} aria-hidden="true" />
                </a>
                <a 
                  href="https://www.facebook.com/luandainternationalacademy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm border border-gray-100" 
                  aria-label="Facebook da LIA"
                >
                  <Facebook size={24} aria-hidden="true" />
                </a>
                <a 
                  href="https://www.linkedin.com/school/luanda-international-academy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#003366] hover:bg-[#E31E24] hover:text-white transition-all shadow-sm border border-gray-100" 
                  aria-label="LinkedIn da LIA"
                >
                  <Linkedin size={24} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/244951110110', '_blank')}
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(37, 211, 102, 0.4)", "0 0 0 20px rgba(37, 211, 102, 0)"] 
              }}
              transition={{ 
                boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeOut" } 
              }}
              className="w-full py-5 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#20ba5a] transition-all flex items-center justify-center space-x-3 shadow-xl text-lg"
            >
              <MessageCircle size={24} />
              <span>{t('contact_page.whatsapp')}</span>
            </motion.button>
          </div>

          {/* Interactive Map */}
          <div className="h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 relative group z-0">
            <MapContainer 
              center={position} 
              zoom={16} 
              scrollWheelZoom={false}
              zoomControl={false}
              className="w-full h-full z-0"
              style={{ background: '#f8f9fa' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <ZoomControl position="bottomright" />
              <Marker position={position} icon={customIcon}>
                <Popup className="rounded-xl overflow-hidden p-0 border-none shadow-2xl">
                  <div className="text-center p-4 bg-white">
                    <div className="w-12 h-12 bg-lia-red rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-premium">
                      <MapPin size={24} />
                    </div>
                    <h4 className="font-black text-lia-navy mb-1 uppercase tracking-tight">LIA Academy</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('contact_page.map_marker')}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>

            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 max-w-xs z-[400] pointer-events-none hidden md:block">
              <h4 className="text-lg font-bold text-[#003366] mb-2 tracking-tight">{t('contact_page.map_title')}</h4>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {t('contact_page.map_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
