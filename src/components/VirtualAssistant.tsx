import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Generate a random session ID for the user
const sessionId = Math.random().toString(36).substring(2, 15);

function RobotPackageIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Box Body */}
      <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Box Flaps */}
      <path d="M4 8L12 12L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Robot Eyes */}
      <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      {/* Antenna */}
      <path d="M12 8V4M12 4L10 2M12 4L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Olá! Sou o consultor digital da Impressora Nacional. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [learnedContext, setLearnedContext] = useState<string>('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Fetch previous conversations to "learn" from them
  useEffect(() => {
    const fetchLearnedContext = async () => {
      try {
        const q = query(collection(db, 'chat_logs'), orderBy('timestamp', 'desc'), limit(20));
        const querySnapshot = await getDocs(q);
        let context = 'PERGUNTAS E RESPOSTAS ANTERIORES (Use isso para aprender e melhorar suas respostas):\n';
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          context += `Usuário perguntou: "${data.userMessage}"\nVocê respondeu: "${data.botResponse}"\n\n`;
        });
        setLearnedContext(context);
      } catch (error) {
        console.error('Error fetching learned context:', error);
      }
    };
    fetchLearnedContext();
  }, [isOpen]); // Re-fetch when opened

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      if (!ai.apiKey && !process.env.GEMINI_API_KEY) {
        throw new Error("A chave da API (GEMINI_API_KEY) não foi encontrada nas variáveis de ambiente da Vercel.");
      }

      // Extract all text from the current website to use as context
      const siteContent = document.body.innerText.substring(0, 15000); // Limit to avoid token overflow

      // Format the previous messages in the current session for context
      const sessionHistory = messages.map(m => `${m.role === 'user' ? 'Usuário' : 'Você'}: ${m.text}`).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `Você é o Consultor Digital da Impressora Nacional. Aja como um atendente humano, educado, empático e prestativo.
            
            CONTEÚDO DO SITE (Sua base de conhecimento):
            """
            ${siteContent}
            """

            ${learnedContext}

            HISTÓRICO DA CONVERSA:
            ${sessionHistory}

            O cliente disse: "${userMessage}"
            
            DIRETRIZES DE COMPORTAMENTO E RESPOSTA:
            1. SEJA CONCISO E NATURAL: Responda APENAS o que o usuário perguntou. Mantenha a conversa fluida. NÃO "vomite" um monte de informações de uma vez. Não conte a história da empresa nem liste todos os produtos a menos que o usuário peça especificamente.
            2. SAUDAÇÃO: Se o usuário disser apenas "oi", "olá", "bom dia", etc., responda de forma natural e educada com base no horário (ex: "Olá, bom dia/boa tarde/boa noite! Sou o consultor da Impressora Nacional. O que posso ajudá-lo hoje?").
            3. VERDADE ABSOLUTA: Use as informações do site para responder. Se a resposta não estiver no site, NÃO INVENTE de forma alguma.
            4. TRANSBORDO PARA HUMANO: Se você não souber a resposta, se a pergunta for muito complexa, ou se o cliente quiser um orçamento/fechar pedido, proponha gentilmente encaminhar a conversa para o WhatsApp.
               - Link do WhatsApp: https://api.whatsapp.com/send/?phone=554432333559&text=Atendimento+%23550800%3A+Ol%C3%A1%2C+quero+saber+mais%21
            5. TOM: Aja como um ser humano digitando. Seja direto, amigável e não use formatações exageradas.` }]
          }
        ],
        config: {
          systemInstruction: "Você é um atendente humano da Impressora Nacional. Seja conciso, educado e responda apenas o que foi perguntado. Se não souber, envie para o WhatsApp."
        }
      });

      const botText = response.text || 'Entendido. Como posso ajudar com seu projeto de impressão premium?';
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      
      // Save the interaction to Firestore so the bot can learn from it later
      try {
        await addDoc(collection(db, 'chat_logs'), {
          sessionId,
          userMessage,
          botResponse: botText,
          timestamp: new Date().toISOString()
        });
      } catch (dbError) {
        console.error('Error saving to DB:', dbError);
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: `Erro técnico: ${error.message || 'Desconhecido'}. Por favor, verifique a configuração na Vercel.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-2rem)] md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[450px] md:h-[500px]"
          >
            {/* Header */}
            <div className="bg-[#00638a] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <RobotPackageIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#00638a] rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-sm">Consultor Digital</p>
                  <p className="text-xs opacity-80">Online agora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#00638a] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#00638a] outline-none"
              />
              <button 
                onClick={handleSend}
                className="bg-[#00638a] text-white p-2 rounded-full hover:bg-[#007dad] transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#00638a] to-[#007dad] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <RobotPackageIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />}
      </button>
    </div>
  );
}
