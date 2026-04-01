import { motion, AnimatePresence } from 'motion/react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  ChevronDown, 
  Quote,
  Printer,
  BookOpen,
  Package,
  Eye,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';
import VirtualAssistant from './components/VirtualAssistant';
import Carousel from './components/Carousel';
import Fireworks from './components/Fireworks';
import PrivacyPolicy from './pages/PrivacyPolicy';

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=554432333559&text=Atendimento+%23550800%3A+Ol%C3%A1%2C+quero+saber+mais%21&type=phone_number&app_absent=0";

const PASCOA_IMAGES = [
  'https://impressoranacional.com/wp-content/uploads/2026/01/Design-sem-nome-26-2.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/10-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/1-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/3-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/4-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/5-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/2-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/9-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/8-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/7-1.png',
  'https://impressoranacional.com/wp-content/uploads/2026/01/6-1.png'
];

const CAIXAS_IMAGES = [
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO535.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO524.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO521.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/08/EIS8257-1.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/08/EIS8261.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/08/EIS8262.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/08/EIS8270.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/08/EIS8290.jpg'
];

const SACOLAS_IMAGES = [
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO506.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO482.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO481.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO404.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO402.webp',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO400.webp'
];

const RESTAURANTES_IMAGES = [
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO205.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO206.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO207.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO216.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO217.jpg'
];

