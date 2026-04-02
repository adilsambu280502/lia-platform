import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from '@google/genai';

// Gemini API initialization moved inside component to prevent global hydration crashes

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Initialize chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: '1', text: t('chatbot.initial'), sender: 'bot' }]);
      
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.warn('LIA Assistant: Chave da API Gemini não detetada. O Chatbot vai operar em modo fallback (encaminhamento humano).');
        } else {
          // Initialize dynamically inside the scope
          const ai = new GoogleGenAI({ apiKey });
          chatRef.current = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
              systemInstruction: `És o Assistente Virtual oficial da Luanda International Academy (LIA).
              
              IDENTIDADE: Prestável, educado, caloroso e profissional. Atuas como um embaixador da escola.
              
              MULTILINGUALISMO: Deves responder OBRIGATORIAMENTE no idioma que o utilizador está a usar. 
              Damos as boas-vindas a famílias de todo o mundo. Suporte total para:
              - Português
              - Inglês
              - Francês
              - Árabe (العربية) - IMPORTANTE: Oferecer suporte nativo e acolhedor em Árabe.
              
              CONHECIMENTO: A LIA é uma escola licenciada pela Cambridge na Vila Alice, Luanda. Oferecemos currículo internacional.
              
              POLÍTICA DE ESCALONAMENTO: Para perguntas complexas sobre propinas, processos detalhados de admissão ou se o utilizador quiser falar com um humano, fornece gentilmente o link do WhatsApp: https://wa.me/244951110110 ou o número +244 951 110 110.`,
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
  }, [isOpen, messages.length, t]);

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
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-3 bg-[#003366] text-white rounded-full shadow-2xl hover:bg-[#002244] transition-colors z-50 flex items-center justify-center"
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
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-100"
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
