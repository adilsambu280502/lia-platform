import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from '@google/genai';
import { useLocation } from 'react-router-dom';

// Gemini API initialization moved inside component to prevent global hydration crashes

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const location = useLocation();

  // Hide chatbot when mobile nav menu opens
  useEffect(() => {
    const handleNavOpen = () => setNavMenuOpen(true);
    const handleNavClose = () => setNavMenuOpen(false);
    window.addEventListener('lia:navmenu:open', handleNavOpen);
    window.addEventListener('lia:navmenu:close', handleNavClose);
    return () => {
      window.removeEventListener('lia:navmenu:open', handleNavOpen);
      window.removeEventListener('lia:navmenu:close', handleNavClose);
    };
  }, []);

  // Initialize chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: '1', text: t('chatbot.initial'), sender: 'bot' }]);
      
      try {
        const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          console.warn('LIA Assistant: Chave da API Gemini não detetada. O Chatbot vai operar em modo fallback (encaminhamento humano).');
        } else {
          // Determine the context based on current route
          let instructionContext = `És o Assistente Virtual inteligente oficial da Luanda International Academy (LIA).
              
              IDENTIDADE: Prestável, educado, caloroso e profissional. Atuas como um embaixador da escola.
              
              MULTILINGUALISMO STRICTO: Falas fluentemente Português, Inglês, Francês e Árabe. Deves detetar automaticamente o idioma que o utilizador usar e responder EXATAMENTE no mesmo idioma. Não mistures idiomas.
              
              REGRAS DE TÓPICO (CRÍTICO): SÓ podes falar sobre assuntos relacionados com a LIA (Luanda International Academy), educação, escola, propinas, currículo Cambridge, admissões, etc. Se o utilizador perguntar sobre assuntos completamente alheios (receitas de culinária, política, programação, etc.), deves ser extremente educado e dizer: "Peço desculpa, mas sou o assistente exclusivo da Luanda International Academy e apenas estou treinado para ajudar com assuntos relacionados com a nossa escola e comunidade escolar." (Traduz isto para o idioma do utilizador se necessário).
              
              CONHECIMENTO: A LIA é uma escola licenciada pela Cambridge na Vila Alice, Luanda. Oferecemos currículo internacional.
              
              POLÍTICA DE ESCALONAMENTO: Para perguntas complexas sobre propinas, processos detalhados de admissão ou se quiserem falar com um humano, dá o link do WhatsApp: https://wa.me/244951110110 ou o número +244 951 110 110.`;

          if (location.pathname.startsWith('/admin')) {
             instructionContext = `És o Copilot/Assistente Virtual Inteligente do *Painel de Administração* da Luanda International Academy (LIA).
             
             O TEU PAPEL: Ajudar diretores, administradores e gerentes escolares a usar a plataforma de Gestão Centralizada. Deves ser técnico, direto aos factos, e ultra-produtivo.
             
             O QUE SABES SOBRE ESTE PAINEL: 
             - Dashboard (Visão Geral): Apresenta contagens em tempo real como "Visitas Hoje", "Novas Matrículas", e KPIs de receita e propinas.
             - Gestão de Slides: Área para gerir e trocar as imagens principais (Hero) do site institucional.
             - Gestão de Páginas: Área de edição de conteúdo das páginas públicas (Sobre Nós, Admissões, Oferta Educativa).
             - Portal ERP: A interligação desta gestão com o portal onde os encarregados gerem notas e pagamentos.
             
             INSTRUÇÕES DE AJUDA: Se o Admin perguntar "Como alterar as imagens do site?", responde claramente "Basta aceder ao separador 'SLIDES' no menu superior, carregar a sua nova imagem e clicar no botão de guardar". Sê o parceiro de produtividade ideal do gestor da escola.`;
          } else if (location.pathname.startsWith('/erp')) {
             instructionContext = `És o Assistente Inteligente do *Portal dos Encarregados de Educação* da Luanda International Academy (LIA).
             
             MULTILINGUALISMO STRICTO: Falas fluentemente Português, Inglês, Francês e Árabe. Responde EXATAMENTE no idioma usado pelo utilizador.
             
             REGRAS DE TÓPICO (CRÍTICO): SÓ respondes a perguntas sobre o Portal Escolar, a escola, notas, propinas ou LIA. Pergunta alheia? Recusa educadamente dizendo estar limitado à LIA.
             
             O TEU PAPEL: Ajudar os pais a navegar no portal para verem pagamentos, ementas, presenças, faturação e calendário académico dos seus educandos.
             
             TOM DE VOZ: Muito paciente, tranquilizador e prestável, ajudando os pais sempre com cortesia.`;
          }

          // Initialize dynamically inside the scope
          const ai = new GoogleGenAI({ apiKey });
          chatRef.current = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
              systemInstruction: instructionContext,
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
  }, [isOpen, messages.length, t, location.pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatRef.current) {
        const response = await chatRef.current.sendMessage({ message: userMsg.text });
        const botMsg: Message = { id: (Date.now() + 1).toString(), text: response.text || 'Desculpe, não consegui processar o seu pedido.', sender: 'bot' };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Simulated local fallback for demonstration
        setTimeout(() => {
          const lowerInput = input.toLowerCase();
          let responseText = 'Obrigado pelo seu contacto. Como assistente da LIA, posso ajudar com informações sobre inscrições, currículo Cambridge ou agendamento de visitas. Como prefere proceder?';
          
          if (lowerInput.includes('preç') || lowerInput.includes('propina') || lowerInput.includes('custo')) {
            responseText = 'As propinas na LIA variam consoante o nível de ensino. Posso partilhar a nossa tabela de emolumentos ou transferi-lo para um assistente humano para um orçamento detalhado.';
          } else if (lowerInput.includes('inscri') || lowerInput.includes('matrícula')) {
            responseText = 'As inscrições para o próximo ano letivo estão abertas! Pode iniciar o processo no nosso portal de admissões ou visitar as nossas instalações na Vila Alice.';
          } else if (lowerInput.includes('curriculo') || lowerInput.includes('cambridge')) {
            responseText = 'A LIA é uma escola internacional registada pela Cambridge. Seguimos padrões globais de excelência académica reconhecidos em todo o mundo.';
          }

          const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
          setMessages((prev) => [...prev, botMsg]);
          setIsLoading(false);
        }, 1000);
        return; // Exit here as we handle state inside timeout
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: 'Ocorreu um erro de conexão. Por favor, tente novamente ou contacte-nos via WhatsApp.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHumanTransfer = () => {
    window.open('https://wa.me/244951110110', '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && !navMenuOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 md:bottom-8 right-6 p-3 bg-lia-navy text-white rounded-full shadow-2xl hover:bg-lia-navy/90 hover:scale-110 active:scale-95 transition-all z-40 flex items-center justify-center border-4 border-white/10 backdrop-blur-md"
          >
            <div className="bg-white p-1 rounded-full shadow-sm flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="LIA Assistant" 
                className="w-7 h-7 md:w-9 md:h-9 object-contain" 
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 md:bottom-8 right-6 w-[calc(100vw-3rem)] sm:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden z-[70] flex flex-col border border-gray-100"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#003366] p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-1 rounded-full shadow-sm">
                  <img src="/logo.png" alt="LIA" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="font-bold">{t('chatbot.title')}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Fechar Chat"
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-[#E31E24] text-white rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions */}
            <div className="p-3 bg-white border-t border-gray-100">
              <button 
                onClick={handleHumanTransfer}
                className="w-full mb-3 py-2 px-4 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone size={16} />
                <span>{t('chatbot.human')}</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  title="Enviar Mensagem"
                  className="p-2 bg-[#003366] text-white rounded-full hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