const CAFETERIAS_IMAGES = [
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO311.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO381.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO382.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO385.jpg',
  'https://impressoranacional.com/wp-content/uploads/2024/07/PRO387.jpg'
];

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[90] bg-[#b60059] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-[#d40068] transition-all duration-300 group"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qual o pedido mínimo para sacolas e caixas?",
      answer: "O pedido mínimo é de 200 unidades para sacolas e 500 para caixas. Isso nos permite garantir a melhor relação custo-benefício e qualidade de impressão. Para quantidades maiores, oferecemos condições especiais. Fale com um consultor agora para uma cotação rápida."
    },
    {
      question: "Vocês fazem o design da arte para as embalagens?",
      answer: "Sim! Contamos com uma equipe de design especializada em embalagens de luxo para ajudar a criar ou adaptar sua arte, garantindo que o resultado final seja impecável. Você pode solicitar uma consultoria técnica gratuita pelo nosso WhatsApp."
    },
    {
      question: "Quais são os tipos de acabamentos disponíveis?",
      answer: "Oferecemos uma vasta gama de acabamentos nobres, incluindo Hot Stamping (dourado, prateado, etc.), Relevo Seco, Verniz Localizado UV e Laminação Fosca ou Brilho. Cada projeto é único, e podemos sugerir o melhor acabamento para sua marca em nosso formulário de orçamento."
    },
    {
      question: "Qual o prazo de entrega dos materiais?",
      answer: "O prazo varia de acordo com a complexidade do projeto e acabamentos escolhidos, geralmente entre 15 a 20 dias úteis após a aprovação da arte. Se você tem urgência, entre em contato para verificarmos a disponibilidade de nossa linha de produção."
    },
    {
      question: "Como posso solicitar um orçamento personalizado?",
      answer: "É muito simples! Você pode preencher o formulário abaixo ou clicar no botão do WhatsApp para falar diretamente com um de nossos especialistas. Estamos prontos para entender sua necessidade e oferecer a melhor solução em impressão."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-sm font-bold text-[#00638a] tracking-[0.2em] uppercase mb-4">Dúvidas</h2>
          <h3 className="text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b]">Perguntas <span className="text-[#b60059]">Frequentes</span></h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-base md:text-lg text-[#1b1b1b] pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`text-[#00638a] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 md:p-6 pt-0 text-sm md:text-base text-slate-600 leading-relaxed border-t border-gray-50">
                      {faq.answer}
                      <div className="mt-4 flex gap-4">
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#00638a] font-bold text-sm hover:underline flex items-center gap-1">
                          Falar no WhatsApp <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Fireworks />
      <main>
        {/* Video Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black mb-8 md:mb-16">
          <div className="absolute inset-0 z-0">
            <iframe 
              className="w-full h-full pointer-events-none scale-150"
              src="https://www.youtube.com/embed/aSHDReNPbmk?autoplay=1&mute=1&controls=0&loop=1&playlist=aSHDReNPbmk&rel=0&playsinline=1&enablejsapi=1&start=1&end=10" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Gráfica Nacional Hero Video"
            ></iframe>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center items-start text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-4 md:space-y-6"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-['Plus_Jakarta_Sans'] font-extrabold leading-tight">
                Em busca de se <b className="text-[#0098D2]">destacar</b> no mercado?
              </h2>
              <p className="text-base md:text-xl text-white/90 leading-relaxed">
                Lojistas, marcas e lojas, invistam em <b>sacolas e caixas personalizadas</b> para impulsionar suas vendas!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#b60059] text-white px-6 py-3 md:px-10 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#FFCC00] hover:text-black transition-all shadow-xl text-center"
                >
                  FAZER UM ORÇAMENTO
                </a>
              </div>
              <p className="text-xs md:text-sm font-medium text-white/70">
                Design Exclusivo + de 10.000 Empresas Satisfeitas<br />
                Pedido mínimo de 200 unidades.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero Section (Original) */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-transparent pb-24 pt-12 md:pt-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c6e7ff] text-[#004c6b] rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase">
                <CheckCircle2 size={14} />
                Excelência desde 1997
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter leading-[1.1]">
                <span className="neon-text">A Arte da Impressão em sua Máxima Perfeição.</span>
              </h1>
              <p className="text-base md:text-xl text-slate-600 max-w-lg leading-relaxed">
                Transformamos conceitos em experiências táteis de luxo. Da papelaria corporativa a editoriais de alta costura, entregamos a autoridade que sua marca merece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 md:px-8 md:py-4 bg-[#b60059] text-white rounded-lg font-bold text-base md:text-lg hover:bg-[#FFCC00] hover:text-black hover:shadow-xl hover:shadow-[#FFCC00]/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Solicitar Orçamento
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="px-6 py-3 md:px-8 md:py-4 border-2 border-[#00638a] text-[#00638a] rounded-lg font-bold text-base md:text-lg hover:bg-[#00638a]/5 transition-all text-center">
                  Ver Portfólio
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#00638a]/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:rotate-0 transition-transform duration-700">
                <img 
                  alt="Luxury Printing Showcase" 
                  className="w-full aspect-[4/5] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6RBp-cV-JxNcyhw9Rmo0p8kEdHcou08CTuCnk3Xk99NtsoPWO6MPjs2T_d3WtSY6EO-L5kx_0R21aMSX-O_JoQOZ4PkcTiP5RB-WK10xS-jFFgPkAnQsmMYzA8Wj6iQN0ScREFN42gPWLBsO5Aee6u1w8_9OU4sM_npO8g-A7Gbf_35wCv1TXt5t5pMrjmHPjNsb3avDMvo9maR0VhK2xK9szr9UwcKFqPj5G7cXi9qQDmXQif4t3uAhTMDNebPvZ6ovXctR4M0UZ"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00638a]/40 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#b60059] rounded-full flex items-center justify-center text-white">
                  <Printer size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1b1b1b]">Cores Pantone®</p>
                  <p className="text-xs text-slate-500">Fidelidade Absoluta</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Soluções Section (Carousels) */}
        <section id="produtos" className="pt-16 md:pt-24 pb-8 md:pb-12 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-sm font-bold text-[#00638a] tracking-[0.2em] uppercase mb-4">Portfólio</h2>
              <h3 className="text-3xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b]">Nossas <span className="text-[#b60059]">Soluções</span></h3>
            </div>
            
            <Carousel title="Páscoa" images={PASCOA_IMAGES} />
            <Carousel title="Caixas Personalizadas" images={CAIXAS_IMAGES} />
            <Carousel title="Sacolas Personalizadas" images={SACOLAS_IMAGES} />
            <Carousel title="Restaurantes" images={RESTAURANTES_IMAGES} />
            <Carousel title="Cafeterias" images={CAFETERIAS_IMAGES} />
          </div>
        </section>

        {/* Social Proof */}
        <section className="pt-8 md:pt-12 pb-16 md:pb-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#00638a] tracking-[0.2em] uppercase mb-4">Confiança</h2>
              <h3 className="text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b]">Quem confiou, <span className="text-[#b60059]">indica!</span></h3>
            </div>

            {/* Portrait Videos Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black border-4 border-white"
              >
                <video className="w-full h-full object-cover" controls preload="metadata">
                  <source src="https://impressoranacional.com/wp-content/uploads/2024/08/Video-01.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black border-4 border-white"
              >
                <video className="w-full h-full object-cover" controls preload="metadata">
                  <source src="https://impressoranacional.com/wp-content/uploads/2024/08/Video-03.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black border-4 border-white"
              >
                <video className="w-full h-full object-cover" controls preload="metadata">
                  <source src="https://impressoranacional.com/wp-content/uploads/2024/08/Video-02.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>

            <div className="flex justify-center mb-20">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-[#0098D2] text-white rounded-lg font-bold text-lg hover:bg-[#FFCC00] hover:text-black transition-all shadow-lg shadow-[#0098D2]/20"
              >
                FAZER UM ORÇAMENTO
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 mb-20">
              <div className="text-2xl font-black text-slate-400">LUXURY.CO</div>
              <div className="text-2xl font-black text-slate-400">MODA+</div>
              <div className="text-2xl font-black text-slate-400">TECHNIQ</div>
              <div className="text-2xl font-black text-slate-400">GLOBAL.CORP</div>
              <div className="text-2xl font-black text-slate-400">ESTILO</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "O nível de detalhamento no acabamento de nossos catálogos superou todas as expectativas. A Impressora Nacional é parceira estratégica fundamental.",
                  author: "Ricardo Mendes",
                  role: "Diretor de Marketing, Luxo Brasil",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHTMWinsvg8lFr755wB_2zI4p-8GW61-JTayMX4K5cHFXeTqAV4uTxfWeD2FWu9x3iiG8W0NNkZYi9ROaQnxiiZwYh-okIsxTHe7JBZjryVh5V2lIupoHw4hQF5MzsmpqSPwqAlc9qtN0fIXfuMLwq6bveAaGZDEVq1cZsx8-3Z9pubphalH5YZ_FxR6f36E2W0Ec0XdCe3NtxiT3WHxhRt5NEt2tvt4jQbs96TImEGwJe6KaO2pwTHBhbipm8V25yTmPCMhm-VjfN"
                },
                {
                  quote: "Precisávamos de fidelidade de cores absoluta para nossas campanhas de cosméticos. Eles entregaram perfeição em cada tiragem.",
                  author: "Juliana Castro",
                  role: "Gerente de Branding, Belle Femme",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCri1-3HQGSC1-SqQrnu96eaS47R9vHupZx_Re-TQPataEMdSwwGoBi_Sj7Ijuhyma_4VBdO_DI68-1dKJ6ZkVNwrow5hc8zv8tgbBLdB_ajqr91MfBLkjbkJFl3xSDbdfYdC7OA86RjuAqkQW0FZm01LIxX7D-djvFtn_lk8z24d5GISCKu5jmpA6rGox4NgfTH2d20l28vZu6iT1R31Au6kwjK8OJrIzn8mfEpIExlyX0Mu-daSukO6l3lzjfKuBbNZgz53zCEBsf"
                },
                {
                  quote: "A agilidade no atendimento e a consultoria sobre papéis especiais fazem toda a diferença para o nosso fluxo de produção.",
                  author: "André Fontana",
                  role: "CFO, TechInnovate",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCId4ll5l1OFMGxoRhJkNWBQ5XXdr2d3ZhGqQeTUYmQQ3ynOmaLq9N5xJXqO4yXJ2T-cTyjEmDRNrrsyW-5bJgDLuWg7pUPfcmHejMXr8j4KyctxqJVQ1mUOk10hVFgzZW75Qs-B-E2WyDcbIJYgycsSg8aacD78hser40FCz3jYNY8Hw6drezm_e1RsbEn3xI1ZNccwhcn0k3LQD96uhUqQzEgZEXQOeLAv5U4DIMUI_auX95qMUkine_iCTjT1XG4tCkdYUia9RIl"
                }
              ].map((t, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-100 relative group hover:bg-white hover:shadow-md transition-all">
                  <Quote className="text-[#00638a] opacity-10 absolute top-4 right-4" size={40} />
                  <p className="text-slate-600 italic mb-6 relative z-10">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img alt={t.author} className="w-12 h-12 rounded-full object-cover" src={t.img} referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-sm">{t.author}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-[#00638a] tracking-[0.2em] uppercase mb-4">Nossas Especialidades</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
              <h3 className="text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold max-w-2xl text-[#1b1b1b]">Soluções Premium para Marcas que Exigem o Incomparável.</h3>
              <a className="text-[#00638a] font-bold flex items-center gap-1 group" href="#">
                Ver todos os serviços
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Item 1: Papelaria */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 relative h-[450px] overflow-hidden rounded-xl bg-gray-200 group"
            >
              <img 
                alt="Papelaria Corporativa de Luxo" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ecXmzibR7c0FU_KrA1vAj8s2XxJ1hgTvvUIhLveiiFQMA5ayYs3AfFCsOea1xpJBwWefZjaOiPQCjvqk-bu0i39swmCOU_pSOopAfpfttUg3r9ooeNbgOvE42og0HHJWtciFBYRJBEp_NK7_ew0zqcwLHLJJZuu9zNQmMVChvBdRFNmy9k0O8bHAnSB1RBFHK1O6IQN0JgU_K2aduPLiyaneLUcovps6BbD9IWiUzbjKSh6DUgOtM9pnN-POhgHl6XsTUEzjvoG8"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#00638a] rounded-lg">
                    <Printer size={24} className="text-white" />
                  </div>
                  <h4 className="text-3xl font-bold">Papelaria Corporativa</h4>
                </div>
                <p className="text-white/80 max-w-lg text-lg leading-relaxed">
                  Cartões de visita com relevo, timbrados em papéis especiais e envelopes personalizados que transmitem autoridade imediata.
                </p>
                <button className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#00638a] transition-colors">
                  Saiba Mais <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Item 2: Lux Editorial */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 relative h-[450px] overflow-hidden rounded-xl bg-gray-200 group"
            >
              <img 
                alt="Editoriais e Livros de Arte" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBBoWnRuLAgq1DMLoeYPFV_6NQV0J8wzLeQiW6rs57NZgrI8MahZ1dJBDvB8BNzKALbJgiWZyiXXZGq32Roixmk6NoHFtHNJhKx6uJLswkgkE9vgrK-IA9etQX5L2gSM9Xxz0G69MJLokASR6gnEsP1BFVnktzTRgQjWGLN6IGkl23qUKEuFseOmX0uw4nOVzyKSx7WJhPbupWz4CamJIPEExb1OSsyX4B8E-tCWhG8cfPi3-r8lxpE2ifC4MgZWiiEr6dlzLoxKqK"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#00638a] rounded-lg">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold">Editoriais de Luxo</h4>
                </div>
                <p className="text-white/80 text-sm">Livros de arte, catálogos de moda e revistas premium com acabamentos manuais.</p>
              </div>
            </motion.div>

            {/* Item 3: Embalagens */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 relative h-[450px] overflow-hidden rounded-xl bg-gray-200 group"
            >
              <img 
                alt="Embalagens Premium Customizadas" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn9BeFdLA82DoDnJJ6W7zDJe9Dycydk0HzJnidwG-qrxtfPDnosrTGSIOq5gu9FiC9cN2iK0Dr6DZOyj4bZA6mwsPCMI5bk7Xsf2hQ7ax4Y0wCJrGzeRfBKrG90xTE-OZ4CeMk523OoNnaDRFpimpVZ7qO9lf2tqRRkkX-2jhojSTgkHpzu3puSULmWDCo__l-jRmYSB6Utt53fMqmg7gBrsjuJXxx1DilFzDW8t4SkBbfgd0svBQpaVXXNFkLISwVBBFtNVjxdEMN"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#00638a] rounded-lg">
                    <Package size={24} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold">Embalagens</h4>
                </div>
                <p className="text-white/80 text-sm">Caixas rígidas e sacolas de luxo que elevam o valor percebido do seu produto.</p>
              </div>
            </motion.div>

            {/* Item 4: Com. Visual */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 relative h-[450px] overflow-hidden rounded-xl bg-gray-200 group"
            >
              <img 
                alt="Comunicação Visual de Alto Impacto" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL9Uy2xHfE7McMwaveYFcVj8jGP9BiwGuFwwTlCjtk5UEa_5qy8K3Wpbbp-eLLb1_ZnHlBIE5Vq2ON1YmabqJQCNAqYVF_KBrO7EwuydiKkkNWrAz23LEtB6IR2rtnM8ZJ4ACrbNNK0UK5Y2ChEwUXAfF_mDAXqyPOIZUcx-wm_FGShMQ6Vg4TbXkIlpI1yTwdvAqu0iLregSTSnO0p7LfIdZ5JxFq6xZQfjI3lO9OrPw-8bE5Co0X0x9NwJ95yJCqABEkkka_gcMu"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#00638a] rounded-lg">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h4 className="text-3xl font-bold">Comunicação Visual</h4>
                </div>
                <p className="text-white/80 max-w-lg text-lg leading-relaxed">
                  Sinalização interna, banners de alta resolução e adesivação de frotas com durabilidade extrema.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quem Somos Section */}
        <section id="quem-somos" className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 md:border-8 border-white">
                  <img 
                    src="https://impressoranacional.com/wp-content/uploads/2024/08/9e5b9d1a-8108-4665-a806-527d85bc6f08-1024x768.webp" 
                    alt="História Impressora Nacional" 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#00638a] text-white p-4 md:p-6 rounded-xl shadow-xl">
                  <p className="text-2xl md:text-3xl font-black">28</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Anos de História</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b] mb-4 md:mb-6 leading-tight">
                  28 Anos Criando Soluções em Impressão
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                  bem como as novas tendências de mercado, que proporcionam agilidade, melhoria nos processos produtivos e são garantia de qualidade. Nosso desafio é produzir o melhor produto, atendendo as necessidades e desejos de diversos tipos de clientes, este compromisso é um dos pilares que sustentam nosso sucesso ao longo de 28 anos de história.
                </p>
                
                <div className="pt-6 md:pt-8 border-t border-gray-100">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1b1b1b] mb-4">Sustentabilidade</h3>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">
                      Sustentabilidade é um dos nossos princípios essenciais. Na Gráfica Impressora Nacional, utilizamos os recursos naturais de forma consciente e adotamos práticas que minimizem o impacto no meio ambiente, garantindo que nossos produtos respeitem e protejam o futuro do planeta. Nosso compromisso ambiental é respaldado pelo selo FSC (Forest Stewardship Council), que certifica nossa dedicação à gestão florestal responsável e ao desenvolvimento sustentável das florestas globalmente.
                    </p>
                    <div className="flex-shrink-0 text-center mx-auto md:mx-0">
                      <img 
                        src="https://impressoranacional.com/wp-content/uploads/2024/08/LOGO-FSC.webp" 
                        alt="Selo FSC" 
                        className="h-20 md:h-24 w-auto mb-2"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[10px] font-bold text-slate-400 uppercase max-w-[120px]">A marca do manejo florestal responsável</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#b60059] p-6 md:p-8 rounded-2xl text-white text-center shadow-xl"
              >
                <Printer size={32} className="mx-auto mb-3 md:mb-4 opacity-50 md:w-10 md:h-10" />
                <p className="text-3xl md:text-4xl font-black mb-1">28</p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">Anos de Mercado</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#a3c644] p-6 md:p-8 rounded-2xl text-white text-center shadow-xl"
              >
                <CheckCircle2 size={32} className="mx-auto mb-3 md:mb-4 opacity-50 md:w-10 md:h-10" />
                <p className="text-3xl md:text-4xl font-black mb-1">+10.000</p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">Empresas felizes com nosso trabalho</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#0096d6] p-6 md:p-8 rounded-2xl text-white text-center shadow-xl"
              >
                <Quote size={32} className="mx-auto mb-3 md:mb-4 opacity-50 md:w-10 md:h-10" />
                <p className="text-3xl md:text-4xl font-black mb-1">Qualidade</p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">Qualidade Certificada</p>
              </motion.div>
            </div>

            <div className="text-center mb-16 md:mb-24">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto bg-[#0096d6] text-white px-8 md:px-10 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#FFCC00] hover:text-black transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
              >
                FAZER UM ORÇAMENTO
              </a>
              <p className="mt-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Design Exclusivo + de 10.000 Empresas Satisfeitas</p>
            </div>

            {/* Importance Section */}
            <div className="bg-slate-50 rounded-3xl md:rounded-[40px] p-8 md:p-20 border border-gray-100">
              <h3 className="text-2xl md:text-4xl font-extrabold text-center mb-8 md:mb-12 leading-tight">
                Qual a importância de escolher uma <span className="text-[#00638a]">embalagem personalizada?</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#b60059] flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Proteção Adequada</h4>
                    <p className="text-slate-600">Qualidade na entrega do seu produto.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0096d6] flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Experiência do Cliente</h4>
                    <p className="text-slate-600">Agrega valor à marca e encanta o cliente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-sm font-bold text-[#00638a] tracking-[0.2em] uppercase mb-4">Por que a Impressora Nacional?</h2>
                <h3 className="text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b] mb-8 leading-tight">
                  Mais que uma gráfica, somos o braço direito da sua imagem corporativa.
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Precisão Cromática", desc: "Utilizamos tecnologia de ponta para garantir que a cor da sua marca seja idêntica em todos os materiais." },
                    { title: "Acabamentos Nobres", desc: "Hot stamping, relevo seco, verniz localizado e facas especiais para projetos únicos." },
                    { title: "Consultoria Técnica", desc: "Nossos especialistas ajudam na escolha do melhor papel e acabamento para o seu objetivo." },
                    { title: "Logística Integrada", desc: "Entregamos em todo o Brasil com embalagens que garantem a integridade do material." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00638a] flex items-center justify-center mt-1">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1b1b1b]">{item.title}</h4>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://picsum.photos/seed/print1/400/500" className="rounded-xl shadow-lg mt-12" alt="Impressão" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/print2/400/500" className="rounded-xl shadow-lg" alt="Acabamento" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-2xl hidden md:block">
                  <p className="text-4xl font-black text-[#00638a]">25+</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Anos de História</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto bg-gradient-premium rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00638a] to-[#007dad]"></div>
            <div className="relative z-10 px-6 py-12 md:px-12 md:py-20 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-white mb-4 md:mb-6 leading-tight">Pronto para elevar o padrão visual da sua marca?</h2>
                <p className="text-white/80 text-base md:text-lg">Nossa equipe de especialistas está pronta para transformar seu projeto em uma obra-prima impressa.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 md:px-8 py-4 bg-white text-[#00638a] rounded-lg font-bold text-base md:text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  Falar com Consultor
                  <MessageCircle size={20} />
                </a>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 md:px-8 py-4 border-2 border-white/30 text-white rounded-lg font-bold text-base md:text-lg hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00] transition-all text-center"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </section>
        <FAQSection />
        {/* Contact Section */}
        <section id="contato" className="py-16 md:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#1b1b1b] mb-4">
                Impulsione <span className="text-[#b60059]">suas vendas!</span>
              </h2>
              <p className="text-xl text-slate-600">Use embalagens da sua marca</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nome *</label>
                      <input type="text" placeholder="Digite seu Nome" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Telefone *</label>
                      <input type="tel" placeholder="Digite seu número" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Seu melhor e-mail</label>
                    <input type="email" placeholder="Seu melhor e-mail" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nome da empresa *</label>
                    <input type="text" placeholder="Nome da empresa *" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Segmento de atuação *</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all appearance-none">
                        <option>Restaurantes</option>
                        <option>Cafeterias</option>
                        <option>Vestuários</option>
                        <option>Páscoa</option>
                        <option>Clínicas</option>
                        <option>Outros</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Volume do pedido? *</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#b60059] transition-all appearance-none">
                        <option>Escolha uma opção</option>
                        <option>Sacolas Mín 200</option>
                        <option>Caixas Mín 500</option>
                        <option>500 a 1.000</option>
                        <option>1.000 a 5.000</option>
                        <option>+ de 5.000</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 leading-tight">
                    Ao preencher este formulário, você concorda que faremos contato com você seguindo as normas da LGPD. Seus dados não serão compartilhados.
                  </p>
                  <button type="submit" className="w-full py-4 bg-[#b60059] text-white rounded-xl font-bold text-lg hover:bg-[#FFCC00] hover:text-black transition-all shadow-lg shadow-[#b60059]/20">
                    RECEBER COTAÇÃO
                  </button>
                </form>
              </motion.div>

              {/* Map */}
              <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative">
                <iframe 
                  src="https://maps.google.com/maps?q=Rua%20Manoel%20Antunes%20Pereira%2C%202456B%2C%20Mandaguari%2086975-000&t=m&z=15&output=embed&iwloc=near" 
                  className="w-full h-full border-none"
                  title="Localização Impressora Nacional"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-md max-w-xs">
                  <h4 className="font-bold text-[#00638a] mb-1">Visite-nos</h4>
                  <p className="text-xs text-slate-600">Rua Manoel Antunes Pereira, 2456B, Mandaguari, PR</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-site text-[#1b1b1b] font-['Inter'] selection:bg-[#c6e7ff] selection:text-[#001e2d]">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm font-['Plus_Jakarta_Sans'] tracking-tight">
        <nav className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 md:gap-12">
            <Link className="flex items-center" to="/">
              <img 
                src="https://impressoranacional.com/wp-content/uploads/2024/07/logo-grafica-impressora-nacional-1024x305.webp" 
                alt="Impressora Nacional" 
                className="h-10 md:h-14 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Link className="px-4 py-2 rounded-lg text-white font-semibold bg-[#00638a] shadow-md shadow-[#00638a]/30 transition-all duration-300" to="/">Home</Link>
              <Link className="px-4 py-2 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] hover:shadow-md hover:shadow-[#00638a]/30 transition-all duration-300" to="/#produtos">Soluções</Link>
              <Link className="px-4 py-2 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] hover:shadow-md hover:shadow-[#00638a]/30 transition-all duration-300" to="/#quem-somos">Sobre Nós</Link>
              <Link className="px-4 py-2 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] hover:shadow-md hover:shadow-[#00638a]/30 transition-all duration-300" to="/#contato">Contato</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-[#b60059] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-[#FFCC00] hover:text-black transition-all duration-300 scale-95 active:scale-90 shadow-lg shadow-[#b60059]/20 whitespace-nowrap"
            >
              Solicitar Orçamento
            </a>
            
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-[#00638a] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 gap-2">
                <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-white font-semibold bg-[#00638a] transition-all duration-300" to="/">Home</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] transition-all duration-300" to="/#produtos">Soluções</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] transition-all duration-300" to="/#quem-somos">Sobre Nós</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-slate-600 hover:text-white hover:bg-[#00638a] transition-all duration-300" to="/#contato">Contato</Link>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 text-center bg-[#b60059] text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-[#FFCC00] hover:text-black transition-all duration-300"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/politicadeprivacidade" element={<PrivacyPolicy />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-transparent text-sm border-t border-gray-200/50 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-4 py-12 md:px-8 md:py-20 max-w-7xl mx-auto">
          <div className="space-y-6">
            <Link to="/">
              <img 
                src="https://impressoranacional.com/wp-content/uploads/2024/07/logo-grafica-impressora-nacional-1024x305.webp" 
                alt="Impressora Nacional" 
                className="h-12 w-auto mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-slate-500">Excelência técnica e sensibilidade artística em cada projeto desde 1997.</p>
            <div className="flex gap-4">
              <Link className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#00638a] hover:text-white transition-all" to="#">
                <Share2 size={16} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#1b1b1b] mb-6 uppercase tracking-wider">Produtos</h4>
            <ul className="space-y-4 text-slate-500">
              <li><Link className="hover:text-[#00638a] transition-colors" to="/produtos/papelaria">Papelaria Corporativa</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/produtos/editoriais">Editoriais de Luxo</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/produtos/embalagens">Embalagens Customizadas</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/produtos/acabamentos">Acabamentos Especiais</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/servicos/logistica">Logística e Entrega</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#1b1b1b] mb-6 uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-4 text-slate-500">
              <li><Link className="hover:text-[#00638a] transition-colors" to="/#quem-somos">Sobre Nós</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/portfolio">Portfólio</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/sustentabilidade">Responsabilidade Ambiental</Link></li>
              <li><Link className="hover:text-[#00638a] transition-colors" to="/#contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#1b1b1b] mb-6 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-4 text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#00638a] mt-1 shrink-0" />
                <span>Rua Manoel Antunes Pereira, 2456B,<br />Mandaguari, PR - 86975-000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#00638a]" />
                contato@impressoranacional.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#00638a]" />
                +55 (44) 3233-3559
              </li>
              <li className="flex items-center gap-2 pt-2">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-all">
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
            <p>© 2024 Impressora Nacional. A autoridade em impressão premium.</p>
            <div className="flex gap-8">
              <Link className="hover:text-[#00638a] transition-colors" to="/termos">Termos de Uso</Link>
              <Link className="hover:text-[#00638a] transition-colors" to="/politicadeprivacidade">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
      {/* Floating Assistant */}
      <VirtualAssistant />
    </div>
  );
}
